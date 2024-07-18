import { gql } from "@apollo/client";

export const TOGGLE_FOLLOW = gql`
  mutation FollowUser($followingId: String!) {
    followUser(followingId: $followingId)
  }
`;
