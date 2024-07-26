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
  isHighlighted: boolean;
};

function EditorComment({
  comment,
  user,
  handleDelete,
  isHighlighted,
}: EditorCommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex
      id={comment.id}
      p={2}
      gap={2}
      direction={"column"}
      bg="#2F3138"
      boxShadow={isHighlighted ? "0 0 0 2px #1574EF" : "none"}
      transition="background-color 0.5s ease, color 0.5s ease"
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
          {isExpanded ? "show less" : "show more"}
        </p>
      )}
    </Flex>
  );
}

export default EditorComment;
