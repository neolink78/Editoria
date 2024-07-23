import SubmitButton from "@/lib/submitButton";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import InputForm from "./input";
import { useSignInFormik } from "@/hooks/form";
import { useAuth } from "@/context/UserContext";

function LoginModal({ closeModal }: { closeModal: () => void }) {
  const formik = useSignInFormik({ isLogin: false, editor: true });
  const { user } = useAuth();

  if (user) {
    closeModal();
  }

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      position={"absolute"}
      backgroundColor={"red"}
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={999}
      background={"rgba(0, 0, 0, 0.5)"}
      backdropFilter={"blur(2px)"}
      onClick={(e) => {
        e.target === e.currentTarget && closeModal();
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="w-1/4 bg-[#2F3138] p-10 rounded-lg"
      >
        <Heading
          fontFamily="montserratExtraBold"
          size="lg"
          mb="40px"
          textAlign="center"
          color={"#fff"}
        >
          Sign in
        </Heading>
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
            isInvalid={!!formik.errors.password && formik.touched.password}
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
              <Text data-testid="sign-in">Sign In</Text>
            </SubmitButton>
          </FormControl>
        </Flex>
      </form>
    </Flex>
  );
}

export default LoginModal;
