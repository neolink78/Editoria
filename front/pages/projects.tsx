import Layout from "@/components/layout";
import { gql, useQuery } from "@apollo/client";
import { GetProjectsQuery, Language } from "@/gql/graphql";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/lib/breadCrumb";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { useRouter } from "next/router";
import { UUID } from "crypto";
const GETPROJECTS = gql`
  query GETPROJECTS {
    getProjects {
      codeSnippetsOwned {
        language
      }
      owner {
        username
        id
      }
      createdAt
      description
      title
    }
  }
`;

type projectType = {
  owner: {
    username: string;
    id: UUID;
  };
  codeSnippetsOwned: Array<{ language: Language }>;
  title: string;
  description: string;
  createdAt: string;
};
const Projects = () => {
  const { data } = useQuery<GetProjectsQuery>(GETPROJECTS);

  const router = useRouter();

  const [value, setValue] = useState("");
  const [activePage, setActivePage] = useState("headLined");
  const [filteredProjects, setFilteredProjects] = useState(
    data?.getProjects || []
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || 1
  );
  const handlePageChange = (pageName: string | undefined) => {
    setActivePage(pageName || "dashboard");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    router.push(`?page=${1}`);
  };

  const navigationItems = [
    { label: "Headlined", value: "headLined" },
    { label: "Most recents", value: "mostRecents" },
  ];

  const projectsPerPage = 10;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  useEffect(() => {
    if (data?.getProjects) {
      let filtered = data.getProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(value.toLowerCase()) ||
          project.description.toLowerCase().includes(value.toLowerCase())
      );

      if (activePage === "mostRecents") {
        router.push(`?page=${1}`);
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      setFilteredProjects(filtered);
    }
  }, [value, data, activePage]);

  useEffect(() => {
    setCurrentPage(parseInt(router.query.page as string));
  }, [router.query.page]);

  useEffect(() => {
    setValue("");
  }, [activePage]);

  useEffect(() => {
    router.push(`?page=${1}`);
  }, []);

  return (
    <Layout>
      <Flex
        bg="#14181F"
        color="white"
        mt="7.8vw"
        flexDirection="column"
        alignItems="center"
      >
        <Breadcrumb
          items={navigationItems}
          value={activePage}
          onChange={handlePageChange}
        />
        <Input
          borderRadius="2vw"
          mt="2vw"
          bgColor="white"
          color="black"
          width="25vw"
          border="solid 1px white"
          placeholder={"search values"}
          value={value}
          onChange={handleSearchChange}
          fontSize="1.2vw"
          name="searchBar"
        />
        {activePage === "headLined" && (
          <Box>
            <Box minHeight="52vw">
              {filteredProjects
                .slice(indexOfFirstProject, indexOfLastProject)
                .map((project, idx) => (
                  <Tile
                    homePage
                    ownerId={project.owner.id as UUID}
                    icon={project.codeSnippetsOwned[0]?.language}
                    key={idx}
                    title={project.title}
                    owner={project.owner.username}
                    description={project.description}
                    createdAt={project.createdAt}
                  />
                ))}
            </Box>
            <PaginationControls
              currentPage={currentPage}
              totalItems={filteredProjects?.length}
              itemsPerPage={10}
            />
          </Box>
        )}
        {activePage === "mostRecents" && (
          <Box>
            <Box minHeight="52vw">
              {filteredProjects
                .slice(indexOfFirstProject, indexOfLastProject)
                .map((project, idx) => (
                  <Tile
                    homePage
                    ownerId={project.owner.id as UUID}
                    title={project.title}
                    icon={project.codeSnippetsOwned[0]?.language}
                    key={idx}
                    owner={project.owner.username}
                    description={project.description}
                    createdAt={project.createdAt}
                  />
                ))}
            </Box>
            <PaginationControls
              currentPage={currentPage}
              totalItems={filteredProjects?.length}
              itemsPerPage={10}
            />
          </Box>
        )}
      </Flex>
    </Layout>
  );
};

export default Projects;
