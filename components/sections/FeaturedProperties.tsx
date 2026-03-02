"use client";

import React, { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import PropertyCard from "../ui/PropertyCard";
import SearchFilterBar from "./SearchFilterBar";
import { properties, Property } from "@/data/properties";
import { motion, AnimatePresence } from "framer-motion";
import { useModals } from "@/context/ModalContext";

const FeaturedProperties = () => {
    const t = useTranslations("featured");
    const locale = useLocale();
    const { openContactModal } = useModals();

    const handleViewAll = () => {
        openContactModal({
            title: "Full Portfolio Request",
            subtitle: "Access our off-market database and new developments before they hit the open market.",
            context: "Full Portfolio Request"
        });
    };
    const [filters, setFilters] = useState({
        location: "all",
        priceRange: "all",
        propertyType: "all",
    });

    const filteredProperties = useMemo(() => {
        return properties.filter((prop) => {
            const locationMatch = filters.location === "all" || Object.values(prop.location).some(loc => loc.toLowerCase().includes(filters.location.toLowerCase()));
            const typeMatch = filters.propertyType === "all" || prop.category === filters.propertyType;

            let priceMatch = true;
            if (filters.priceRange === "100k-300k") priceMatch = prop.priceValue >= 100000 && prop.priceValue <= 300000;
            else if (filters.priceRange === "300k-500k") priceMatch = prop.priceValue > 300000 && prop.priceValue <= 500000;
            else if (filters.priceRange === "500k-1m") priceMatch = prop.priceValue > 500000 && prop.priceValue <= 1000000;
            else if (filters.priceRange === "1m-2m") priceMatch = prop.priceValue > 1000000 && prop.priceValue <= 2000000;
            else if (filters.priceRange === "2m+") priceMatch = prop.priceValue > 2000000;

            return locationMatch && typeMatch && priceMatch;
        });
    }, [filters]);

    const handleSearch = (newFilters: any) => {
        setFilters(newFilters);
        // Smooth scroll to results
        const element = document.getElementById("property-grid");
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="portfolio" className="py-24 bg-bg-primary">
            <div className="mx-auto max-w-7xl px-6">
                <SearchFilterBar onSearch={handleSearch} />

                <div className="mt-20">
                    <SectionHeading
                        tag={t("tag")}
                        title={t("title")}
                        subtitle={t("subtitle")}
                    />

                    <div id="property-grid" className="scroll-mt-24">
                        <AnimatePresence mode="popLayout">
                            {filteredProperties.length > 0 ? (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {filteredProperties.map((property, index) => (
                                        <PropertyCard
                                            key={property.id}
                                            property={property}
                                            index={index}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="py-20 text-center"
                                >
                                    <p className="text-xl text-text-secondary font-serif italic">
                                        {t("noPropertiesFound")}
                                    </p>
                                    <button
                                        onClick={() => setFilters({ location: 'all', priceRange: 'all', propertyType: 'all' })}
                                        className="mt-6 text-gold font-bold uppercase tracking-widest text-xs underline underline-offset-8"
                                    >
                                        {t("clearFilters")}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={handleViewAll}
                            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/5 px-12 py-5 transition-all hover:border-gold/50 hover:bg-gold/5"
                        >
                            <span className="font-sans text-xs font-bold uppercase tracking-widest text-text-primary group-hover:text-gold">
                                {t("viewAll")}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProperties;
