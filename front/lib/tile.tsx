import { Flex, Text } from "@chakra-ui/react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import ReactIcon from "@/icons/reactIcon";
import { ReactNode } from "react";
//import LikeIcon from "../icons/likeIcon"
import { getLanguageIcon } from "@/utils/languageIcons";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Language, LikedProjectsQuery } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { GET_LIKED_PROJECTS } from "@/graphql/queries/likeQueries";

type TileProps = {
  icon?: string;
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
  content?: boolean
  onDelete?: (e: any) => void;
  toggleLike?: () => void;
  likeCount?: number;
  isLiked?: boolean; 
  onOpenProject: (e: any) => void;
};

const Tile = ({
  icon,
  description,
  marginTop,
  homePage,
  title,
  createdAt,
  owner,
  projectId,
  onDelete,
  commentCount,
  content,
  toggleLike,
  likeCount,
  isLiked,
  onOpenProject,
}: TileProps) => {
  
  const relativeDate = createdAt
    ? formatDistanceToNow(parseISO(createdAt), { addSuffix: true, locale: fr })
    : "";

  const handleProjectOpen = () => {
    onOpenProject(projectId);
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
    onClick={handleProjectOpen}
    >
      <Flex alignItems="center" gap="2vw">
        {getLanguageIcon(icon as Language)}
        <Text isTruncated minWidth="10vw" maxWidth="10vw">
          {title}
        </Text>
      </Flex>
      <Flex gap="1vw">
        {content ?
          <Text isTruncated minWidth="30vw" maxWidth="30vw"> Commentaire : {description}
          </Text> :
          <Text isTruncated minWidth="30vw" maxWidth="30vw">{description}
          </Text>
        }
      </Flex>
      <Flex gap="1vw">
        <Flex alignItems="center"  >
          {isLiked ? <AiFillLike onClick={() => {
            toggleLike?.();
          }}
            cursor="pointer" /> : <AiOutlineLike
            onClick={() => {
              toggleLike?.();
            }}
            cursor="pointer"

          />}
          {likeCount !== undefined ? likeCount : 0}
        </Flex>
        <Flex alignItems="center" mr={"3vw"}>
          <CiChat1 /> {commentCount}
        </Flex>
        {content ? "" :
          <Text
            isTruncated
            minWidth="16vw"
            maxWidth="16vw">
            {relativeDate}{" "}
            {owner ? (
              <span>
                par <span style={{ color: "#1574EF" }}>{owner}</span>
              </span>
            ) : ""}
          </Text>
        }
      </Flex>
      {!homePage && (
        <FaRegTrashAlt onClick={() => onDelete?.(projectId)} cursor="pointer" />
      )}
    </Flex>
  );
};

export default Tile;
