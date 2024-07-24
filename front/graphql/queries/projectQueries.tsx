import { gql } from "@apollo/client";

export const GET_USER_PROJECTS = gql`
  query GetOwnProject($offset: Int!, $limit: Int!) {
    getOwnProject(offset: $offset, limit: $limit) {
      projects {
        id
        title
        description
        createdAt
        codeSnippetsOwned {
          id
          language
        }
        comments {
          id
          content
        }
        owner {
          id
          username
        }
        likes {
          id
        }
      }
      totalCount
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects($limit: Int, $offset: Int, $sortBy: String, $search: String) {
    getProjects(offset: $offset, limit: $limit, sortBy: $sortBy, search: $search) {
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

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($getProjectByIdId: ID!) {
    getProjectById(id: $getProjectByIdId) {
      id
      title
      description
      createdAt
      owner {
        id
        username
      }
      likes {
        id
      }
      comments {
        id
        content
        createdAt
      }
      codeSnippetsOwned {
        id
        language
      }
    }
  }
`;
