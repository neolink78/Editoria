import { AddCommentMutation, AddCommentMutationVariables } from "@/gql/graphql";
import SubmitButton from "@/lib/submitButton";
import { gql, useMutation } from "@apollo/client";
import { Box, Flex, Input, Textarea } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

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

const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $projectId: String!) {
    createComment(content: $content, projectId: $projectId) {
      content
    }
  }
`;

const EditorComments = ({ comments }: EditorCommentsProps) => {
  const router = useRouter();
  const { project: projectId } = router.query;
  const [newComment, setNewComment] = useState<string>("");

  const [addCommentMutation] = useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(ADD_COMMENT);

  return (
    <Flex direction={"column"} gap={2} p={2} overflow={"scroll"}>
      <Textarea
        size={"xs"}
        width="auto"
        height={"30px"}
        placeholder="add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="text-xs p-2"
      />
      <SubmitButton bg="#1574EF">Send comment</SubmitButton>
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
