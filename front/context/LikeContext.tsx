import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE } from "../graphql/mutations/likeMutations";
import { GET_LIKED_PROJECTS } from "@/graphql/queries/likeQueries";
import { GET_PROJECTS } from "@/graphql/queries/projectQueries";
import { ProjectType } from "@/pages/user/[ownerId]";

type LikeContextType = {
  likedProjects: ProjectType[];
  handleToggleLike: (projectId: string) => Promise<void>;
  loading: boolean;
  error: any;
  refetchProjects: () => void;
};

const defaultValue: LikeContextType = {
  likedProjects: [],
  handleToggleLike: async () => {},
  loading: false,
  error: null,
  refetchProjects: () => {},
};

const LikeContext = createContext<LikeContextType>(defaultValue);
export const useLikes = () => useContext(LikeContext);

interface LikeProviderProps {
  children: React.ReactNode;
}

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const { refetch: refetchProjects } = useQuery(GET_PROJECTS, {
    variables: { limit: null, offset: null },
    nextFetchPolicy: "cache-and-network",
  });
  const {
    data,
    loading,
    error,
    refetch: refetchLikedProjects,
  } = useQuery(GET_LIKED_PROJECTS);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: GET_PROJECTS }, { query: GET_LIKED_PROJECTS }],
  });

  const handleToggleLike = async (projectId: string) => {
    try {
      await toggleLikeMutation({
        variables: { projectId },
      });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <LikeContext.Provider
      value={{
        likedProjects: data?.likedProjects,
        handleToggleLike,
        loading,
        error,
        refetchProjects,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
