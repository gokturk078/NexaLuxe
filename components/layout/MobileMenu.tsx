"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Globe } from "lucide-react";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { localeFlags, locales, localeNames } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { useModals } from "@/context/ModalContext";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const t = useTranslations("nav");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const { openContactModal } = useModals();

    const handleLanguageChange = (newLocale: string) => {
        router.push(pathname, { locale: newLocale as any });
        onClose();
    };

    const isHome = pathname === "/";

    const navLinks = [
        { href: "/#portfolio", label: t("portfolio"), hash: "#portfolio" },
        { href: "/#buying-guide", label: t("buyingGuide"), hash: "#buying-guide" },
        { href: "/#about", label: t("about"), hash: "#about" },
        { href: "/#contact", label: t("contact"), hash: "#contact" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[100] flex flex-col bg-bg-primary/98 p-8 backdrop-blur-2xl lg:hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-16">
                        <span className="font-serif text-2xl font-bold tracking-tighter text-white">
                            NEXA<span className="text-gold">LUXE</span>
                        </span>
                        <button
                            onClick={onClose}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10"
                        >
                            <X className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Links */}
                    <nav className="flex flex-col gap-8 mb-auto">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + index * 0.1 }}
                            >
                                {isHome ? (
                                    <a
                                        href={link.hash}
                                        onClick={onClose}
                                        className="font-serif text-4xl font-semibold text-text-primary transition-colors hover:text-gold"
                                    >
                                        {link.label}
                                    </a>
                                ) : (
                                    <Link
                                        href={link.href as any}
                                        onClick={onClose}
                                        className="font-serif text-4xl font-semibold text-text-primary transition-colors hover:text-gold"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="mt-8 space-y-12">
                        {/* Language Switcher */}
                        <div className="flex gap-4">
                            {locales.map((l) => (
                                <button
                                    key={l}
                                    onClick={() => handleLanguageChange(l)}
                                    className={cn(
                                        "flex flex-1 items-center justify-center gap-2 rounded-xl py-4 border border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest transition-all",
                                        locale === l ? "border-gold/30 bg-gold/5 text-gold" : "text-text-secondary"
                                    )}
                                >
                                    <span className="text-xl">{localeFlags[l]}</span>
                                    {l.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Contact Actions */}
                        <div className="grid grid-cols-3 gap-4">
                            <a href="tel:+905338000000" className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 text-text-primary transition-all active:bg-gold active:text-black">
                                <Phone className="h-6 w-6" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-inherit">Call</span>
                            </a>
                            <a href="https://wa.me/905338000000" target="_blank" className="flex flex-col items-center gap-2 rounded-2xl bg-[#25D366]/10 p-4 text-[#25D366] transition-all active:bg-[#25D366] active:text-white">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-inherit">WA</span>
                            </a>
                            <button
                                onClick={() => { onClose(); openContactModal({ context: "Mobile Menu Inquiry" }); }}
                                className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 text-text-primary transition-all active:bg-gold active:text-black"
                            >
                                <Mail className="h-6 w-6" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-inherit">Email</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
