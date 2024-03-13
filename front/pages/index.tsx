import Section from "../lib/section";
import { Flex, Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import SubmitButton from "../lib/submitButton";
import Tile from "../lib/tile";
import indexMock from "../mocks/indexMock";
import Layout from "../components/layout";

export default function HomePage() {
  return (
    <Layout>
      <Flex className="header_main_title">
        <Box>Welcome to Editoria</Box>
        <Box>Our goal is to make you enjoying coding !</Box>
      </Flex>
      <Flex mt="5vw" justifyContent="center" gap="11.4vw" alignItems="center">
        <Section title="What's Editoria ?" buttonText="Try it out now !">
          Editoria an IDE allowing you to code with your mates anytime, anywhere
          !
        </Section>
        <Image
          style={{ width: "29vw", height: "21.5vw", borderRadius: "1vw" }}
          src="/homePicture.png"
          alt="home picture"
          width={600}
          height={600}
        />
      </Flex>
      <Box fontSize="2.5vw" m="8vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {indexMock.map((e, idx) => (
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
      <Flex justifyContent="center" mt="3vw">
        <SubmitButton onClick={() => alert("redirecting to IDE...")} w="10vw">
          See all projects
        </SubmitButton>
      </Flex>
    </Layout>
  );
}
