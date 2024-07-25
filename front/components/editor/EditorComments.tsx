import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/UserContext";
import {
  AddCommentMutation,
  AddCommentMutationVariables,
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from "@/gql/graphql";
import { GET_OWN_COMMENTS } from "@/graphql/queries/commentQueries";
import SubmitButton from "@/lib/submitButton";
import { ApolloQueryResult, gql, useMutation } from "@apollo/client";
import { Flex, Textarea, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import EditorComment from "./EditorComment";

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
  const { project: projectId, comment: highlightedCommentId } = router.query;
  const [newComment, setNewComment] = useState<string>("");
  const { user } = useAuth();
  const { openModal } = useModal();
  const [isHighlighted, setIsHighlighted] = useState(false);

  const [addCommentMutation] = useMutation<
    AddCommentMutation,
    AddCommentMutationVariables
  >(ADD_COMMENT, {
    refetchQueries: [{ query: GET_OWN_COMMENTS }],
  });

  const [deleteCommentMutation] = useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_OWN_COMMENTS }],
  });

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
      title: "Delete Comment",
      children: "Are you sure you want to delete this comment?",
      onConfirm: () => deleteComment(commentId),
    });
  };

  useEffect(() => {
    if (highlightedCommentId) {
      setTimeout(() => {
        const element = document.getElementById(highlightedCommentId as string);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
          setIsHighlighted(true);
          setTimeout(() => {
            setIsHighlighted(false);
            router.replace({
              query: { project: projectId },
            });
          }, 2000);
        }
      }, 300);
    }
  }, [highlightedCommentId]);

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
        <EditorComment
          key={index}
          comment={comment}
          user={user}
          handleDelete={handleDelete}
          isHighlighted={highlightedCommentId === comment.id && isHighlighted}
        />
      ))}
    </Flex>
  );
};

export default EditorComments;
