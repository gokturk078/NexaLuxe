"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingContactBar = () => {
    const t = useTranslations("floating");
    const locale = useLocale();

    const messages = {
        en: "Hi, I'm interested in your North Cyprus properties.",
        tr: "Merhaba, Kuzey Kıbrıs mülklerinizle ilgileniyorum.",
        de: "Hallo, ich interessiere mich für Ihre Immobilien in Nordzypern."
    };

    const message = encodeURIComponent(messages[locale as 'en' | 'tr' | 'de'] || messages.en);
    const whatsappUrl = `https://wa.me/905338000000?text=${message}`;

    const items = [
        {
            label: t("call"),
            icon: Phone,
            href: "tel:+905338000000",
            className: "text-text-primary hover:bg-gold hover:text-black"
        },
        {
            label: t("whatsapp"),
            icon: MessageCircle,
            href: whatsappUrl,
            className: "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white"
        },
        {
            label: t("email"),
            icon: Mail,
            href: "mailto:info@nexaluxe.com",
            className: "text-text-primary hover:bg-gold hover:text-black"
        },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] grid grid-cols-3 bg-bg-primary/95 backdrop-blur-2xl border-t border-white/10 lg:hidden safe-area-bottom">
            {items.map((item, index) => {
                const Icon = item.icon;
                return (
                    <a
                        key={index}
                        href={item.href}
                        target={item.href.startsWith('http') ? "_blank" : undefined}
                        rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 py-4 transition-all active:scale-95",
                            item.className
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                    </a>
                );
            })}
        </div>
    );
};

export default FloatingContactBar;
