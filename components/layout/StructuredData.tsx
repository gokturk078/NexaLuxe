"use client";

import React from "react";
import { useLocale } from "next-intl";

const StructuredData = () => {
    const locale = useLocale();

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Nexa Luxe Estate",
        "image": "https://nexaluxe.com/logo.png",
        "telephone": "+90 548 123 4567",
        "url": `https://nexaluxe.com/${locale}`,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Luxury Plaza, Floor 4",
            "addressLocality": "Girne",
            "addressCountry": "TRNC"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.3364,
            "longitude": 33.3192
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "18:00"
        },
        "sameAs": [
            "https://facebook.com/nexaluxe",
            "https://instagram.com/nexaluxe",
            "https://linkedin.com/company/nexa-luxe"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
    );
};

export default StructuredData;
