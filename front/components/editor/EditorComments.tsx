import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/UserContext";
import {
  AddCommentMutation,
  AddCommentMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from "@/gql/graphql";
import SubmitButton from "@/lib/submitButton";
import { ApolloQueryResult, gql, useMutation } from "@apollo/client";
import { Flex, Textarea, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type EditorCommentsProps = {
  refetch: () => Promise<ApolloQueryResult<any>>;
  comments:
    | {
        id: string;
        content: string;
        createdAt: string;
        owner: {
          id: string;
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

const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId) {
      id
    }
  }
`;

const EditorComments = ({ comments, refetch }: EditorCommentsProps) => {
  const router = useRouter();
  const { project: projectId } = router.query;
  const [newComment, setNewComment] = useState<string>("");
  const { user } = useAuth();
  const { openModal } = useModal();

  const [addCommentMutation] = useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(ADD_COMMENT);

  const [deleteCommentMutation] = useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DELETE_COMMENT);

  const addComment = async () => {
    if (!projectId || !newComment) return;

    await addCommentMutation({
      variables: {
        content: newComment,
        projectId: projectId as string,
      },
    });

    refetch();
    setNewComment("");
  };

  const deleteComment = async (commentId: string) => {
    await deleteCommentMutation({
      variables: {
        deleteCommentId: commentId,
      },
    });

    refetch();
  };

  const handleDelete = (commentId: string) => {
    openModal({
      title: "Confirmer la suppression",
      children: "Êtes-vous sûr de vouloir supprimer ce commentaire ?",
      onConfirm: () => deleteComment(commentId),
    });
  };

  return (
    <Flex
      direction={"column"}
      gap={2}
      p={2}
      overflow={"scroll"}
      className="no-scrollbar"
    >
      {user && projectId && (
        <Flex direction={"column"} gap={1}>
          <Textarea
            size={"xs"}
            width="auto"
            height={"30px"}
            placeholder="add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="text-xs p-2"
          />
          <SubmitButton bg="#1574EF" onClick={addComment}>
            Send comment
          </SubmitButton>
        </Flex>
      )}
      {comments?.map((comment, index) => (
        <Flex key={index} bg="#2F3138" p={2} gap={2} direction={"column"}>
          <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"} w={"calc(100% - 30px)"}>
              <Link
                href={`/user/${comment.owner.id}`}
                className="text-sm hover:text-[#1574EF]"
              >
                <span>@{comment.owner.username}</span>
              </Link>
              <Text isTruncated className="text-xs">
                {comment.createdAt &&
                  formatDistanceToNow(parseISO(comment.createdAt), {
                    addSuffix: true,
                  })}
              </Text>
            </Flex>
            {user?.id === comment.owner.id && (
              <FaRegTrashAlt
                className="w-3 cursor-pointer opacity-40 hover:opacity-100"
                onClick={() => handleDelete(comment.id)}
              />
            )}
          </Flex>
          <p className="text-sm">{comment.content}</p>
        </Flex>
      ))}
    </Flex>
  );
};

export default EditorComments;
