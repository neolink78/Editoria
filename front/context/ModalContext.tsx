import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalProps {
    title?: string;
    children?: ReactNode;
    onConfirm?: () => void;
}

type ModalContextType = {
    isOpen: boolean;
    modalProps: ModalProps
    openModal: (props: ModalProps) => void;
    closeModal: () => void;
};

const defaultValue: ModalContextType = {
    isOpen: false,
    modalProps: {},
    openModal: () => { },
    closeModal: () => { },
};

const ModalContext = createContext<ModalContextType>(defaultValue);

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState<ModalProps>({});

    const openModal = (props: ModalProps) => {
        setModalProps(props);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalProps({});
    };

    return (
        <ModalContext.Provider value={{ isOpen, modalProps, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
