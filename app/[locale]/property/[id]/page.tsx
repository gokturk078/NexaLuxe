"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Bed, Bath, Maximize, MapPin, ArrowLeft,
  Share2, Ruler, Waves, ShieldCheck,
  TrendingUp, Calendar, Info, CheckCircle2
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { properties, Property } from "@/data/properties";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { useModals } from "@/context/ModalContext";
import PropertyCard from "@/components/ui/PropertyCard";
import { cn } from "@/lib/utils";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const t = useTranslations("propertyDetail");
  const locale = useLocale();
  const { id } = use(params);
  const { openContactModal } = useModals();
  const [activeImage, setActiveImage] = useState(0);

  const property = properties.find((p) => p.id === id);

  if (!property) return (
    <div className="flex min-h-screen items-center justify-center bg-bg-primary text-white">
      <div className="text-center">
        <h2 className="font-serif text-3xl mb-4">Property Not Found</h2>
        <Link href="/" className="text-gold underline">Return Home</Link>
      </div>
    </div>
  );

  const title = property.title[locale as keyof typeof property.title] || property.title.en;
  const description = property.description[locale as keyof typeof property.description] || property.description.en;

  const handleInquiry = () => {
    openContactModal({
      title: t("requestViewing"),
      subtitle: `${title} - ${property.price}`,
      context: `Property Inquiry: ${property.id} (${title})`
    });
  };

  const specs = [
    { icon: Bed, label: property.bedrooms, detail: t("bedrooms") },
    { icon: Bath, label: property.bathrooms, detail: t("bathrooms") },
    { icon: Maximize, label: property.size, detail: "Area" },
    { icon: Waves, label: property.category, detail: t("propertyType") },
  ];

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20">
      {/* Background Accent */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#C5A059_0%,transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-6 relative">
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t("backToPortfolio")}
          </Link>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-gold hover:text-black">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Visuals & Info */}
          <div className="lg:col-span-8 space-y-12">
            {/* Hero Gallery */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl"
              >
                <Image
                  src={property.images[activeImage]}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <div className="flex items-center gap-2 text-gold mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em]">{property.location[locale as keyof typeof property.location]}</span>
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl">
                    {title}
                  </h1>
                </div>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                      activeImage === idx ? "border-gold" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Specs Block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.map((spec, idx) => (
                <GlassCard key={idx} className="p-6 flex flex-col items-center text-center group cursor-default">
                  <spec.icon className="h-6 w-6 text-gold mb-3 transition-transform group-hover:scale-110" />
                  <span className="font-serif text-xl font-bold text-text-primary">{spec.label}</span>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-text-secondary">{spec.detail}</span>
                </GlassCard>
              ))}
            </div>

            {/* Description Section */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-text-primary">{t("vision")}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-text-secondary first-letter:text-5xl first-letter:font-serif first-letter:text-gold first-letter:mr-3 first-letter:float-left">
                  {description}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-text-primary">{t("interior")}</h3>
                <ul className="space-y-3">
                  {property.features.slice(0, Math.ceil(property.features.length / 2)).map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle2 className="h-5 w-5 text-gold/50" />
                      <span className="text-sm font-medium">{useTranslations("propertyFeatures")(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-text-primary">{t("exterior")}</h3>
                <ul className="space-y-3">
                  {property.features.slice(Math.ceil(property.features.length / 2)).map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle2 className="h-5 w-5 text-gold/50" />
                      <span className="text-sm font-medium">{useTranslations("propertyFeatures")(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Investment Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <GlassCard className="p-8 border-gold/20 shadow-[0_0_50px_rgba(197,160,89,0.1)]">
              <div className="mb-8">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{t("investmentValue")}</span>
                <div className="font-serif text-5xl font-bold text-white mt-2">{property.price}</div>
                <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t("highGrowth")}</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-text-secondary text-sm">{t("propertyType")}</span>
                  <span className="text-white font-bold text-sm uppercase tracking-widest">{useTranslations("propertyCategories")(property.category)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/5">
                  <span className="text-text-secondary text-sm">{t("status")}</span>
                  <span className="text-white font-bold text-sm uppercase tracking-widest">{t("available")}</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex gap-3 items-center text-xs text-text-secondary leading-relaxed">
                    <ShieldCheck className="h-10 w-10 text-gold flex-shrink-0" />
                    <p>{t("legalNotice")}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleInquiry}
                className="group relative w-full overflow-hidden rounded-full bg-gold px-12 py-5 transition-all hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                <span className="relative font-sans text-xs font-bold uppercase tracking-widest text-black">
                  {t("requestViewing")}
                </span>
              </button>

              <p className="mt-6 text-center text-[10px] text-text-secondary uppercase tracking-widest font-bold">
                {t("limitedAvailability")}
              </p>
            </GlassCard>

            {/* Secondary Social Trust */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 grayscale group hover:grayscale-0 transition-all">
                <Calendar className="h-5 w-5 text-gold" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-primary">{t("nextSiteVisit")}</div>
                  <div className="text-[10px] text-text-secondary uppercase">{t("viewingSlots")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section Header */}
        <div className="mt-32 mb-12">
          <h3 className="font-serif text-4xl font-bold text-white mb-4">{t("eliteProperties")}</h3>
          <p className="text-text-secondary max-w-xl">{t("eliteSubtitle")}</p>
        </div>

        {/* Similar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.filter(p => p.id !== property.id).slice(0, 3).map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
