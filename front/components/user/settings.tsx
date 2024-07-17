import { Box, Flex, Input, Textarea } from "@chakra-ui/react";
import SubmitButton from "../../lib/submitButton";
import PictureIcon from "../../icons/pictureIcon";
import SettingsInput from "../../lib/settingsInput";
import { useRef, useState } from "react";
import { useSettingsFormik } from "../../hooks/useSettingsFormik";

//TODO : Remove the need for having to fill the password to update user

const Settings = (user: any) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(user.user.image || "");
  console.log(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formikSettings.setFieldValue("image", file);
      console.log("IMGURL", URL.createObjectURL(file));
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (!isDisabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Flex flexDirection="column" align="flex-start" mb="5vw" mr="37.5vw">
      <Flex alignItems="center" mt="4.4vw" fontSize="2vw" gap="1vw" ml="1.4vw">
        <Box position="relative" onClick={handleImageClick} cursor="pointer">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile Pic"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
              }}
            />
          ) : (
            <PictureIcon />
          )}
          {!isDisabled && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              color="white"
              fontSize="1.5rem"
              fontWeight="bold"
            >
              +
            </Box>
          )}
        </Box>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
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
      <Box fontSize="1.5vw" fontWeight={600} mt="1.9vw" ml="1.5vw">
        Description
      </Box>
      <Textarea
        border="none"
        value={formikSettings.values.description}
        onChange={formikSettings.handleChange}
        placeholder="description"
        name="description"
        disabled={isDisabled}
        mt="0.5vw"
      />
      {/* <SettingsInput
        label="Password"
        disabled={isDisabled}
        placeholder="password"
        name="password"
        onChange={formikSettings.handleChange}
        value={formikSettings.values.password}
        error={
          formikSettings.touched.password && formikSettings.errors.password
        }
      /> */}
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
