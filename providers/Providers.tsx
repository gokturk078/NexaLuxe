"use client";

import React from "react";
import { Toaster } from "sonner";
import { ModalProvider, useModals } from "@/context/ModalContext";
import ContactModal from "@/components/ui/ContactModal";

function GlobalModals() {
    const { isContactModalOpen, closeContactModal, modalData } = useModals();
    return (
        <ContactModal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
            {...modalData}
        />
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
            <GlobalModals />
            <Toaster
                position="top-right"
                expand={true}
                richColors
                theme="dark"
                toastOptions={{
                    style: {
                        background: 'rgba(18, 18, 26, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#F5F1EB',
                    },
                }}
            />
        </ModalProvider>
    );
}
