import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import SubmitButton from "../lib/submitButton";
import InputForm from "../components/input";

export default function SignIn() {
  return (
    <Box height="100vh">
      <Box className="header_form_pages">
        <Heading
          fontFamily="montserratExtraBold"
          size="lg"
          mb="40px"
          textAlign="center"
        >
          Sign in & get started with us!
        </Heading>
        <Flex className="section_input" w="25%">
          <Box mb="25px">
            <InputForm placeholder="Email" type="email" />
          </Box>
          <Box mb="8px">
            <InputForm placeholder="Password" type="password" />
          </Box>
          <Link
            href="/sign-up"
            mb="8px"
            textDecoration="underline"
            fontSize="14px"
          >
            I do not have an account yet
          </Link>
          <Link textDecoration="underline" fontSize="14px">
            I forgot my password
          </Link>
          <Box textAlign="center" mt="20px">
            <SubmitButton>
              <Text fontSize="sm" color="#FBFBFB">
                Sign In
              </Text>
            </SubmitButton>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
