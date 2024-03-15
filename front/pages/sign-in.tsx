import { Box, Flex, FormControl, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/layout";
import InputForm from "../components/input";
import SubmitButton from "../lib/submitButton";
import { useSignInFormik } from "../hooks/form";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignUp() {
  const formik = useSignInFormik(true);
  const router = useRouter();
  const { email } = router.query;

  return (
    <Layout>
      <Box className="box">
        <Box className="header_form_pages">
          <Heading
            fontFamily="montserratExtraBold"
            size="lg"
            mb="40px"
            textAlign="center"
          >
            Sign up & get started with us!
          </Heading>
          <Box w="25%">
            <form onSubmit={formik.handleSubmit}>
              <Flex className="section_input">
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Email"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl isRequired mb="5px">
                  <InputForm
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
                <Link href="/sign-up">
                  <Text
                    fontSize="sm"
                    textDecoration="underline"
                    color="rgba(255, 255, 255, 0.5)"
                  >
                    I do not have an account yet
                  </Text>
                </Link>
                <Text
                  fontSize="sm"
                  textDecoration="underline"
                  color="rgba(255, 255, 255, 0.5)"
                  mb="15px"
                >
                  I forgot my password
                </Text>
                <FormControl
                  textAlign="center"
                  mt="20px"
                  className="form_control_button"
                >
                  <SubmitButton w="7vw" bg="#1574EF" type="submit">
                    <Text>Sign In</Text>
                  </SubmitButton>
                </FormControl>
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
