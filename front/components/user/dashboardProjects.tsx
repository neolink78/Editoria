
import { Box, Button, Flex, IconButton, Skeleton } from '@chakra-ui/react';

import { SetStateAction, useState } from 'react';
import ArrowLeftIcon from '../../icons/arrowLeftIcon';
import ArrowRightIcon from '../../icons/arrowRightIcon';
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
    isLoading: boolean;
}

const DashboardProjects = ({ projects, onDelete, setShowAllProjects, isLoading }: DashboardProjectsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 8;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const PaginationControls = () => (
        <Flex mt="8" justifyContent="center" alignItems="center">
            <IconButton
                icon={<ArrowLeftIcon color={currentPage === 1 ? 'gray' : 'black'} />}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1}
                aria-label="Page précédente"
                mx="2"
            />
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} mx="1" onClick={() => paginate(index + 1)} variant={currentPage === index + 1 ? "solid" : "ghost"}>
                    {index + 1}
                </Button>
            ))}

            <IconButton
                icon={<ArrowRightIcon color={currentPage === totalPages ? 'gray' : 'black'} />}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                isDisabled={currentPage === totalPages}
                aria-label="Page suivante"
                mx="2"
            />
        </Flex>
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
                <Box display="flex" alignItems="center" >
                    <ArrowLeftIcon onClick={() => setShowAllProjects(false)} /> Mes projets récents
                </Box>
                {currentProjects.map((project, idx) => (
                    <Skeleton isLoaded={!isLoading} key={idx}>
                        <Tile
                            homePage={false}
                            projectId={project.id}
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
            <PaginationControls />
        </Box>
    );
};

export default DashboardProjects;