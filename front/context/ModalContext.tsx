import { createContext, ReactNode, useContext, useState } from 'react';

type ModalContextType = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const defaultValue: ModalContextType = {
    isOpen: false,
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

    const openModal = () => {
        console.log("Ouvrir Modal");
        setIsOpen(true);
    };

    const closeModal = () => {
        console.log("Fermer Modal");
        setIsOpen(false);
    };


    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
