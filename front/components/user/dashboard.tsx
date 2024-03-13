import { Box } from "@chakra-ui/react";
import indexMock from "../../mocks/indexMock";
import Tile from "../tile";

const Dashboard = () => {


    return (
        <>
            <Box fontSize="1.4vw" m="8vw 10.8vw 0 40vw" width="100%" display="flex" alignItems='baseline'>
                Mes projets récents
                <Box fontSize="1vw" ml="2vw"> Tout voir </Box>
            </Box>
            <Box>
                {indexMock.slice(-2).map((e, idx) => (
                    <Tile
                        homePage
                        key={idx}
                        marginTop={e.marginTop}
                        icon={e.icon}
                        label={e.label}
                        description={e.description}
                        date={e.date}
                    />
                ))}
            </Box>

            <Box fontSize="1.4vw" m="4vw 10.8vw 0 40vw" width="100%" display="flex" alignItems='baseline'>
                Mes projets likés
                <Box fontSize="1vw" ml="2vw"> Tout voir </Box>
            </Box>
            <Box>
                {indexMock.slice(-2).map((e, idx) => (
                    <Tile
                        homePage
                        key={idx}
                        marginTop={e.marginTop}
                        icon={e.icon}
                        label={e.label}
                        description={e.description}
                        date={e.date}
                    />
                ))}
            </Box>

            <Box fontSize="1.4vw" m="4vw 10.8vw 0 40vw" width="100%" display="flex" alignItems='baseline'>
                Mes projets en collaboration
                <Box fontSize="1vw" ml="2vw"> Tout voir </Box>
            </Box>
            <Box>
                {indexMock.slice(-2).map((e, idx) => (
                    <Tile
                        homePage
                        key={idx}
                        marginTop={e.marginTop}
                        icon={e.icon}
                        label={e.label}
                        description={e.description}
                        date={e.date}
                    />
                ))}
            </Box>
            <Box fontSize="1.4vw" m="4vw 10.8vw 0 40vw" width="100%" display="flex" alignItems='baseline'>
                Mes derniers commentaires
                <Box fontSize="1vw" ml="2vw"> Tout voir </Box>
            </Box>
            <Box>
                {indexMock.slice(-2).map((e, idx) => (
                    <Tile
                        homePage
                        key={idx}
                        marginTop={e.marginTop}
                        icon={e.icon}
                        label={e.label}
                        description={e.description}
                        date={e.date}
                    />
                ))}
            </Box></>
    )
}

export default Dashboard;