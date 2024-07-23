import SubmitButton from "@/lib/submitButton";
import { Flex, Text, Box } from "@chakra-ui/react";
import React from "react";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
      backdropFilter="blur(2px)"
    >
      <Box className="bg-[#2F3138] p-10 rounded-lg">
        <Text fontSize="lg" fontWeight="bold" paddingBottom={"8px"}>
          Delete account
        </Text>
        <Text paddingBottom={"16px"}>
          Are you sure you want to delete your account?
        </Text>
        <Flex justify="flex-end" gap={4}>
          <SubmitButton onClick={onClose}>Cancel</SubmitButton>
          <SubmitButton bg="#1574EF" onClick={onConfirm}>
            Confirm
          </SubmitButton>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DeleteModal;
