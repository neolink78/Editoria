import { Box, Flex, Text } from "@chakra-ui/react";

interface CommentCardProps {
  title: string;
  date: string;
  content: string;
  owner: string;
  onOpenProject: () => void;
}

const CommentCard = ({
  title,
  date,
  content,
  owner,
  onOpenProject,
}: CommentCardProps) => {
  return (
    <Box
      p="4"
      width="calc(20% - (4*16px)/5)"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      onClick={onOpenProject}
    >
      <Text fontSize="0.8rem" color="gray.500" mb="4">
        Le {date}
      </Text>
      <Text fontSize="1rem" isTruncated>
        {content}
      </Text>
      <Text fontSize="0.8rem" color="gray.500" mt="4">
        Project:{" "}
        <Text as="span" color="white">
          {title}
        </Text>
      </Text>
    </Box>
  );
};

export default CommentCard;
