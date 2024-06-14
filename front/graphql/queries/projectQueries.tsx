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

export const GET_PROJECTS = gql`
query GetProjects {
    getProjects {
      id
      owner {
        id
        email
        username
      }
      createdAt
      title
      description
      comments {
        id
        content
      }
      codeSnippetsOwned {
        id
        language
    }
  }
}
`;

