import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, useToast } from "@chakra-ui/react";

export const useSettingsFormik = (user: any) => {
  const toast = useToast();

  const validationSchema = Yup.object({
    username: Yup.string().required("Pseudonyme non renseigné"),
    email: Yup.string()
      .email("Email non valide")
      .required("Email non renseigné"),
    password: Yup.string(),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      "Les mots de passes doivent être identiques"
    ),
    description: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      //if (values?.image?.includes("/")) values.image = null;
      try {
        console.log(values);
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
      } catch (error) {
        console.log(error);
      }
    },
  });

  /*useEffect(() => {
    formik.setValues(user);
  }, [user]);*/

  return formik;
};
