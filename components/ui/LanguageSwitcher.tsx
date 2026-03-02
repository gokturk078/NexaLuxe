"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { locales, localeNames, localeFlags } from "@/i18n/config";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const LanguageSwitcher = ({ className }: { className?: string }) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLocale: string) => {
        router.push(pathname, { locale: newLocale as any });
        setIsOpen(false);
    };

    const currentLocale = locale as keyof typeof localeFlags;

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-bold uppercase tracking-widest text-text-primary transition-all hover:bg-white/10"
            >
                <span className="text-lg leading-none">{localeFlags[currentLocale]}</span>
                <span className="hidden md:inline">{localeNames[currentLocale]}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/10 bg-bg-secondary/90 p-2 shadow-2xl backdrop-blur-xl"
                    >
                        {locales.map((l) => (
                            <button
                                key={l}
                                onClick={() => handleLanguageChange(l)}
                                className={cn(
                                    "flex w-full items-center gap-3 rounded-xl py-3 px-4 text-left text-xs font-bold uppercase tracking-widest transition-all hover:bg-white/5",
                                    locale === l ? "bg-gold/10 text-gold" : "text-text-primary"
                                )}
                            >
                                <span className="text-lg leading-none">{localeFlags[l as keyof typeof localeFlags]}</span>
                                {localeNames[l as keyof typeof localeNames]}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
