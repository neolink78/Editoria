import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import MultipleChoice from "../../lib/breadCrumb";
import Layout from "../../components/layout";
import Dashboard from "../../components/user/dashboard";

export default function Account() {
    const [activePage, setActivePage] = useState('dashboard');
    const handlePageChange = (pageName: string | undefined) => {
        !pageName ? setActivePage('dashboard') : setActivePage(pageName);
    };
    const navigationItems = [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Settings', value: 'settings' },
        { label: 'Your Favorite Coders', value: 'yourfavcoder' }
    ];
    return (
        <Layout>
            <Box bg="#14181F" color="white" minH="100vh" p={8} display="flex" flexDirection="column" alignItems="center">
                <MultipleChoice
                    items={navigationItems}
                    value={activePage}
                    onChange={handlePageChange}
                />
                {activePage === 'dashboard' && <Dashboard/>}
                {activePage === 'settings' && <Text>Paramètres</Text>}
                {activePage === 'yourfavcoder' && <Text>Votre codeur préféré</Text>}
            </Box>
        </Layout>
    );
}
