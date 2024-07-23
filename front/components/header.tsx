import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import UserIcon from "../icons/userIcon";
import LogOutIcon from "../icons/logOutIcon";
import SubmitButton from "../lib/submitButton";
import { useAuth } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import { isClickOutside } from "../utils/event";

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const userIconRef = useRef<HTMLInputElement | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const projectsPage = router.pathname === "/projects";

  /**
   * Close modal when clicking outside
   * @param event
   */
  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      openModal &&
      modalRef &&
      isClickOutside(event, modalRef.current) &&
      isClickOutside(event, userIconRef.current)
    ) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideHandler);

    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  });

  return (
    <Flex className="header_home_page">
      <Link href="/">EDITORIA</Link>
      <Flex gap="1.5vw" align="center">
        {user && projectsPage ? (
          ""
        ) : user ? (
          <SubmitButton onClick={() => router.push("/projects")}>
            All projects
          </SubmitButton>
        ) : (
          <SubmitButton onClick={() => router.push("/sign-in")}>
            Sign In
          </SubmitButton>
        )}
        <SubmitButton bg="#1574EF" onClick={() => router.push("/editor")}>
          Start coding
        </SubmitButton>
        {user ? (
          <>
            <Box
              ref={userIconRef}
              onClick={() => setOpenModal((modal) => !modal)}
              cursor="pointer"
            >
              <UserIcon />
            </Box>
          </>
        ) : (
          ""
        )}
      </Flex>
      <Flex
        ref={modalRef}
        direction="column"
        className={openModal ? "user_modal -is-visible" : "user_modal"}
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
    </Flex>
  );
};

export default Header;
