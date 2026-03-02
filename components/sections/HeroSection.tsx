"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Play, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useModals } from "@/context/ModalContext";

const HeroSection = () => {
    const t = useTranslations("hero");
    const locale = useLocale();
    const [videoError, setVideoError] = useState(false);
    const { openContactModal } = useModals();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" as const },
        },
    };

    const scrollToPortfolio = () => {
        document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleVirtualTour = () => {
        openContactModal({
            title: t("virtualTourTitle"),
            subtitle: t("virtualTourSubtitle"),
            context: "Virtual Tour Access"
        });
    };

    return (
        <section className="relative min-h-[90vh] lg:min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {!videoError ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() => setVideoError(true)}
                        className="h-full w-full object-cover"
                    >
                        <source
                            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-house-with-a-swimming-pool-under-the-sun-4422-large.mp4"
                            type="video/mp4"
                        />
                    </video>
                ) : (
                    <Image
                        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
                        alt="Luxury Mediterranean Villa"
                        fill
                        priority
                        quality={90}
                        sizes="100vw"
                        className="object-cover"
                    />
                )}

                {/* Overlay Layers */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent opacity-60" />
            </div>

            {/* Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:text-left w-full pt-20"
            >
                <motion.div variants={itemVariants} className="mb-6 flex justify-center lg:justify-start">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-gold">
                            {t("badge")}
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-[0.95] text-text-primary mb-8 tracking-tight"
                >
                    {t("titleLine1")}<br />
                    <span className="text-gold italic font-normal">{t("titleLine2")}</span> {t("titleLine3")}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mx-auto lg:mx-0 max-w-2xl font-sans text-lg md:text-xl text-text-secondary leading-relaxed mb-12 opacity-80"
                >
                    {t("subtitle")}
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 mb-16">
                    <button
                        onClick={scrollToPortfolio}
                        className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-5 transition-all hover:bg-gold-light hover:scale-105 active:scale-95 w-full sm:w-auto text-black font-bold uppercase tracking-widest text-xs"
                    >
                        {t("ctaPrimary")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                        onClick={handleVirtualTour}
                        className="group flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-10 py-5 text-text-primary transition-all hover:border-gold/50 hover:text-gold w-full sm:w-auto text-xs font-bold uppercase tracking-widest"
                    >
                        <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                        {t("ctaSecondary")}
                    </button>
                </motion.div>

                {/* Market Snapshot Bar */}
                <motion.div
                    variants={itemVariants}
                    className="hidden lg:flex items-center gap-12 border-t border-white/10 pt-8"
                >
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{locale === 'tr' ? 'AKTİF YATIRIMCI' : locale === 'ru' ? 'АКТИВНЫЕ ИНВЕСТОРЫ' : locale === 'de' ? 'AKTIVE INVESTOREN' : 'ACTIVE INVESTORS'}</p>
                        <p className="text-2xl font-serif font-light text-white">2,400+</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{locale === 'tr' ? 'ORTALAMA ROI' : locale === 'ru' ? 'СРЕДНИЙ ROI' : locale === 'de' ? 'DURCHSCHN. ROI' : 'AVERAGE ROI'}</p>
                        <p className="text-2xl font-serif font-light text-white">12.4%</p>
                    </div>
                    <div className="h-8 w-[1px] bg-white/10" />
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{locale === 'tr' ? 'YILLIK BÜYÜME' : locale === 'ru' ? 'ГОДОВОЙ РОСТ' : locale === 'de' ? 'JÄHRL. WACHSTUM' : 'ANNUAL GROWTH'}</p>
                        <p className="text-2xl font-serif font-light text-white">18.2%</p>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden md:block">{t("scrollDown")}</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="h-6 w-6" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
