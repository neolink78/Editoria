import { Box } from "@chakra-ui/react";

const LogOutIcon = ({ width = "5", height = "5" }) => (
  <Box
    as="svg"
    width={width}
    height={height}
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    cursor="pointer"
    _hover={{ stroke: "#1574EF" }}
  >
    <path
      d="M9 0.5C3 0.5 1.78431 1.75806 1 3V30L2 31.5L5 32.5H9"
      stroke="white"
      strokeWidth="2"
    />
    <path d="M12.5 16.5H32" stroke="white" />
    <path d="M22.5 7L31.5 16.5L22.5 26" stroke="white" strokeWidth="2" />
  </Box>
);

export default LogOutIcon;
