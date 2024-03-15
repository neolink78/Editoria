import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
//import LikeIcon from "../icons/likeIcon"
import { AiOutlineLike } from "react-icons/ai";
import { CiChat1 } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

type TileProps = {
  icon?: ReactNode;
  label?: string;
  description?: string;
  date?: string;
  marginTop?: string;
  homePage?: boolean;
  user?: string;
};

const Tile = ({
  icon,
  label,
  description,
  date,
  marginTop,
  homePage,
  user,
}: TileProps) => {
  return (
    <Flex
      cursor="pointer"
      justifyContent="space-between"
      alignItems="center"
      p="0.8vw 1.5vw"
      borderRadius="2vw"
      width="78.8vw"
      bg="#2F3138"
      mt={marginTop}
      fontSize="0.9vw"
      onClick={() => alert("redirecting to")}
    >
      <Flex alignItems="center" gap="0.5vw">
        {icon}
        {label}
      </Flex>
      {description}
      <Flex gap="1vw">
        <Flex alignItems="center">
          <AiOutlineLike /> 1
        </Flex>
        <Flex alignItems="center">
          <CiChat1 /> 4
        </Flex>
        {date} by {user}
      </Flex>
      {!homePage && <FaRegTrashAlt />}
    </Flex>
  );
};

export default Tile;
