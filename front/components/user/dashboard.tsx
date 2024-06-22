import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
// import indexMock from "../../mocks/indexMock";
import Tile from "../../lib/tile";
import SubmitButton from "../../lib/submitButton";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import ConfirmModal from "../../lib/modal";
import DashboardProjects from "./dashboardProjects";
import { useModal } from "../../context/ModalContext";
import { NewUser } from "./newUser";
import { Error } from "../../lib/error";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import { GET_USER_PROJECTS } from "@/graphql/queries/projectQueries";
import { DELETE_PROJECT } from "@/graphql/mutations/projectMutations";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { GetOwnCommentsQuery, GetOwnProjectQuery } from "@/gql/graphql";
import { useLikes } from "@/context/LikeContext";

// TODO : Unicité des like (j'ai réussi a like un projet deux fois...)
// TODO : Creer page pour likedprojects (sur clic de Toutvoir)
// TODO : Creer context pour comments et projects

// TODO : IN DASHBOARD , DASHBOARDPROJECTS , HOMEPAGE AND ALLPROJECTS THE LIKE COUNT IS NOT DECREASING

const Dashboard = () => {
  const { openModal } = useModal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: projectData,
    loading,
    error,
  } = useQuery<GetOwnProjectQuery>(GET_USER_PROJECTS, {
    variables: { limit: 8, offset: (currentPage - 1) * 8 },
    fetchPolicy: "network-only",
  });
  const projects = projectData?.getOwnProject.projects || [];
  // console.log("projects", projects);
  const totalItems = projectData?.getOwnProject.totalCount || 0;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data: ownCommentsData, loading: commentLoading } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const ownComments = ownCommentsData?.getOwnComments || [];

  const { handleToggleLike, likedProjects, refetchProjects } = useLikes();
  // console.log("likedProjects", likedProjects);

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_USER_PROJECTS }],
  });

  const router = useRouter();

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const handleDelete = (projectId: string) => {
    setSelectedProjectId(projectId);
    openModal({
      title: "Confirmer la suppression",
      children: "Êtes-vous sûr de vouloir supprimer ce projet ?",
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

  const newUser =
    !projects &&
    !ownComments &&
    !likedProjects

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
        mt="50px"
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
              <Box>Mes projets récents</Box>
              {projectData && projects.length > 3 && (
                <Box
                  fontSize="1vw"
                  ml="2vw"
                  onClick={() => setShowAllProjects(true)}
                >
                  <Text cursor="pointer">Tout voir</Text>
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
                projects.slice(-3).map((e, idx) => (
                  <Tile
                    homePage={false}
                    projectId={e.id}
                    key={idx}
                    icon={e.codeSnippetsOwned[0]?.language}
                    title={e.title}
                    description={e.description}
                    createdAt={e.createdAt}
                    commentCount={e?.comments.length}
                    onDelete={() => handleDelete(e.id)}
                    ownerId={e.owner.id as UUID}
                    likeCount={handleShowLikeCount(e.id)}
                    toggleLike={() => {
                      handleToggleLike(e.id);
                    }}
                    isLiked={likedProjects.some((p) => p.id === e.id)}
                    isCommented={ownComments.some((c) => c.project.id === e.id)}
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
                    Vous n&apos;avez pas encore de projet.
                  </Box>
                  <SubmitButton
                    w="13vw"
                    bg="#1574EF"
                    onClick={() => router.push("/editor")}
                  >
                    Commencez à coder
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
              Mes projets likés
              {likedProjects && likedProjects.length > 3 && (
                <Box fontSize="1vw" ml="2vw">
                  Tout voir
                </Box>
              )}
            </Box>
            <Box mb={12}>
              {likedProjects ? (
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
                      isLiked
                      isCommented={ownComments.some(
                        (c) => c.project.id === e.id,
                      )}
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
                    Vous n&apos;avez pas encore liké de projet.
                  </Box>
                  <SubmitButton
                    w="11vw"
                    bg="#1574EF"
                    onClick={() => router.push("/projects")}
                  >
                    Tous les projets
                  </SubmitButton>
                </Flex>
              )}
            </Box>
            {/* 
            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              Mes projets en collaboration
              {indexMock && indexMock.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>}
            </Box>
            <Box mb={12}>
              {indexMock ? indexMock.slice(-2).map((e, idx) => (
                <Skeleton isLoaded={!loading} key={idx}>
                  <Tile
                    homePage
                    key={idx}
                    icon={e.icon}
                    label={e.label}
                    description={e.description}
                    date={e.date}
                    ownerId={e.owner.id as UUID}

                  />
                </Skeleton>
              )) :
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box fontSize="0.9vw" m="4vw">
                    {" "}
                    Vous n&apos;avez pas encore de projet en collaboration.{" "}
                  </Box>
                </Flex>
              }
            </Box> */}
            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              Mes derniers commentaires
              {ownComments.length > 3 && (
                <Box fontSize="1vw" ml="2vw">
                  Tout voir
                </Box>
              )}
            </Box>
            <Box mb={12}>
              {ownCommentsData && ownComments.length > 0 ? (
                ownComments
                  .slice(-3)
                  .map((e, idx) => (
                    <Tile
                      homePage
                      ownerId={e.owner.id as UUID}
                      key={idx}
                      title={e.project.title}
                      description={e.content}
                      content
                      onOpenProject={() => handleOpenProject(e.project.id)}
                    />
                  ))
              ) : (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box fontSize="0.9vw" m="4vw">
                    Vous n&apos;avez pas encore de commentaire.
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
