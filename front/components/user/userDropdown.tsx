import { useAuth } from "@/context/UserContext";
import LogOutIcon from "@/icons/logOutIcon";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function UserDropdown({ isVisible }: { isVisible: boolean }) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Flex
      direction="column"
      className={isVisible ? "user_modal -is-visible" : "user_modal"}
    >
      <Text
        fontSize="md"
        onClick={() => router.push("/user/account?tab=dashboard")}
        cursor={"pointer"}
        className="mb-1 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Dashboard
      </Text>
      <Text
        fontSize="md"
        onClick={() => router.push("/user/account?tab=settings")}
        cursor={"pointer"}
        className="mb-1 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Settings
      </Text>
      <Text
        fontSize="md"
        onClick={() => router.push("/user/account?tab=yourfavcoders")}
        cursor={"pointer"}
        className="mb-2 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Your favorite coders
      </Text>
      <Box className="border-b border-[#575d64] w-full" />
      <Flex
        onClick={handleSignOut}
        cursor="pointer"
        gap={3}
        className="mt-2 p-1 hover:bg-[#575d64] rounded transition-all"
        alignItems="center"
      >
        <Text fontSize="md" className="font-semibold">
          Sign out
        </Text>
        <LogOutIcon />
      </Flex>
    </Flex>
  );
}

export default UserDropdown;
