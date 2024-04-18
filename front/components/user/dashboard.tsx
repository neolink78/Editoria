import { Box, Skeleton, Text } from "@chakra-ui/react";
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


const GET_PROJECTS = gql`
query GetProjects {
  getProjects {
    id
    title
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

export const getLanguageIcon = (language: any) => {
  switch (language) {
    case 'JAVASCRIPT':
      return <SiJavascript />;
    case 'TYPESCRIPT':
      return <SiTypescript />;
    case 'PYTHON':
      return <SiPython />;
    case 'CPP':
      return <SiCplusplus />;
    case 'CSHARP':
      return <SiCsharp />;
    default:
      return <SiJavascript />; // Retourne une icône par défaut si le langage n'est pas géré
  }
};


const Dashboard = () => {
  const { openModal } = useModal();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS);
  const [deleteProject, { loading: deleting, error: deleteError }] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

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

  if (error) return `Erreur! ${error.message}`;


  return (
    <>
      {showAllProjects ? (
        <>
          <DashboardProjects
            projects={data?.getProjects || []}
            onDelete={handleDelete}
            setShowAllProjects={setShowAllProjects}
            isLoading={loading}
          />
        </>
      ) : (
        <>
          <Box
            fontSize="1.4vw"
            m={"4vw 0 0 10vw"}
            alignSelf={"flex-start"}
            display="flex"
            alignItems="baseline"
          >
            <Box>Mes projets récents</Box>
            {data && <Box fontSize="1vw" ml="2vw" onClick={() => setShowAllProjects(true)}>
              <Text cursor="pointer" >Tout voir{" "}</Text>
            </Box>}
          </Box>
          <Box mb={10}>
            {
              data
                ? data.getProjects.slice(-3).map((e, idx) => (
                  <Skeleton isLoaded={!loading}>
                    <Tile
                      homePage={false}
                      key={idx}
                      icon={getLanguageIcon(e.codeSnippetsOwned[0]?.language)}
                      // description={e.description}
                      title={e.title}
                      createdAt={e.createdAt}
                      owner={e.owner.username}
                      onDelete={() => handleDelete(e.id)}
                    />
                  </Skeleton>
                ))
                : <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                  <Box fontSize="0.9vw" m="2vw">
                    {" "}
                    Vous n'avez pas encore de projet.{" "}
                  </Box>
                  <SubmitButton
                    w="13vw"
                    bg="#1574EF"
                    onClick={() => alert("redirecting to IDE...")}
                  >
                    Commencez à coder
                  </SubmitButton>
                </Box>
            }
          </Box>

          <Box
            fontSize="1.4vw"
            m={"2vw 0 0 10vw"}
            alignSelf={"flex-start"}
            display="flex"
            alignItems="baseline"
          >
            Mes projets likés
            {favMocks && <Box fontSize="1vw" ml="2vw">
              {" "}
              Tout voir{" "}
            </Box>}
          </Box>
          <Box mb={12}>
            {favMocks ? favMocks.slice(-2).map((e, idx) => (
              <Skeleton isLoaded={!loading}>
                <Tile
                  homePage
                  key={idx}
                  icon={e.icon}
                  label={e.label}
                  description={e.description}
                  date={e.date}
                />
              </Skeleton>
            )) : <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} my="10" >
              <Box fontSize="0.9vw" m="2vw">
                {" "}
                Vous n'avez pas encore liké de projet.{" "}
              </Box>
              <SubmitButton
                w="11vw"
                bg="#1574EF"
                onClick={() => alert("redirecting to all projects...")}
              >
                Tous les projets
              </SubmitButton>
            </Box>}
          </Box>

          <Box
            fontSize="1.4vw"
            m={"2vw 0 0 10vw"}
            alignSelf={"flex-start"}
            display="flex"
            alignItems="baseline"
          >
            Mes projets en collaboration
            {indexMock && <Box fontSize="1vw" ml="2vw">
              {" "}
              Tout voir{" "}
            </Box>}
          </Box>
          <Box mb={12}>
            {indexMock ? indexMock.slice(-2).map((e, idx) => (
              <Skeleton isLoaded={!loading}>
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
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                <Box fontSize="0.9vw" m="4vw">
                  {" "}
                  Vous n'avez pas encore de projet en collaboration.{" "}
                </Box>
              </Box>
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
            {emptyMocks.length > 0 && <Box fontSize="1vw" ml="2vw">
              {" "}
              Tout voir{" "}
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
              <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                <Box fontSize="0.9vw" m="4vw">
                  {" "}
                  Vous n'avez pas encore de commentaire.{" "}
                </Box>
              </Box>
            }
          </Box>
        </>
      )}
      <ConfirmModal />
    </>
  );
};

export default Dashboard;