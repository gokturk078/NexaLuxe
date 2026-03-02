"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { blogPosts } from "@/data/blog-posts";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const BlogPreview = () => {
    const t = useTranslations("blog");
    const locale = useLocale();

    return (
        <section className="py-24 bg-bg-secondary/50">
            <div className="mx-auto max-w-7xl px-6">
                <SectionHeading
                    tag={t("tag")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <GlassCard noPadding className="h-full flex flex-col group cursor-pointer">
                                {/* Image */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title[locale as keyof typeof post.title] || post.title.en}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">
                                            {post.category[locale as keyof typeof post.category] || post.category.en}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow p-8">
                                    <div className="mb-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3 w-3" />
                                            {post.readTime} {t("minRead")}
                                        </div>
                                    </div>

                                    <h3 className="mb-4 font-serif text-xl font-bold text-text-primary leading-tight group-hover:text-gold transition-colors">
                                        {post.title[locale as keyof typeof post.title] || post.title.en}
                                    </h3>

                                    <p className="mb-8 text-sm leading-relaxed text-text-secondary line-clamp-3">
                                        {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-all group-hover:gap-4">
                                        {t("readMore")}
                                        <ArrowRight className="h-4 w-4" />
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

export default BlogPreview;
