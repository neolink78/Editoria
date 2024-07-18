import Layout from "@/components/layout";
import SubmitButton from "@/lib/submitButton";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Language } from "@/gql/graphql";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { UUID } from "crypto";
import { TOGGLE_FOLLOW } from "@/graphql/mutations/followMutations";
import { GET_FOLLOWERS } from "@/graphql/queries/followQueries";
import { useAuth } from "../../context/UserContext";
import { GET_USER } from "@/graphql/queries/userQueries";

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


  const { data: userDatas } = useQuery(GET_USER, {
    variables: { ownerId },
    skip: shouldSkipQueries,
  });

  const { data: followersData, refetch: refetchFollowers } = useQuery(GET_FOLLOWERS, {
    variables: { followingId: ownerId },
    skip: shouldSkipQueries,
  });

  const [toggleFollow] = useMutation(TOGGLE_FOLLOW);
  const [isFollowed, setIsFollowed] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page as string) || "1");
  const [userData, setUserData] = useState<UserType | null>(null);
  const projectsPerPage = 5;
  const indexOfLastProject = Number(currentPage) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, [router.query.page]);

  useEffect(() => {
    userDatas && setUserData(userDatas.getUser);
  }, [userDatas]);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const checkIfFollowed = async () => {
    const { data } = await refetchFollowers();
    const followerId = data?.getFollowers.find(
      (follower: FollowerType) => follower.follower.id === user?.id,
    )?.follower.id;
    const followingId = data?.getFollowers[0]?.following.id;
    if (followerId === user?.id && followingId === ownerId) setIsFollowed(true);
    else setIsFollowed(false);
  };

  useEffect(() => {
    ownerId && checkIfFollowed();
  }, [followersData]);

  const handleFollow = async () => {
    try {
      await toggleFollow({ variables: { followingId: ownerId } });
      checkIfFollowed();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      {userData && (
        <Flex flexDirection="column" align="center" mt="5vw">
          <Box>
            <Flex align="center" gap="2vw">
              <Box fontSize="2vw">{userData.username}</Box>
              {user?.id !== ownerId && (
                <SubmitButton
                  h="2vw"
                  onClick={user ? handleFollow : () => router.push("/sign-in")}
                >
                  {user && !isFollowed && "Follow me"}
                  {!user && "Please login to follow me"}
                  {user && isFollowed && "Unfollow me"}
                </SubmitButton>
              )}
            </Flex>
            {userData.description ||
              "Cet utilisateur n'a pas encore de description.. Peut être un jour ?"}
          </Box>
          <Box mt="3vw">
            {userData.projects?.length > 0 &&
              `${userData.username}'s projects (
              ${userData.projects.length})`}
            <Box minHeight="25vw">
              {userData.projects
                ?.slice(indexOfFirstProject, indexOfLastProject)
                .map((project: ProjectType, idx: number) => (
                  <Tile
                    homePage
                    ownerId={ownerId as UUID}
                    icon={project.codeSnippetsOwned[0]?.language}
                    key={idx}
                    title={project.title}
                    owner={userData.username}
                    description={project.description}
                    createdAt={project.createdAt}
                    onOpenProject={() => handleOpenProject(project.id)}
                  />
                ))}
            </Box>
            <PaginationControls
              currentPage={Number(currentPage)}
              totalItems={userData.projects.length}
              itemsPerPage={5}
              user={ownerId as string}
            />
          </Box>
        </Flex>
      )}
    </Layout>
  );
}
