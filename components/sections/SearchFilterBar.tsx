"use client";

import React, { useState } from "react";
import { Search, MapPin, PoundSterling, Home, Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SearchFilterBarProps {
    onSearch?: (filters: any) => void;
}

const SearchFilterBar = ({ onSearch }: SearchFilterBarProps) => {
    const t = useTranslations("search");
    const t_loc = useTranslations("locations");
    const t_cat = useTranslations("propertyCategories");
    const [filters, setFilters] = useState({
        location: "all",
        priceRange: "all",
        propertyType: "all",
    });

    const handleSearch = () => {
        if (onSearch) onSearch(filters);
    };

    return (
        <div className="relative z-20 mx-auto -mt-12 max-w-6xl px-6">
            <div className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4 backdrop-blur-2xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Location */}
                    <div className="group relative flex flex-col gap-1.5 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-2 text-gold">
                            <MapPin className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t("location")}</span>
                        </div>
                        <select
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full bg-transparent text-sm font-medium text-text-primary focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="all" className="bg-bg-secondary">{t("allRegions")}</option>
                            <option value="Girne" className="bg-bg-secondary">{t_loc("Girne")}</option>
                            <option value="İskele" className="bg-bg-secondary">{t_loc("İskele")}</option>
                            <option value="Gazimağusa" className="bg-bg-secondary">{t_loc("Gazimağusa")}</option>
                            <option value="Esentepe" className="bg-bg-secondary">{t_loc("Esentepe")}</option>
                        </select>
                    </div>

                    {/* Price Range */}
                    <div className="group relative flex flex-col gap-1.5 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-2 text-gold">
                            <PoundSterling className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t("priceRange")}</span>
                        </div>
                        <select
                            value={filters.priceRange}
                            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                            className="w-full bg-transparent text-sm font-medium text-text-primary focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="all" className="bg-bg-secondary">{t("allPrices") || "All Prices"}</option>
                            <option value="100k-300k" className="bg-bg-secondary">£100K — £300K</option>
                            <option value="300k-500k" className="bg-bg-secondary">£300K — £500K</option>
                            <option value="500k-1m" className="bg-bg-secondary">£500K — £1M</option>
                            <option value="1m-2m" className="bg-bg-secondary">£1M — £2M</option>
                            <option value="2m+" className="bg-bg-secondary">£2M+</option>
                        </select>
                    </div>

                    {/* Property Type */}
                    <div className="group relative flex flex-col gap-1.5 rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10">
                        <div className="flex items-center gap-2 text-gold">
                            <Home className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t("propertyType")}</span>
                        </div>
                        <select
                            value={filters.propertyType}
                            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                            className="w-full bg-transparent text-sm font-medium text-text-primary focus:outline-none appearance-none cursor-pointer"
                        >
                            <option value="all" className="bg-bg-secondary">{t("allTypes")}</option>
                            <option value="Villa" className="bg-bg-secondary">{t_cat("Villa")}</option>
                            <option value="Penthouse" className="bg-bg-secondary">{t_cat("Penthouse")}</option>
                            <option value="Apartment" className="bg-bg-secondary">{t_cat("Apartment")}</option>
                        </select>
                    </div>

                    {/* Search Button */}
                    <button
                        onClick={handleSearch}
                        className="flex h-full items-center justify-center gap-3 rounded-xl bg-gold text-black transition-all hover:bg-gold-light active:scale-95"
                    >
                        <Search className="h-5 w-5" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest">{t("search")}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;
