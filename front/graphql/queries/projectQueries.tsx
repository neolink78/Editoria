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
  query GetProjects($offset: Int!, $limit: Int!) {
    getProjects(offset: $offset, limit: $limit) {
      projects {
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
        createdAt
        comments {
          id
        }
      }
      totalCount
    }
  }
`;
