import { Flex, Box } from "@chakra-ui/react";
import Header from "./header";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box bg="#14181F" color="#fbfbfb" fontFamily="body" minH="100vh" pb="72px">
      <Header />
      {children}
      <Flex
        bg="#111113"
        p="24px"
        fontSize="1rem"
        w="100%"
        mt="5vw"
        position="absolute"
        bottom="0"
        zIndex={9}
      >
        © 2024 Editoria. All rights reserved.
      </Flex>
    </Box>
  );
};

export default Layout;
