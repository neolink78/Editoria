import { Box } from "@chakra-ui/react";
import indexMock from "../../mocks/indexMock";
import Tile from "../../lib/tile";
import emptyMocks from "../../mocks/emptyMocks";
import SubmitButton from "../../lib/submitButton";
import favMocks from "../../mocks/favMocks";

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
        {emptyMocks.length > 0 && <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>}
      </Box>
      <Box mb={12}>
        { emptyMocks && emptyMocks.length > 0
        ? emptyMocks.slice(-2).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
            
          />
        ))
        : <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
          <Box fontSize="0.9vw" m="2vw">
            {" "}
            Vous n'avez pas encore de projet.{" "}
          </Box>
          <SubmitButton
            w="13vw"
            bg="#1574EF"
            onClick={() => alert("redirecting to IDE...")}
          >
            Commencez à coder
          </SubmitButton>
        </Box>
        }
      </Box>

      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes projets likés
        {favMocks && <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>}
      </Box>
      <Box mb={12}>
        { favMocks ? favMocks.slice(-2).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
          />
        )) : <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} my="10" >
          <Box fontSize="0.9vw" m="2vw">
            {" "}
            Vous n'avez pas encore liké de projet.{" "}
          </Box>
          <SubmitButton
            w="11vw"
            bg="#1574EF"
            onClick={() => alert("redirecting to all projects...")}
          >
            Tous les projets
          </SubmitButton>
        </Box>}
      </Box>

      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes projets en collaboration
        {indexMock && <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>}
      </Box>
      <Box mb={12}>
        {indexMock ? indexMock.slice(-2).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
          />
        )) :
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <Box fontSize="0.9vw" m="4vw">
              {" "}
              Vous n'avez pas encore de projet en collaboration.{" "}
            </Box>
          </Box>
        }
      </Box>
      <Box
        fontSize="1.4vw"
        m={"2vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        Mes derniers commentaires
        {emptyMocks.length > 0 && <Box fontSize="1vw" ml="2vw">
          {" "}
          Tout voir{" "}
        </Box>}
      </Box>
      <Box mb={12}>
         { emptyMocks.length > 0
        ? emptyMocks.slice(-2).map((e, idx) => (
          <Tile
            homePage
            key={idx}
            marginTop={e.marginTop}
            icon={e.icon}
            label={e.label}
            description={e.description}
            date={e.date}
          />
        )) :
          <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
            <Box fontSize="0.9vw" m="4vw">
              {" "}
              Vous n'avez pas encore de commentaire.{" "}
            </Box>
          </Box>
        }
      </Box>
    </>
  );
};

export default Dashboard;