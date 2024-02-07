import UserIcon from "../icons/userIcon";
import Section from "../components/section";
import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
import SubmitButton from "../components/submitButton";
import ArrowDownIcon from "../icons/arrowDownIcon";
import Footer from "../components/footer";
import Tile from "../components/tile";
import indexMock from "../mocks/indexMock";

export default function HomePage() {
  return (
    <Box bg="#14181F" color="white">
      <Flex className="header_home_page">
        EDITORIA
        <Flex gap="0.9vw">
          <SubmitButton
            onClick={() => alert("redirecting to IDE...")}
            icon={<ArrowDownIcon width="0.8vw" />}
          >
            Sign In
          </SubmitButton>
          <SubmitButton
            color="white"
            bg="#1574EF"
            onClick={() => alert("redirecting to IDE...")}
            icon={<ArrowDownIcon width="0.8vw" color="white" />}
          >
            Ici ça code
          </SubmitButton>
        </Flex>
      </Flex>
      <Flex className="header_main_title">
        <Box>Welcome to Editoria</Box>
        <Box>Our goal is to make you enjoying coding !</Box>
      </Flex>
      <Flex mt="6.5vw" justifyContent="center" gap="25vw" alignItems="center">
        <Section title="What's Editoria ?" buttonText="Try it out now !">
          Editoria an IDE allowing you to code with your mates anytime, anywhere
          !
        </Section>
        <Image
          src="/public/homePicture.png"
          alt="home picture"
          width={200}
          height={200}
        />
      </Flex>
      <Box fontSize="2.5vw" m="14vw 10.8vw 0 11.2vw">
        Most popular projects
      </Box>
      <Box ml="11.6vw">
        {indexMock.map((e, idx) => (
          <Tile
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
        <SubmitButton
          onClick={() => alert("redirecting to IDE...")}
          icon={<ArrowDownIcon width="0.8vw" />}
        >
          See all projects
        </SubmitButton>
      </Flex>
      <Footer />
    </Box>
  );
}
