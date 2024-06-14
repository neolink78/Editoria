import Layout from "@/components/layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/lib/breadCrumb";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import {
  GET_PROJECTS,
  GET_USER_PROJECTS,
} from "@/graphql/queries/projectQueries";
import {
  GetProjectsQuery,
  LikedProjectsQuery,
  ToggleLikeMutation,
  ToggleLikeMutationVariables,
} from "@/gql/graphql";
import { TOGGLE_LIKE } from "@/graphql/mutations/likeMutations";
import { GET_LIKED_PROJECTS } from "@/graphql/queries/likeQueries";

const Projects = () => {
  const { data } = useQuery<GetProjectsQuery>(GET_PROJECTS);

  const router = useRouter();

  const [toggleLike] = useMutation<
    ToggleLikeMutation,
    ToggleLikeMutationVariables
  >(TOGGLE_LIKE, {
    refetchQueries: [
      { query: GET_LIKED_PROJECTS },
      { query: GET_USER_PROJECTS },
    ],
  });
  const { data: likedProjectsData } =
    useQuery<LikedProjectsQuery>(GET_LIKED_PROJECTS);
  const likedProjects = likedProjectsData?.likedProjects || [];

  const [value, setValue] = useState("");
  const [activePage, setActivePage] = useState("headLined");
  const [filteredProjects, setFilteredProjects] = useState(
    data?.getProjects || [],
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
          project.description.toLowerCase().includes(value.toLowerCase()),
      );

      if (activePage === "mostRecents") {
        router.push(`?page=${1}`);
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

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
                    toggleLike={() => {
                      console.log(
                        "Toggle like button clicked for project ID:",
                        project.id,
                      );
                      toggleLike({ variables: { projectId: project.id } });
                    }}
                    isLiked={likedProjects.some((p) => p.id === project.id)}
                    likeCount={project.likes.length}
                    commentCount={project.comments.length}
                    onOpenProject={() => handleOpenProject(project.id)}
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
                    likeCount={project.likes.length}
                    toggleLike={() => {
                      console.log(
                        "Toggle like button clicked for project ID:",
                        project.id,
                      );
                      toggleLike({ variables: { projectId: project.id } });
                    }}
                    isLiked={likedProjects.some((p) => p.id === project.id)}
                    commentCount={project.comments.length}
                    onOpenProject={() => handleOpenProject(project.id)}
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
