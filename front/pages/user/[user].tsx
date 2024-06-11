import Layout from "@/components/layout";
import SubmitButton from "@/lib/submitButton";
import { gql, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Language } from "@/gql/graphql";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";

const GET_USER = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      description
      username
    }
    getProjects {
      description
      codeSnippetsOwned {
        language
      }
      title
      createdAt
    }
  }
`;
type projectType = {
  owner: {
    username: string;
  };
  codeSnippetsOwned: Array<{ language: Language }>;
  title: string;
  description: string;
  createdAt: string;
};

export default function User() {
  const router = useRouter();
  const { user } = router.query;
  const { data } = useQuery(GET_USER, {
    variables: { username: user },
  });
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || "1"
  );
  const projectsPerPage = 5;
  const indexOfLastProject = Number(currentPage) * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, [router.query.page]);

  return (
    <Layout>
      {data && (
        <Flex flexDirection="column" align="center" mt="5vw">
          <Box>
            <Flex align="center" gap="2vw">
              <Box fontSize="2vw">{data?.getUserByUsername.username}</Box>
              <SubmitButton h="2vw">Follow me</SubmitButton>
            </Flex>
            {data.getUserByUsername.description ||
              "Cet utilisateur n'a pas encore de description.. Peut être un jour ?"}
          </Box>
          <Box mt="3vw">
            {data?.getUserByUsername.username}&rsquo;s projects (
            {data.getProjects.length})
            <Box minHeight="25vw">
              {data.getProjects
                .slice(indexOfFirstProject, indexOfLastProject)
                .map((project: projectType, idx: number) => (
                  <Tile
                    homePage
                    icon={project.codeSnippetsOwned[0]?.language}
                    key={idx}
                    title={project.title}
                    owner={data.getUserByUsername.username}
                    description={project.description}
                    createdAt={project.createdAt}
                  />
                ))}
            </Box>
            <PaginationControls
              currentPage={Number(currentPage)}
              totalItems={data.getProjects?.length}
              itemsPerPage={5}
              user={user as string}
            />
          </Box>
        </Flex>
      )}
    </Layout>
  );
}
