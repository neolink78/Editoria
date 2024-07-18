import Layout from "@/components/layout";
import { useMutation, useQuery } from "@apollo/client";
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

type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  owner: {
    id: string;
    username: string;
  };
  likes: {
    id: string;
  }[];
  comments: {
    id: string;
  }[];
  codeSnippetsOwned: {
    id: string;
    language: Language | undefined;
  }[];
};

const Projects = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState("headLined");
  const { handleToggleLike, likedProjects } = useLikes();
  const projectsPerPage = 10;
  const offset = (currentPage - 1) * projectsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [activePage]);

  const sortBy = activePage === "headLined" ? "likes" : "createdAt";
  const { data, loading, error } = useQuery<GetProjectsQuery>(GET_PROJECTS, {
    variables: {
      limit: projectsPerPage,
      offset: offset,
      sortBy: sortBy
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: ownCommentsData } =
    useQuery<GetOwnCommentsQuery>(GET_OWN_COMMENTS);
  const ownComments = ownCommentsData?.getOwnComments || [];

  const { currentUserData } = useAuth();
  const currentUserId = currentUserData?.myProfile.id;

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: { limit: projectsPerPage, offset: offset, sortBy: sortBy },
      },
    ],
  });

  const projects = data?.getProjects.projects || [];
  const totalCount = data?.getProjects.totalCount || 0;

  const handleBreadcrumbChange = (value: string) => {
    setActivePage(value);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      router.push(`/projects?page=${pageNumber}`, undefined, { shallow: true });
    }
  };

  const navigationItems = [
    { label: "Headlined", value: "headLined" },
    { label: "Most recents", value: "mostRecents" },
  ];

  const { openModal } = useModal();

  const handleDelete = (projectId: string) => {
    openModal({
      title: "Confirmer la suppression",
      children: "Êtes-vous sûr de vouloir supprimer ce projet ?",
      onConfirm: () => confirmDelete(projectId),
    });
  };

  const confirmDelete = async (projectId: string) => {
    await deleteProject({ variables: { deleteProjectId: projectId } });
  };

  if (loading)
    return (
      <Layout>
        <Flex justify="center" align="center" mt="20vh">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            mt="20vh"
            width="78.8vw"
          >
            {Array.from({ length: 10 }).map((_, idx) => (
              <Box key={idx} width="100%" mb="10px">
                <Skeleton height="46px" width="100%" borderRadius="30px" />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Layout>
    );

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
        {projects.length === 0 ? (
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="20vh"
          >
            <Box fontSize="2vw" color="white" mt="10vw" mb="2vw">
              No projects found
            </Box>
            <SubmitButton bg="#1574EF" onClick={() => router.push("/editor")}>
              Start coding
            </SubmitButton>
          </Flex>
        ) : (
          <>
            <Input
              borderRadius="2vw"
              mt="2vw"
              mb="5vw"
              bgColor="white"
              color="black"
              width="25vw"
              border="solid 1px white"
              placeholder="Search for projects..."
              fontSize="1.2vw"
            />
            <Box minHeight="52vw">
              {projects.map((project, idx) => (
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
                  onDelete={() => {
                    handleDelete(project.id);
                  }}
                  toggleLike={() => handleToggleLike(project.id)}
                  isLiked={likedProjects.some((p) => p.id === project.id)}
                  isCommented={ownComments.some(
                    (c) => c.project.id === project.id,
                  )}
                />
              ))}
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
