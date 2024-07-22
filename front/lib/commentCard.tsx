import { Box, Flex, Text } from "@chakra-ui/react";

interface CommentCardProps {
  title: string;
  date: string;
  content: string;
  owner: string;
  onOpenProject: () => void;
}

const CommentCard = ({ title, date, content, owner, onOpenProject }: CommentCardProps) => {
  return (
    <Box
      m="4"
      p="4"
      mb="4"
      width="16rem"
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
      <Text fontSize="1rem" isTruncated >
        {content}
      </Text>
      <Text fontSize="0.8rem" color="gray.500" mt="4">
        Project: <Text as="span" color="white">
          {title}
        </Text>
      </Text>
      {/* <Text fontSize="0.8rem" color="gray.500">
        by <Text as="span" color="blue.500">{owner}</Text>
      </Text> */}
    </Box>
  );
};

export default CommentCard;
