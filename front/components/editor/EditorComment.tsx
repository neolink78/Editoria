import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import React, { useState } from "react";
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
};

function EditorComment({ comment, user, handleDelete }: EditorCommentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Flex bg="#2F3138" p={2} gap={2} direction={"column"}>
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
      <p className={isExpanded ? 'text-sm' : 'text-sm line-clamp-3'}>{comment.content}</p>
      <p
        className="text-sm text-[#1574EF] cursor-pointer"
        onClick={() => setIsExpanded((v) => !v)}
      >
        {isExpanded ? "voir moins" : "voir plus"}
      </p>
    </Flex>
  );
}

export default EditorComment;
