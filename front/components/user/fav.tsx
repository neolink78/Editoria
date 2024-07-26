import { gql, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { GetFollowingsQuery, GetUsersQuery } from "../../gql/graphql";
import Tile from "../../lib/tile";
import { GET_FAVORITE_CODERS } from "@/graphql/queries/followQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { useLikes } from "@/context/LikeContext";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { GetOwnCommentsQuery } from "@/gql/graphql";

type ProjectType = {
  createdAt: Date;
  id: string;
  title: string;
  description?: string;
  codeSnippetOwned?: {
    language?: string;
  };
  owner: {
    id: string;
    username: string;
  };
};

type AllEntriesType = {
  content?: string;
  createdAt: Date;
  type: "comment" | "like";
  username: string;
  project: ProjectType[];
};

interface Entry {
  createdAt: string | Date;
}

const Fav = (user: any) => {
  const { data } = useQuery<GetFollowingsQuery>(GET_FAVORITE_CODERS);
  const [followedUsers, setFollowedUsers] = useState<any>([]);
  const router = useRouter();
  const { handleToggleLike, likedProjects, refetchProjects } = useLikes();
  const { data: ownCommentsData, loading: commentLoading } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const ownComments =
    ownCommentsData?.getOwnComments
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) || [];

  const getfollowedActivities = () => {
    let allEntries: AllEntriesType[] = [];
    data &&
      data.getFollowings.forEach((following) => {
        console.log(following.following.comments);
        const comments = following.following.comments || [];
        const likes = following.following.likes || [];
        const username = following.following.username;

        comments.forEach((comment: any) => {
          allEntries.push({
            ...comment,
            type: "comment",
            username: username,
          });
        });

        likes.forEach((like: any) => {
          allEntries.push({
            ...like,
            type: "like",
            username: username,
          });
        });
      });
    allEntries.sort((a: Entry, b: Entry) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setFollowedUsers(allEntries);
  };

  useEffect(() => {
    data && getfollowedActivities();
  }, [data]);

  return (
    <Box mb="5vw">
      {followedUsers &&
        followedUsers.map((followedUser: any, idx: number) => {
          return (
            <Box key={idx} py="1vw">
              <Flex
                fontSize="1.4vw"
                m="4vw 0 0 10vw"
                alignSelf="flex-start"
                alignItems="baseline"
              >
                {followedUser.username} a{" "}
                {followedUser.type === "like" ? "liké " : "commenté "}{" "}
                {formatDistanceToNow(parseISO(followedUser.createdAt), {
                  addSuffix: true,
                  locale: fr,
                })}
              </Flex>
              {followedUser.type === "like" ? (
                <Tile
                  key={idx}
                  projectId={followedUser.project.id}
                  ownerId={followedUser.project.owner.id}
                  owner={followedUser.project.owner.username}
                  icon={followedUser.project.codeSnippetsOwned[0]?.language}
                  title={followedUser.project.title}
                  description={followedUser.project.description}
                  createdAt={followedUser.project.createdAt}
                  likeCount={followedUser.project?.likes?.length}
                  commentCount={followedUser.project?.comments?.length}
                  toggleLike={() => {
                    handleToggleLike(followedUser.project.id);
                  }}
                  isLiked={
                    likedProjects && likedProjects.some((p) => p.id === user.id)
                  }
                  isCommented={
                    ownComments &&
                    ownComments.some((c) => c.project.id === user.id)
                  }
                  onOpenProject={() =>
                    router.push(`/editor?project=${followedUser.project.id}`)
                  }
                />
              ) : (
                <Tile
                  isFav
                  key={idx}
                  projectId={followedUser.project.id}
                  title={followedUser.project.title}
                  date={new Date(followedUser.createdAt).toLocaleDateString()}
                  owner={followedUser.project.owner.username}
                  content={true}
                  ownerId={followedUser.project.owner.id}
                  description={followedUser.content}
                  onOpenProject={() =>
                    router.push(`/editor?project=${followedUser.project.id}`)
                  }
                  createdAt={followedUser.project.createdAt}
                />
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default Fav;
