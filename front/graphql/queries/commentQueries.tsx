import { gql } from "@apollo/client";

export const GET_OWN_COMMENTS = gql`
  query GetOwnComments {
    getOwnComments {
      id
      content
      project {
        id
        title
      }
      owner {
        id
        username
      }
    }
  }
`;
