"use client";

import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import UrgencyTicker from "@/components/sections/UrgencyTicker";
import TrustBar from "@/components/sections/TrustBar";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import StatsCounter from "@/components/sections/StatsCounter";
import WhyNorthCyprus from "@/components/sections/WhyNorthCyprus";
import ROICalculator from "@/components/sections/ROICalculator";
import BuyingProcess from "@/components/sections/BuyingProcess";
import TestimonialSection from "@/components/sections/TestimonialSection";
import InvestmentMap from "@/components/sections/InvestmentMap";
import MarketInsights from "@/components/sections/MarketInsights";
import BlogPreview from "@/components/sections/BlogPreview";
import CtaSection from "@/components/sections/CtaSection";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }
  }
};

const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    variants={sectionVariants}
    className={className}
  >
    {children}
  </motion.section>
);

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <UrgencyTicker />

      <AnimatedSection>
        <TrustBar />
      </AnimatedSection>

      <AnimatedSection>
        <FeaturedProperties />
      </AnimatedSection>

      <AnimatedSection>
        <MarketInsights />
      </AnimatedSection>

      <AnimatedSection>
        <InvestmentMap />
      </AnimatedSection>

      <AnimatedSection>
        <StatsCounter />
      </AnimatedSection>

      <AnimatedSection>
        <WhyNorthCyprus />
      </AnimatedSection>

      <AnimatedSection>
        <ROICalculator />
      </AnimatedSection>

      <AnimatedSection>
        <BuyingProcess />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialSection />
      </AnimatedSection>

      <AnimatedSection>
        <BlogPreview />
      </AnimatedSection>

      <CtaSection />
    </div>
  );
}
