export interface Property {
    id: string;
    title: Record<'en' | 'tr' | 'de' | 'ru', string>;
    description: Record<'en' | 'tr' | 'de' | 'ru', string>;
    location: Record<'en' | 'tr' | 'de' | 'ru', string>;
    area: Record<'en' | 'tr' | 'de' | 'ru', string>;
    price: string;
    priceValue: number;
    currency: '£' | '€' | '$';
    bedrooms: number;
    bathrooms: number;
    size: string;
    plotSize: string;
    hasPool: boolean;
    hasGarage: boolean;
    hasSeaView: boolean;
    hasGarden: boolean;
    yearBuilt: number;
    energyRating: string;
    images: string[];
    tag: 'NEW' | 'PREMIUM' | 'INVESTMENT' | 'LAST_UNITS' | 'SOLD';
    category: 'Villa' | 'Penthouse' | 'Residence' | 'Apartment';
    featured: boolean;
    rentalYield: number;
    monthlyRental: Record<'en' | 'tr' | 'de' | 'ru', string>;
    coordinates: {
        lat: number;
        lng: number;
    };
    features: string[]; // These will be used as i18n keys
}

export const properties: Property[] = [
    {
        id: "prop-001",
        title: {
            en: "Ultra-Luxury Villa with Mediterranean View",
            tr: "Akdeniz Manzaralı Ultra Lüks Villa",
            de: "Ultra-Luxus-Villa mit Mittelmeerblick",
            ru: "Ультра-роскошная вилла с видом на Средиземное море"
        },
        description: {
            en: "A masterpiece of modern architecture in Bellapais. This villa offers unparalleled privacy and luxury with 360-degree views.",
            tr: "Bellapais'te modern mimarinin başyapıtı. Bu villa, 360 derece manzara ile eşsiz mahremiyet ve lüks sunuyor.",
            de: "Ein Meisterwerk moderner Architektur in Bellapais. Diese Villa bietet unvergleichliche Privatsphäre und Luxus mit 360-Grad-Aussicht.",
            ru: "Шедевр современной архитектуры в Беллапаисе. Эта вилла предлагает беспрецедентную приватность и роскошь с обзором на 360 градусов."
        },
        location: {
            en: "Kyrenia, Bellapais",
            tr: "Girne, Bellapais",
            de: "Kyrenia, Bellapais",
            ru: "Кирения, Беллапаис"
        },
        area: {
            en: "Kyrenia",
            tr: "Girne",
            de: "Kyrenia",
            ru: "Кирения"
        },
        price: "£1,200,000",
        priceValue: 1200000,
        currency: '£',
        bedrooms: 4,
        bathrooms: 3,
        size: "320m²",
        plotSize: "800m²",
        hasPool: true,
        hasGarage: true,
        hasSeaView: true,
        hasGarden: true,
        yearBuilt: 2024,
        energyRating: "A",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200"
        ],
        tag: "PREMIUM",
        category: "Villa",
        featured: true,
        rentalYield: 8,
        monthlyRental: {
            en: "£4,500/month",
            tr: "£4.500/ay",
            de: "£4.500/Monat",
            ru: "£4,500/месяц"
        },
        coordinates: { lat: 35.305, lng: 33.355 },
        features: ["Infinity Pool", "Smart Home System", "Wine Cellar", "Underfloor Heating"]
    },
    {
        id: "prop-002",
        title: {
            en: "Beachfront Modern Penthouse",
            tr: "Denize Sıfır Modern Penthouse",
            de: "Modernes Penthouse direkt am Strand",
            ru: "Современный пентхаус на берегу моря"
        },
        description: {
            en: "Experience the ultimate coastal lifestyle in Long Beach. This penthouse features a private roof terrace with a jacuzzi.",
            tr: "Long Beach'te nihai kıyı yaşam tarzını deneyimleyin. Bu penthouse, jakuzili özel bir çatı terasına sahiptir.",
            de: "Erleben Sie den ultimativen Küstenlebensstil in Long Beach. Dieses Penthouse verfügt über eine private Dachterrasse mit Whirlpool.",
            ru: "Наслаждайтесь эксклюзивным образом жизни на побережье Лонг-Бич. Этот пентхаус располагает частной террасой на крыше с джакузи."
        },
        location: {
            en: "Iskele, Long Beach",
            tr: "İskele, Long Beach",
            de: "Iskele, Long Beach",
            ru: "Искеле, Лонг-Бич"
        },
        area: {
            en: "Iskele",
            tr: "İskele",
            de: "Iskele",
            ru: "Искеле"
        },
        price: "£850,000",
        priceValue: 850000,
        currency: '£',
        bedrooms: 3,
        bathrooms: 2,
        size: "240m²",
        plotSize: "N/A",
        hasPool: true,
        hasGarage: true,
        hasSeaView: true,
        hasGarden: false,
        yearBuilt: 2025,
        energyRating: "A",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200",
            "https://images.unsplash.com/photo-1600047509807-ba8f041203d6?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
        ],
        tag: "NEW",
        category: "Penthouse",
        featured: true,
        rentalYield: 10,
        monthlyRental: {
            en: "£3,200/month",
            tr: "£3.200/ay",
            de: "£3.200/Monat",
            ru: "£3,200/месяц"
        },
        coordinates: { lat: 35.215, lng: 33.895 },
        features: ["Private Rooftop", "Jacuzzi", "Gym Access", "Concierge Service"]
    },
    {
        id: "prop-003",
        title: {
            en: "Luxury Villa with Private Pool & Mountain View",
            tr: "Özel Havuzlu Dağ Manzaralı Villa",
            de: "Luxusvilla mit privatem Pool & Bergblick",
            ru: "Роскошная вилла с частным бассейном и видом на горы"
        },
        description: {
            en: "A serene escape in Çatalköy, surrounded by nature and offering breathtaking mountain panoramas.",
            tr: "Çatalköy'de doğa ile çevrili, nefes kesen dağ manzaraları sunan huzurlu bir kaçış.",
            de: "Ein ruhiger Rückzugsort in Çatalköy, umgeben von Natur und mit atemberaubendem Bergpanorama.",
            ru: "Спокойный уголок в Чаталкёе, окруженный природой и предлагающий захватывающие дух горные панорамы."
        },
        location: {
            en: "Kyrenia, Catalkoy",
            tr: "Girne, Çatalköy",
            de: "Kyrenia, Catalkoy",
            ru: "Кирения, Чаталкёй"
        },
        area: {
            en: "Kyrenia",
            tr: "Girne",
            de: "Kyrenia",
            ru: "Кирения"
        },
        price: "£2,450,000",
        priceValue: 2450000,
        currency: '£',
        bedrooms: 5,
        bathrooms: 4,
        size: "480m²",
        plotSize: "1200m²",
        hasPool: true,
        hasGarage: true,
        hasSeaView: false,
        hasGarden: true,
        yearBuilt: 2023,
        energyRating: "B",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
        ],
        tag: "PREMIUM",
        category: "Villa",
        featured: true,
        rentalYield: 7,
        monthlyRental: {
            en: "£6,000/month",
            tr: "£6.000/ay",
            de: "£6.000/Monat",
            ru: "£6,000/месяц"
        },
        coordinates: { lat: 35.335, lng: 33.395 },
        features: ["Large Garden", "Guest House", "Staff Quarters", "BBQ Area"]
    },
    {
        id: "prop-004",
        title: {
            en: "Luxury Residence with Marina view",
            tr: "Marina Manzaralı Lüks Rezidans",
            de: "Luxusresidenz mit Blick auf den Jachthafen",
            ru: "Роскошная резиденция с видом на марину"
        },
        description: {
            en: "Modern living at its finest in Yeni Iskele. Overlooking the new marina project with high investment potential.",
            tr: "Yeni İskele'de en iyi modern yaşam. Yüksek yatırım potansiyeline sahip yeni marina projesine bakmaktadır.",
            de: "Modernes Wohnen vom Feinsten in Yeni Iskele. Mit Blick auf das neue Jachthafenprojekt mit hohem Investitionspotenzial.",
            ru: "Современная жизнь в лучшем ее проявлении в Йени Искеле. Вид на новый проект марины с высоким инвестиционным потенциалом."
        },
        location: {
            en: "Famagusta, Yeni Iskele",
            tr: "Gazimağusa, Yeni İskele",
            de: "Famagusta, Yeni Iskele",
            ru: "Фамагуста, Йени Искеле"
        },
        area: {
            en: "Famagusta",
            tr: "Gazimağusa",
            de: "Famagusta",
            ru: "Фамагуста"
        },
        price: "£650,000",
        priceValue: 650000,
        currency: '£',
        bedrooms: 3,
        bathrooms: 2,
        size: "185m²",
        plotSize: "N/A",
        hasPool: false,
        hasGarage: true,
        hasSeaView: true,
        hasGarden: false,
        yearBuilt: 2026,
        energyRating: "A",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
        ],
        tag: "INVESTMENT",
        category: "Residence",
        featured: false,
        rentalYield: 12,
        monthlyRental: {
            en: "£2,800/month",
            tr: "£2.800/ay",
            de: "£2.800/Monat",
            ru: "£2,800/месяц"
        },
        coordinates: { lat: 35.205, lng: 33.915 },
        features: ["Marina Access", "Smart Home System", "Shared Pool", "24/7 Security"]
    },
    {
        id: "prop-005",
        title: {
            en: "Modern Family Home in Kyrenia Center",
            tr: "Girne Merkezde Modern Aile Evi",
            de: "Modernes Familienhaus im Zentrum von Kyrenia",
            ru: "Современный семейный дом в центре Кирении"
        },
        description: {
            en: "Conveniently located in the heart of Kyrenia, close to all amenities and universities.",
            tr: "Girne'nin kalbinde, tüm olanaklara ve üniversitelere yakın, elverişli bir konumda.",
            de: "Günstig im Herzen von Kyrenia gelegen, in der Nähe aller Annehmlichkeiten und Universitäten.",
            ru: "Удобно расположен в самом сердце Кирении, рядом со всей инфраструктурой и университетами."
        },
        location: {
            en: "Kyrenia, Center",
            tr: "Girne, Merkez",
            de: "Kyrenia, Zentrum",
            ru: "Кирения, Центр"
        },
        area: {
            en: "Kyrenia",
            tr: "Girne",
            de: "Kyrenia",
            ru: "Кирения"
        },
        price: "£450,000",
        priceValue: 450000,
        currency: '£',
        bedrooms: 3,
        bathrooms: 2,
        size: "160m²",
        plotSize: "300m²",
        hasPool: false,
        hasGarage: false,
        hasSeaView: false,
        hasGarden: true,
        yearBuilt: 2022,
        energyRating: "B",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200",
            "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200"
        ],
        tag: "LAST_UNITS",
        category: "Villa",
        featured: false,
        rentalYield: 9,
        monthlyRental: {
            en: "£2,200/month",
            tr: "£2.200/ay",
            de: "£2.200/Monat",
            ru: "£2,200/месяц"
        },
        coordinates: { lat: 35.336, lng: 33.318 },
        features: ["Central Location", "Modern Kitchen", "Private Parking", "Nearby Schools"]
    },
    {
        id: "prop-006",
        title: {
            en: "Exclusive Seaside Apartment",
            tr: "Özel Deniz Kenarı Dairesi",
            de: "Exklusive Wohnung am Meer",
            ru: "Эксклюзивные апартаменты у моря"
        },
        description: {
            en: "Wake up to the sound of waves in this beautifully designed seaside apartment in Esentepe.",
            tr: "Esentepe'deki bu güzel tasarımlı deniz kenarı dairesinde dalga sesleriyle uyanın.",
            de: "Wachen Sie mit dem Rauschen der Wellen in dieser wunderschön gestalteten Wohnung am Meer in Esentepe auf.",
            ru: "Просыпайтесь под шум волн в этих красиво спроектированных апартаментах у моря в Эсентепе."
        },
        location: {
            en: "Kyrenia, Esentepe",
            tr: "Girne, Esentepe",
            de: "Kyrenia, Esentepe",
            ru: "Кирения, Эсентепе"
        },
        area: {
            en: "Kyrenia",
            tr: "Girne",
            de: "Kyrenia",
            ru: "Кирения"
        },
        price: "£320,000",
        priceValue: 320000,
        currency: '£',
        bedrooms: 2,
        bathrooms: 2,
        size: "110m²",
        plotSize: "N/A",
        hasPool: true,
        hasGarage: false,
        hasSeaView: true,
        hasGarden: false,
        yearBuilt: 2024,
        energyRating: "A",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200"
        ],
        tag: "INVESTMENT",
        category: "Apartment",
        featured: true,
        rentalYield: 11,
        monthlyRental: {
            en: "£1,600/month",
            tr: "£1.600/ay",
            de: "£1.600/Monat",
            ru: "£1,600/месяц"
        },
        coordinates: { lat: 35.345, lng: 33.595 },
        features: ["Beach Access", "Pool", "Landscaped Gardens", "Sports Facilities"]
    }
];
