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
