import React, { createContext, useContext, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_LIKE } from "../graphql/mutations/likeMutations"
import { ProjectType } from '@/pages/user/[ownerId]';
import { GET_LIKED_PROJECTS } from '@/graphql/queries/likeQueries';

const LikeContext = createContext({});

export const useLikes = () => useContext(LikeContext);

interface LikeProviderProps {
  children: React.ReactNode;
}

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const [likes, setLikes] = useState({});

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    onCompleted: (data) => {
      const { toggleLike } = data;
      setLikes(prev => ({ ...prev, [toggleLike.projectId]: toggleLike.liked }));
    }
  });

  const toggleLike = useCallback(async (projectId: ProjectType) => {
    try {
      await toggleLikeMutation({
        variables: { projectId },
        refetchQueries: [{ query: GET_LIKED_PROJECTS },
          // {query: PROJECT_LIKES, variables: { projectId }}
        ]

      });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [toggleLikeMutation]);

  return (
    <LikeContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};
