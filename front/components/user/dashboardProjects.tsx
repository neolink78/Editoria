
import { Box, Button, Flex } from '@chakra-ui/react';
import { SetStateAction, useState } from 'react';
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
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 8;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber: SetStateAction<number>) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const PaginationControls = () => (
        <Flex mt="8" justifyContent="center" alignItems="center">
            <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} mx="2">
                Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} mx="1" onClick={() => paginate(index + 1)} variant={currentPage === index + 1 ? "solid" : "ghost"}>
                    {index + 1}
                </Button>
            ))}

            <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} mx="2">
                Next
            </Button>
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
                <Box display={"flex"} >
                    <ArrowLeftIcon onClick={() => setShowAllProjects(false)} /> Mes projets récents
                </Box>
                {currentProjects.map((project, idx) => (
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
            <PaginationControls />
        </Box>
    );
};

export default DashboardProjects;