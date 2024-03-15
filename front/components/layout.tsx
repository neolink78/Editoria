import { Flex, Box } from "@chakra-ui/react";
import SubmitButton from "../lib/submitButton";
import UserIcon from "../icons/userIcon";
import { useRouter } from "next/router";
type Props = {
  children: React.ReactNode;
  user?: boolean;
};

const Layout = ({ children, user = true }: Props) => {
  const router = useRouter();
  return (
    <Box bg="#14181F" color="#fbfbfb" fontFamily="body">
      <Flex className="header_home_page">
        EDITORIA
        <Flex gap="1.5vw" align="center">
          <SubmitButton
            onClick={() =>
              user ? alert("Redirecting to account") : router.push("/sign-in")
            }
            w="6vw"
          >
            {user ? "All projects" : "Sign In"}
          </SubmitButton>
          <SubmitButton
            w="9vw"
            bg="#1574EF"
            onClick={() => alert("redirecting to IDE...")}
          >
            Start coding
          </SubmitButton>
          <Box onClick={() => router.push("/account")} cursor="pointer">
            {user && <UserIcon />}
          </Box>
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
