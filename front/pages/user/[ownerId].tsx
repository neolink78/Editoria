import Layout from "@/components/layout";
import SubmitButton from "@/lib/submitButton";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Language } from "@/gql/graphql";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { UUID } from "crypto";
import { useAuth } from "@/context/UserContext";

import { TOGGLE_FOLLOW } from "@/graphql/mutations/followMutations";
import { GET_FOLLOWERS } from "@/graphql/queries/followQueries";
import { GET_USER } from "@/graphql/queries/userQueries";
import PictureIcon from "@/icons/pictureIcon";

//TODO: Change location of types definition
export type ProjectType = {
  owner: {
    id: UUID;
    username: string;
  };
  codeSnippetsOwned: Array<{ language: Language }>;
  title: string;
  description: string;
  createdAt: string;
  id: string;
  comments: Array<{
    id: string;
    content: string;
  }>;
  likes: Array<{
    id: string;
  }>;
};

type UserType = {
  username: string;
  description: string;
  image: string;
  projects: ProjectType[];
};

interface FollowerType {
  follower: {
    email: string;
    id: string;
    username: string;
  };
  following: {
    id: string;
    email: string;
    username: string;
  };
}

export default function User() {
  const router = useRouter();
  const { ownerId } = router.query;
  const { user } = useAuth();

  const { data: userDatas, refetch: refetchDatas } = useQuery(GET_USER, {
    variables: { ownerId },
  });

  const { data: followersData, refetch: refetchFollowers } = useQuery(
    GET_FOLLOWERS,
    {
      variables: { followingId: ownerId },
    },
  );

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW, {
    refetchQueries: [
      { query: GET_FOLLOWERS, variables: { followingId: ownerId } },
    ],
  });

  const [isFollowed, setIsFollowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    +(router.query.page as string) || "1",
  );
  const [userData, setUserData] = useState<UserType | null>(null);
  const projectsPerPage = 5;
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setCurrentPage(+(router.query.page as string) || 1);
  }, [router.query.page]);

  useEffect(() => {
    if (userDatas) {
      setUserData(userDatas.getUser);
      setTotalCount(userDatas.getUser.projects.length);
    }
  }, [userDatas]);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const imageUrl = userData?.image;

  useEffect(() => {
    if (followersData && user) {
      const followerId = followersData.getFollowers.find(
        (follower: FollowerType) => follower.follower.id === user.id,
      )?.follower.id;
      const followingId = followersData.getFollowers[0]?.following.id;
      followerId === user.id && followingId === ownerId
        ? setIsFollowed(followerId !== undefined)
        : setIsFollowed(false);
    }
  }, [followersData, user]);

  const handleFollow = async () => {
    try {
      await toggleFollow({ variables: { followingId: ownerId } });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  const paginatedProjects = userData?.projects.slice(
    (+currentPage - 1) * projectsPerPage,
    +currentPage * projectsPerPage,
  );

  return (
    <Layout>
      {userData && (
        <Flex flexDirection="column" align="center" mt="5vw">
          <Flex
            flexDirection="column"
            justify="center"
            align="start"
            width="70%"
          >
            <Flex gap="2vw" justify="center" align="center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile Pic"
                  boxSize="50px"
                  borderRadius="full"
                />
              ) : (
                <PictureIcon />
              )}
              <Box fontSize="2vw">{userData.username}</Box>
              {user?.id !== ownerId && (
                <SubmitButton
                  onClick={user ? handleFollow : () => router.push("/sign-in")}
                >
                  {user && !isFollowed && "Follow me"}
                  {!user && "Please login to follow me"}
                  {user && isFollowed && "Unfollow me"}
                </SubmitButton>
              )}
            </Flex>
            <Box mt="3vw" fontStyle="italic" maxWidth="70vw">
              <Text fontSize="1.5vw">About me</Text>
              {userData.description ||
                "This user has not provided a description yet."}
            </Box>
          </Flex>
          <Box mt="3vw">
            {paginatedProjects &&
              paginatedProjects.length > 0 &&
              `${userData.username}'s projects (${userData.projects.length})`}
            <Box minHeight="25vw">
              {paginatedProjects?.map((project: ProjectType, idx: number) => (
                <Tile
                  homePage
                  ownerId={ownerId as UUID}
                  icon={project.codeSnippetsOwned[0]?.language}
                  key={idx}
                  title={project.title}
                  description={project.description}
                  createdAt={project.createdAt}
                  onOpenProject={() => handleOpenProject(project.id)}
                />
              ))}
            </Box>
            {paginatedProjects && paginatedProjects?.length < 5 && <PaginationControls
              onPageChange={() => handlePageChange}
              currentPage={+currentPage}
              totalItems={totalCount}
              itemsPerPage={projectsPerPage}
              user={ownerId as string}
            />}
          </Box>
        </Flex>
      )}
    </Layout>
  );
}
