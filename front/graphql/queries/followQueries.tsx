import { gql } from "@apollo/client";

export const GET_FOLLOWERS = gql`
  query getFollowers($followingId: String!) {
    getFollowers(followingId: $followingId) {
      follower {
        email
        id
        username
      }
      following {
        id
        email
        username
      }
    }
  }
`;
