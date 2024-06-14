import Layout from "@/components/layout";
import SubmitButton from "@/lib/submitButton";
import { gql, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Language } from "@/gql/graphql";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { UUID } from "crypto";

const GET_USER = gql`
  query GetUser($ownerId: ID!) {
    getUser(id: $ownerId) {
      id
      description
      username
      projects {
        id
        codeSnippetsOwned {
          language
        }
        title
        id
        description
        createdAt
      }
    }
  }
`;
export type ProjectType = {
  owner: {
    id: UUID
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
};

type UserType = {
  username: string;
  description: string;
  projects: ProjectType[];
};

export default function User() {
  const router = useRouter();
  const { ownerId } = router.query;
  const { data } = useQuery(GET_USER, {
    variables: { ownerId },
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || "1",
  );
  const [userData, setUserData] = useState<UserType | null>(null);
  const projectsPerPage = 5;
  const indexOfLastProject = Number(currentPage) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, [router.query.page]);
  useEffect(() => {
    data && setUserData(data.getUser);
  }, [data]);

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  return (
    <Layout>
      {userData && (
        <Flex flexDirection="column" align="center" mt="5vw">
          <Box>
            <Flex align="center" gap="2vw">
              <Box fontSize="2vw">{userData.username}</Box>
              <SubmitButton h="2vw">Follow me</SubmitButton>
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
