"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500); // 1.5s splash
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg-primary"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8 font-serif text-4xl font-bold tracking-tighter"
                        >
                            <span className="text-white">NEXA</span>
                            <span className="text-gold">LUXE</span>
                        </motion.div>

                        {/* Progress Bar Container */}
                        <div className="h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                                className="h-full w-full bg-gold shadow-[0_0_15px_rgba(201,168,76,0.6)]"
                            />
                        </div>

                        {/* Minimal Text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-gold/60"
                        >
                            Defining Luxury Investment
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
