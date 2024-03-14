import { Box, Flex, FormControl, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/layout";
import { Form, Formik } from "formik";
import InputForm from "../components/input";
import SubmitButton from "../lib/submitButton";

export default function SignUp() {
  return (
    <Layout>
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
          <Formik
            initialValues={{ username: "", email: "", password: "" }}
            onSubmit={() => {}}
          >
            <Form>
              <Flex className="section_input">
                <FormControl isRequired mb="25px">
                  <InputForm
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <FormControl
                  textAlign="center"
                  mt="20px"
                  className="form_control_button"
                >
                  <SubmitButton w="7vw" bg="#1574EF">
                    <Text>Sign Up</Text>
                  </SubmitButton>
                </FormControl>
              </Flex>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Layout>
  );
}
