"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Maximize, Waves, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Property } from "@/data/properties";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useModals } from "@/context/ModalContext";

interface PropertyCardProps {
    property: Property;
    index: number;
}

const PropertyCard = ({ property, index }: PropertyCardProps) => {
    const t = useTranslations("featured");
    const locale = useLocale();
    const { openContactModal } = useModals();
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    };

    const handleInquiry = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        openContactModal({
            title: "Property Inquiry",
            subtitle: t("inquirySubtitle", { title: property.title[locale as keyof typeof property.title] }),
            context: `Interest in ${property.id}: ${property.title.en}`
        });
    };

    const viewedCount = 12 + (index * 7) % 45;
    const isLastUnits = property.tag === 'LAST_UNITS';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
        >
            <Link href={`/${locale}/property/${property.id}`}>
                <div className="overflow-hidden rounded-2xl border border-white/5 bg-bg-secondary/40 backdrop-blur-xl transition-all hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.15)] h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-72 w-full overflow-hidden shrink-0">
                        <Image
                            src={property.images[0]}
                            alt={property.title[locale as keyof typeof property.title] || property.title.en}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            <span className={cn(
                                "rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-lg shadow-black/20",
                                property.tag === 'PREMIUM' ? "bg-gold" :
                                    property.tag === 'NEW' ? "bg-accent-blue text-white" :
                                        "bg-accent-red text-white"
                            )}>
                                {t(property.tag.toLowerCase())}
                            </span>

                            {isLastUnits && (
                                <span className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white bg-accent-red shadow-lg animate-pulse">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                    {t("last_units")}
                                </span>
                            )}
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={toggleFavorite}
                            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md transition-all hover:bg-gold hover:text-black group/fav z-20"
                        >
                            <Heart className={cn("h-5 w-5", isFavorite ? "fill-current text-current" : "text-white group-hover/fav:text-black")} />
                        </button>

                        {/* Viewed Social Proof */}
                        <div className="absolute bottom-4 left-4 z-10">
                            <div className="flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3 py-1.5 border border-white/10">
                                <span className="h-1 w-1 rounded-full bg-accent-green animate-ping" />
                                <span className="text-[9px] font-bold text-white/90 uppercase tracking-wider">
                                    {t("viewedRecently", { count: viewedCount })}
                                </span>
                            </div>
                        </div>

                        {/* Price Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                <MapPin className="h-3 w-3 text-gold" />
                                {property.location[locale as keyof typeof property.location]}
                            </div>
                            <div className="text-right">
                                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold mb-0.5">{t("priceFrom")}</span>
                                <span className="text-xl font-serif font-bold text-white">{property.price}</span>
                            </div>
                        </div>

                        <h3 className="mb-4 font-serif text-xl font-bold text-text-primary group-hover:text-gold transition-colors line-clamp-2">
                            {property.title[locale as keyof typeof property.title]}
                        </h3>

                        {/* Features Grid */}
                        <div className="mb-6 grid grid-cols-3 gap-2 border-y border-white/5 py-4">
                            <div className="flex flex-col items-center gap-1.5 border-r border-white/5">
                                <Bed className="h-4 w-4 text-gold/60" />
                                <span className="text-[10px] font-medium text-text-secondary">
                                    {property.bedrooms} {t("bedrooms")}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5 border-r border-white/5">
                                <Bath className="h-4 w-4 text-gold/60" />
                                <span className="text-[10px] font-medium text-text-secondary">
                                    {property.bathrooms} {t("bathrooms")}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Maximize className="h-4 w-4 text-gold/60" />
                                <span className="text-[10px] font-medium text-text-secondary">
                                    {property.size}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">
                                        {t("annualYield")}
                                    </span>
                                    <span className="text-sm font-medium text-text-secondary">
                                        {property.rentalYield}% {property.monthlyRental[locale as keyof typeof property.monthlyRental]}
                                    </span>
                                </div>
                                <div className="h-8 w-[1px] bg-white/5" />
                                <div className="flex flex-col text-right">
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                                        {useTranslations("propertyDetail")("status")}
                                    </span>
                                    <span className="text-sm font-medium text-text-secondary">
                                        {useTranslations("propertyDetail")("available")}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleInquiry}
                                className="w-full relative group/btn flex items-center justify-center gap-3 bg-gold py-4 rounded-xl text-black font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                {t("inquiry")}
                                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default PropertyCard;
