import Layout from "@/components/layout";
import { gql, useQuery } from "@apollo/client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/lib/breadCrumb";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import { GET_PROJECTS } from "@/graphql/queries/projectQueries";
import { GetProjectsQuery } from "@/gql/graphql";

const SEARCH_PROJECTS = gql`
  query SearchProjects($query: String!) {
    searchProjects(query: $query) {
      owner {
        username
        email
      }
      title
    }
  }
`;

const Projects = () => {
  const { data: getProjectsData } = useQuery<GetProjectsQuery>(GET_PROJECTS);
  const { data: searchProjectsData, refetch } = useQuery(SEARCH_PROJECTS, {
    variables: { query: "" },
  });
  const router = useRouter();

  const [value, setValue] = useState("");
  const [activePage, setActivePage] = useState("headLined");
  const [filteredProjects, setFilteredProjects] = useState(
    getProjectsData?.getProjects || [],
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || 1,
  );

  const handlePageChange = (pageName: string | undefined) => {
    setActivePage(pageName || "dashboard");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    router.push(`?page=${1}`);
    refetch({ query: e.target.value });
  };

  const navigationItems = [
    { label: "Headlined", value: "headLined" },
    { label: "Most recents", value: "mostRecents" },
  ];

  const projectsPerPage = 10;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  useEffect(() => {
    if (value.trim() === "") {
      setFilteredProjects(getProjectsData?.getProjects || []);
      return;
    }

    if (searchProjectsData?.searchProjects) {
      setFilteredProjects(searchProjectsData.searchProjects);
    }
  }, [searchProjectsData, getProjectsData, value]);

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
                    onOpenProject={() => router.push(`/project/${project.id}`)}
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
                    key={idx}
                    ownerId={project.owner.id as UUID}
                    title={project.title}
                    icon={project.codeSnippetsOwned[0]?.language}
                    owner={project.owner.username}
                    description={project.description}
                    createdAt={project.createdAt}
                    onOpenProject={() => router.push(`/project/${project.id}`)}
                    homePage
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
