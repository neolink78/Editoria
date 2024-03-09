import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";
import Tile from "../components/tile";
import { useState } from "react";
import MultipleChoice from "../lib/breadCrumb";

export default function Dashboard() {
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
        <Box bg="#14181F" color="white" minH="100vh" p={8} display="flex" flexDirection="column" alignItems="center">
            <MultipleChoice
                items={navigationItems}
                value={activePage}
                onChange={handlePageChange}
            />
            {activePage === 'dashboard' && (
                // <VStack spacing={8} divider={<StackDivider borderColor="gray.600" />} width="90%" maxWidth="1200px">
                //     <Section title="Mes projets récents">
                //         <Tile label="Votre codeur préféré"></Tile>
                //         <Tile label="Votre codeur préféré"></Tile>
                //         <Tile label="Votre codeur préféré"></Tile>
                //     </Section>
                // </VStack>
                <Text> Hello </Text>
            )}

            {activePage === 'settings' && <Text>Paramètres</Text>}
            {activePage === 'yourfavcoder' && <Text>Votre codeur préféré</Text>}
        </Box>
    );
}
