import { Box, Skeleton } from "@chakra-ui/react";
import ArrowLeftIcon from "../../icons/arrowLeftIcon";
import { PaginationControls } from "../../lib/pagination";
import Tile from "../../lib/tile";
import { getLanguageIcon } from "../../utils/languageIcons";
import { Language } from "@/gql/graphql";
import { useRouter } from "next/router";

export type Project = {
  id: string;
  codeSnippetsOwned: Array<{ language: Language }>;
  title: string;
  description: string;
  createdAt: string;
  owner: { username: string };
  comments: Array<{ id: string; content: string }>;
  likes: Array<{ id: string }>;
};

interface DashboardProjectsProps {
  projects: Project[];
  onDelete: (projectId: string) => void;
  setShowAllProjects: (show: boolean) => void;
  isLoading: boolean;
  toggleLike: (options: { variables: { projectId: string } }) => void;
}

const DashboardProjects = ({
  projects,
  onDelete,
  setShowAllProjects,
  isLoading,
  toggleLike,
}: DashboardProjectsProps) => {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string) || 1;
  const projectsPerPage = 8;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

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
          projets récents
        </Box>
        {currentProjects.map((project, idx) => (
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
              likeCount={project.likes.length}
              toggleLike={() => {
                toggleLike({ variables: { projectId: project.id } });
              }}
              onDelete={() => {
                onDelete(project.id);
              }}
              onOpenProject={() => {
                router.push(`/editor?project=${project.id}`);
              }}
            />
          </Skeleton>
        ))}
      </Box>
      <PaginationControls
        currentPage={currentPage}
        totalItems={projects.length}
        itemsPerPage={projectsPerPage}
      />
    </Box>
  );
};

export default DashboardProjects;
