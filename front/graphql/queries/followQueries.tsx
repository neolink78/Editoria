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

export const GET_FAVORITE_CODERS = gql`
query getFollowings {
  getFollowings {
    following {
      username
      likes {
        createdAt
        project {
          title
          description
          id
          codeSnippetsOwned {
            language
          }
            comments {
            id
            }
            likes {
            id
            }
          owner {
           id
           username
          }
          createdAt
        }
      }
      comments {
        content
        createdAt
        project {
        createdAt
          id
          likes {
          id
          }
          title
          owner {
            id
            username
          }
        }
      }
    }
  }
}
`;