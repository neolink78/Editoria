
import { Box, Text } from '@chakra-ui/react';
import Tile from '../../lib/tile';
import { getLanguageIcon } from './dashboard';

const dashboardProjects = ({ projects, onDelete}) => {
  return (
    <Box mb={10}>
      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 2vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="center"
        gap={4}
      >
        {projects.map((project, idx) => (
          <Tile
          homePage={false}
          key={idx}
          icon={getLanguageIcon(project.codeSnippetsOwned[0]?.language)}
          title={project.title}
          createdAt={project.createdAt}
          owner={project.owner.username}
          onDelete={() => onDelete(project.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default dashboardProjects;