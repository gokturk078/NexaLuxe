"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Phone } from "lucide-react";
import { useModals } from "@/context/ModalContext";

const ROICalculator = () => {
    const t = useTranslations("roiCalculator");
    const locale = useLocale();
    const { openContactModal } = useModals();

    const [propertyPrice, setPropertyPrice] = useState(500000);
    const [rentalYield, setRentalYield] = useState(8);
    const [appreciation, setAppreciation] = useState(12);
    const [years, setYears] = useState(5);

    const [results, setResults] = useState({
        totalRental: 0,
        futureValue: 0,
        totalReturn: 0,
        roiPercentage: 0
    });

    useEffect(() => {
        const calculateROI = () => {
            const annualRental = propertyPrice * (rentalYield / 100);
            const totalRental = annualRental * years;
            const futureValue = propertyPrice * Math.pow(1 + (appreciation / 100), years);
            const capitalGain = futureValue - propertyPrice;
            const totalReturn = totalRental + capitalGain;
            const roiPercentage = (totalReturn / propertyPrice) * 100;

            setResults({
                totalRental: Math.round(totalRental),
                futureValue: Math.round(futureValue),
                totalReturn: Math.round(totalReturn),
                roiPercentage: Math.round(roiPercentage * 10) / 10
            });
        };

        calculateROI();
    }, [propertyPrice, rentalYield, appreciation, years]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale === 'de' ? 'de-DE' : 'en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(value);
    };

    const handleContact = () => {
        openContactModal({
            title: t("discussPotential"),
            subtitle: `Discuss your ${formatCurrency(propertyPrice)} investment plan with our specialists.`,
            context: `ROI Analysis for ${formatCurrency(propertyPrice)} over ${years} years`
        });
    };

    return (
        <section id="calculator" className="py-24 bg-bg-primary">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    tag={t("tag")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
                    {/* Input Side */}
                    <GlassCard className="p-8 lg:p-12">
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                                        {t("propertyPrice")}
                                    </label>
                                    <span className="text-xl font-serif font-bold text-gold">
                                        {formatCurrency(propertyPrice)}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="100000"
                                    max="5000000"
                                    step="50000"
                                    value={propertyPrice}
                                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                                    className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-gold"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                                    <span>£100k</span>
                                    <span>£5M</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                                        {t("rentalYield")}
                                    </label>
                                    <span className="text-xl font-serif font-bold text-gold">
                                        %{rentalYield}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="4"
                                    max="15"
                                    step="0.5"
                                    value={rentalYield}
                                    onChange={(e) => setRentalYield(Number(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                                    <span>%4</span>
                                    <span>%15</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                                        {t("appreciation")}
                                    </label>
                                    <span className="text-xl font-serif font-bold text-gold">
                                        %{appreciation}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="1"
                                    value={appreciation}
                                    onChange={(e) => setAppreciation(Number(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                                />
                                <div className="flex justify-between mt-2 text-[10px] text-text-secondary font-bold uppercase tracking-widest">
                                    <span>%0</span>
                                    <span>%20</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-4">
                                    <label className="text-sm font-bold uppercase tracking-widest text-text-secondary">
                                        {t("years")}
                                    </label>
                                    <span className="text-xl font-serif font-bold text-gold">
                                        {years}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {[1, 3, 5, 10].map((y) => (
                                        <button
                                            key={y}
                                            onClick={() => setYears(y)}
                                            className={cn(
                                                "flex-1 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all",
                                                years === y
                                                    ? "bg-gold border-gold text-black"
                                                    : "bg-white/5 border-white/10 text-text-secondary hover:border-white/30"
                                            )}
                                        >
                                            {y} {t("yearUnit")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Result Side */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={years + propertyPrice}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <GlassCard className={cn(
                                "p-8 lg:p-12 h-full flex flex-col justify-between transition-all duration-500",
                                results.roiPercentage > 50 ? "bg-gold/10 border-gold/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]" : "bg-gold/5 border-gold/20"
                            )}>
                                <div className="space-y-12">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                                            <Calculator className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-1">{t("estimatedReturn")}</h4>
                                            <p className="text-sm text-text-secondary">{t("basedOnData")}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t("results.totalRentalIncome")}</span>
                                            <p className="text-2xl font-serif font-bold text-white">{formatCurrency(results.totalRental)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t("results.propertyValueAfter")}</span>
                                            <p className="text-2xl font-serif font-bold text-white">{formatCurrency(results.futureValue)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t("results.totalReturn")}</span>
                                            <p className="text-3xl font-serif font-bold text-gold">{formatCurrency(results.totalReturn)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">{t("results.roiPercentage")}</span>
                                            <p className="text-3xl font-serif font-bold text-accent-green">%{results.roiPercentage.toFixed(1)}</p>
                                        </div>
                                    </div>

                                    <p className="text-[10px] text-text-secondary italic leading-relaxed">
                                        {t("results.disclaimer")}
                                    </p>
                                </div>

                                <button
                                    onClick={handleContact}
                                    className="w-full mt-12 group flex items-center justify-center gap-4 bg-gold py-5 rounded-full text-black font-bold uppercase tracking-widest transition-all hover:bg-gold-light hover:scale-105 active:scale-95"
                                >
                                    <Phone className="w-4 h-4 fill-current transition-transform group-hover:rotate-12" />
                                    {t("discussPotential")}
                                </button>

                                <button
                                    onClick={() => {
                                        const message = encodeURIComponent(`Nexa Luxe ROI Analysis:
Property: ${formatCurrency(propertyPrice)}
Rental Income: ${formatCurrency(results.totalRental)}
Future Value: ${formatCurrency(results.futureValue)}
Total ROI: %${results.roiPercentage}
Years: ${years}`);
                                        window.open(`https://wa.me/905338000000?text=${message}`, '_blank');
                                    }}
                                    className="w-full mt-4 group flex items-center justify-center gap-4 border border-white/20 py-4 rounded-full text-text-primary text-xs font-bold uppercase tracking-widest transition-all hover:border-gold/50 hover:text-gold"
                                >
                                    {locale === 'tr' ? 'SONUCU PAYLAŞ' : locale === 'ru' ? 'ПОДЕЛИТЬСЯ' : locale === 'de' ? 'ERGEBNIS TEILEN' : 'SHARE MY RESULT'}
                                </button>
                            </GlassCard>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default ROICalculator;
