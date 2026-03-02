"use client";

import React from "react";
import { useTranslations } from "next-intl";

const UrgencyTicker = () => {
    // Demo text instead of translations to ensure it's always filled with punchy facts
    const items = [
        "🔥 12 properties sold this month — Limited stock!",
        "📈 Kyrenia property prices up 18% in the last 12 months",
        "🏠 New: 3+1 Villa with Sea View in Esentepe — £285,000",
        "🛡️ Safe Haven: No minimum investment for residency in North Cyprus",
        "💎 Investment Gem: 8-12% average annual rental yield",
        "🚀 Infrastructure: New marina project driving Emsentepe prices up",
    ];

    return (
        <div className="relative w-full border-y border-gold/20 bg-gold/5 py-3 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {items.concat(items).map((item, index) => (
                    <div key={index} className="flex items-center px-8">
                        <span className="text-sm font-medium tracking-wide text-gold">
                            {item}
                        </span>
                        <span className="mx-8 text-gold/30">|</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UrgencyTicker;
