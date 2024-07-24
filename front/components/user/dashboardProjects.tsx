import { Box, Skeleton } from "@chakra-ui/react";
import ArrowLeftIcon from "../../icons/arrowLeftIcon";
import { PaginationControls } from "../../lib/pagination";
import Tile from "../../lib/tile";
import { Language } from "@/gql/graphql";
import { useRouter } from "next/router";
import { useLikes } from "@/context/LikeContext";

export type Project = {
  id: string;
  codeSnippetsOwned: { language: Language }[];
  title: string;
  description: string;
  createdAt: string;
  owner: { username: string };
  comments: { id: string; content: string }[];
  likes: { id: string }[];
};

interface DashboardProjectsProps {
  projects: Project[];
  onDelete: (projectId: string) => void;
  setShowAllProjects: (show: boolean) => void;
  isLoading: boolean;
  ownComments: Array<{ id: string; content: string }>;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  canDelete?: string;
}

const DashboardProjects = ({
  projects,
  onDelete,
  setShowAllProjects,
  isLoading,
  ownComments,
  totalItems,
  onPageChange,
  currentPage,
  canDelete,
}: DashboardProjectsProps) => {
  const router = useRouter();
  const projectsPerPage = 8;

  const { handleToggleLike, likedProjects, refetchProjects } = useLikes();

  const handleOpenProject = (projectId: string) => {
    router.push(`/editor?project=${projectId}`);
  };

  const handleShowLikeCount = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    return project?.likes.length;
  };

  return (
    <Box mb={10}>
      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 2vw"}
        display="flex"
        alignItems="baseline"
        gap={2}
        flexDirection="column"
      >
        <Box display="flex" alignItems="center">
          <ArrowLeftIcon onClick={() => setShowAllProjects(false)} /> Mes
          projets
        </Box>
        {projects.map((project, idx) => (
          <Skeleton isLoaded={!isLoading} key={idx}>
            <Tile
              homePage={false}
              projectId={project.id}
              icon={project.codeSnippetsOwned[0]?.language}
              title={project.title}
              description={project.description}
              createdAt={project.createdAt}
              owner={project.owner.username}
              commentCount={project?.comments.length}
              likeCount={handleShowLikeCount!(project.id)}
              toggleLike={() => {
                handleToggleLike(project.id);
              }}
              onDelete={() => {
                onDelete(project.id);
              }}
              canDelete={true}
              onOpenProject={() => {
                handleOpenProject(project.id);
              }}
              isLiked={
                likedProjects && likedProjects.some((p) => p.id === project.id)
              }
              isCommented={
                ownComments &&
                ownComments.some((c) => c.id === project.comments[0]?.id)
              }
            />
          </Skeleton>
        ))}
      </Box>
      <PaginationControls
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={projectsPerPage}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default DashboardProjects;
