export interface BuyingStep {
    id: number;
    title: Record<'en' | 'tr' | 'de' | 'ru', string>;
    description: Record<'en' | 'tr' | 'de' | 'ru', string>;
    icon: string;
}

export const buyingSteps: BuyingStep[] = [
    {
        id: 1,
        title: {
            en: "Free Consultation",
            tr: "Ücretsiz Danışmanlık",
            de: "Kostenlose Beratung",
            ru: "Бесплатная консультация"
        },
        description: {
            en: "Share your requirements and budget. Our multilingual advisors will curate a shortlist tailored to you.",
            tr: "İhtiyaçlarınızı ve bütçenizi paylaşın. Çok dilli danışmanlarımız size özel bir liste hazırlasın.",
            de: "Teilen Sie uns Ihre Anforderungen und Ihr Budget mit. Unsere mehrsprachigen Berater erstellen eine auf Sie zugeschnittene Auswahl.",
            ru: "Поделитесь своими требованиями и бюджетом. Наши многоязычные консультанты подберут варианты специально для вас."
        },
        icon: "MessageSquare"
    },
    {
        id: 2,
        title: {
            en: "Property Viewing Tour",
            tr: "Mülk Tanıtım Turu",
            de: "Besichtigungstour",
            ru: "Ознакомительный тур"
        },
        description: {
            en: "Visit North Cyprus for a VIP property tour or explore options via our immersive virtual tours.",
            tr: "Kuzey Kıbrıs'ı VIP turumuzla ziyaret edin veya seçenekleri sanal turlarımızla keşfedin.",
            de: "Besuchen Sie Nordzypern im Rahmen einer VIP-Besichtigungstour oder erkunden Sie Optionen über unsere virtuellen Touren.",
            ru: "Посетите Северный Кипр с VIP-туром по объектам или изучите варианты через виртуальные туры."
        },
        icon: "Map"
    },
    {
        id: 3,
        title: {
            en: "Legal Due Diligence",
            tr: "Hukuki İnceleme",
            de: "Rechtliche Prüfung",
            ru: "Юридическая проверка"
        },
        description: {
            en: "Our partner lawyers verify title deeds, planning permissions, and all legal documentation.",
            tr: "Partner avukatlarımız tapuları, imar izinlerini ve tüm hukuki belgeleri doğrular.",
            de: "Unsere Partneranwälte prüfen Eigentumsurkunden, Planungsgenehmigungen und alle rechtlichen Dokumente.",
            ru: "Наши юристы-партнеры проверяют документы на право собственности, разрешения и всю документацию."
        },
        icon: "ShieldAlert"
    },
    {
        id: 4,
        title: {
            en: "Secure Your Property",
            tr: "Mülkünüzü Rezerve Edin",
            de: "Sichern Sie Ihr Objekt",
            ru: "Бронирование объекта"
        },
        description: {
            en: "Pay a refundable deposit to reserve. We handle contracts, permits, and government approvals.",
            tr: "Bir depozito ödeyerek mülkü rezerve edin. Sözleşmeleri ve hükümet onaylarını biz yönetiyoruz.",
            de: "Zahlen Sie eine erstattbare Anzahlung zur Reservierung. Wir kümmern uns um Verträge, Genehmigungen und staatliche Zulassungen.",
            ru: "Внесите возвратный депозит для резерва. Мы берем на себя контракты, разрешения и согласования."
        },
        icon: "CheckCircle"
    },
    {
        id: 5,
        title: {
            en: "Completion & Handover",
            tr: "Teslimat ve Devir",
            de: "Fertigstellung & Übergabe",
            ru: "Завершение и сдача"
        },
        description: {
            en: "Title deed transfer, utility connections, furnishing — we manage everything until you get the keys.",
            tr: "Tapu devri, abonelikler, tefrişat — anahtarları alana kadar her detayla ilgileniyoruz.",
            de: "Übertragung der Eigentumsurkunde, Versorgungsanschlüsse, Einrichtung — wir regeln alles, bis Sie die Schlüssel erhalten.",
            ru: "Передача титула, подключение коммуникаций, меблировка — мы управляем всем до получения ключей."
        },
        icon: "Key"
    }
];
