"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, Mail, Phone, User, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import GlassCard from "./GlassCard";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    context?: string;
}

const ContactModal = ({ isOpen, onClose, title, subtitle, context }: ContactModalProps) => {
    const t = useTranslations("contact");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: context ? `I'm interested in: ${context}` : ""
    });

    useEffect(() => {
        if (isOpen) {
            setIsSuccess(false);
            if (context) {
                setFormData(prev => ({ ...prev, message: `I'm interested in: ${context}` }));
            } else {
                setFormData(prev => ({ ...prev, message: "" }));
            }
        }
    }, [isOpen, context]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
        toast.success(t("successTitle"));

        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl overflow-hidden"
                    >
                        <GlassCard className="!p-0 border-gold/20 shadow-[0_0_50px_rgba(201,168,76,0.15)]">
                            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                                {/* Left Side - Info */}
                                <div className="md:col-span-2 bg-gold/5 p-8 border-r border-white/5 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-serif text-2xl font-bold text-gold mb-4">
                                            {title || t("title")}
                                        </h3>
                                        <p className="text-sm text-text-secondary leading-relaxed mb-8">
                                            {subtitle || t("subtitle")}
                                        </p>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4 text-text-primary transition-colors hover:text-gold cursor-default">
                                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                                                    <Phone className="h-4 w-4" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest">+90 533 800 0000</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-text-primary transition-colors hover:text-gold cursor-default">
                                                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gold">
                                                    <Mail className="h-4 w-4" />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest">vip@nexaluxe.com</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-green">{t("onlineNow")}</span>
                                        </div>
                                        <p className="text-[10px] text-text-secondary uppercase tracking-widest leading-loose">
                                            {t("responseTime")}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side - Form */}
                                <div className="md:col-span-3 p-8 md:p-12 bg-bg-secondary/40">
                                    <button
                                        onClick={onClose}
                                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-text-secondary transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>

                                    {isSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                        >
                                            <div className="h-20 w-20 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-4">
                                                <CheckCircle2 className="h-10 w-10" />
                                            </div>
                                            <h4 className="font-serif text-2xl font-bold text-white">{t("successTitle")}</h4>
                                            <p className="text-sm text-text-secondary leading-relaxed">
                                                {t("successSubtitle")}
                                            </p>
                                            <button
                                                onClick={onClose}
                                                className="px-8 py-3 rounded-full border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
                                            >
                                                {t("backToSite")}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder={t("name")}
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors text-text-primary"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                                                        <input
                                                            required
                                                            type="email"
                                                            placeholder={t("email")}
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors text-text-primary"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder={t("phone")}
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors text-text-primary"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-text-secondary/60" />
                                                    <textarea
                                                        rows={4}
                                                        placeholder={t("message")}
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors resize-none text-text-primary"
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full group flex items-center justify-center gap-3 bg-gold hover:bg-gold-light py-5 rounded-xl text-black font-bold uppercase tracking-[0.2em] text-xs transition-all active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {isSubmitting ? t("processing") : (
                                                    <>
                                                        {t("submit")}
                                                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
