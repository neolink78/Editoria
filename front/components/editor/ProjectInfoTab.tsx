import { ProjectInfo } from "@/pages/editor";
import { Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";

type ProjectInfoProps = {
  info : ProjectInfo
}

const ProjectInfoTab = ({ info } : ProjectInfoProps) => {
  return (
    <Flex direction={"column"} className="px-5 py-3" >
      <Flex gap={4}>
        <Box>PP</Box>
        <Box>Author</Box>
      </Flex>
      <Box fontSize="sm" className="mt-4">{info.title}</Box>
      <Text fontSize="xs" className="opacity-60">{info.description}</Text>
      <Flex gap={4} fontSize='xs' className="mt-2 opacity-60">
        <Flex gap={1} align={"center"}>
          <Text>1000</Text>
          <AiOutlineLike />
        </Flex>
        <Flex gap={1} align={"center"}>
          <Text>999</Text>
          <CiChat1 />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProjectInfoTab;