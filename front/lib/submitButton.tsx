import { ReactNode, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import ArrowDownIcon from "../icons/arrowDownIcon";
type SubmitButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  bg?: string;
  type?: "button" | "submit";
};

const SubmitButton = ({
  children,
  onClick,
  bg = "white",
  type = "submit",
}: SubmitButtonProps) => {
  const [color, setColor] = useState("black");
  return (
    <Flex
      as="button"
      className="submit_button_container"
      p="0.5rem 1rem"
      bg={bg}
      onClick={onClick}
      color={bg === "white" ? "black" : "white"}
      _hover={{
        background: "none",
        outline: "1px solid #1574EF",
        color: color,
      }}
      onMouseEnter={() => setColor("white")}
      onMouseLeave={() => setColor("black")}
      type={type}
    >
      {children}

      <ArrowDownIcon width="20px" color={bg === "white" ? color : "white"} />
    </Flex>
  );
};

export default SubmitButton;
