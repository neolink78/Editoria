import Layout from "@/components/layout";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Flex, Input, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Tile from "@/lib/tile";
import { PaginationControls } from "@/lib/pagination";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import { GET_PROJECTS } from "@/graphql/queries/projectQueries";
import { GetOwnCommentsQuery, GetProjectsQuery, Language } from "@/gql/graphql";
import { useLikes } from "@/context/LikeContext";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import { Error } from "@/lib/error";
import SubmitButton from "@/lib/submitButton";
import Breadcrumb from "@/lib/breadCrumb";
import { useModal } from "@/context/ModalContext";
import { DELETE_PROJECT } from "@/graphql/mutations/projectMutations";
import { useAuth } from "@/context/UserContext";

const navigationItems = [
  { label: "Headlined", value: "headLined" },
  { label: "Most recents", value: "mostRecents" },
];

const Projects = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [activePage, setActivePage] = useState("headLined");
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page as string) || 1,
  );
  const { openModal } = useModal();

  const { handleToggleLike, likedProjects = [] } = useLikes();
  const projectsPerPage = 10;
  const offset = (currentPage - 1) * projectsPerPage;

  const sortBy = activePage === "headLined" ? "likes" : "createdAt";
  const { data, loading, error, refetch } = useQuery<GetProjectsQuery>(
    GET_PROJECTS,
    {
      variables: {
        limit: projectsPerPage,
        offset: offset,
        sortBy: sortBy,
        search: debouncedValue,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  const { data: ownCommentsData } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const ownComments = ownCommentsData?.getOwnComments || [];

  const { currentUserData } = useAuth();
  const currentUserId = currentUserData?.myProfile.id;

  const [deleteProject] = useMutation(DELETE_PROJECT);

  const projects = data?.getProjects.projects || [];
  const totalCount = data?.getProjects.totalCount || 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      refetch({
        limit: projectsPerPage,
        offset: (pageNumber - 1) * projectsPerPage,
        sortBy: sortBy,
        search: debouncedValue,
      });
      router.push(`/projects?page=${pageNumber}`, undefined, { shallow: true });
    }
  };

  const handleBreadcrumbChange = (value: string) => {
    setActivePage(value);
    setCurrentPage(1);
    refetch({
      limit: projectsPerPage,
      offset: 0,
      sortBy: sortBy,
      search: debouncedValue,
    });
    router.push(`?page=${1}`, undefined, { shallow: true });
  };

  const handleDelete = (projectId: string) => {
    openModal({
      title: "Delete project",
      children: "Are you sure you want to delete this project?",
      onConfirm: () => confirmDelete(projectId),
    });
  };

  const confirmDelete = async (projectId: string) => {
    await deleteProject({
      variables: { deleteProjectId: projectId },
      refetchQueries: [
        {
          query: GET_PROJECTS,
          variables: {
            limit: projectsPerPage,
            offset: (currentPage - 1) * projectsPerPage,
            sortBy: sortBy,
            search: debouncedValue,
          },
        },
      ],
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activePage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  if (error) return <Error />;

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
          onChange={handleBreadcrumbChange}
        />
        <Input
          borderRadius="2vw"
          mt="2vw"
          mb="3rem"
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
        {loading && !projects.length ? (
          <Flex justify="center" align="center" mt="">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              mt="2rem"
              width="78.8vw"
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <Box key={idx} width="100%" mb="10px">
                  <Skeleton height="46px" width="100%" borderRadius="30px" />
                </Box>
              ))}
            </Flex>
          </Flex>
        ) : (
          <>
            <Box minHeight={{ base: "52vw", lg: "auto" }}>
              {projects.length === 0 ? (
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mt="20vh"
                >
                  <Box fontSize="2vw" color="white" mt="2rem" mb="2vw">
                    No projects found
                  </Box>
                  <SubmitButton
                    bg="#1574EF"
                    onClick={() => router.push("/editor")}
                  >
                    Start coding
                  </SubmitButton>
                </Flex>
              ) : (
                projects.map((project, idx) => (
                  <Tile
                    key={idx}
                    projectId={project.id}
                    ownerId={project.owner.id as UUID}
                    owner={project.owner.username}
                    icon={project.codeSnippetsOwned[0]?.language}
                    title={project.title}
                    description={project.description}
                    createdAt={project.createdAt}
                    likeCount={project.likes.length}
                    commentCount={project.comments.length}
                    onOpenProject={() =>
                      router.push(`/editor?project=${project.id}`)
                    }
                    canDelete={currentUserId === project.owner.id}
                    onDelete={() => handleDelete(project.id)}
                    toggleLike={() => handleToggleLike(project.id)}
                    isLiked={likedProjects.some((p) => p.id === project.id)}
                    isCommented={ownComments.some(
                      (c) => c.project.id === project.id,
                    )}
                  />
                ))
              )}
            </Box>
            <PaginationControls
              currentPage={currentPage}
              totalItems={totalCount}
              itemsPerPage={projectsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default Projects;
