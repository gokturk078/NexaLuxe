"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const Counter = ({ value, label, prefix = "", suffix = "" }: { value: number, label: string, prefix?: string, suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });

    const displayValue = useTransform(springValue, (latest) =>
        `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
    );

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center text-center p-6">
            <motion.span className="font-serif text-4xl md:text-5xl font-bold text-gold mb-2">
                {displayValue}
            </motion.span>
            <span className="font-sans text-xs uppercase tracking-widest text-text-secondary font-medium">
                {label}
            </span>
        </div>
    );
};

const StatsCounter = () => {
    const t = useTranslations("stats");

    const stats = [
        { value: 250, label: t("properties"), suffix: "+" },
        { value: 2.1, label: t("portfolioValue"), prefix: "£", suffix: "B" }, // Using number for simple animation, manual adjustments below
        { value: 15, label: t("experience"), suffix: "+" },
        { value: 98, label: t("satisfaction"), suffix: "%" },
    ];

    return (
        <section className="py-24 bg-bg-primary relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full" />

            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-white/5 lg:divide-x border-y border-white/5 py-12">
                    {stats.map((stat, index) => (
                        <Counter
                            key={index}
                            value={stat.value}
                            label={stat.label}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
