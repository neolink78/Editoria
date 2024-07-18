import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useModal } from "../context/ModalContext";

const ConfirmModal: React.FC = () => {
  const { isOpen, closeModal, modalProps } = useModal();
  const { title, children, onConfirm } = modalProps;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent bg="#1d222a" color="white">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            bg="#1d222a"
            color="white"
            mr={3}
            _hover={{ bg: "#1574EF", color: "white" }}
            onClick={closeModal}
          >
            Annuler
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              onConfirm?.();
              closeModal();
            }}
          >
            Confirmer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
