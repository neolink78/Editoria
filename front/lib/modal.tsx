import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
}
const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children
}: ConfirmModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#1d222a" color="white">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button bg="#1d222a" color="white" mr={3} _hover={{ bg: "#1574EF", color: "white" }}
                        onClick={onClose}>
                        Annuler
                    </Button>
                    <Button colorScheme="red" onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        Confirmer
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmModal;
