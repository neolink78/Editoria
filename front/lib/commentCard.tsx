import { Box, Flex, Text } from "@chakra-ui/react";

interface CommentCardProps {
  title: string;
  date: string;
  content: string;
  onOpenProject: () => void;
}

const CommentCard = ({ title, date, content, onOpenProject }: CommentCardProps) => {
  return (
    <Box
      p="4"
      mb="4"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      onClick={onOpenProject}
    >
      <Text fontWeight="bold" fontSize="1.2rem" mb="2">
        {title}
      </Text>
      <Text fontSize="1rem">
        {content}
      </Text>
      <Text fontSize="0.9rem" color="gray.500" mb="4">
        {date}
      </Text>
    </Box>
  );
};

export default CommentCard;
