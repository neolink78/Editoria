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
import { useRouter } from "next/router";
import Link from "next/link";

export default function SignIn() {
  const formik = useSignInFormik({ isLogin: true });
  const router = useRouter();

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
            Sign in & get started with us!
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
                  mb="5px"
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
                <Link href="/sign-up">
                  <Text
                    fontSize="sm"
                    textDecoration="underline"
                    color="rgba(255, 255, 255, 0.5)"
                  >
                    I do not have an account yet
                  </Text>
                </Link>
                <Link href="reset/email">
                  <Text
                    fontSize="sm"
                    textDecoration="underline"
                    color="rgba(255, 255, 255, 0.5)"
                    mb="15px"
                  >
                    I forgot my password
                  </Text>
                </Link>
                <FormControl
                  textAlign="center"
                  mt="20px"
                  className="form_control_button"
                >
                  <SubmitButton bg="#1574EF" type="submit">
                    <Text data-testid="sign-in-button">Sign In</Text>
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
