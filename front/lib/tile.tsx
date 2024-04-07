import { Text, Flex } from "@chakra-ui/react";
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
      mt={marginTop || "1vw"}
      fontSize="0.9vw"
      onClick={() => alert("redirecting to")}
    >
      <Flex alignItems="center" gap="2vw">
        {icon}
        <Text isTruncated minWidth="10vw" maxWidth="10vw">{label} azddzdzadazd</Text>
      </Flex>
      <Flex gap="1vw">
        <Text isTruncated minWidth="30vw" maxWidth="30vw">
          {description}
        </Text>
      </Flex>
      <Flex gap="1vw">
        <Flex alignItems="center">
          <AiOutlineLike /> 1
        </Flex>
        <Flex alignItems="center" mr={"3vw"}>
          <CiChat1 /> 4
        </Flex>
        <Text isTruncated minWidth="16vw" maxWidth="16vw">
          {date} par {user ? <span style={{ color: "#1574EF" }}>{user}</span> : "Unknown"}
        </Text>
      </Flex>
      {!homePage && <FaRegTrashAlt />}
    </Flex>
  );
};

export default Tile;
