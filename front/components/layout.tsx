import { Flex, Box } from "@chakra-ui/react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box bg="#14181F" color="#fbfbfb" fontFamily="body" minH="100vh">
      <Header />
      {children}
      <Flex
        bg="#111113"
        p="3.2vw 0 3.2vw 7.8vw"
        fontSize="1vw"
        w="100%"
        mt="5vw"
      >
        © 2024 Editoria. All rights reserved.
      </Flex>
    </Box>
  );
};

export default Layout;
