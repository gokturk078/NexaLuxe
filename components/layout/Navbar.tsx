"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useScrollDirection } from "@/lib/hooks/useScrollDirection";
import { useModals } from "@/context/ModalContext";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
    const t = useTranslations("nav");
    const pathname = usePathname();
    const { scrollDirection } = useScrollDirection();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { openContactModal } = useModals();

    const isHome = pathname === "/";

    const handleCallAdvisor = () => {
        openContactModal({
            title: "VIP Advisor Access",
            subtitle: "Get high-priority callback from our North Cyprus investment directors.",
            context: "Direct Call Request from Navbar"
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/#portfolio", label: t("portfolio"), hash: "#portfolio" },
        { href: "/#buying-guide", label: t("buyingGuide"), hash: "#buying-guide" },
        { href: "/#about", label: t("about"), hash: "#about" },
        { href: "/#contact", label: t("contact"), hash: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{
                    y: scrollDirection === "down" && !mobileMenuOpen ? -100 : 0,
                    backgroundColor: scrolled ? "rgba(10, 10, 15, 0.85)" : "rgba(10, 10, 15, 0)",
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[90] flex items-center justify-center py-5 transition-all duration-300",
                    scrolled ? "backdrop-blur-xl border-b border-white/5" : "py-8"
                )}
            >
                <div className="flex w-full max-w-7xl items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="group relative flex items-center gap-2">
                        <span className="font-serif text-2xl font-bold tracking-tighter text-white md:text-3xl">
                            NEXA<span className="text-gold transition-all group-hover:text-gold-light">LUXE</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden items-center gap-10 lg:flex">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    {isHome ? (
                                        <a
                                            href={link.hash}
                                            className="group relative font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-gold"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                                        </a>
                                    ) : (
                                        <Link
                                            href={link.href as any}
                                            className="group relative font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-gold"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="h-4 w-px bg-white/10" />

                        <div className="flex items-center gap-6">
                            <LanguageSwitcher />

                            <button
                                onClick={handleCallAdvisor}
                                className="hidden lg:flex items-center gap-3 rounded-full bg-gold px-7 py-3 text-black transition-all hover:bg-gold-light hover:scale-105 active:scale-95"
                            >
                                <Phone className="h-4 w-4 fill-current" />
                                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                                    {t("callAdvisor")}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Right Actions */}
                    <div className="flex items-center gap-4 lg:hidden">
                        <LanguageSwitcher className="md:block" />
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
};

export default Navbar;
