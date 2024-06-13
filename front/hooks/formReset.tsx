import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
  ResetUserMutation,
  ResetUserMutationVariables
} from "../gql/graphql";
import { useState } from "react";

const RESET_EMAIL_FORM = gql`
  mutation ResetUser($email: String!) {
    ResetUser(email: $email) {
      email
      username
      id
    }
  }
`;

const RESET_PASSWORD_FORM = gql`
  mutation ResetPassword($newPassword: String!) {
    ResetPassword(newPassword: $newPassword) {
      email
      id
      username
    }
  }
`;

export const useResetFormik = (isEmail: boolean) => {
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);

  const [ResetEmailMutation] = useMutation<
    ResetUserMutation,
    ResetUserMutationVariables
  >(RESET_EMAIL_FORM);

  const [ResetPasswordMutation] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_FORM);

  const validationSchema = isEmail
    ? Yup.object({
        email: Yup.string().email("Invalid email").required("Email required")
      })
    : Yup.object({
        password: Yup.string()
          .required("Password required")
          .min(12, "The password is too short"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords do not match")
          .required("Password confirmation not entered")
      });

  const onSubmit = async () => {
    if (isEmail) {
      try {
        const { data } = await ResetEmailMutation({
          variables: {
            email: formik.values.email
          }
        });
        if (data && data.ResetUser) {
          setShowMessage(true);
        }
      } catch (error: any) {
        formik.setErrors({
          email: "Wrong email"
        });
      }
    } else {
      const { data } = await ResetPasswordMutation({
        variables: {
          newPassword: formik.values.password
        }
      });

      if (data && data.ResetPassword) {
        router.push(`/sign-in`);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema,
    onSubmit
  });
  return { formik, showMessage };
};
