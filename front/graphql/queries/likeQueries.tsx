import { gql } from "@apollo/client";

export const GET_LIKED_PROJECTS = gql`
  query LikedProjects {
    likedProjects {
      id
      title
      description
      owner {
        id
        username
      }
      likes {
        id
      }
      codeSnippetsOwned {
        id
        language
      }
    }
  }
`;
