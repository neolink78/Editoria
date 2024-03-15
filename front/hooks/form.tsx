import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { SignUpMutation, SignUpMutationVariables } from "../gql/graphql";

const SIGN_UP_FORM = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      email
    }
  }
`;

export const useSignInFormik = (isLogin: boolean) => {
  const router = useRouter();

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_FORM
  );

  const validationSchema = isLogin
    ? Yup.object({
        email: Yup.string()
          .email("Invalid email")
          .required("Email not specified"),
        password: Yup.string().required("Password not specified"),
      })
    : Yup.object({
        username: Yup.string().required("Username not specified"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email not specified"),
        password: Yup.string().required("Password not specified"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Password confirmation not entered"),
      });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async () => {
      const { data } = await signUpMutation({
        variables: {
          email: formik.values.email,
          username: formik.values.username,
          password: formik.values.password,
        },
      });

      if (data && data.signUp) {
        router.push(
          `/sign-in?email=${encodeURIComponent(formik.values.email)}`
        );
      }
    },
  });
  return formik;
};
