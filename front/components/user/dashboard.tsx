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
import { getLanguageIcon } from "@/utils/languageIcons";
import { useRouter } from "next/router";
import { GET_USER_PROJECTS } from "@/graphql/queries/projectQueries";
import { DELETE_PROJECT } from "@/graphql/mutations/projectMutations";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { GET_LIKED_PROJECTS } from "@/graphql/queries/likeQueries";
import { TOGGLE_LIKE } from "@/graphql/mutations/likeMutations";
import { GetOwnCommentsQuery, GetProjectsByUserQuery, LikedProjectsQuery, ToggleLikeMutation, ToggleLikeMutationVariables } from "@/gql/graphql";

// TODO : Unicité des like (j'ai réussi a like un projet deux fois...)
// TODO : Creer page pour likedprojects (sur clic de Toutvoir)

const Dashboard = () => {
  const { openModal } = useModal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const { data: projectData, loading, error } = useQuery<GetProjectsByUserQuery>(GET_USER_PROJECTS);
  const projects = projectData?.getOwnProject || [];
  const { data: commentData } = useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const comments = commentData?.getOwnComments || [];
  const { data: likedProjectsData } = useQuery<LikedProjectsQuery>(GET_LIKED_PROJECTS);
  const likedProjects = likedProjectsData?.likedProjects || [];
  const [toggleLike, { loading: toggleLikeLoading }] = useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(TOGGLE_LIKE, {
    refetchQueries: [{ query: GET_LIKED_PROJECTS }, { query: GET_USER_PROJECTS }],
  });
  const [deleteProject, { loading: deleting, error: deleteError }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_USER_PROJECTS }],
  });

  const router = useRouter()

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

  const newUser = projects.length === 0
  const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);


  if (error) return (<Error />);
  if (loading) return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="78.8vw" mt="40px">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Box key={idx} width="100%" mb="10px">
          <Skeleton height="56px" width="100%" borderRadius="30px"/>
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
              toggleLike={toggleLike}
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
              {projectData && projects.length > 3 &&
                <Box fontSize="1vw" ml="2vw" onClick={() => setShowAllProjects(true)}>
                  <Text cursor="pointer" >Tout voir</Text>
                </Box>}
            </Flex>
            <Box mb={10}>
              {loading ? (
                <Flex flexDirection="column" justifyContent="center" alignItems="center" width="78.8vw">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Box key={idx} width="100%" mb="10px">
                      <Skeleton height="56px" width="100%" />
                    </Box>
                  ))}
                </Flex>
              ) : (
                sortedProjects.slice(-3).map((e, idx) => (
                  <Tile
                    homePage={false}
                    key={e.id}
                    icon={e.codeSnippetsOwned[0]?.language}
                    title={e.title}
                    description={e.description}
                    createdAt={e.createdAt}
                    owner={e.owner.username}
                    commentCount={e?.comments.length}
                    onDelete={() => handleDelete(e.id)}
                    likeCount={e.likes.length}
                    toggleLike={() => {
                      toggleLike({ variables: { projectId: e.id } });
                    }}
                  />
                ))
              )}
              {projectData && projects.length === 0 && (
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
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
              {likedProjects && likedProjects.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>}
            </Box>
            <Box mb={12}>
              {likedProjects ? likedProjects.slice(-3).map((e, idx) => (
                <Skeleton isLoaded={!loading} key={idx}>
                  <Tile
                    homePage
                    icon = {e.codeSnippetsOwned[0]?.language}
                    key={idx}
                    title={e.title}
                    description={e.description}
                    likeCount={e.likes.length}
                    content
                    toggleLike={() => {
                      console.log("Toggle like button clicked for project ID:", e.id);
                      toggleLike({ variables: { projectId: e.id } });
                    }}
                  />
                </Skeleton>

              )) :
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
                </Flex>}
            </Box>

            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              Mes projets en collaboration
              {/* {indexMock && indexMock.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>} */}
            </Box>
            <Box mb={12}>
              {/* {indexMock ? indexMock.slice(-2).map((e, idx) => (
                <Skeleton isLoaded={!loading} key={idx}>
                  <Tile
                    homePage
                    key={idx}
                    icon={e.icon}
                    label={e.label}
                    description={e.description}
                    date={e.date}
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
              } */}
            </Box>
            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              Mes derniers commentaires
              {comments.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>}
            </Box>
            <Box mb={12}>
              {commentData && comments.length > 0 ? comments.map((e, idx) => (
                <Tile
                  homePage
                  key={idx}
                  title={e.project.title}
                  description={e.content}
                  content
                />
              )) :
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box fontSize="0.9vw" m="4vw">
                    {" "}
                    Vous n&apos;avez pas encore de commentaire.{" "}
                  </Box>
                </Flex>
              }
            </Box>
          </>
        )}
        <ConfirmModal />
      </>
    )) || (
      <NewUser />
    )
  );
};

export default Dashboard;