import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../../components/layout";
import Dashboard from "../../components/user/dashboard";
import Breadcrumb from "../../lib/breadCrumb";
import Settings from "../../components/user/settings";

export default function Account() {
  const [activePage, setActivePage] = useState("dashboard");
  const handlePageChange = (pageName: string | undefined) => {
    !pageName ? setActivePage("dashboard") : setActivePage(pageName);
  };
  const navigationItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Settings", value: "settings" },
    { label: "Your Favorite Coders", value: "yourfavcoder" },
  ];
  return (
    <Layout>
      <Box
        bg="#14181F"
        color="white"
        mt="7.8vw"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Breadcrumb
          items={navigationItems}
          value={activePage}
          onChange={handlePageChange}
        />
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "settings" && <Settings />}
        {activePage === "yourfavcoder" && <Text>Votre codeur préféré</Text>}
      </Box>
    </Layout>
  );
}
