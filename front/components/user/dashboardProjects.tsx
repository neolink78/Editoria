
import { Box, Skeleton } from '@chakra-ui/react';

import { useState } from 'react';
import ArrowLeftIcon from '../../icons/arrowLeftIcon';
import { PaginationControls } from '../../lib/pagination';
import Tile from '../../lib/tile';
import { getLanguageIcon } from './dashboard';

export type Project = {
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
    isLoading: boolean;
}

const DashboardProjects = ({ projects, onDelete, setShowAllProjects, isLoading }: DashboardProjectsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 8;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

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
                <Box display="flex" alignItems="center" >
                    <ArrowLeftIcon onClick={() => setShowAllProjects(false)} /> Mes projets récents
                </Box>
                {currentProjects.map((project, idx) => (
                    <Skeleton isLoaded={!isLoading}>
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
                    </Skeleton>
                ))}
            </Box>
            <PaginationControls
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                totalItems={projects.length}
                itemsPerPage={projectsPerPage}
            />
        </Box>
    );
};

export default DashboardProjects;