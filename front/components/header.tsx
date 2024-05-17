import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import UserIcon from "../icons/userIcon";
import LogOutIcon from "../icons/logOutIcon";
import SubmitButton from "../lib/submitButton";
import { useAuth } from "../context/UserContext";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const { user, refetch, signOut } = useAuth();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Flex className="header_home_page">
      <Link href="/">EDITORIA</Link>
      <Flex gap="1.5vw" align="center">
        {user ? (
          <SubmitButton onClick={() => alert("redirecting to all projects...")}>
            All projects
          </SubmitButton>
        ) : (
          <SubmitButton onClick={() => router.push("/sign-in")}>
            Sign In
          </SubmitButton>
        )}
        <SubmitButton
          bg="#1574EF"
          onClick={() => alert("redirecting to IDE...")}
        >
          Start coding
        </SubmitButton>
        {user ? (
          <>
            <Box onClick={() => router.push("/user/account")} cursor="pointer">
              <UserIcon />
            </Box>
            <Box onClick={handleSignOut} cursor="pointer">
              <LogOutIcon />
            </Box>
          </>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
