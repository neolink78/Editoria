import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";

type EditorCommentsProps = {
  comments:
    | {
        content: string;
        owner: {
          username: string;
        };
      }[]
    | undefined;
};

const EditorComments = ({ comments }: EditorCommentsProps) => {
  return (
    <Flex direction={"column"} gap={2} p={2} overflow={"scroll"}>
      {comments?.map((comment, index) => (
        <Flex key={index} bg="#2F3138" p={2} gap={2} direction={"column"}>
          <Link
            href={`/profile?user=${comment.owner.username}`}
            className="text-xs hover:text-[#1574EF]"
          >
            @{comment.owner.username}
          </Link>
          <p className="text-sm">{comment.content}</p>
        </Flex>
      ))}
    </Flex>
  );
};

export default EditorComments;
