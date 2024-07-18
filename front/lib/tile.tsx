import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { getLanguageIcon } from "@/utils/languageIcons";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { Language } from "@/gql/graphql";
import { useRouter } from "next/router";
import { UUID } from "crypto";
import { BsChatSquare, BsChatSquareFill } from "react-icons/bs";
import { useLikes } from "@/context/LikeContext";

type TileProps = {
  ownerId?: UUID;
  icon?: Language;
  label?: string;
  description?: string;
  date?: string;
  marginTop?: string;
  homePage?: boolean;
  title?: string;
  createdAt?: string;
  owner?: string;
  projectId?: string;
  commentCount?: number;
  content?: boolean;
  onDelete?: (e: any) => void;
  canDelete?: boolean;
  toggleLike?: () => void;
  likeCount?: number;
  isLiked?: boolean;
  isCommented?: boolean;
  onOpenProject: (e: any) => void;
};

const Tile = ({
  icon,
  label,
  ownerId,
  description,
  marginTop,
  homePage,
  title,
  createdAt,
  owner,
  projectId,
  onDelete,
  canDelete,
  commentCount,
  content,
  likeCount,
  isLiked,
  isCommented,
  onOpenProject,
}: TileProps) => {
  const router = useRouter();
  const relativeDate = createdAt
    ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true, locale: fr })
    : "";

  const { handleToggleLike } = useLikes();
  const handleToggle = async () => {
    try {
      await handleToggleLike(projectId!);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="0.8vw 1.5vw"
      borderRadius="2vw"
      width="78.8vw"
      bg="#2F3138"
      mt={marginTop || "1vw"}
      fontSize="0.9vw"
      onClick={(e) => {
        e.stopPropagation();
        onOpenProject(projectId);
      }}
      cursor="pointer"
    >
      <Flex alignItems="center" gap="2vw">
        {getLanguageIcon(icon as Language)}
        <Text isTruncated w="10vw" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      <Flex gap="1vw">
        {content ? (
          <Text isTruncated w="30vw">
            {" "}
            Commentaire : {description}
          </Text>
        ) : (
          <Text isTruncated w="30vw">
            {description}
          </Text>
        )}
      </Flex>
      <Flex gap="1vw">
        <Flex alignItems="center" mr="2">
          {isLiked ? (
            <AiFillLike
              size="1.5vw"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              cursor="pointer"
            />
          ) : (
            <AiOutlineLike
              size="1.5vw"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              cursor="pointer"
            />
          )}
          <Text ml="0.5vw">{likeCount !== undefined ? likeCount : 0}</Text>
        </Flex>
        <Flex alignItems="center" mr="3vw">
          {isCommented ? (
            <BsChatSquareFill size="1.3vw" />
          ) : (
            <BsChatSquare size="1.3vw" />
          )}
          <Text ml="0.5vw">{commentCount}</Text>
        </Flex>
        {content ? (
          ""
        ) : (
          <Text isTruncated w="16vw">
            {relativeDate}
            {owner ? (
              <span>
                {" "}
                par{" "}
                <span
                  style={{ color: "#1574EF", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/user/${ownerId}?page=1`);
                  }}
                >
                  {owner}
                </span>
              </span>
            ) : (
              ""
            )}
          </Text>
        )}
      </Flex>
      {!homePage && canDelete ? (
        <FaRegTrashAlt
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(projectId);
          }}
          cursor="pointer"
        />
      ) : (
        <FaRegTrashAlt
          opacity="0"
          pointerEvents="none"
        />
      )}
    </Flex>
  );
};

export default Tile;
