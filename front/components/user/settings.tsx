import { Box, Flex, Textarea } from "@chakra-ui/react";
import SubmitButton from "../../lib/submitButton";
import PictureIcon from "../../icons/pictureIcon";
import SettingsInput from "../../lib/settingsInput";
import { useState } from "react";
import { useSettingsFormik } from "../../hooks/useSettingsFormik";

const Settings = (user: any) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const formikSettings = useSettingsFormik(user);

  const editSettings = () => {
    if (isDisabled) {
      setIsDisabled(false);
    } else if (!isDisabled) {
      formikSettings.submitForm().then(() => {
        formikSettings.isValid && setIsDisabled(true);
      });
    }
  };
  return (
    <Flex flexDirection="column" align="flex-start" mb="5vw" mr="37.5vw">
      <Flex alignItems="center" mt="4.4vw" fontSize="2vw" gap="1vw" ml="1.4vw">
        <PictureIcon />
        Your informations
        <SubmitButton onClick={() => editSettings()} w="5.5vw">
          {isDisabled ? "Edit" : "save"}
        </SubmitButton>
      </Flex>
      <SettingsInput
        label="Pseudo"
        disabled={isDisabled}
        placeholder="username"
        name="username"
        onChange={formikSettings.handleChange}
        value={formikSettings.values.username}
        error={
          formikSettings.touched.username && formikSettings.errors.username
        }
      />
      <SettingsInput
        label="Email"
        disabled={isDisabled}
        placeholder="email"
        name="email"
        onChange={formikSettings.handleChange}
        value={formikSettings.values.email}
        error={formikSettings.touched.email && formikSettings.errors.email}
      />
      <Box fontSize="1.5vw" fontWeight={600} mt="1.9vw">
        Description
      </Box>
      <Textarea
        border="none"
        pl="0"
        value={formikSettings.values.description}
        onChange={formikSettings.handleChange}
        placeholder="description"
        name="description"
        disabled={isDisabled}
      />
      <Box fontSize="1.5vw" fontWeight={600} mt="3.5vw">
        Account deletion
      </Box>
      <Box mt="0.5vw" fontSize="1.2vw" mb="1.5vw">
        In case of deletion, all your projects and personal data will be
        deleted.
      </Box>
      <SubmitButton w="16.2vw" onClick={() => alert("deleting account...")}>
        Delete my account
      </SubmitButton>
      <Box
        fontSize="1.5vw"
        fontWeight={600}
        mt="7.7vw"
        mb="1.5vw"
        onClick={() => alert("upgrading...")}
      >
        Billing
      </Box>
      <SubmitButton w="16.2vw">Upgrade to premium</SubmitButton>
    </Flex>
  );
};

export default Settings;
