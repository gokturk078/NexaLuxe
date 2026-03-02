"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    isContactModalOpen: boolean;
    modalData: {
        title?: string;
        subtitle?: string;
        context?: string;
    };
    openContactModal: (data?: { title?: string; subtitle?: string; context?: string }) => void;
    closeContactModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [modalData, setModalData] = useState<{ title?: string; subtitle?: string; context?: string }>({});

    const openContactModal = (data?: { title?: string; subtitle?: string; context?: string }) => {
        setModalData(data || {});
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isContactModalOpen, modalData, openContactModal, closeContactModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModals = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModals must be used within a ModalProvider");
    }
    return context;
};
