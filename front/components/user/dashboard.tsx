import { Box } from "@chakra-ui/react";
import indexMock from "../../mocks/indexMock";
import Tile from "../../lib/tile";

const Dashboard = () => {
  return (
    <>
      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>Mes projets récents</Box>
        <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>
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
            user={e.user}
          />
        ))}
      </Box>

      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes projets likés
        <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>
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
            user={e.user}
          />
        ))}
      </Box>

      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes projets en collaboration
        <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>
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
            user={e.user}
          />
        ))}
      </Box>
      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes derniers commentaires
        <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>
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
            user={e.user}
          />
        ))}
      </Box>
    </>
  );
};

export default Dashboard;