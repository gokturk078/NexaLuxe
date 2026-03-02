"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const GlassCard = ({ children, className, noPadding, ...props }: GlassCardProps) => {
    return (
        <motion.div
            className={cn(
                "glass-card overflow-hidden transition-colors hover:border-white/10",
                !noPadding && "p-6 md:p-8",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
