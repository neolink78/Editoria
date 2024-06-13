import { ProjectInfo } from "@/pages/editor";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { AiOutlineLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";

type ProjectInfoProps = {
  info: ProjectInfo;
  comments: number | undefined;
  likes: number | undefined;
};

const ProjectInfoTab = ({ info, likes, comments }: ProjectInfoProps) => {
  return (
    <Flex direction={"column"} className="px-5 py-3">
      <Flex gap={4}>
        <Box>Photo bg</Box>
        <Link href={`/profile?user=${info.owner.username}`}>
          {info.owner.username}
        </Link>
      </Flex>
      <Box fontSize="sm" className="mt-4">
        {info.title}
      </Box>
      <Text fontSize="xs" className="opacity-60">
        {info.description}
      </Text>
      <Flex gap={4} fontSize="xs" className="mt-2 opacity-60">
        <Flex gap={1} align={"center"}>
          <Text>{likes}</Text>
          <AiOutlineLike />
        </Flex>
        <Flex gap={1} align={"center"}>
          <Text>{comments}</Text>
          <CiChat1 />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectInfoTab;
