// import { useRouter } from "next/router";
// import { Form, Formik } from "formik";
// // import * as Yup from "yup";
// import { gql, useMutation } from "@apollo/client";
// import { useState } from "react";
// import {
//   SignUpFormMutation,
//   SignUpFormMutationVariables,
// } from "../gql/graphql";
// import {
//   Box,
//   Flex,
//   FormControl,
//   FormErrorMessage,
//   Heading,
//   Link,
//   Text,
// } from "@chakra-ui/react";
// import SubmitButton from "../lib/submitButton";
// import InputForm from "../components/input";
// import Layout from "../components/layout";

// const SIGN_UP_FORM = gql`
//   mutation SignUpForm($email: String!, $username: String!, $password: String!) {
//     signUp(email: $email, username: $username, password: $password) {
//       email
//     }
//   }
// `;

// export default function SignUp() {
//   const [formData, setFormData] = useState<SignUpFormMutationVariables>({
//     email: "",
//     username: "",
//     password: "",
//     description: "",
//   });

//   const router = useRouter();

//   const updateFormData = (
//     partialFormData: Partial<SignUpFormMutationVariables>
//   ) => {
//     setFormData({ ...formData, ...partialFormData });
//   };

//   const [signUpMutation, { error }] = useMutation<
//     SignUpFormMutation,
//     SignUpFormMutationVariables
//   >(SIGN_UP_FORM);

//   const signUpForm = async () => {
//     //console.log("Formulaire soumis !");
//     //console.log("Données du formulaire :", formData);

//     const { data } = await signUpMutation({
//       variables: formData,
//     });

//     //console.log("Réponse de l'API :", data);

//     if (data && data.signUp) {
//       console.log("L'inscription a réussi !");
//       console.log("Données de l'utilisateur inscrit :", data.signUp);
//       router.push({
//         pathname: "/sign-in",
//         query: { email: formData.email },
//       });
//     }
//   };

//   /*const SignUpSchema = Yup.object().shape({
//     email: Yup.string().email("Invalid email"),
//     password: Yup.string().min(12, "Password must be at least 12 characters"),
//   });*/

//   return (
//     <Layout>
//       <Box className="box">
//         <Box className="header_form_pages">
//           <Heading
//             fontFamily="montserratExtraBold"
//             size="lg"
//             mb="40px"
//             textAlign="center"
//           >
//             Sign up with us!
//           </Heading>
//           <Box w="25%">
//             <Formik
//               initialValues={{ username: "", email: "", password: "" }}
//               onSubmit={() => {
//                 signUpForm();
//               }}
//             >
//               <Form>
//                 <Flex className="section_input">
//                   <FormControl isRequired mb="25px">
//                     <InputForm
//                       placeholder="Pseudo"
//                       type="text"
//                       name="username"
//                       onChange={(e) => {
//                         updateFormData({ username: e.target.value });
//                       }}
//                     />
//                   </FormControl>
//                   <FormControl isRequired mb="25px">
//                     <InputForm
//                       placeholder="Email"
//                       type="email"
//                       name="email"
//                       onChange={(e) => {
//                         updateFormData({ email: e.target.value });
//                       }}
//                     />
//                   </FormControl>
//                   <FormControl isRequired mb="8px">
//                     <InputForm
//                       placeholder="Password"
//                       type="password"
//                       name="password"
//                       onChange={(e) => {
//                         updateFormData({ password: e.target.value });
//                       }}
//                     />
//                   </FormControl>
//                   <FormControl
//                     textAlign="center"
//                     mt="20px"
//                     className="
//                   form_control_button"
//                   >
//                     <SubmitButton w="7vw" bg="#1574EF">
//                       <Text>Sign Up</Text>
//                     </SubmitButton>
//                     {error && error.message}
//                   </FormControl>
//                 </Flex>
//               </Form>
//             </Formik>
//           </Box>
//         </Box>
//       </Box>
//     </Layout>
//   );
// }

import { useRouter } from "next/router";
import { Form, Formik } from "formik";
// import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  SignUpFormMutation,
  SignUpFormMutationVariables,
} from "../gql/graphql";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import SubmitButton from "../lib/submitButton";
import InputForm from "../components/input";
import Layout from "../components/layout";

export default function SignUp() {
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
            <Formik
              initialValues={{ username: "", email: "", password: "" }}
              onSubmit={() => {}}
            >
              <Form>
                <Flex className="section_input">
                  <FormControl isRequired mb="25px">
                    <InputForm
                      placeholder="Pseudo"
                      type="text"
                      name="username"
                    />
                  </FormControl>
                  <FormControl isRequired mb="25px">
                    <InputForm placeholder="Email" type="email" name="email" />
                  </FormControl>
                  <FormControl isRequired mb="8px">
                    <InputForm
                      placeholder="Password"
                      type="password"
                      name="password"
                    />
                  </FormControl>
                  <FormControl
                    textAlign="center"
                    mt="20px"
                    className="
                  form_control_button"
                  >
                    <SubmitButton w="7vw" bg="#1574EF">
                      <Text>Sign Up</Text>
                    </SubmitButton>
                  </FormControl>
                </Flex>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
