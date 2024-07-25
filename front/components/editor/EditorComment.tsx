import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";

type User = {
  email: string;
  username: string;
  description: string;
  id: string;
};

type EditorCommentProps = {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    owner: {
      id: string;
      username: string;
    };
  };
  user: User | null;
  handleDelete: (id: string) => void;
  highlightedCommentId: string | undefined;
};

function EditorComment({
  comment,
  user,
  handleDelete,
  highlightedCommentId,
}: EditorCommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (highlightedCommentId === comment.id) {
      const element = document.getElementById(comment.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  }, [highlightedCommentId, comment.id]);

  return (
    <Flex
      p={2}
      gap={2}
      direction={"column"}
      bg={highlightedCommentId === comment.id ? "#d9d9d9" : "#2F3138"}
      color={highlightedCommentId === comment.id ? "black" : "white"}
      id={comment.id}
    >
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
      <p className="text-sm">
        {comment.content.length > 75 && !isExpanded
          ? comment.content.substring(0, 75) + "..."
          : comment.content}
      </p>
      {comment.content.length > 75 && (
        <p
          className="text-sm text-[#1574EF] cursor-pointer"
          onClick={() => setIsExpanded((v) => !v)}
        >
          {isExpanded ? "voir moins" : "voir plus"}
        </p>
      )}
    </Flex>
  );
}

export default EditorComment;
