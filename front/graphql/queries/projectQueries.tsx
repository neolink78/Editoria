import { gql } from "@apollo/client";

export const GET_USER_PROJECTS = gql`
  query GetProjectsByUser {
    getOwnProject {
      id
      title
      description
      is_public
      createdAt
      updatedAt
      codeSnippetsOwned {
        id
        title
        code
        language
      }
      comments {
        id
        content
        owner {
          id
        }
        project {
          id
        }
      }
      owner {
        id
        email
        username
      }
      likes {
        id
      }
    }
  }
`;
