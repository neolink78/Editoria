import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TOGGLE_LIKE } from "../graphql/mutations/likeMutations";
import { GET_LIKED_PROJECTS } from "@/graphql/queries/likeQueries";
import { GET_PROJECTS, GET_PROJECT_BY_ID } from "@/graphql/queries/projectQueries";
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
  handleToggleLike: async () => { },
  loading: false,
  error: null,
  refetchProjects: () => { },
};

const LikeContext = createContext<LikeContextType>(defaultValue);
export const useLikes = () => useContext(LikeContext);

interface LikeProviderProps {
  children: React.ReactNode;
}

export const LikeProvider = ({ children }: LikeProviderProps) => {
  const { refetch: refetchProjects } = useQuery(GET_PROJECTS, {
    nextFetchPolicy: "cache-and-network",
  });
  const {
    data,
    loading,
    error,
  } = useQuery(GET_LIKED_PROJECTS);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

  const handleToggleLike = async (projectId: string) => {
    try {
      await toggleLikeMutation({
        variables: { projectId },
        refetchQueries: [{ query: GET_LIKED_PROJECTS },
        { query: GET_PROJECT_BY_ID, variables: { getProjectByIdId: projectId } },
        ],
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
