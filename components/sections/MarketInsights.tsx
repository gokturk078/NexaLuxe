"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, ArrowUpRight, ShieldCheck, Globe } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const METRICS = [
    {
        key: "capitalAppreciation",
        value: "15-25%",
        icon: TrendingUp,
        color: "text-emerald-400"
    },
    {
        key: "rentalYield",
        value: "8-12%",
        icon: BarChart3,
        color: "text-blue-400"
    },
    {
        key: "marketCapital",
        value: "£4.2B",
        icon: Globe,
        color: "text-gold"
    }
];

export default function MarketInsights() {
    const t = useTranslations("marketInsights");

    const points = [
        t("points.0"),
        t("points.1"),
        t("points.2"),
        t("points.3")
    ];

    return (
        <section className="py-24 bg-bg-primary relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div>
                            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4 block">{t("tag")}</span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">{t("title")}</h2>
                            <p className="text-text-secondary leading-relaxed text-lg">
                                {t("description")}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 text-sm text-text-primary"
                                >
                                    <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                                    <span>{point}</span>
                                </motion.div>
                            ))}
                        </div>

                        <GlassCard className="p-6 border-gold/20 bg-gold/5 inline-flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-gold" />
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-white">{t("institutionalBacking")}</div>
                                <div className="text-[10px] text-text-secondary uppercase">{t("auditNote")}</div>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {METRICS.map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={i === 0 ? "md:col-span-2" : ""}
                            >
                                <GlassCard className="p-8 h-full flex flex-col justify-between group transition-all hover:bg-white/10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center">
                                            <metric.icon className={cn("h-6 w-6", metric.color)} />
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-white/20 group-hover:text-gold transition-colors" />
                                    </div>
                                    <div>
                                        <div className="text-5xl font-serif font-bold text-white mb-2">{metric.value}</div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-text-primary">{t(`metrics.${metric.key}.title`)}</div>
                                        <div className="text-[10px] text-text-secondary uppercase mt-1">{t(`metrics.${metric.key}.sub`)}</div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
