"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    tag: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

const SectionHeading = ({ tag, title, subtitle, centered = true, className }: SectionHeadingProps) => {
    return (
        <div className={cn("mb-16", centered ? "text-center" : "text-left", className)}>
            <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-gold"
            >
                — {tag} —
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-6 font-serif text-4xl md:text-5xl font-semibold text-text-primary leading-tight"
                dangerouslySetInnerHTML={{ __html: title }}
            />
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={cn("text-text-secondary max-w-2xl", centered ? "mx-auto" : "")}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeading;
