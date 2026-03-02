"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Instagram, Facebook, Linkedin, Twitter, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { useModals } from "@/context/ModalContext";

const Footer = () => {
    const t = useTranslations("footer");
    const locale = useLocale();
    const { openContactModal } = useModals();

    const quickLinks = [
        { href: `/${locale}#portfolio`, label: "Portfolio" },
        { href: `/${locale}#why-north-cyprus`, label: "Why North Cyprus?" },
        { href: `/${locale}#calculator`, label: "ROI Calculator" },
        { href: `/${locale}#blog`, label: "Insights" },
    ];

    const regions = [
        { name: "Girne (Kyrenia)", count: 120 },
        { name: "İskele (Long Beach)", count: 85 },
        { name: "Gazimağusa (Famagusta)", count: 45 },
        { name: "Esentepe", count: 32 },
        { name: "Bellapais", count: 18 },
    ];

    const socialLinks = [
        { icon: Instagram, href: "https://instagram.com" },
        { icon: Facebook, href: "https://facebook.com" },
        { icon: Linkedin, href: "https://linkedin.com" },
        { icon: Twitter, href: "https://twitter.com" },
    ];

    return (
        <footer className="bg-bg-primary pt-24 pb-12 lg:pb-32 border-t border-white/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Col */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <span className="font-serif text-3xl font-bold tracking-tighter text-white">
                                NEXA<span className="text-gold">LUXE</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-text-secondary">
                            {t("description")}
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-primary transition-all hover:bg-gold hover:text-black"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-gold underline underline-offset-8">
                            {t("quickLinks")}
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-gold"
                                    >
                                        <div className="h-1 w-1 rounded-full bg-gold/30 transition-all group-hover:w-3 group-hover:bg-gold" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Regions */}
                    <div>
                        <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-gold underline underline-offset-8">
                            {t("regions")}
                        </h4>
                        <ul className="space-y-4">
                            {regions.map((region) => (
                                <li key={region.name} className="flex items-center justify-between text-sm group cursor-pointer">
                                    <span className="text-text-secondary group-hover:text-gold transition-colors">{region.name}</span>
                                    <span className="text-[10px] font-bold text-text-secondary group-hover:text-gold bg-white/5 px-2 py-0.5 rounded-full border border-white/5 transition-all">
                                        {region.count}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-gold underline underline-offset-8">
                            {t("contact")}
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4 group cursor-pointer" onClick={() => openContactModal({ context: "Office Visit Inquiry" })}>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition-all group-hover:bg-gold group-hover:text-black">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                                    Karakum, No: 42, Girne<br />North Cyprus
                                </p>
                            </li>
                            <li className="flex gap-4 group cursor-pointer">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition-all group-hover:bg-gold group-hover:text-black">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <a href="tel:+905338000000" className="text-sm text-text-secondary group-hover:text-gold transition-colors">
                                    +90 533 800 0000
                                </a>
                            </li>
                            <li className="flex gap-4 group cursor-pointer" onClick={() => openContactModal({ context: "Email Inquiry from Footer" })}>
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition-all group-hover:bg-gold group-hover:text-black">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="text-sm text-text-secondary group-hover:text-gold transition-colors">
                                    info@nexaluxe.com
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 text-center md:text-left">
                    <p className="mb-6 md:mb-0 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        © 2026 NEXA LUXE ESTATE. {t("copyright")}
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                        <a href="#" className="hover:text-gold transition-colors">{t("privacy")}</a>
                        <a href="#" className="hover:text-gold transition-colors">{t("terms")}</a>
                        <a href="#" className="hover:text-gold transition-colors">{t("cookies")}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
