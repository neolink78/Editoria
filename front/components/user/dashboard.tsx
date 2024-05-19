import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import ArrowLeftIcon from "../../icons/arrowLeftIcon";
import indexMock from "../../mocks/indexMock";
import Tile from "../../lib/tile";
import emptyMocks from "../../mocks/emptyMocks";
import favMocks from "../../mocks/favMocks";
import SubmitButton from "../../lib/submitButton";
import modal from "../../lib/modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GetProjectsQuery } from "../../gql/graphql";

import { SiJavascript, SiTypescript, SiPython, SiCplusplus, SiCsharp } from 'react-icons/si';
import { useState } from "react";
import ConfirmModal from "../../lib/modal";
import DashboardProjects from "./dashboardProjects";
import { useModal } from "../../context/ModalContext";
import { NewUser } from "./newUser";
import { Error } from "../../lib/error";
import { getLanguageIcon } from "@/utils/languageIcons";
import Router, { useRouter } from "next/router";


const GET_PROJECTS = gql`
query GetProjects {
  getProjects {
    id
    title
    description
    updatedAt
    createdAt
    codeSnippetsOwned {
      language
    }
    owner {
      username
    }
  }
}
`;

export const DELETE_PROJECT = gql`
mutation DeleteProject($deleteProjectId: ID!) {
  deleteProject(id: $deleteProjectId) {
    id
  }
}
`;


const Dashboard = () => {
  const { openModal } = useModal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS);
  const projects = data?.getProjects || [];
  const [deleteProject, { loading: deleting, error: deleteError }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
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

  const newUser = projects.length === 0 && indexMock.length === 0 && emptyMocks.length === 0 && favMocks.length === 0;
  const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);


  if (error) return (<Error />);

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
              {data && projects.length > 3 &&
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
                    icon={getLanguageIcon(e.codeSnippetsOwned[0]?.language)}
                    title={e.title}
                    description={e.description}
                    createdAt={e.createdAt}
                    owner={e.owner.username}
                    onDelete={() => handleDelete(e.id)}
                  />
                ))
              )}
              {data && projects.length === 0 && (
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
              {favMocks && favMocks.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>}
            </Box>
            <Box mb={12}>
              {favMocks ? favMocks.slice(-2).map((e, idx) => (
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
            </Box>
            <Box
              fontSize="1.4vw"
              m={"2vw 0 0 10vw"}
              alignSelf={"flex-start"}
              display="flex"
              alignItems="baseline"
            >
              Mes derniers commentaires
              {emptyMocks.length > 3 && <Box fontSize="1vw" ml="2vw">
                Tout voir
              </Box>}
            </Box>
            <Box mb={12}>
              {emptyMocks.length > 0
                ? emptyMocks.slice(-2).map((e, idx) => (
                  <Tile
                    homePage
                    key={idx}
                    marginTop={e.marginTop}
                    icon={e.icon}
                    label={e.label}
                    description={e.description}
                    date={e.date}
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