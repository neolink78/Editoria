import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
mutation ToggleLike($projectId: String!) {
  toggleLike(projectId: $projectId)
}
`;