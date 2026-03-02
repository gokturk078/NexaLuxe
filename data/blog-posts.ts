export interface BlogPost {
    id: string;
    title: Record<'en' | 'tr' | 'de' | 'ru', string>;
    excerpt: Record<'en' | 'tr' | 'de' | 'ru', string>;
    image: string;
    category: Record<'en' | 'tr' | 'de' | 'ru', string>;
    readTime: number;
    date: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "legal-guide-2026",
        title: {
            en: "Complete Legal Guide to Buying Property in North Cyprus (2026)",
            tr: "Kuzey Kıbrıs'ta Mülk Alımı İçin Tam Hukuki Rehber (2026)",
            de: "Vollständiger rechtlicher Leitfaden zum Immobilienkauf in Nordzypern (2026)",
            ru: "Полное юридическое руководство по покупке недвижимости на Северном Кипре (2026)"
        },
        excerpt: {
            en: "Everything foreign buyers need to know about title deeds, permits, and the buying process.",
            tr: "Yabancı alıcıların tapular, izinler ve satın alma süreci hakkında bilmesi gereken her şey.",
            de: "Alles, was ausländische Käufer über Eigentumsurkunden, Genehmigungen und den Kaufprozess wissen müssen.",
            ru: "Всё, что нужно знать иностранным покупателям о документах на право собственности, разрешениях и процессе покупки."
        },
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
        category: {
            en: "Legal Guide",
            tr: "Hukuki Rehber",
            de: "Rechtsratgeber",
            ru: "Юридический гид"
        },
        readTime: 8,
        date: "2026-02-15",
    },
    {
        id: "top-areas-investment",
        title: {
            en: "Top 5 Areas in North Cyprus for Property Investment in 2026",
            tr: "2026'da Emlak Yatırımı İçin Kuzey Kıbrıs'ın En İyi 5 Bölgesi",
            de: "Top 5 Gebiete in Nordzypern für Immobilieninvestitionen im Jahr 2026",
            ru: "Топ-5 районов Северного Кипра для инвестиций в недвижимость в 2026 году"
        },
        excerpt: {
            en: "From Kyrenia's coast to Iskele's emerging hotspots — where smart money is flowing.",
            tr: "Girne kıyılarından İskele'nin yeni gözde noktalarına — akıllı paranın aktığı yerler.",
            de: "Von der Küste von Kyrenia bis zu den aufstrebenden Hotspots von Iskele — wo das kluge Geld hinfließt.",
            ru: "От побережья Кирении до развивающихся горячих точек Искеле — куда текут умные деньги."
        },
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
        category: {
            en: "Investment",
            tr: "Yatırım",
            de: "Investition",
            ru: "Инвестиции"
        },
        readTime: 6,
        date: "2026-01-28",
    },
    {
        id: "rental-income-guide",
        title: {
            en: "How to Earn £2,000/Month Passive Income from Your Cyprus Villa",
            tr: "Kıbrıs Villanızdan Ayda £2,000 Pasif Gelir Nasıl Elde Edilir?",
            de: "Wie Sie mit Ihrer Zypern-Villa ein passives Einkommen von 2.000 £/Monat erzielen",
            ru: "Как получать пассивный доход в £2,000/мес от вашей виллы на Кипре"
        },
        excerpt: {
            en: "A practical guide to Airbnb management, pricing strategies, and occupancy optimization.",
            tr: "Airbnb yönetimi, fiyatlandırma stratejileri ve doluluk optimizasyonu için pratik bir rehber.",
            de: "Ein praktischer Leitfaden für Airbnb-Management, Preisstrategien und Belegungsoptimierung.",
            ru: "Практическое руководство по управлению Airbnb, стратегиям ценообразования и оптимизации заполняемости."
        },
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
        category: {
            en: "Rental Income",
            tr: "Kira Geliri",
            de: "Mieteinnahmen",
            ru: "Доход от аренды"
        },
        readTime: 5,
        date: "2026-01-10",
    },
];
