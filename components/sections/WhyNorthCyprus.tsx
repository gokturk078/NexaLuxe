"use client";

import React from "react";
import { PiggyBank, Stamp, TrendingUp, Rocket, Sun, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { motion } from "framer-motion";

const WhyNorthCyprus = () => {
    const t = useTranslations("whyNorthCyprus");

    const reasons = [
        { icon: PiggyBank, key: "price", highlight: t("highlights.price") },
        { icon: Stamp, key: "residency", highlight: t("highlights.residency") },
        { icon: TrendingUp, key: "roi", highlight: t("highlights.roi") },
        { icon: Rocket, key: "growth", highlight: t("highlights.growth") },
        { icon: Sun, key: "lifestyle", highlight: t("highlights.lifestyle") },
        { icon: Building2, key: "infrastructure", highlight: t("highlights.infrastructure") },
    ];

    return (
        <section id="about" className="py-24 bg-bg-secondary/50">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    tag={t("tag")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <GlassCard
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-black">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <span className="font-serif text-2xl font-bold text-gold opacity-50 group-hover:opacity-100 transition-opacity">
                                        {reason.highlight}
                                    </span>
                                </div>

                                <h3 className="mb-3 font-sans text-xl font-semibold text-text-primary group-hover:text-gold transition-colors">
                                    {t(`reasons.${reason.key}.title`)}
                                </h3>
                                <p className="text-sm leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors">
                                    {t(`reasons.${reason.key}.description`)}
                                </p>

                                {/* Subtle Hover Decoration */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyNorthCyprus;
