import UserIcon from "../icons/userIcon";
import Section from "../components/section";
import { Flex, Box, Input } from "@chakra-ui/react";
import Image from "next/image";
import SubmitButton from "../components/submitButton";
import ArrowDownIcon from "../icons/arrowDownIcon";

export default function HomePage() {
  return (
    <Box bg="#14181F" color="white">
      <Flex className="header_home_page">
        EDITORIA
        <Flex gap='0.9vw'>
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
      <Flex mt='6.5vw' justifyContent='center' gap='25vw' alignItems='center' >
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
      <Flex justifyContent='space-between' alignItems='center' m='14vw 10.8vw 0 11.2vw'>
        <Box fontSize='2.5vw'>Most popular projects</Box> 
        <Input bg='white' placeholder="search anything" w='28.5vw' borderRadius='3vw' />
      </Flex>
    </Box>
  );
}
