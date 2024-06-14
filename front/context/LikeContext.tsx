import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { TOGGLE_LIKE } from "../graphql/mutations/likeMutations";
import { GET_LIKED_PROJECTS } from '@/graphql/queries/likeQueries';
import { GET_PROJECTS } from '@/graphql/queries/projectQueries';

type LikeContextType = {
  likedProjects: string[];
  handleToggleLike: (projectId: string) => Promise<void>;
  loading: boolean;
  error: any;
};

const defaultValue: LikeContextType = {
  likedProjects: [],
  handleToggleLike: async () => { },
  loading: false,
  error: null,
};

const LikeContext = createContext<LikeContextType>(defaultValue);
export const useLikes = () => useContext(LikeContext);

interface LikeProviderProps {
  children: React.ReactNode;
}

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const { refetch } = useQuery(GET_PROJECTS);
  const { data, loading, error } = useQuery(GET_LIKED_PROJECTS);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.likedProjects) {
      setLikedProjects(data.likedProjects.map((p: { id: string }) => p.id));
    }
  }, [data]);

  const handleToggleLike = async (projectId: string) => {
    try {
      await toggleLikeMutation({
        variables: { projectId },
        refetchQueries: [{ query: GET_LIKED_PROJECTS }]
      });
      setLikedProjects(current => {
        const isCurrentlyLiked = current.includes(projectId);
        return isCurrentlyLiked
          ? current.filter(id => id !== projectId)
          : [...current, projectId];
      });
      refetch();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <LikeContext.Provider value={{ likedProjects, handleToggleLike, loading, error }}>
      {children}
    </LikeContext.Provider>
  );
};
