import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  SignInMutation,
  SignInMutationVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from "../gql/graphql";

export const SIGN_UP_FORM = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      email
    }
  }
`;

export const SIGN_IN_FORM = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      description
      email
      id
      username
    }
  }
`;

export const useSignInFormik = (isLogin: boolean) => {
  const router = useRouter();

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_FORM
  );

  const [signInMutation] = useMutation<SignInMutation, SignInMutationVariables>(
    SIGN_IN_FORM
  );

  const validationSchema = isLogin
    ? Yup.object({
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().required("Password required"),
      })
    : Yup.object({
        username: Yup.string().required("Username required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string()
          .required("Password required")
          .min(12, "The password is too short"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Password confirmation not entered"),
      });

  const onSubmit = async () => {
    if (isLogin) {
      try {
        const { data } = await signInMutation({
          variables: {
            email: formik.values.email,
            password: formik.values.password,
          },
        });
        if (data && data.signIn) {
          router.push(`/user/account`);
        }
      } catch (error: any) {
        formik.setErrors({
          email: "Wrong email or password",
          password: "Wrong email or password",
        });
      }
    } else {
      const { data } = await signUpMutation({
        variables: {
          email: formik.values.email,
          username: formik.values.username,
          password: formik.values.password,
        },
      });

      if (data && data.signUp) {
        const signInData = await signInMutation({
          variables: {
            email: formik.values.email,
            password: formik.values.password,
          },
        });
        if (signInData && signInData.data?.signIn) {
          router.push(`/user/account`);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit,
  });
  return formik;
};
