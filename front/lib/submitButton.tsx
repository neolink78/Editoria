import { ReactNode, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import ArrowDownIcon from "../icons/arrowDownIcon";
type SubmitButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  bg?: string;
  w?: string;
  h?: string;
};

const SubmitButton = ({
  children,
  onClick,
  bg = "white",
  w,
  h = "2.5vw",
}: SubmitButtonProps) => {
  const [color, setColor] = useState("black");
  return (
    <Flex
      as="button"
      className="submit_button_container"
      w={w}
      h={h}
      bg={bg}
      onClick={onClick}
      color={bg === "white" ? "black" : "white"}
      _hover={{
        background: "none",
        border: "1px solid #1574EF",
        color: color,
      }}
      onMouseEnter={() => setColor("white")}
      onMouseLeave={() => setColor("black")}
    >
      {children}

      <ArrowDownIcon width="1.2vw" color={bg === "white" ? color : "white"} />
    </Flex>
  );
};

export default SubmitButton;
