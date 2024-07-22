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

export default function ResetPassword() {
  const { formik, showMessage } = useResetFormik(false);

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
            Reset your password:
          </Heading>
          <Box w="25%">
            <form onSubmit={formik.handleSubmit}>
              <Flex className="section_input">
                <FormControl
                  mb="25px"
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                >
                  <InputForm
                    placeholder="New password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mb="25px"
                  isInvalid={
                    !!formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                  }
                >
                  <InputForm
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  <FormErrorMessage>
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  textAlign="center"
                  mt="10px"
                  className="form_control_button"
                >
                  <SubmitButton bg="#1574EF" type="submit">
                    <Text>Reset password</Text>
                  </SubmitButton>
                </FormControl>
                {showMessage && (
                  <Text mt="20px" textAlign="center">
                    The password has been changed.
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
