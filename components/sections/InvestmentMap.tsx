"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Landmark, Waves } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ZONES = [
    {
        id: "iskele",
        key: "iskele",
        growth: "+45%",
        icon: TrendingUp,
        color: "brand-blue",
        pos: { top: "40%", left: "75%" }
    },
    {
        id: "kyrenia",
        key: "kyrenia",
        growth: "+28%",
        icon: Landmark,
        color: "gold",
        pos: { top: "35%", left: "45%" }
    },
    {
        id: "esentepe",
        key: "esentepe",
        growth: "+35%",
        icon: Waves,
        color: "emerald",
        pos: { top: "30%", left: "60%" }
    }
];

export default function InvestmentMap() {
    const t = useTranslations("investmentMap");
    const [activeZone, setActiveZone] = useState(ZONES[0]);

    return (
        <section className="py-24 bg-bg-primary relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4 block"
                    >
                        {t("tag")}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="font-serif text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary max-w-2xl mx-auto"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Visual Map (Stylized) */}
                    <div className="lg:col-span-8 relative aspect-[16/9] bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden group">
                        {/* Fake Map Texture */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

                        {/* Stylized Island Shape (Abstract) */}
                        <svg className="absolute inset-0 w-full h-full opacity-10 text-gold" viewBox="0 0 800 400" fill="currentColor">
                            <path d="M100,200 Q150,150 250,180 T400,160 T600,140 T750,180 Q650,250 500,220 T250,250 T100,200" />
                        </svg>

                        {/* Interactive Markers */}
                        {ZONES.map((zone) => (
                            <button
                                key={zone.id}
                                onClick={() => setActiveZone(zone)}
                                className="absolute transition-transform hover:scale-125 z-10 group/marker"
                                style={{ ...zone.pos }}
                            >
                                <div className={cn(
                                    "relative flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-500",
                                    activeZone.id === zone.id ? "bg-gold border-white scale-125 shadow-[0_0_30px_rgba(197,160,89,0.5)]" : "bg-black/40 border-gold/40"
                                )}>
                                    <zone.icon className={cn(
                                        "h-5 w-5 transition-colors",
                                        activeZone.id === zone.id ? "text-black" : "text-gold"
                                    )} />

                                    {/* Pulse Effect */}
                                    {activeZone.id === zone.id && (
                                        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
                                    )}
                                </div>
                                <span className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover/marker:text-white transition-colors">
                                    {t(`zones.${zone.key}.name`)}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Zone Intel Card */}
                    <div className="lg:col-span-4 h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeZone.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="h-full"
                            >
                                <GlassCard className={cn("p-10 h-full flex flex-col justify-center border-l-4 transition-all duration-500",
                                    activeZone.id === 'iskele' ? "border-l-blue-500" :
                                        activeZone.id === 'kyrenia' ? "border-l-gold" : "border-l-emerald-500"
                                )}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center">
                                            <activeZone.icon className="h-7 w-7 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-2xl font-bold text-white">{t(`zones.${activeZone.key}.name`)}</h3>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{t(`zones.${activeZone.key}.type`)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-8 flex-grow">
                                        <div>
                                            <div className="flex items-end gap-2 mb-2">
                                                <span className="font-serif text-5xl font-bold text-white tracking-tighter">{activeZone.growth}</span>
                                                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">{t("annualGrowth")}</span>
                                            </div>
                                            <p className="text-text-secondary leading-relaxed">
                                                {t(`zones.${activeZone.key}.description`)}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">{t("status")}</div>
                                                <div className="text-xs font-bold text-white uppercase">{t("statuses.highVelocity")}</div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">{t("riskProfile")}</div>
                                                <div className="text-xs font-bold text-white uppercase">{t("risks.lowModerate")}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="mt-10 group flex items-center gap-3 text-gold font-bold uppercase tracking-widest text-[10px]">
                                        <span>{t("viewProperties")}</span>
                                        <div className="h-px w-8 bg-gold transition-all group-hover:w-12" />
                                    </button>
                                </GlassCard>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
