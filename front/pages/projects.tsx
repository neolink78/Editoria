import Layout from "@/components/layout";
import { useQuery } from "@apollo/client";
import { Box, Flex, Input, Skeleton, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Breadcrumb from "@/lib/breadCrumb";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import {
  GET_PROJECTS,
} from "@/graphql/queries/projectQueries";
import {
  GetOwnCommentsQuery,
  GetProjectsQuery,
} from "@/gql/graphql";
import { useLikes } from "@/context/LikeContext";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { Error } from "@/lib/error";
import SubmitButton from "@/lib/submitButton";

const Projects = () => {
  const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS);

  const router = useRouter();

  const { handleToggleLike, likedProjects } = useLikes()

  const { data: ownCommentsData } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const ownComments = ownCommentsData?.getOwnComments || [];

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

  if (error) return <Error />;
  if (loading)
    return (
      <Layout>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" mt="20vh">

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
        </Flex>
      </Layout >
    );

  if (data?.getProjects.length === 0) {
    return (
      <Layout>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" mt="20vh">
          <Box fontSize="2vw" color="white" mt="10vw" mb="2vw">
            <Text>
              No projects found
            </Text>
          </Box>
          <SubmitButton bg="#1574EF" onClick={() => router.push("/editor")} >
            Start coding
          </SubmitButton>
        </Flex>
      </Layout>
    );
  }

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
          m="2vw"
          bgColor="white"
          color="black"
          width="25vw"
          border="solid 1px white"
          placeholder={"Search for projects..."}
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
                    projectId={project.id}
                    ownerId={project.owner.id as UUID}
                    icon={project.codeSnippetsOwned[0]?.language}
                    key={idx}
                    title={project.title}
                    owner={project.owner.username}
                    description={project.description}
                    createdAt={project.createdAt}
                    toggleLike={() => {
                      handleToggleLike(project.id)
                    }}
                    isLiked={likedProjects.some((p) => p.id === project.id)}
                    isCommented={ownComments.some((c) => c.project.id === project.id)}
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
                    projectId={project.id}
                    ownerId={project.owner.id as UUID}
                    title={project.title}
                    icon={project.codeSnippetsOwned[0]?.language}
                    owner={project.owner.username}
                    description={project.description}
                    createdAt={project.createdAt}
                    likeCount={project.likes.length}
                    toggleLike={() => {
                      handleToggleLike(project.id)
                    }}
                    isLiked={likedProjects.some((p) => p.id === project.id)}
                    isCommented={ownComments.some((c) => c.project.id === project.id)}
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
