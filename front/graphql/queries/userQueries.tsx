import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($ownerId: ID!) {
    getUser(id: $ownerId) {
      id
      description
      username
      image
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
