"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";

const ScrollToTop = () => {
    const { isAtTop } = useScrollDirection();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(!isAtTop);
    }, [isAtTop]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-28 right-8 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-bg-secondary/80 text-gold backdrop-blur-md shadow-2xl transition-all hover:bg-gold hover:text-black active:scale-95"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
