import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($ownerId: ID!) {
    getUser(id: $ownerId) {
      id
      description
      username
      projects {
        id
        codeSnippetsOwned {
          language
        }
        title
        id
        description
        createdAt
      }
    }
  }
`;
