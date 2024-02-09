import { Flex, Box } from "@chakra-ui/react";
import SubmitButton from "../lib/submitButton";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box bg="#14181F" color="#fbfbfb" fontFamily="body">
      <Flex className="header_home_page">
        EDITORIA
        <Flex gap="1.5vw">
          <SubmitButton onClick={() => alert("redirecting to IDE...")} w="6vw">
            Sign In
          </SubmitButton>
          <SubmitButton
            w="9vw"
            bg="#1574EF"
            onClick={() => alert("redirecting to IDE...")}
          >
            Start coding
          </SubmitButton>
        </Flex>
      </Flex>
      {children}
      <Flex bg="#111113" p="3.2vw 0 3.2vw 7.8vw" mt="4vw" fontSize="1vw">
        © 2024 Editoria. All rights reserved.
      </Flex>
    </Box>
  );
};

export default Layout;
