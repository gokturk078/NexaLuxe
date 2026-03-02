"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { testimonials } from "@/data/testimonials";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialSection = () => {
    const t = useTranslations("testimonials");
    const locale = useLocale();

    return (
        <section className="py-24 bg-bg-secondary/30 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    tag={t("tag")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="h-full flex flex-col relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Quote className="w-16 h-16 text-gold" />
                                </div>

                                <div className="mb-6 flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                                    ))}
                                </div>

                                <p className="mb-8 text-lg italic text-text-primary leading-relaxed flex-grow relative z-10">
                                    "{testimonial.comment[locale as keyof typeof testimonial.comment] || testimonial.comment.en}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center font-serif text-xl font-bold text-gold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-sans font-bold text-text-primary uppercase tracking-widest text-xs">
                                            {testimonial.name}
                                        </h4>
                                        <span className="text-[10px] text-gold uppercase font-medium">
                                            {testimonial.country[locale as keyof typeof testimonial.country] || testimonial.country.en}
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
