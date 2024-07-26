import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import UserIcon from "../icons/userIcon";
import LogOutIcon from "../icons/logOutIcon";
import SubmitButton from "../lib/submitButton";
import { useAuth } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";
import { isClickOutside } from "../utils/event";
import UserDropdown from "./user/userDropdown";

const Header = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(false);
  const userIconRef = useRef<HTMLInputElement | null>(null);
  const modalRef = useRef<HTMLInputElement | null>(null);

  const projectsPage = router.pathname === "/projects";

  /**
   * Close modal when clicking outside
   * @param event
   */
  const clickOutsideHandler = (event: MouseEvent) => {
    if (
      openDropdown &&
      modalRef &&
      isClickOutside(event, modalRef.current) &&
      isClickOutside(event, userIconRef.current)
    ) {
      setOpenDropdown(false);
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
              onClick={() => setOpenDropdown((modal) => !modal)}
              cursor="pointer"
            >
              <UserIcon />
            </Box>
          </>
        ) : (
          ""
        )}
      </Flex>
      <Box ref={modalRef} className="absolute right-8 top-20 z-10">
        <UserDropdown isVisible={openDropdown} setOpenDropdown={setOpenDropdown} />
      </Box>
    </Flex>
  );
};

export default Header;
