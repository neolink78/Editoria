import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId) {
    id
  }
}
`;
