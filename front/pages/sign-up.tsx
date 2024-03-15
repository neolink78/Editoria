import { Box, Flex, FormControl, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/layout";
import InputForm from "../components/input";
import SubmitButton from "../lib/submitButton";
import { useSignInFormik } from "../hooks/form";

export default function SignUp() {
  const formik = useSignInFormik(false);

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
            Sign up with us!
          </Heading>
          <Box w="25%">
            <form onSubmit={formik.handleSubmit}>
              <Flex className="section_input">
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Pseudo"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </FormControl>
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Email"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </FormControl>
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                </FormControl>
                <FormControl
                  textAlign="center"
                  mt="20px"
                  className="form_control_button"
                >
                  <SubmitButton w="7vw" bg="#1574EF" type="submit">
                    <Text>Sign Up</Text>
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
