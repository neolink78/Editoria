import { gql, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { GetUsersQuery } from "../../gql/graphql";
import Tile from "../../lib/tile";
import indexMock from "../../mocks/indexMock";

const GETUSERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
    }
  }
`;

const Fav = () => {
  const { data, loading, error } = useQuery<GetUsersQuery>(GETUSERS);

  return (
    <>
      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>John a liké ...</Box>
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

      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>Novak a commenté ...</Box>
      </Box>
      <Box>
        {indexMock.slice(-1).map((e, idx) => (
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

      <Box
        fontSize="1.4vw"
        m={"4vw 0 0 10vw"}
        alignSelf={"flex-start"}
        display="flex"
        alignItems="baseline"
      >
        <Box>Novak a liké ...</Box>
      </Box>
      <Box mb={12}>
        {indexMock.slice(-3).map((e, idx) => (
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
    </>
  );
};

export default Fav;
