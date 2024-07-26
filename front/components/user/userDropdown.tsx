import { useAuth } from "@/context/UserContext";
import LogOutIcon from "@/icons/logOutIcon";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

type Options = "dashboard" | "settings" | "yourfavcoders" | "signout";
type UserDropdownProps = {
  isVisible: boolean;
  setOpenDropdown: Dispatch<SetStateAction<boolean>>;
};

function UserDropdown({ isVisible, setOpenDropdown }: UserDropdownProps) {
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

  const handleClick = (option: Options) => {
    switch (option) {
      case "dashboard":
        router.push("/user/account?tab=dashboard");
        break;
      case "settings":
        router.push("/user/account?tab=settings");
        break;
      case "yourfavcoders":
        router.push("/user/account?tab=yourfavcoders");
        break;
      case "signout":
        handleSignOut();
        break;
      default:
    }
    setOpenDropdown(false);
  };

  return (
    <Flex
      direction="column"
      className={isVisible ? "user_modal -is-visible" : "user_modal"}
    >
      <Text
        fontSize="md"
        onClick={() => handleClick("dashboard")}
        cursor={"pointer"}
        className="mb-1 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Dashboard
      </Text>
      <Text
        fontSize="md"
        onClick={() => handleClick("settings")}
        cursor={"pointer"}
        className="mb-1 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Settings
      </Text>
      <Text
        fontSize="md"
        onClick={() => handleClick("yourfavcoders")}
        cursor={"pointer"}
        className="mb-2 p-1 font-semibold hover:bg-[#575d64] rounded transition-all"
      >
        Your favorite coders
      </Text>
      <Box className="border-b border-[#575d64] w-full" />
      <Flex
        onClick={() => handleClick("signout")}
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
