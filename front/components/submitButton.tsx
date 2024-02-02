import { ReactNode } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

type SubmitButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  color?: string;
  bg?: string;
};

const SubmitButton = ({
  children,
  icon,
  onClick,
  color = "black",
  bg = "white",
}: SubmitButtonProps) => {
  return (
    <Box className="submit_button_box" >
      <Button className="submit_button_button" bg={bg} onClick={onClick}>
        <Flex alignItems="center" flexDirection="row" color={color}>
          <span>{children}</span>
          {icon}
        </Flex>
      </Button>
    </Box>
  );
};

export default SubmitButton;
