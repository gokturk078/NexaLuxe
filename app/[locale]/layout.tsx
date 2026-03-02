import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Providers } from "@/providers/Providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/floating/WhatsAppFAB";
import FloatingContactBar from "@/components/floating/FloatingContactBar";
import SalesChatbot from "@/components/floating/SalesChatbot";
import CookieConsent from "@/components/layout/CookieConsent";
import LeadCaptureModal from "@/components/sections/LeadCaptureModal";
import StructuredData from "../../components/layout/StructuredData";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PageLoader from "@/components/ui/PageLoader";
import { Toaster } from "sonner";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const siteUrl = 'https://nexaluxe.com';

  const titles: Record<string, string> = {
    en: "NEXA LUXE ESTATE | Luxury Real Estate & Investment in North Cyprus",
    tr: "NEXA LUXE ESTATE | Kuzey Kıbrıs Lüks Gayrimenkul ve Yatırım",
    de: "NEXA LUXE ESTATE | Luxusimmobilien & Investitionen in Nordzypern",
    ru: "NEXA LUXE ESTATE | Элитная недвижимость и инвестиции на Северном Кипре"
  };

  const descriptions: Record<string, string> = {
    en: "Discover exclusive villas, beachfront residences, and high-yield investment opportunities in North Cyprus. Expert consultancy for international investors.",
    tr: "Kuzey Kıbrıs'ta seçkin villalar, denize sıfır rezidanslar ve yüksek getirili yatırım fırsatlarını keşfedin. Uluslararası yatırımcılar için uzman danışmanlık.",
    de: "Entdecken Sie exklusive Villen, Residenzen am Strand und renditestarke Investitionsmöglichkeiten in Nordzypern. Expertenberatung für internationale Investoren.",
    ru: "Откройте для себя эксклюзивные виллы, резиденции на побережье и высокодоходные инвестиционные возможности на Северном Кипре. Экспертные консультации."
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | NEXA LUXE`
    },
    description: description,
    keywords: ["North Cyprus Real Estate", "Luxury Villas Cyprus", "Kyrenia Property", "Iskele Investment", "ROI North Cyprus", "Buy Property Cyprus"],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'tr': `${siteUrl}/tr`,
        'de': `${siteUrl}/de`,
        'ru': `${siteUrl}/ru`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === 'en' ? 'en_US' : locale === 'tr' ? 'tr_TR' : locale === 'de' ? 'de_DE' : 'ru_RU',
      url: `${siteUrl}/${locale}`,
      siteName: "Nexa Luxe Estate",
      title: title,
      description: description,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Nexa Luxe Estate - Luxury Mediterranean Living"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable} scroll-smooth`}>
      <body className="bg-bg-primary text-text-primary font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <PageLoader />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFAB />
            <FloatingContactBar />
            <SalesChatbot initialLocale={locale} />
            <ScrollToTop />
            <CookieConsent />
            <LeadCaptureModal />
            <StructuredData />
            <Toaster position="top-right" richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
