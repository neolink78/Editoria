import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, useToast } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { UpdateUserMutation, UpdateUserMutationVariables } from "@/gql/graphql";

const UPDATE_USER = gql`
  mutation UpdateUser(
    $email: String!
    $username: String!
    $description: String!
    $updateUserId: ID!
    $image: String
  ) {
    updateUser(
      email: $email
      username: $username
      description: $description
      id: $updateUserId
      image: $image
    ) {
      description
      email
      username
      id
      image
    }
  }
`;

export const useSettingsFormik = (user: any) => {
  const [updateUser] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const toast = useToast();
  const validationSchema = Yup.object({
    username: Yup.string().required("Pseudonyme non renseigné"),
    email: Yup.string()
      .email("Email non valide")
      .required("Email non renseigné"),
    // password: Yup.string().required("Password non renseigné"),
    // passwordConfirmation: Yup.string().oneOf(
    //   [Yup.ref("password")],
    //   "Les mots de passes doivent être identiques",
    // ),
    description: Yup.string().optional(),
    image: Yup.string().optional(),
  });
  const formik = useFormik({
    initialValues: user.user || {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      description: "",
      image: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let imageUrl = values.image;
        if (values.image && typeof values.image !== "string") {
          const formData = new FormData();
          formData.append("file", values.image);
          const response = await fetch("/upload/", {
            method: "POST",
            body: formData,
          });
          if (!response.ok) {
            throw new Error("Error uploading file");
          }
          const data = await response.json();
          imageUrl = `/upload/${data.filename}`;
        }

        const { data: updatedUserData } = await updateUser({
          variables: {
            email: values.email,
            username: values.username,
            // password: values.password,
            description: values.description,
            updateUserId: user.user.id,
            image: imageUrl,
          },
        });
        toast({
          position: "bottom-right",
          render: () => (
            <Box
              color="white"
              p={3}
              bg="green"
              borderRadius="8px"
              fontSize="0.8rem"
            >
              Vos changements ont bien été enregistrés
            </Box>
          ),
        });
      } catch (error: any) {
        console.error("Error updating user:", error.message);

        toast({
          position: "bottom-right",
          render: () => (
            <Box
              color="white"
              p={3}
              bg="red"
              borderRadius="8px"
              fontSize="0.8rem"
            >
              {error.message}
            </Box>
          ),
        });
      }
    },
  });

  /*useEffect(() => {
    formik.setValues(user);
  }, [user]);*/

  return formik;
};
