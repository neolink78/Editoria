import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import InputForm from "../../components/input";
import SubmitButton from "../../lib/submitButton";
import { useResetFormik } from "../../hooks/formReset";

export default function GetEmail() {
  const { formik, showMessage } = useResetFormik(true);

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
            Enter your email:
          </Heading>
          <Box w="25%">
            <form onSubmit={formik.handleSubmit}>
              <Flex className="section_input">
                <FormControl
                  mb="25px"
                  isInvalid={!!formik.errors.email && formik.touched.email}
                >
                  <InputForm
                    placeholder="Email"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  textAlign="center"
                  mt="10px"
                  className="form_control_button"
                >
                  <SubmitButton bg="#1574EF" type="submit">
                    <Text>Enter</Text>
                  </SubmitButton>
                </FormControl>
                {showMessage && (
                  <Text mt="20px" textAlign="center">
                    An e-mail has been sent to the indicated address.
                  </Text>
                )}
              </Flex>
            </form>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
