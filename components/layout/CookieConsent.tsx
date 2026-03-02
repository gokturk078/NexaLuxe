"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
    const t = useTranslations("footer");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 lg:bottom-8 left-6 right-6 lg:left-8 lg:right-auto lg:max-w-md z-[90]"
                >
                    <div className="rounded-2xl border border-white/10 bg-bg-secondary/90 p-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-text-primary">
                                    Cookie Preferences
                                </h4>
                                <p className="text-xs leading-relaxed text-text-secondary">
                                    We use cookies to enhance your experience, analyze site traffic, and serve targeted ads for premium properties.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={acceptAll}
                                className="flex-1 rounded-full bg-gold py-3 text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:bg-gold-light active:scale-95"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-[10px] font-bold uppercase tracking-widest text-text-primary transition-all hover:bg-white/10 active:scale-95"
                            >
                                Preferences
                            </button>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-text-secondary hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
