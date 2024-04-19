import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ResetUserMutation, ResetUserMutationVariables } from "../gql/graphql";

const RESET_EMAIL_FORM = gql`
  mutation ResetUser($email: String!) {
    ResetUser(email: $email) {
      email
      username
      id
    }
  }
`;

export const useResetFormik = (isEmail: boolean) => {
  const router = useRouter();

  const [ResetEmailMutation] = useMutation<
    ResetUserMutation,
    ResetUserMutationVariables
  >(RESET_EMAIL_FORM);

  const validationSchema = isEmail
    ? Yup.object({
        email: Yup.string().email("Invalid email").required("Email required"),
      })
    : Yup.object({
        password: Yup.string()
          .required("Password required")
          .min(12, "The password is too short"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Password confirmation not entered"),
      });

  const onSubmit = async () => {
    if (isEmail) {
      try {
        const { data } = await ResetEmailMutation({
          variables: {
            email: formik.values.email,
          },
        });
        if (data && data.ResetUser) {
          router.push(`/reset/password`);
        }
      } catch (error: any) {
        formik.setErrors({
          email: "Wrong email",
        });
      }
      // } else {
      //   const { data } = await signUpMutation({
      //     variables: {
      //       email: formik.values.email,
      //       username: formik.values.username,
      //       password: formik.values.password,
      //     },
      //   });

      //   if (data && data.signUp) {
      //     const signInData = await signInMutation({
      //       variables: {
      //         email: formik.values.email,
      //         password: formik.values.password,
      //       },
      //     });
      //     if (signInData && signInData.data?.signIn) {
      //       router.push(`/sign-in`);
      //     }
      //   }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit,
  });
  return formik;
};
