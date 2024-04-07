
import { Box } from '@chakra-ui/react';
import ArrowLeftIcon from '../../icons/arrowLeftIcon';
import Tile from '../../lib/tile';
import { getLanguageIcon } from './dashboard';

type Project = {
    id: string;
    codeSnippetsOwned: Array<{ language: string }>;
    title: string;
    createdAt: string;
    owner: { username: string };
};

interface DashboardProjectsProps {
    projects: Project[];
    onDelete: (projectId: string) => void;
    setShowAllProjects: (show: boolean) => void;
}

const DashboardProjects = ({ projects, onDelete, setShowAllProjects }: DashboardProjectsProps) => {

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
                <Box display={"flex"} >
                    <ArrowLeftIcon onClick={() => setShowAllProjects(false)} /> Mes projets récents
                </Box>
                {projects.map((project, idx) => (
                    <Tile
                        homePage={false}
                        projectId={project.id}
                        key={idx}
                        icon={getLanguageIcon(project.codeSnippetsOwned[0]?.language)}
                        title={project.title}
                        createdAt={project.createdAt}
                        owner={project.owner.username}
                        onDelete={() => {
                            onDelete(project.id);
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default DashboardProjects;