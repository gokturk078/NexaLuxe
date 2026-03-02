"use client";

import React from "react";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { buyingSteps } from "@/data/buying-steps";
import { MessageSquare, Map, ShieldAlert, CheckCircle, Key } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
    MessageSquare,
    Map,
    ShieldAlert,
    CheckCircle,
    Key,
};

const BuyingProcess = () => {
    const t = useTranslations("buyingProcess");

    return (
        <section id="buying-guide" className="py-24 bg-bg-secondary/30 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    tag={t("tag")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gold/10 -translate-y-1/2 hidden lg:block" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                        {buyingSteps.map((step, index) => {
                            const Icon = iconMap[step.icon];
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="flex flex-col items-center text-center group"
                                >
                                    <div className="mb-8 relative capitalize transition-transform group-hover:scale-110">
                                        <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-black font-bold text-xl relative z-10 shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                                            {step.id}
                                        </div>
                                        {/* Pulsing Aura */}
                                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gold/20 animate-ping -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="bg-bg-secondary/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm transition-all group-hover:border-gold/30 group-hover:bg-bg-secondary/80">
                                        <div className="mb-4 flex justify-center text-gold">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="mb-3 font-sans text-lg font-bold text-text-primary uppercase tracking-wide">
                                            {t(`steps.${step.id}.title`)}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-text-secondary">
                                            {t(`steps.${step.id}.description`)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={() => {
                            const element = document.getElementById("contact");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-gold px-12 py-5 font-sans text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-gold-light hover:scale-105 active:scale-95"
                    >
                        {t("cta")}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BuyingProcess;
