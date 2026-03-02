"use client";

import React from "react";
import { motion } from "framer-motion";

const TrustBar = () => {
    const logos = [
        "Cyprus Property News",
        "Mediterranean Weekly",
        "BBC Travel",
        "Sunday Times Property",
        "Bloomberg Invest",
        "Reuters Real Estate",
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 0.4, y: 0 },
    };

    return (
        <section className="py-12 border-b border-white/5 bg-bg-primary overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary">
                    As Featured In & Trusted By
                </p>

                {/* Desktop View */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="hidden md:flex flex-wrap items-center justify-center gap-8 md:gap-16"
                >
                    {logos.map((logo, index) => (
                        <motion.span
                            key={index}
                            variants={itemVariants}
                            whileHover={{ opacity: 1, scale: 1.05 }}
                            className="cursor-default font-serif text-lg md:text-xl font-bold italic text-text-primary transition-all"
                        >
                            {logo}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Mobile Marquee */}
                <div className="md:hidden relative flex overflow-x-hidden">
                    <motion.div
                        className="flex whitespace-nowrap gap-12 py-4"
                        animate={{ x: [0, -1035] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {[...logos, ...logos].map((logo, index) => (
                            <span
                                key={index}
                                className="font-serif text-lg font-bold italic text-text-primary opacity-40"
                            >
                                {logo}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TrustBar;
