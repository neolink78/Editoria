import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Dashboard from "../../components/user/dashboard";
import Fav from "../../components/user/fav";
import Breadcrumb from "../../lib/breadCrumb";
import Settings from "../../components/user/settings";
import { useAuth } from "../../context/UserContext";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const handlePageChange = (pageName: string | undefined) => {
    !pageName ? setActivePage("dashboard") : setActivePage(pageName);
  };
  const navigationItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Settings", value: "settings" },
    { label: "Your Favorite Coders", value: "yourfavcoder" },
  ];
  const { user, refetch } = useAuth();
  useEffect(() => {
    refetch();
    setLoading(false);
  }, [refetch]);

  return loading ? (
    <Layout>
      <Box className="boxProtected">
        <Text>Loading in progress...</Text>
      </Box>
    </Layout>
  ) : user ? (
    <Layout>
      <Flex
        bg="#14181F"
        color="white"
        mt="7.8vw"
        flexDirection="column"
        alignItems="center"
      >
        <Breadcrumb
          items={navigationItems}
          value={activePage}
          onChange={handlePageChange}
        />
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "settings" && <Settings user={user} />}
        {activePage === "yourfavcoder" && <Fav />}
      </Flex>
    </Layout>
  ) : (
    <Layout>
      <Box className="boxProtected">
        <Link href="/sign-up">
          <Text color="rgba(255, 255, 255, 0.5)">Subscribe</Text>
        </Link>
        or
        <Link href="/sign-in">
          <Text color="rgba(255, 255, 255, 0.5)" mb="15px">
            Sign-in
          </Text>
        </Link>
        to access your account
      </Box>
    </Layout>
  );
}
