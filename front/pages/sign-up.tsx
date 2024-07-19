import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Text,
} from "@chakra-ui/react";
import Layout from "../components/layout";
import InputForm from "../components/input";
import SubmitButton from "../lib/submitButton";
import { useSignInFormik } from "../hooks/form";

export default function SignUp() {
  const formik = useSignInFormik({ isLogin: false });

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
                <FormControl
                  mb="25px"
                  isInvalid={
                    !!formik.errors.username && formik.touched.username
                  }
                >
                  <InputForm
                    placeholder="Pseudo"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onFocus={formik.handleBlur}
                    value={formik.values.username}
                  />
                  <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                </FormControl>
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
                  mb="25px"
                  isInvalid={
                    !!formik.errors.password && formik.touched.password
                  }
                >
                  <InputForm
                    placeholder="Password"
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
                    !!formik.errors.confirmPassword && formik.touched.password
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
                  mt="20px"
                  className="form_control_button"
                >
                  <SubmitButton w="7vw" bg="#1574EF" type="submit">
                    <Text data-testid="sign-up-button">Sign Up</Text>
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
