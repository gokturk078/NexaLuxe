"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionHeading from "../ui/SectionHeading";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Invalid phone number"),
    budget: z.string().min(1, "Please select a budget"),
    message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CtaSection = () => {
    const t = useTranslations("cta");

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormValues) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Lead captured:", data);
        toast.success("✅ Inquiry sent! Our advisor will contact you shortly.");
        reset();
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
                    alt="Luxury Villa Exterior"
                    fill
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary/95 to-bg-primary" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div>
                        <SectionHeading
                            tag={t("tag")}
                            title={t("title")}
                            subtitle={t("subtitle")}
                            centered={false}
                            className="mb-12"
                        />

                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold transition-all group-hover:bg-gold group-hover:text-black">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">
                                        {t("directLine")}
                                    </p>
                                    <a href="tel:+905338000000" className="font-serif text-2xl font-bold text-text-primary hover:text-gold transition-colors">
                                        +90 533 800 0000
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-all group-hover:bg-[#25D366] group-hover:text-white">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">
                                        {t("whatsappChat")}
                                    </p>
                                    <a href="https://wa.me/905338000000" target="_blank" className="font-serif text-2xl font-bold text-text-primary hover:text-[#25D366] transition-colors">
                                        {t("chatWithAdvisor")}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group cursor-pointer">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue transition-all group-hover:bg-accent-blue group-hover:text-white">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">
                                        {t("emailSupport")}
                                    </p>
                                    <a href="mailto:info@nexaluxe.com" className="font-serif text-2xl font-bold text-text-primary hover:text-accent-blue transition-colors">
                                        info@nexaluxe.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Lead Form */}
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-8 md:p-12 backdrop-blur-xl">
                        <h3 className="mb-8 font-serif text-2xl font-bold text-text-primary">
                            {t("formTitle")}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <input
                                    {...register("name")}
                                    placeholder={t("formName")}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary"
                                />
                                {errors.name && <p className="text-[10px] text-accent-red font-bold uppercase">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <input
                                        {...register("email")}
                                        placeholder={t("formEmail")}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary"
                                    />
                                    {errors.email && <p className="text-[10px] text-accent-red font-bold uppercase">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <input
                                        {...register("phone")}
                                        placeholder={t("formPhone")}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary"
                                    />
                                    {errors.phone && <p className="text-[10px] text-accent-red font-bold uppercase">{errors.phone.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <select
                                    {...register("budget")}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all appearance-none"
                                >
                                    <option value="" className="bg-bg-secondary">{t("formBudget")}</option>
                                    <option value="100k-250k" className="bg-bg-secondary">£100,000 - £250,000</option>
                                    <option value="250k-500k" className="bg-bg-secondary">£250,000 - £500,000</option>
                                    <option value="500k-1m" className="bg-bg-secondary">£500,000 - £1,000,000</option>
                                    <option value="1m+" className="bg-bg-secondary">£1,000,000+</option>
                                </select>
                                {errors.budget && <p className="text-[10px] text-accent-red font-bold uppercase">{errors.budget.message}</p>}
                            </div>

                            <textarea
                                {...register("message")}
                                placeholder={t("formMessage")}
                                rows={4}
                                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-text-primary focus:border-gold focus:outline-none transition-all placeholder:text-text-secondary resize-none"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group w-full flex items-center justify-center gap-3 rounded-full bg-gold py-5 text-black font-bold uppercase tracking-widest transition-all hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t("formSubmit")}
                                {isSubmitting ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                                ) : (
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                )}
                            </button>

                            <p className="text-[10px] text-center text-text-secondary uppercase tracking-widest">
                                {t("formDisclaimer")}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
