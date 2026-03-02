"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X, Gift, Check, ArrowRight, Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const LeadCaptureModal = () => {
    const t = useTranslations("leadCapture");
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const hasShown = sessionStorage.getItem("exit-intent-shown");
        if (hasShown) return;

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 10) {
                setIsOpen(true);
                sessionStorage.setItem("exit-intent-shown", "true");
                document.removeEventListener("mouseleave", handleMouseLeave);
            }
        };

        // Mobile trigger: 30s + 60% scroll
        let scrollTriggered = false;
        const handleScroll = () => {
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercent > 0.6) scrollTriggered = true;
        };

        const mobileTimer = setTimeout(() => {
            if (scrollTriggered && window.innerWidth < 1024) {
                setIsOpen(true);
                sessionStorage.setItem("exit-intent-shown", "true");
            }
        }, 30000);

        document.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(mobileTimer);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success(t("guideSent"));
        setIsOpen(false);
    };

    const bulletPoints = [
        t("bulletPoints.0"),
        t("bulletPoints.1"),
        t("bulletPoints.2"),
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-bg-secondary p-8 md:p-12 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                                <Gift className="h-10 w-10" />
                            </div>
                            <h3 className="mb-3 font-serif text-3xl font-bold text-text-primary">
                                {t("title")}
                            </h3>
                            <div className="flex flex-col gap-1 items-center">
                                <p className="text-sm font-medium text-gold uppercase tracking-widest">
                                    {t("subtitle")}
                                </p>
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1">
                                    {t("trustBadge")}
                                </p>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="mb-10 space-y-4">
                            {bulletPoints.map((point, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                                        <Check className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-sm text-text-secondary leading-relaxed">{point}</span>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("emailPlaceholder")}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary"
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder={t("whatsappPlaceholder")}
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold py-5 text-black font-bold uppercase tracking-widest transition-all hover:bg-gold-light active:scale-95 disabled:opacity-50"
                            >
                                {t("submit")}
                                {isSubmitting ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                                ) : (
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-text-secondary opacity-60">
                            {t("noSpam")}
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full text-text-secondary hover:bg-white/5 hover:text-white transition-all"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LeadCaptureModal;
