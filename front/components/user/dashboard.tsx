import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import Tile from "../../lib/tile";
import SubmitButton from "../../lib/submitButton";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ConfirmModal from "../../lib/modal";
import DashboardProjects from "./dashboardProjects";
import { useModal } from "../../context/ModalContext";
import { NewUser } from "./newUser";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import { GET_USER_PROJECTS } from "@/graphql/queries/projectQueries";
import { DELETE_PROJECT } from "@/graphql/mutations/projectMutations";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { GetOwnCommentsQuery, GetOwnProjectQuery } from "@/gql/graphql";
import { useLikes } from "@/context/LikeContext";
import { useAuth } from "@/context/UserContext";
import CommentCard from "@/lib/commentCard";

const Dashboard = () => {
  const { openModal } = useModal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);

  const {
    data: projectData,
    loading,
    error,
  } = useQuery<GetOwnProjectQuery>(GET_USER_PROJECTS, {
    variables: { limit: 8, offset: (currentPage - 1) * 8 },
    fetchPolicy: "network-only",
  });
  const projects = projectData?.getOwnProject.projects || [];
  const sampleProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);
  const totalItems = projectData?.getOwnProject.totalCount || 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data: ownCommentsData, loading: commentLoading } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);

  const ownComments =
    ownCommentsData?.getOwnComments
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) || [];

  const { handleToggleLike, likedProjects, refetchProjects } = useLikes();
  // console.log("likedProjects", likedProjects);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      { query: GET_USER_PROJECTS, variables: { limit: null, offset: null } },
    ],
  });

  const { currentUserData } = useAuth();
  const currentUserId = currentUserData?.myProfile.id;

  const router = useRouter();

  const handleOpenProject = (projectId: string, commentId?: string) => {
    const url = commentId
      ? `/editor?project=${projectId}&comment=${commentId}`
      : `/editor?project=${projectId}`;
    router.push(url);
  };

  const handleDelete = (projectId: string) => {
    setSelectedProjectId(projectId);
    openModal({
      title: "Delete project",
      children: "Are you sure you want to delete this project",
      onConfirm: () => confirmDelete(projectId),
    });
  };

  const confirmDelete = async (projectId: string) => {
    await deleteProject({ variables: { deleteProjectId: projectId } });
  };

  const handleShowLikeCount = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.likes.length;
  };

  const newUser = (
    (projects ?? []).length === 0 &&
    (ownComments ?? []).length === 0 &&
    (likedProjects ?? []).length === 0
  );

  const handleShowMore = () => {
    setVisibleCommentsCount((prevCount) =>
      Math.min(prevCount + 5, ownComments.length),
    );
  };

  const handleShowLess = () => {
    setVisibleCommentsCount(5);
  };

  if (error) {
    console.log("error", error);
  }
  if (loading || commentLoading)
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="70vw"
        my="50px"
      >
        {Array.from({ length: 10 }).map((_, idx) => (
          <Box key={idx} width="100%" mb="10px">
            <Skeleton height="46px" width="100%" borderRadius="30px" />
          </Box>
        ))}
      </Flex>
    );

  return (
    (!newUser && (
      <>
        {showAllProjects ? (
          <>
            <DashboardProjects
              projects={projects || []}
              onDelete={handleDelete}
              setShowAllProjects={setShowAllProjects}
              isLoading={loading}
              ownComments={ownComments}
              totalItems={totalItems}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              canDelete={currentUserId}
            />
          </>
        ) : (
          <>
            <Flex
              fontSize="1.4vw"
              m="4vw 0 0 10vw"
              alignSelf="flex-start"
              alignItems="baseline"
            >
              <Box>My recent projects</Box>
              {projectData && projects.length > 3 && (
                <Box
                  fontSize="1vw"
                  ml="2vw"
                  onClick={() => setShowAllProjects(true)}
                >
                  <Text cursor="pointer">Show more</Text>
                </Box>
              )}
            </Flex>
            <Box mb={10}>
              {loading ? (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="78.8vw"
                >
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Box key={idx} width="100%" mb="10px">
                      <Skeleton height="56px" width="100%" />
                    </Box>
                  ))}
                </Flex>
              ) : (
                sampleProjects.map((e) => (
                  <Tile
                    homePage={false}
                    projectId={e.id}
                    key={e.id}
                    icon={e.codeSnippetsOwned[0]?.language}
                    title={e.title}
                    description={e.description}
                    createdAt={e.createdAt}
                    commentCount={e?.comments.length}
                    onDelete={() => handleDelete(e.id)}
                    canDelete={currentUserId === e.owner.id}
                    ownerId={e.owner.id as UUID}
                    likeCount={handleShowLikeCount(e.id)}
                    toggleLike={() => {
                      handleToggleLike(e.id);
                    }}
                    isLiked={
                      likedProjects && likedProjects.some((p) => p.id === e.id)
                    }
                    isCommented={
                      ownComments &&
                      ownComments.some((c) => c.project.id === e.id)
                    }
                    onOpenProject={() => handleOpenProject(e.id)}
                  />
                ))
              )}
              {projectData && projects.length === 0 && (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box fontSize="0.9vw" m="2vw">
                    You don't have any projects yet
                  </Box>
                  <SubmitButton
                    bg="#1574EF"
                    onClick={() => router.push("/editor")}
                  >
                    Get started
                  </SubmitButton>
                </Box>
              )}
            </Box>

            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              My recent likes
              {likedProjects && likedProjects.length > 3 && (
                <Box fontSize="1vw" ml="2vw">
                  Show more
                </Box>
              )}
            </Box>
            <Box mb={12}>
              {likedProjects && likedProjects.length > 0 ? (
                likedProjects.slice(-3).map((e, idx) => (
                  <Skeleton isLoaded={!loading} key={idx}>
                    <Tile
                      ownerId={e.owner.id as UUID}
                      projectId={e.id}
                      homePage
                      key={idx}
                      icon={e.codeSnippetsOwned[0]?.language}
                      title={e.title}
                      description={e.description}
                      createdAt={e.createdAt}
                      owner={e.owner.username}
                      likeCount={e.likes.length}
                      commentCount={e.comments.length}
                      toggleLike={() => {
                        handleToggleLike(e.id);
                      }}
                      onDelete={() => handleDelete(e.id)}
                      canDelete={currentUserId === e.owner.id}
                      isLiked
                      isCommented={
                        ownComments &&
                        ownComments.some((c) => c.project.id === e.id)
                      }
                      onOpenProject={() => handleOpenProject(e.id)}
                    />
                  </Skeleton>
                ))
              ) : (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  my="10"
                >
                  <Box fontSize="0.9vw" m="2vw">
                    You haven't liked any projects yet
                  </Box>
                  <SubmitButton
                    bg="#1574EF"
                    onClick={() => router.push("/projects")}
                  >
                    Explore projects
                  </SubmitButton>
                </Flex>
              )}
            </Box>
            <Box
              fontSize={{
                base: "1rem",
                sm: "0.8rem",
                md: "1.2rem",
                lg: "1.4rem",
              }}
              m={"2vw 0 1rem 10vw"}
              display="flex"
              alignItems="baseline"
              alignSelf="flex-start"
            >
              My recent comments
            </Box>
            <Box mb="12" w="100%" px="10rem">
              {ownCommentsData && ownComments.length > 0 ? (
                <>
                  <Flex gap="16px" flexWrap="wrap">
                    {ownComments
                      .slice(0, visibleCommentsCount)
                      .map((e, idx) => (
                        <CommentCard
                          key={e.id}
                          title={e.project.title}
                          date={new Date(e.createdAt).toLocaleDateString()}
                          owner={e.owner.username}
                          content={e.content}
                          onOpenProject={() =>
                            handleOpenProject(e.project.id, e.id)
                          }
                        />
                      ))}
                  </Flex>
                  <Flex justifyContent="center" mt="4" width="100%">
                    {visibleCommentsCount < ownComments.length && (
                      <Text
                        onClick={handleShowMore}
                        mt="4"
                        fontSize="1rem"
                        cursor="pointer"
                        color="gray.500"
                        _hover={{ color: "blue.500" }}
                        mx="2"
                      >
                        Show more
                      </Text>
                    )}
                    {visibleCommentsCount === ownComments.length && (
                      <Text
                        onClick={handleShowLess}
                        mt="4"
                        fontSize="1rem"
                        cursor="pointer"
                        color="gray.500"
                        _hover={{ color: "blue.500" }}
                        mx="2"
                      >
                        Show less
                      </Text>
                    )}
                  </Flex>
                </>
              ) : (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box fontSize="0.9vw" m="4vw">
                    You haven't commented on any projects yet
                  </Box>
                </Flex>
              )}
            </Box>
          </>
        )}
        <ConfirmModal />
      </>
    )) || <NewUser />
  );
};

export default Dashboard;
