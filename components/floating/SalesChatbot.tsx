"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, ArrowUp, Phone, Mail, ExternalLink, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

// --- TYPES ---
type SupportedLang = 'tr' | 'en' | 'de' | 'ru';

type Intent =
    | 'GREETING'           // Selamlama
    | 'PRICE_INQUIRY'      // Fiyat sorgusu
    | 'PROPERTY_SEARCH'    // Mülk arama
    | 'ROI_INVESTMENT'     // Yatırım/getiri sorusu
    | 'LEGAL_PROCESS'      // Hukuki süreç
    | 'LOCATION_INFO'      // Bölge bilgisi
    | 'RESIDENCY'          // Oturma izni
    | 'VIRTUAL_TOUR'       // Sanal tur talebi
    | 'CONTACT_AGENT'      // Danışman isteme
    | 'COMPARE'            // Karşılaştırma (Kıbrıs vs Türkiye vs İspanya)
    | 'RENTAL_INCOME'      // Kira geliri sorusu
    | 'SAFETY_TRUST'       // Güvenlik/güven sorusu
    | 'BUDGET_SPECIFIC'    // Belirli bütçe belirtme
    | 'OBJECTION_EXPENSIVE'// İtiraz: Pahalı
    | 'OBJECTION_RISKY'    // İtiraz: Riskli
    | 'OBJECTION_LATER'    // İtiraz: Daha sonra
    | 'OBJECTION_FAR'      // İtiraz: Çok uzak
    | 'OBJECTION_UNSURE'   // İtiraz: Emin değilim
    | 'THANKS_BYE'         // Teşekkür/vedalaşma
    | 'UNKNOWN';           // Tanınmayan

interface ChatAction {
    label: string;
    type: 'scroll' | 'whatsapp' | 'phone' | 'link' | 'input' | 'internal';
    target: string;
}

interface ChatResponse {
    text: string;
    actions: ChatAction[];
    followUp?: string;
}

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    actions?: ChatAction[];
}

// --- CONSTANTS ---
const WHATSAPP_NUMBER = "905338000000";

const LANG_MARKERS: Record<SupportedLang, string[]> = {
    tr: [
        'merhaba', 'selam', 'nasıl', 'villa', 'fiyat', 'nedir', 'istiyorum', 'var', 'mı', 'mi',
        'mu', 'mü', 'kaç', 'ne', 'bir', 'bu', 'için', 'ile', 'çok', 'evet', 'hayır', 'lütfen',
        'arıyorum', 'bakıyorum', 'almak', 'satın', 'kira', 'yatırım', 'bütçe', 'para', 'fırsat',
        'deniz', 'havuz', 'yatak', 'oda', 'daire', 'arsa', 'bölge', 'girne', 'iskele', 'lefkoşa',
        'kıbrıs', 'emlak', 'gayrimenkul', 'güzel', 'teşekkür', 'bilgi', 'detay', 'görmek',
        'gelmek', 'bakmak', 'düşünüyorum', 'ilgileniyorum', 'olabilir', 'acaba', 'veya',
        'hangisi', 'önerir', 'tavsiye', 'güvenli', 'yasal', 'hukuki', 'tapu', 'kolay',
        'getiri', 'kazanç', 'aylık', 'yıllık', 'taksit', 'ödeme', 'kredi'
    ],
    en: [
        'hello', 'hi', 'hey', 'how', 'what', 'where', 'when', 'which', 'price', 'cost',
        'buy', 'sell', 'rent', 'invest', 'property', 'villa', 'apartment', 'house', 'beach',
        'pool', 'bedroom', 'bathroom', 'budget', 'yield', 'return', 'roi', 'safe', 'legal',
        'title', 'deed', 'cyprus', 'kyrenia', 'famagusta', 'looking', 'interested', 'want',
        'need', 'can', 'could', 'would', 'should', 'please', 'thanks', 'thank', 'good',
        'great', 'nice', 'best', 'cheap', 'expensive', 'area', 'location', 'near', 'view',
        'sea', 'mountain', 'modern', 'luxury', 'new', 'payment', 'mortgage', 'plan',
        'residency', 'citizenship', 'passport', 'guide', 'process', 'tour', 'visit'
    ],
    de: [
        'hallo', 'guten', 'wie', 'was', 'wo', 'wann', 'welche', 'preis', 'kosten',
        'kaufen', 'mieten', 'investieren', 'immobilie', 'wohnung', 'haus', 'strand',
        'schlafzimmer', 'badezimmer', 'budget', 'rendite', 'sicher', 'rechtlich',
        'zypern', 'nordzypern', 'kyrenia', 'suche', 'interessiert', 'möchte', 'brauche',
        'bitte', 'danke', 'schön', 'beste', 'günstig', 'teuer', 'lage', 'nähe',
        'meerblick', 'berg', 'modern', 'luxus', 'neu', 'zahlung', 'aufenthaltserlaubnis',
        'besichtigung', 'besuchen', 'können', 'ich', 'wir', 'ist', 'das', 'ein', 'eine'
    ],
    ru: [
        'привет', 'здравствуйте', 'как', 'что', 'где', 'когда', 'какой', 'цена', 'стоимость',
        'купить', 'аренда', 'инвестиции', 'недвижимость', 'вилла', 'квартира', 'дом',
        'пляж', 'бассейн', 'спальня', 'бюджет', 'доходность', 'безопасно', 'кипр',
        'кирения', 'ищу', 'интересует', 'хочу', 'нужно', 'пожалуйста', 'спасибо',
        'хороший', 'лучший', 'дешевый', 'дорогой', 'район', 'рядом', 'море', 'вид',
        'современный', 'люкс', 'новый', 'оплата', 'вид на жительство', 'тур'
    ]
};

const INTENT_KEYWORDS: Record<Intent, Record<SupportedLang, string[]>> = {
    GREETING: {
        tr: ['merhaba', 'selam', 'hey', 'iyi günler', 'iyi akşamlar', 'nasılsın', 'naber'],
        en: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'how are you', 'greetings'],
        de: ['hallo', 'guten tag', 'guten morgen', 'guten abend', 'hi', 'hey', 'grüße'],
        ru: ['привет', 'здравствуйте', 'добрый день', 'добрый вечер', 'здравствуй']
    },
    PRICE_INQUIRY: {
        tr: ['fiyat', 'kaç para', 'ne kadar', 'fiyatı', 'fiyatlar', 'bütçe', 'maliyet', 'ucuz', 'pahalı', 'uygun', 'başlangıç fiyat'],
        en: ['price', 'cost', 'how much', 'budget', 'affordable', 'cheap', 'expensive', 'starting price', 'pricing', 'rates'],
        de: ['preis', 'kosten', 'wie viel', 'budget', 'günstig', 'teuer', 'erschwinglich', 'preise'],
        ru: ['цена', 'стоимость', 'сколько', 'бюджет', 'дешевый', 'дорого', 'доступный']
    },
    PROPERTY_SEARCH: {
        tr: ['villa', 'daire', 'ev', 'penthouse', 'mülk', 'emlak', 'arsa', 'rezidans', 'yatak', 'oda', 'havuz', 'deniz manzara', 'satılık', 'arıyorum', 'bakıyorum', 'göster'],
        en: ['villa', 'apartment', 'house', 'penthouse', 'property', 'flat', 'land', 'residence', 'bedroom', 'pool', 'sea view', 'for sale', 'looking for', 'show me', 'find', 'search'],
        de: ['villa', 'wohnung', 'haus', 'penthouse', 'immobilie', 'grundstück', 'residenz', 'schlafzimmer', 'pool', 'meerblick', 'zu verkaufen', 'suche', 'zeigen'],
        ru: ['вилла', 'квартира', 'дом', 'пентхаус', 'недвижимость', 'участок', 'резиденция', 'спальня', 'бассейн', 'вид на море', 'продажа', 'ищу', 'показать']
    },
    ROI_INVESTMENT: {
        tr: ['yatırım', 'getiri', 'roi', 'kazanç', 'kâr', 'değer artış', 'büyüme', 'potansiyel', 'yüzde', '%'],
        en: ['invest', 'investment', 'return', 'roi', 'profit', 'appreciation', 'growth', 'potential', 'yield', 'percent', '%', 'capital gain'],
        de: ['investition', 'investieren', 'rendite', 'roi', 'gewinn', 'wertsteigerung', 'wachstum', 'potenzial', 'prozent'],
        ru: ['инвестиция', 'инвестировать', 'доходность', 'прибыль', 'рост', 'потенциал', 'процент']
    },
    LEGAL_PROCESS: {
        tr: ['hukuki', 'yasal', 'hukuk', 'tapu', 'izin', 'süreç', 'nasıl alınır', 'prosedür', 'belge', 'noter', 'vekalet', 'sözleşme', 'vergi', 'kdv'],
        en: ['legal', 'law', 'title deed', 'permit', 'process', 'how to buy', 'procedure', 'document', 'contract', 'tax', 'stamp duty', 'notary'],
        de: ['rechtlich', 'gesetz', 'grundbuch', 'genehmigung', 'prozess', 'wie kaufen', 'verfahren', 'dokument', 'vertrag', 'steuer', 'notar'],
        ru: ['юридический', 'закон', 'документ', 'разрешение', 'процесс', 'как купить', 'процедура', 'договор', 'налог', 'нотариус']
    },
    LOCATION_INFO: {
        tr: ['girne', 'kyrenia', 'iskele', 'long beach', 'gazimağusa', 'famagusta', 'lefkoşa', 'nicosia', 'esentepe', 'bellapais', 'çatalköy', 'lapta', 'alsancak', 'bölge', 'nere', 'konum', 'lokasyon', 'en iyi bölge', 'hangi bölge'],
        en: ['kyrenia', 'girne', 'iskele', 'long beach', 'famagusta', 'nicosia', 'esentepe', 'bellapais', 'catalkoy', 'lapta', 'alsancak', 'area', 'location', 'where', 'region', 'best area', 'which area', 'neighborhood'],
        de: ['kyrenia', 'girne', 'iskele', 'long beach', 'famagusta', 'nikosia', 'esentepe', 'bellapais', 'gegend', 'lage', 'wo', 'region', 'beste gegend', 'welche gegend'],
        ru: ['кирения', 'гирне', 'искеле', 'лонг бич', 'фамагуста', 'никосия', 'эсентепе', 'беллапаис', 'район', 'местоположение', 'где', 'регион', 'лучший район']
    },
    RESIDENCY: {
        tr: ['oturma izni', 'vatandaşlık', 'pasaport', 'vize', 'ikamet', 'kalıcı', 'yerleşmek', 'yaşamak'],
        en: ['residency', 'residence permit', 'citizenship', 'passport', 'visa', 'permanent', 'settle', 'live', 'relocate', 'move'],
        de: ['aufenthaltserlaubnis', 'aufenthaltsgenehmigung', 'staatsbürgerschaft', 'reisepass', 'visum', 'dauerhaft', 'ansiedeln', 'leben', 'umziehen'],
        ru: ['вид на жительство', 'гражданство', 'паспорт', 'виза', 'постоянный', 'переехать', 'жить']
    },
    VIRTUAL_TOUR: {
        tr: ['tur', 'sanal tur', 'video', 'görmek', 'fotoğraf', 'resim', 'görüntü', 'canlı', 'gezmek', 'ziyaret'],
        en: ['tour', 'virtual tour', 'video', 'see', 'photo', 'picture', 'image', 'live', 'visit', 'viewing', 'walkthrough'],
        de: ['tour', 'virtuelle tour', 'video', 'sehen', 'foto', 'bild', 'live', 'besichtigung', 'besuchen', 'rundgang'],
        ru: ['тур', 'виртуальный тур', 'видео', 'посмотреть', 'фото', 'живой', 'посетить', 'осмотр']
    },
    CONTACT_AGENT: {
        tr: ['danışman', 'agent', 'temsilci', 'ara', 'iletişim', 'konuş', 'görüş', 'randevu', 'biri', 'yardım'],
        en: ['agent', 'advisor', 'consultant', 'call', 'contact', 'speak', 'talk', 'appointment', 'someone', 'help', 'human', 'person', 'real person'],
        de: ['berater', 'makler', 'anruf', 'kontakt', 'sprechen', 'termin', 'jemand', 'hilfe', 'mensch', 'person'],
        ru: ['агент', 'консультант', 'позвонить', 'контакт', 'говорить', 'встреча', 'помощь', 'человек']
    },
    COMPARE: {
        tr: ['karşılaştır', 'fark', 'avantaj', 'neden kıbrıs', 'türkiye', 'ispanya', 'yunanistan', 'portekiz', 'güney kıbrıs', 'vs', 'mı yoksa'],
        en: ['compare', 'comparison', 'difference', 'advantage', 'why cyprus', 'turkey', 'spain', 'greece', 'portugal', 'south cyprus', 'vs', 'versus', 'or', 'better than'],
        de: ['vergleich', 'vergleichen', 'unterschied', 'vorteil', 'warum zypern', 'türkei', 'spanien', 'griechenland', 'portugal', 'südzypern', 'vs', 'oder', 'besser als'],
        ru: ['сравнить', 'сравнение', 'разница', 'преимущество', 'почему кипр', 'турция', 'испания', 'греция', 'южный кипр']
    },
    RENTAL_INCOME: {
        tr: ['kira', 'kiralama', 'airbnb', 'kira geliri', 'aylık gelir', 'pasif gelir', 'kiracı', 'doluluk'],
        en: ['rent', 'rental', 'airbnb', 'rental income', 'monthly income', 'passive income', 'tenant', 'occupancy', 'letting'],
        de: ['miete', 'vermietung', 'airbnb', 'mieteinnahmen', 'monatliches einkommen', 'passives einkommen', 'mieter', 'auslastung'],
        ru: ['аренда', 'арендная плата', 'airbnb', 'доход от аренды', 'ежемесячный доход', 'пассивный доход', 'арендатор']
    },
    SAFETY_TRUST: {
        tr: ['güvenli', 'güvenilir', 'risk', 'dolandırıcı', 'sahte', 'emin', 'tanınmış', 'sorun', 'problem', 'tehlike', 'korku'],
        en: ['safe', 'safety', 'trust', 'reliable', 'risk', 'scam', 'fraud', 'sure', 'problem', 'danger', 'worry', 'concerned', 'legit', 'legitimate'],
        de: ['sicher', 'sicherheit', 'vertrauen', 'zuverlässig', 'risiko', 'betrug', 'problem', 'gefahr', 'sorge', 'besorgt', 'seriös'],
        ru: ['безопасно', 'безопасность', 'доверие', 'надежный', 'риск', 'мошенничество', 'проблема', 'опасность', 'беспокойство']
    },
    BUDGET_SPECIFIC: {
        tr: ['£', '€', '$', 'sterlin', 'euro', 'dolar', 'bin', 'milyon', '100k', '200k', '300k', '500k', '1m'],
        en: ['£', '€', '$', 'pound', 'euro', 'dollar', 'thousand', 'million', '100k', '200k', '300k', '500k', '1m'],
        de: ['£', '€', '$', 'pfund', 'euro', 'dollar', 'tausend', 'million', '100k', '200k', '300k', '500k', '1m'],
        ru: ['£', '€', '$', 'фунт', 'евро', 'доллар', 'тысяч', 'миллион', '100k', '200k', '300k', '500k', '1m']
    },
    OBJECTION_EXPENSIVE: {
        tr: ['pahalı', 'çok para', 'bütçem yetmez', 'karşılayamam', 'param yok', 'fazla', 'ucuz yok mu'],
        en: ['expensive', 'too much', 'afford', 'out of budget', 'no money', 'cheaper', 'any cheaper', 'overpriced'],
        de: ['teuer', 'zu viel', 'leisten', 'budget überschritten', 'günstiger', 'billiger', 'überteuert'],
        ru: ['дорого', 'слишком дорого', 'не могу позволить', 'нет денег', 'дешевле', 'завышено']
    },
    OBJECTION_RISKY: {
        tr: ['riskli', 'kuzey kıbrıs güvenli mi', 'tanınmıyor', 'ambargo', 'siyasi', 'sorunlu'],
        en: ['risky', 'is it safe', 'not recognized', 'embargo', 'political', 'unstable', 'conflict', 'disputed'],
        de: ['riskant', 'ist es sicher', 'nicht anerkannt', 'embargo', 'politisch', 'instabil', 'konflikt'],
        ru: ['рискованно', 'безопасно ли', 'не признан', 'эмбарго', 'политический', 'конфликт']
    },
    OBJECTION_LATER: {
        tr: ['sonra', 'şimdi değil', 'düşüneceğim', 'acelem yok', 'belki', 'ileride', 'bakarız'],
        en: ['later', 'not now', 'think about it', 'no rush', 'maybe', 'in the future', 'someday', 'not ready'],
        de: ['später', 'nicht jetzt', 'überlegen', 'keine eile', 'vielleicht', 'in zukunft', 'irgendwann'],
        ru: ['позже', 'не сейчас', 'подумаю', 'не спешу', 'может быть', 'в будущем', 'когда-нибудь']
    },
    OBJECTION_FAR: {
        tr: ['uzak', 'uzaklık', 'nasıl giderim', 'uçak', 'uçuş', 'mesafe'],
        en: ['far', 'distance', 'how to get there', 'flight', 'travel', 'remote', 'too far'],
        de: ['weit', 'entfernung', 'wie komme ich', 'flug', 'reise', 'abgelegen', 'zu weit'],
        ru: ['далеко', 'расстояние', 'как добраться', 'перелет', 'путешествие', 'слишком далеко']
    },
    OBJECTION_UNSURE: {
        tr: ['emin değilim', 'bilmiyorum', 'kararsız', 'karar veremedim', 'ikna olmadım'],
        en: ['not sure', 'unsure', 'undecided', 'don\'t know', 'hesitant', 'confused', 'not convinced'],
        de: ['nicht sicher', 'unsicher', 'unentschlossen', 'weiß nicht', 'zögerlich', 'nicht überzeugt'],
        ru: ['не уверен', 'не знаю', 'нерешительный', 'сомневаюсь', 'не убежден']
    },
    THANKS_BYE: {
        tr: ['teşekkür', 'sağol', 'görüşürüz', 'hoşça kal', 'iyi günler', 'bye'],
        en: ['thank', 'thanks', 'bye', 'goodbye', 'see you', 'have a good', 'take care', 'cheers'],
        de: ['danke', 'tschüss', 'auf wiedersehen', 'bis bald', 'schönen tag', 'vielen dank'],
        ru: ['спасибо', 'до свидания', 'пока', 'удачи', 'благодарю']
    },
    UNKNOWN: { tr: [], en: [], de: [], ru: [] }
};

const WELCOME_BUBBLES: Record<SupportedLang, string[]> = {
    tr: [
        "🏠 Hayalinizdeki villayı bulduk mu?",
        "💰 %8-12 kira getirisi hakkında bilgi ister misiniz?",
        "🎯 Size özel fırsatları görelim mi?"
    ],
    en: [
        "🏠 Looking for your dream Mediterranean villa?",
        "💰 Want to know about 8-12% rental yields?",
        "🎯 Shall I show you personalized opportunities?"
    ],
    de: [
        "🏠 Suchen Sie Ihre Traum-Mittelmeer-Villa?",
        "💰 Möchten Sie mehr über 8-12% Rendite erfahren?",
        "🎯 Soll ich Ihnen passende Angebote zeigen?"
    ],
    ru: [
        "🏠 Ищете виллу мечты на Средиземноморье?",
        "💰 Хотите узнать о доходности 8-12%?",
        "🎯 Показать персональные предложения?"
    ]
};

const LEAD_CAPTURE_MESSAGES: Record<SupportedLang, string> = {
    tr: "Bu arada, size özel fırsatları ve detaylı bilgileri gönderebilmem için WhatsApp numaranızı veya e-posta adresinizi paylaşır mısınız? 📩",
    en: "By the way, could you share your WhatsApp number or email so I can send you personalized opportunities and detailed information? 📩",
    de: "Übrigens, könnten Sie Ihre WhatsApp-Nummer oder E-Mail-Adresse teilen, damit ich Ihnen personalisierte Angebote senden kann? 📩",
    ru: "Кстати, можете поделиться номером WhatsApp или email, чтобы я мог отправить персональные предложения? 📩"
};

const CONTACT_CAPTURED: Record<SupportedLang, string> = {
    tr: "Harika, teşekkür ederim! 🎯 Danışmanlarımız en kısa sürede sizinle iletişime geçecek. Bu arada, size nasıl yardımcı olabilirim?",
    en: "Wonderful, thank you! 🎯 Our advisors will contact you shortly. In the meantime, how else can I help?",
    de: "Wunderbar, vielen Dank! 🎯 Unsere Berater werden sich in Kürze bei Ihnen melden. Wie kann ich Ihnen noch helfen?",
    ru: "Замечательно, спасибо! 🎯 Наши консультанты скоро свяжутся с вами. Чем еще могу помочь?"
};

// --- UTILITIES ---
function detectLanguage(message: string): SupportedLang {
    const lower = message.toLowerCase();
    const words = lower.split(/[\s,.!?;:'"()\-]+/).filter(Boolean);
    const scores: Record<SupportedLang, number> = { tr: 0, en: 0, de: 0, ru: 0 };
    for (const word of words) {
        for (const lang of Object.keys(LANG_MARKERS) as SupportedLang[]) {
            if (LANG_MARKERS[lang].some(marker => word.includes(marker) || marker.includes(word))) {
                scores[lang]++;
            }
        }
    }
    if (/[а-яА-ЯёЁ]/.test(message)) scores.ru += 10;
    if (/[çğıöşüÇĞİÖŞÜ]/.test(message)) scores.tr += 5;
    if (/[äöüßÄÖÜ]/.test(message) && !/[çğışÇĞİŞ]/.test(message)) scores.de += 5;
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) return 'en';
    const detected = (Object.entries(scores) as [SupportedLang, number][])
        .filter(([, score]) => score === maxScore)[0][0];
    return detected;
}

function detectIntent(message: string, lang: SupportedLang): Intent {
    const lower = message.toLowerCase();
    const priorityOrder: Intent[] = [
        'OBJECTION_EXPENSIVE', 'OBJECTION_RISKY', 'OBJECTION_LATER',
        'OBJECTION_FAR', 'OBJECTION_UNSURE',
        'BUDGET_SPECIFIC', 'PRICE_INQUIRY', 'PROPERTY_SEARCH',
        'ROI_INVESTMENT', 'RENTAL_INCOME', 'LEGAL_PROCESS',
        'RESIDENCY', 'LOCATION_INFO', 'SAFETY_TRUST', 'COMPARE',
        'VIRTUAL_TOUR', 'CONTACT_AGENT', 'THANKS_BYE', 'GREETING'
    ];
    for (const intent of priorityOrder) {
        const keywords = INTENT_KEYWORDS[intent];
        const allKeywords = [...(keywords[lang] || []), ...(keywords.en || [])];
        if (allKeywords.some(kw => lower.includes(kw))) return intent;
    }
    return 'UNKNOWN';
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{7,15}/;

function extractContactInfo(message: string): { email?: string; phone?: string } {
    const email = message.match(EMAIL_REGEX)?.[0];
    const phone = message.match(PHONE_REGEX)?.[0];
    return { email, phone };
}

function getWhatsAppUrl(lang: SupportedLang): string {
    const baseMessages: Record<SupportedLang, string> = {
        tr: "Merhaba! Nexa Luxe web sitesinden yazıyorum. Kuzey Kıbrıs mülkleri hakkında bilgi almak istiyorum.",
        en: "Hello! I'm writing from the Nexa Luxe website. I'd like information about North Cyprus properties.",
        de: "Hallo! Ich schreibe von der Nexa Luxe Website. Ich möchte Informationen über Immobilien in Nordzypern.",
        ru: "Здравствуйте! Пишу с сайта Nexa Luxe. Хочу узнать об объектах недвижимости на Северном Кипре."
    };
    const message = encodeURIComponent(baseMessages[lang] || baseMessages.en);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
const RESPONSES: Record<Intent, Record<SupportedLang, ChatResponse>> = {
    GREETING: {
        tr: {
            text: "Merhaba! 👋 Kuzey Kıbrıs'ın en prestijli mülklerine hoş geldiniz. Ben Nexa Luxe dijital danışmanınızım. Size nasıl yardımcı olabilirim?",
            actions: [
                { label: "🏠 Mülkleri Gör", type: "scroll", target: "#portfolio" },
                { label: "💰 Yatırım Getirisi Hesapla", type: "scroll", target: "#calculator" },
                { label: "📞 Danışmanla Konuş", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Welcome! 👋 I'm your Nexa Luxe digital advisor. I help international investors find premium properties in North Cyprus with 8-12% annual returns. How can I assist you?",
            actions: [
                { label: "🏠 Browse Properties", type: "scroll", target: "#portfolio" },
                { label: "💰 Calculate ROI", type: "scroll", target: "#calculator" },
                { label: "📞 Speak to Advisor", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Willkommen! 👋 Ich bin Ihr digitaler Berater bei Nexa Luxe. Ich helfe internationalen Investoren, Premium-Immobilien in Nordzypern mit 8-12% jährlicher Rendite zu finden. Wie kann ich Ihnen helfen?",
            actions: [
                { label: "🏠 Immobilien ansehen", type: "scroll", target: "#portfolio" },
                { label: "💰 Rendite berechnen", type: "scroll", target: "#calculator" },
                { label: "📞 Berater kontaktieren", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Добро пожаловать! 👋 Я ваш цифровой консультант Nexa Luxe. Я помогаю международным инвесторам найти премиальную недвижимость на Северном Кипре с доходностью 8-12% в год. Чем могу помочь?",
            actions: [
                { label: "🏠 Смотреть объекты", type: "scroll", target: "#portfolio" },
                { label: "💰 Рассчитать доход", type: "scroll", target: "#calculator" },
                { label: "📞 Связаться с консультантом", type: "whatsapp", target: "" }
            ]
        }
    },

    PRICE_INQUIRY: {
        tr: {
            text: "Kuzey Kıbrıs'ta mülk fiyatları Güney Kıbrıs'a göre 2-3 kat daha uygun! 🎯\n\n📊 Güncel fiyat aralıkları:\n• Stüdyo daireler: £65.000'den\n• 1+1 daireler: £85.000'den\n• 2+1 daireler: £120.000'den\n• 3+1 villalar: £250.000'den\n• Lüks villalar: £500.000 — £2.500.000+\n\nBütçenizi paylaşırsanız, size en uygun seçenekleri hemen göstereyim!",
            actions: [
                { label: "💬 Bütçemi WhatsApp'tan paylaşayım", type: "whatsapp", target: "" },
                { label: "🏠 £200K altı mülkler", type: "scroll", target: "#portfolio" },
                { label: "📊 Getiri hesaplayıcı", type: "scroll", target: "#calculator" }
            ],
            followUp: "💡 Bu arada, Kuzey Kıbrıs'ta mülklerin yıllık %8-12 kira getirisi ve %15-20 değer artışı olduğunu biliyor muydunuz? Yatırımınız kendini ödüyor!"
        },
        en: {
            text: "Great news — North Cyprus properties are 2-3x more affordable than Southern Cyprus, Spain or Greece! 🎯\n\n📊 Current price ranges:\n• Studio apartments: from £65,000\n• 1-bed apartments: from £85,000\n• 2-bed apartments: from £120,000\n• 3-bed villas: from £250,000\n• Luxury villas: £500,000 — £2,500,000+\n\nShare your budget and I'll match you with the perfect options!",
            actions: [
                { label: "💬 Share my budget on WhatsApp", type: "whatsapp", target: "" },
                { label: "🏠 Properties under £200K", type: "scroll", target: "#portfolio" },
                { label: "📊 ROI Calculator", type: "scroll", target: "#calculator" }
            ],
            followUp: "💡 Did you know? North Cyprus properties deliver 8-12% rental yields and 15-20% annual appreciation. Your investment pays for itself!"
        },
        de: {
            text: "Gute Nachrichten — Immobilien in Nordzypern sind 2-3x günstiger als in Südzypern, Spanien oder Griechenland! 🎯\n\n📊 Aktuelle Preisspannen:\n• Studioapartments: ab £65.000\n• 1-Zimmer: ab £85.000\n• 2-Zimmer: ab £120.000\n• 3-Zimmer-Villen: ab £250.000\n• Luxusvillen: £500.000 — £2.500.000+\n\nTeilen Sie mir Ihr Budget mit und ich zeige Ihnen die besten Optionen!",
            actions: [
                { label: "💬 Budget per WhatsApp teilen", type: "whatsapp", target: "" },
                { label: "🏠 Immobilien unter £200K", type: "scroll", target: "#portfolio" },
                { label: "📊 Renditerechner", type: "scroll", target: "#calculator" }
            ],
            followUp: "💡 Wussten Sie? Immobilien in Nordzypern liefern 8-12% Mietrendite und 15-20% jährliche Wertsteigerung!"
        },
        ru: {
            text: "Отличные новости — недвижимость на Северном Кипре в 2-3 раза доступнее, чем на Южном Кипре, в Испании или Греции! 🎯\n\n📊 Текущие цены:\n• Студии: от £65.000\n• 1-комнатные: от £85.000\n• 2-комнатные: от £120.000\n• Виллы 3 спальни: от £250.000\n• Люкс виллы: £500.000 — £2.500.000+\n\nНазовите ваш бюджет, и я подберу лучшие варианты!",
            actions: [
                { label: "💬 Написать бюджет в WhatsApp", type: "whatsapp", target: "" },
                { label: "🏠 Объекты до £200K", type: "scroll", target: "#portfolio" },
                { label: "📊 Калькулятор доходности", type: "scroll", target: "#calculator" }
            ],
            followUp: "💡 Знали ли вы? Недвижимость на Северном Кипре приносит 8-12% арендной доходности и 15-20% годового роста стоимости!"
        }
    },

    PROPERTY_SEARCH: {
        tr: {
            text: "Mükemmel seçim! 🏡 Portföyümüzde 250+ premium mülk var. Size en uygun olanı bulmam için birkaç şey sorayım:\n\nHangi tip mülk arıyorsunuz ve yaklaşık bütçeniz nedir? Bu bilgiyle size hemen kişiselleştirilmiş öneriler sunabilirim.",
            actions: [
                { label: "🏠 Tüm mülkleri gör", type: "scroll", target: "#portfolio" },
                { label: "🔍 Villa arıyorum", type: "whatsapp", target: "" },
                { label: "🏢 Daire arıyorum", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Excellent choice! 🏡 We have 250+ premium properties in our portfolio. To find your perfect match, let me ask:\n\nWhat type of property are you looking for and what's your approximate budget? I'll give you personalized recommendations right away.",
            actions: [
                { label: "🏠 View all properties", type: "scroll", target: "#portfolio" },
                { label: "🔍 Looking for villas", type: "whatsapp", target: "" },
                { label: "🏢 Looking for apartments", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Ausgezeichnete Wahl! 🏡 Wir haben über 250 Premium-Immobilien im Portfolio. Um das Perfekte für Sie zu finden:\n\nWelche Art von Immobilie suchen Sie und wie hoch ist Ihr ungefähres Budget? Ich gebe Ihnen sofort personalisierte Empfehlungen.",
            actions: [
                { label: "🏠 Alle Immobilien ansehen", type: "scroll", target: "#portfolio" },
                { label: "🔍 Villen suchen", type: "whatsapp", target: "" },
                { label: "🏢 Wohnungen suchen", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Отличный выбор! 🏡 В нашем портфолио более 250 премиальных объектов. Чтобы найти идеальный вариант:\n\nКакой тип недвижимости вы ищете и какой у вас примерный бюджет? Я сразу дам персональные рекомендации.",
            actions: [
                { label: "🏠 Все объекты", type: "scroll", target: "#portfolio" },
                { label: "🔍 Ищу виллу", type: "whatsapp", target: "" },
                { label: "🏢 Ищу квартиру", type: "whatsapp", target: "" }
            ]
        }
    },

    ROI_INVESTMENT: {
        tr: {
            text: "Kuzey Kıbrıs şu anda Akdeniz'in en yüksek getirili emlak pazarı! 📈\n\n💰 Gerçek rakamlar:\n• Yıllık kira getirisi: %8-12 (Airbnb ile %15'e kadar)\n• Yıllık değer artışı: %15-20\n• AB birleşme potansiyeli: %50-150 sıçrama\n\n📊 Örnek: £300K villa → Yıllık £30K kira + £45K değer artışı = 1 yılda £75K kazanç (%25 ROI)\n\nGetiri hesaplayıcımızı kullanarak kendi yatırımınızın potansiyelini görün!",
            actions: [
                { label: "📊 Getiri hesaplayıcıyı aç", type: "scroll", target: "#calculator" },
                { label: "💬 Kişisel yatırım analizi iste", type: "whatsapp", target: "" },
                { label: "🏠 Yüksek getirili mülkler", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "North Cyprus is currently the highest-yielding property market in the Mediterranean! 📈\n\n💰 Real numbers:\n• Annual rental yield: 8-12% (up to 15% with Airbnb)\n• Annual appreciation: 15-20%\n• EU reunification potential: 50-150% value jump\n\n📊 Example: £300K villa → £30K annual rent + £45K appreciation = £75K profit in year 1 (25% ROI)\n\nUse our ROI calculator to see your investment's potential!",
            actions: [
                { label: "📊 Open ROI Calculator", type: "scroll", target: "#calculator" },
                { label: "💬 Request personal investment analysis", type: "whatsapp", target: "" },
                { label: "🏠 High-yield properties", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Nordzypern ist derzeit der ertragreichste Immobilienmarkt im Mittelmeerraum! 📈\n\n💰 Echte Zahlen:\n• Jährliche Mietrendite: 8-12% (bis 15% mit Airbnb)\n• Jährliche Wertsteigerung: 15-20%\n• EU-Wiedervereinigung: 50-150% Wertsteigerung möglich\n\n📊 Beispiel: £300K Villa → £30K Jahresmiete + £45K Wertsteigerung = £75K Gewinn im 1. Jahr (25% ROI)\n\nNutzen Sie unseren Renditerechner!",
            actions: [
                { label: "📊 Renditerechner öffnen", type: "scroll", target: "#calculator" },
                { label: "💬 Persönliche Analyse anfordern", type: "whatsapp", target: "" },
                { label: "🏠 Renditestarke Immobilien", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Северный Кипр — самый доходный рынок недвижимости в Средиземноморье! 📈\n\n💰 Реальные цифры:\n• Годовая арендная доходность: 8-12% (до 15% через Airbnb)\n• Годовой рост стоимости: 15-20%\n• Потенциал воссоединения с ЕС: скачок на 50-150%\n\n📊 Пример: вилла за £300K → £30K аренда + £45K рост = £75K прибыли за 1 год (25% ROI)",
            actions: [
                { label: "📊 Калькулятор доходности", type: "scroll", target: "#calculator" },
                { label: "💬 Запросить персональный анализ", type: "whatsapp", target: "" },
                { label: "🏠 Высокодоходные объекты", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    LOCATION_INFO: {
        tr: {
            text: "Kuzey Kıbrıs'ın her bölgesinin kendine özgü avantajları var! 🗺️\n\n🏔️ Girne (Kyrenia): Lüks villaların başkenti. Dağ + deniz. En yüksek değer artışı.\n🏖️ İskele (Long Beach): Airbnb cenneti. En yüksek kira getirisi.\n🏛️ Gazimağusa: Üniversite kenti. Garantili kiracı havuzu.\n🌿 Esentepe: Golf sahası. Sakin lüks yaşam.\n⛰️ Bellapais: Tarihi köy. Butik yatırım.\n\nHangi bölge ilginizi çekiyor? Size o bölgedeki en iyi fırsatları göstereyim!",
            actions: [
                { label: "🏠 Girne mülkleri", type: "scroll", target: "#portfolio" },
                { label: "🏠 İskele mülkleri", type: "scroll", target: "#portfolio" },
                { label: "💬 Bölge tavsiyesi al", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Each region in North Cyprus has unique advantages! 🗺️\n\n🏔️ Kyrenia (Girne): Capital of luxury villas. Mountain + sea. Highest appreciation.\n🏖️ Iskele (Long Beach): Airbnb paradise. Highest rental yields.\n🏛️ Famagusta: University city. Guaranteed tenant pool.\n🌿 Esentepe: Golf course. Quiet luxury living.\n⛰️ Bellapais: Historic village. Boutique investment.\n\nWhich area interests you? I'll show you the best opportunities!",
            actions: [
                { label: "🏠 Kyrenia properties", type: "scroll", target: "#portfolio" },
                { label: "🏠 Iskele properties", type: "scroll", target: "#portfolio" },
                { label: "💬 Get area recommendation", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Jede Region in Nordzypern hat einzigartige Vorteile! 🗺️\n\n🏔️ Kyrenia: Hauptstadt der Luxusvillen. Berg + Meer. Höchste Wertsteigerung.\n🏖️ Iskele (Long Beach): Airbnb-Paradies. Höchste Mietrendite.\n🏛️ Famagusta: Universitätsstadt. Garantierter Mieterpool.\n🌿 Esentepe: Golfplatz. Ruhiges Luxusleben.\n\nWelche Gegend interessiert Sie?",
            actions: [
                { label: "🏠 Kyrenia Immobilien", type: "scroll", target: "#portfolio" },
                { label: "🏠 Iskele Immobilien", type: "scroll", target: "#portfolio" },
                { label: "💬 Lageempfehlung erhalten", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Каждый регион Северного Кипра имеет уникальные преимущества! 🗺️\n\n🏔️ Кирения: Столица люксовых вилл. Горы + море. Максимальный рост стоимости.\n🏖️ Искеле (Long Beach): Рай для Airbnb. Максимальная доходность.\n🏛️ Фамагуста: Университетский город. Гарантированные арендаторы.\n🌿 Эсентепе: Гольф-курорт. Тихая роскошь.\n\nКакой район вас интересует?",
            actions: [
                { label: "🏠 Кирения", type: "scroll", target: "#portfolio" },
                { label: "🏠 Искеле", type: "scroll", target: "#portfolio" },
                { label: "💬 Рекомендация по району", type: "whatsapp", target: "" }
            ]
        }
    },

    LEGAL_PROCESS: {
        tr: {
            text: "Kuzey Kıbrıs'ta mülk almak aslında çok basit! İşte 5 adımlık süreç 📋\n\n1️⃣ Ücretsiz danışmanlık → Bütçe ve tercihlerinizi belirleyin\n2️⃣ Mülk seçimi → VIP tur veya sanal gösterim\n3️⃣ Hukuki inceleme → Partner avukatımız tapu ve izinleri kontrol eder\n4️⃣ Sözleşme → Depozito ile mülkü rezerve edin\n5️⃣ Tapu devri → Anahtarlarınızı teslim alın!\n\n⏱️ Toplam süre: 3-8 hafta\n📌 Tüm hukuki süreç partner avukatlarımız tarafından yönetilir. Ek ücret yok!",
            actions: [
                { label: "📋 Detaylı alım rehberi", type: "scroll", target: "#buying-guide" },
                { label: "📞 Ücretsiz hukuki danışmanlık", type: "whatsapp", target: "" },
                { label: "🏠 Hemen mülk ara", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "Buying property in North Cyprus is actually very straightforward! Here's the 5-step process 📋\n\n1️⃣ Free consultation → Define your budget and preferences\n2️⃣ Property selection → VIP tour or virtual viewing\n3️⃣ Legal review → Our partner lawyer checks title deeds and permits\n4️⃣ Contract → Reserve with a deposit\n5️⃣ Title transfer → Collect your keys!\n\n⏱️ Total timeline: 3-8 weeks\n📌 Entire legal process managed by our partner lawyers. No hidden fees!",
            actions: [
                { label: "📋 Detailed buying guide", type: "scroll", target: "#buying-guide" },
                { label: "📞 Free legal consultation", type: "whatsapp", target: "" },
                { label: "🏠 Start browsing properties", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Der Immobilienkauf in Nordzypern ist tatsächlich sehr unkompliziert! Hier ist der 5-Schritte-Prozess 📋\n\n1️⃣ Kostenlose Beratung → Budget und Wünsche definieren\n2️⃣ Immobilienauswahl → VIP-Tour oder virtuelle Besichtigung\n3️⃣ Rechtliche Prüfung → Unser Partneranwalt prüft alles\n4️⃣ Vertrag → Mit Anzahlung reservieren\n5️⃣ Eigentumsübertragung → Schlüssel erhalten!\n\n⏱️ Gesamtdauer: 3-8 Wochen\n📌 Gesamter Prozess von unseren Partneranwälten betreut!",
            actions: [
                { label: "📋 Detaillierter Kaufratgeber", type: "scroll", target: "#buying-guide" },
                { label: "📞 Kostenlose Rechtsberatung", type: "whatsapp", target: "" },
                { label: "🏠 Immobilien durchsuchen", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Покупка недвижимости на Северном Кипре очень проста! Вот 5 шагов 📋\n\n1️⃣ Бесплатная консультация → Определите бюджет\n2️⃣ Выбор объекта → VIP-тур или виртуальный осмотр\n3️⃣ Юридическая проверка → Наш партнер-юрист проверяет всё\n4️⃣ Договор → Бронирование с депозитом\n5️⃣ Передача права собственности → Получите ключи!\n\n⏱️ Общий срок: 3-8 недель\n📌 Весь процесс ведут наши партнеры-юристы!",
            actions: [
                { label: "📋 Подробный гид", type: "scroll", target: "#buying-guide" },
                { label: "📞 Бесплатная юридическая консультация", type: "whatsapp", target: "" },
                { label: "🏠 Смотреть объекты", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    RESIDENCY: {
        tr: {
            text: "Kuzey Kıbrıs'ta oturma izni almak çok kolay! 🛂\n\n✅ Minimum yatırım şartı YOK (Türkiye'nin aksine — orada $200K zorunlu)\n✅ Mülk satın alanlara 1 yıllık oturma izni verilir\n✅ Yıllık yenilenebilir\n✅ Aile üyelerini de kapsıyor\n✅ 340 gün güneş, düşük yaşam maliyeti\n\nBu, sadece bir yatırım değil — yeni bir yaşam fırsatı!",
            actions: [
                { label: "📋 Alım sürecini gör", type: "scroll", target: "#buying-guide" },
                { label: "💬 Oturma izni detayları", type: "whatsapp", target: "" },
                { label: "🏠 Yerleşime uygun mülkler", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "Getting residency in North Cyprus is very easy! 🛂\n\n✅ NO minimum investment required (unlike Turkey's $200K threshold)\n✅ Property buyers receive 1-year residence permit\n✅ Annually renewable\n✅ Covers family members too\n✅ 340 days of sunshine, low cost of living\n\nThis isn't just an investment — it's a new lifestyle!",
            actions: [
                { label: "📋 See buying process", type: "scroll", target: "#buying-guide" },
                { label: "💬 Residency details", type: "whatsapp", target: "" },
                { label: "🏠 Lifestyle properties", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Eine Aufenthaltserlaubnis in Nordzypern zu erhalten ist sehr einfach! 🛂\n\n✅ KEINE Mindestinvestition erforderlich\n✅ Immobilienkäufer erhalten 1-Jahres-Aufenthaltsgenehmigung\n✅ Jährlich verlängerbar\n✅ Gilt auch für Familienmitglieder\n✅ 340 Sonnentage, niedrige Lebenshaltungskosten",
            actions: [
                { label: "📋 Kaufprozess ansehen", type: "scroll", target: "#buying-guide" },
                { label: "💬 Details zur Aufenthaltsgenehmigung", type: "whatsapp", target: "" },
                { label: "🏠 Lifestyle-Immobilien", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Получить вид на жительство на Северном Кипре очень просто! 🛂\n\n✅ НЕТ минимального порога инвестиций\n✅ Покупатели получают ВНЖ на 1 год\n✅ Ежегодно продлевается\n✅ Распространяется на членов семьи\n✅ 340 солнечных дней, низкая стоимость жизни",
            actions: [
                { label: "📋 Процесс покупки", type: "scroll", target: "#buying-guide" },
                { label: "💬 Детали ВНЖ", type: "whatsapp", target: "" },
                { label: "🏠 Объекты для проживания", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    VIRTUAL_TOUR: {
        tr: {
            text: "Harika fikir! 🎥 Size iki seçenek sunabiliriz:\n\n1️⃣ Kayıtlı sanal turlar → Web sitemizde hemen izleyebilirsiniz\n2️⃣ Canlı video tur → Danışmanımız FaceTime/WhatsApp üzerinden mülkü size canlı gezdiriyor\n\nCanlı turlar tamamen ücretsiz ve yükümlülük yok. Tercih ettiğiniz gün ve saati söyleyin, organize edelim!",
            actions: [
                { label: "🎥 Sanal turları izle", type: "scroll", target: "#virtual-tour" },
                { label: "📹 Canlı tur randevusu", type: "whatsapp", target: "" },
                { label: "🏠 Mülkleri incele", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "Great idea! 🎥 We offer two options:\n\n1️⃣ Recorded virtual tours → Watch right now on our website\n2️⃣ Live video tour → Our advisor walks you through properties live via FaceTime/WhatsApp\n\nLive tours are completely free with zero obligation. Just tell us your preferred day and time!",
            actions: [
                { label: "🎥 Watch virtual tours", type: "scroll", target: "#virtual-tour" },
                { label: "📹 Book live tour", type: "whatsapp", target: "" },
                { label: "🏠 Browse properties", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Tolle Idee! 🎥 Wir bieten zwei Optionen:\n\n1️⃣ Aufgezeichnete virtuelle Touren → Jetzt auf unserer Website ansehen\n2️⃣ Live-Video-Tour → Unser Berater führt Sie live per WhatsApp durch die Immobilien\n\nLive-Touren sind kostenlos und unverbindlich!",
            actions: [
                { label: "🎥 Virtuelle Touren ansehen", type: "scroll", target: "#virtual-tour" },
                { label: "📹 Live-Tour buchen", type: "whatsapp", target: "" },
                { label: "🏠 Immobilien ansehen", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Отличная идея! 🎥 Мы предлагаем два варианта:\n\n1️⃣ Записанные виртуальные туры → Смотрите прямо сейчас\n2️⃣ Живой видео-тур → Наш консультант проведет вас по объектам через WhatsApp\n\nЖивые туры полностью бесплатны и без обязательств!",
            actions: [
                { label: "🎥 Виртуальные туры", type: "scroll", target: "#virtual-tour" },
                { label: "📹 Записаться на живой тур", type: "whatsapp", target: "" },
                { label: "🏠 Смотреть объекты", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    CONTACT_AGENT: {
        tr: {
            text: "Hemen bir danışmanımıza bağlayalım! 📞\n\nEn hızlı yol WhatsApp — danışmanlarımız genellikle 5 dakika içinde yanıt veriyor.\n\nHangi dilde görüşmek istersiniz? İngilizce, Türkçe, Almanca ve Rusça konuşan uzmanlarımız mevcut.",
            actions: [
                { label: "💬 WhatsApp ile ulaş (en hızlı)", type: "whatsapp", target: "" },
                { label: "📞 Hemen ara", type: "phone", target: "tel:+905338000000" },
                { label: "📧 E-posta gönder", type: "link", target: "mailto:info@nexaluxe.com" }
            ]
        },
        en: {
            text: "Let's connect you with an advisor right away! 📞\n\nThe fastest way is WhatsApp — our advisors typically respond within 5 minutes.\n\nWe have specialists who speak English, Turkish, German and Russian.",
            actions: [
                { label: "💬 WhatsApp (fastest)", type: "whatsapp", target: "" },
                { label: "📞 Call now", type: "phone", target: "tel:+905338000000" },
                { label: "📧 Send email", type: "link", target: "mailto:info@nexaluxe.com" }
            ]
        },
        de: {
            text: "Lassen Sie uns Sie sofort mit einem Berater verbinden! 📞\n\nDer schnellste Weg ist WhatsApp — unsere Berater antworten normalerweise innerhalb von 5 Minuten.\n\nWir haben deutschsprachige Spezialisten!",
            actions: [
                { label: "💬 WhatsApp (schnellste)", type: "whatsapp", target: "" },
                { label: "📞 Jetzt anrufen", type: "phone", target: "tel:+905338000000" },
                { label: "📧 E-Mail senden", type: "link", target: "mailto:info@nexaluxe.com" }
            ]
        },
        ru: {
            text: "Давайте сразу свяжем вас с консультантом! 📞\n\nСамый быстрый способ — WhatsApp. Наши консультанты отвечают в течение 5 минут.\n\nУ нас есть русскоязычные специалисты!",
            actions: [
                { label: "💬 WhatsApp (самый быстрый)", type: "whatsapp", target: "" },
                { label: "📞 Позвонить сейчас", type: "phone", target: "tel:+905338000000" },
                { label: "📧 Написать email", type: "link", target: "mailto:info@nexaluxe.com" }
            ]
        }
    },

    COMPARE: {
        tr: {
            text: "Karşılaştırma yapmanız çok akıllıca! İşte gerçekler 📊\n\n🇨🇾 Kuzey Kıbrıs vs Alternatifler:\n\n• Ortalama m²: KK £1,200 vs GK £3,500 vs İspanya £2,800\n• Kira getirisi: KK %8-12 vs GK %3-5 vs İspanya %4-6\n• Değer artışı: KK %15-20 vs GK %5-8 vs İspanya %5-7\n• Oturma izni: KK Kolay vs İspanya Golden Visa £500K+\n• Yaşam maliyeti: KK Düşük vs GK Yüksek vs İspanya Orta\n\n🏆 Sonuç: Kuzey Kıbrıs, fiyat/getiri oranında açık ara lider!",
            actions: [
                { label: "📊 ROI karşılaştırması yap", type: "scroll", target: "#calculator" },
                { label: "💬 Detaylı karşılaştırma raporu", type: "whatsapp", target: "" },
                { label: "🏠 En iyi fırsatları gör", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "Smart move comparing options! Here are the facts 📊\n\n🇨🇾 North Cyprus vs Alternatives:\n\n• Price per m²: NC £1,200 vs SC £3,500 vs Spain £2,800\n• Rental yield: NC 8-12% vs SC 3-5% vs Spain 4-6%\n• Appreciation: NC 15-20% vs SC 5-8% vs Spain 5-7%\n• Residency: NC easy vs Spain Golden Visa £500K+\n• Cost of living: NC low vs SC high vs Spain medium\n\n🏆 Result: North Cyprus leads in price-to-return ratio by far!",
            actions: [
                { label: "📊 ROI comparison", type: "scroll", target: "#calculator" },
                { label: "💬 Detailed comparison report", type: "whatsapp", target: "" },
                { label: "🏠 See top opportunities", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Klug, Optionen zu vergleichen! Hier sind die Fakten 📊\n\n🇨🇾 Nordzypern vs Alternativen:\n\n• Preis pro m²: NZ £1.200 vs SZ £3.500 vs Spanien £2.800\n• Mietrendite: NZ 8-12% vs SZ 3-5% vs Spanien 4-6%\n• Wertsteigerung: NZ 15-20% vs SZ 5-8% vs Spanien 5-7%\n\n🏆 Ergebnis: Nordzypern führt beim Preis-Rendite-Verhältnis!",
            actions: [
                { label: "📊 Rendite-Vergleich", type: "scroll", target: "#calculator" },
                { label: "💬 Vergleichsbericht anfordern", type: "whatsapp", target: "" },
                { label: "🏠 Top-Angebote ansehen", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Разумно сравнивать варианты! Вот факты 📊\n\n🇨🇾 Северный Кипр vs Альтернативы:\n\n• Цена за м²: СК £1.200 vs ЮК £3.500 vs Испания £2.800\n• Доходность: СК 8-12% vs ЮК 3-5% vs Испания 4-6%\n• Рост: СК 15-20% vs ЮК 5-8% vs Испания 5-7%\n\n🏆 Северный Кипр лидирует по соотношению цена/доход!",
            actions: [
                { label: "📊 Сравнение доходности", type: "scroll", target: "#calculator" },
                { label: "💬 Запросить отчет", type: "whatsapp", target: "" },
                { label: "🏠 Лучшие предложения", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    RENTAL_INCOME: {
        tr: {
            text: "Kira geliri, Kuzey Kıbrıs yatırımının en çekici yanlarından biri! 🏖️\n\n📊 Gerçek kira verileri:\n• Kısa dönem (Airbnb): Yaz €80-250/gece, %75+ doluluk\n• Uzun dönem: £600-3.000/ay bölgeye göre\n• Yıllık ortalama getiri: Mülk değerinin %8-12'si\n\n🔥 En popüler bölgeler:\n• Long Beach (İskele): En yüksek Airbnb talebi\n• Girne merkez: Uzun dönem kiracı garantisi\n• Esentepe: Golf turizmi + tatilci",
            actions: [
                { label: "📊 Kira getirini hesapla", type: "scroll", target: "#calculator" },
                { label: "🏠 Yüksek kira getirili mülkler", type: "scroll", target: "#portfolio" },
                { label: "💬 Kira yönetim detayları", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Rental income is one of the most attractive aspects of investing in North Cyprus! 🏖️\n\n📊 Real rental data:\n• Short-term (Airbnb): Summer €80-250/night, 75%+ occupancy\n• Long-term: £600-3,000/month depending on area\n• Average annual yield: 8-12% of property value\n\n🔥 Top areas:\n• Long Beach (Iskele): Highest Airbnb demand\n• Kyrenia center: Long-term tenant guarantee\n• Esentepe: Golf tourism + holidaymakers",
            actions: [
                { label: "📊 Calculate rental yield", type: "scroll", target: "#calculator" },
                { label: "🏠 High-yield rental properties", type: "scroll", target: "#portfolio" },
                { label: "💬 Rental management details", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Mieteinnahmen sind einer der attraktivsten Aspekte einer Investition in Nordzypern! 🏖️\n\n📊 Echte Mietdaten:\n• Kurzzeit (Airbnb): Sommer €80-250/Nacht, 75%+ Auslastung\n• Langzeit: £600-3.000/Monat je nach Lage\n• Durchschnittliche Jahresrendite: 8-12%\n\n🔥 Top-Lagen:\n• Long Beach: Höchste Airbnb-Nachfrage\n• Kyrenia Zentrum: Langzeit-Mietergarantie\n• Esentepe: Golf-Tourismus",
            actions: [
                { label: "📊 Mietrendite berechnen", type: "scroll", target: "#calculator" },
                { label: "🏠 Renditestarke Mietobjekte", type: "scroll", target: "#portfolio" },
                { label: "💬 Details zur Mietverwaltung", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Арендный доход — одно из главных преимуществ инвестиций на Северном Кипре! 🏖️\n\n📊 Реальные данные:\n• Краткосрочная аренда (Airbnb): лето €80-250/ночь, заполняемость 75%+\n• Долгосрочная: £600-3.000/месяц\n• Средняя годовая доходность: 8-12%\n\n🔥 Лучшие районы:\n• Long Beach: Максимальный спрос на Airbnb\n• Центр Кирении: Гарантия долгосрочных арендаторов\n• Эсентепе: Гольф-курорт",
            actions: [
                { label: "📊 Рассчитать доходность", type: "scroll", target: "#calculator" },
                { label: "🏠 Высокодоходные объекты", type: "scroll", target: "#portfolio" },
                { label: "💬 Детали управления арендой", type: "whatsapp", target: "" }
            ]
        }
    },

    SAFETY_TRUST: {
        tr: {
            text: "Güveniniz bizim için çok önemli! İşte neden bize güvenebilirsiniz 🛡️\n\n✅ 2009'dan beri faaliyet — 15+ yıl deneyim\n✅ 2.400+ memnun uluslararası müşteri\n✅ Bağımsız partner avukatlar — sizin çıkarınızı korur\n✅ İngilizce, Türkçe, Almanca, Rusça hizmet\n✅ Şeffaf fiyatlama — gizli masraf YOK\n✅ Google'da 4.9/5 puan\n\nMüşterilerimizin gerçek hikayelerini okuyun ve kendiniz karar verin!",
            actions: [
                { label: "⭐ Müşteri hikayeleri", type: "scroll", target: "#testimonials" },
                { label: "📞 Referans müşterimizle konuşun", type: "whatsapp", target: "" },
                { label: "📋 Hukuki güvencelerimiz", type: "scroll", target: "#buying-guide" }
            ]
        },
        en: {
            text: "Your trust matters to us! Here's why you can rely on us 🛡️\n\n✅ Operating since 2009 — 15+ years of experience\n✅ 2,400+ satisfied international clients\n✅ Independent partner lawyers — protecting YOUR interests\n✅ Service in English, Turkish, German, Russian\n✅ Transparent pricing — NO hidden costs\n✅ 4.9/5 on Google Reviews\n\nRead real stories from our clients and judge for yourself!",
            actions: [
                { label: "⭐ Client stories", type: "scroll", target: "#testimonials" },
                { label: "📞 Speak to a reference client", type: "whatsapp", target: "" },
                { label: "📋 Our legal guarantees", type: "scroll", target: "#buying-guide" }
            ]
        },
        de: {
            text: "Ihr Vertrauen ist uns wichtig! Deshalb können Sie sich auf uns verlassen 🛡️\n\n✅ Seit 2009 tätig — über 15 Jahre Erfahrung\n✅ 2.400+ zufriedene internationale Kunden\n✅ Unabhängige Partneranwälte — schützen IHRE Interessen\n✅ Transparente Preise — KEINE versteckten Kosten\n✅ 4,9/5 bei Google-Bewertungen",
            actions: [
                { label: "⭐ Kundenerfahrungen", type: "scroll", target: "#testimonials" },
                { label: "📞 Mit Referenzkunden sprechen", type: "whatsapp", target: "" },
                { label: "📋 Unsere Garantien", type: "scroll", target: "#buying-guide" }
            ]
        },
        ru: {
            text: "Ваше доверие важно для нас! Вот почему вы можете на нас положиться 🛡️\n\n✅ Работаем с 2009 — более 15 лет опыта\n✅ 2.400+ довольных международных клиентов\n✅ Независимые юристы — защищают ВАШИ интересы\n✅ Прозрачные цены — БЕЗ скрытых расходов\n✅ 4.9/5 в Google отзывах",
            actions: [
                { label: "⭐ Истории клиентов", type: "scroll", target: "#testimonials" },
                { label: "📞 Поговорить с клиентом-референсом", type: "whatsapp", target: "" },
                { label: "📋 Наши гарантии", type: "scroll", target: "#buying-guide" }
            ]
        }
    },

    BUDGET_SPECIFIC: {
        tr: {
            text: "Mükemmel! Bütçenize göre size özel seçeneklerimiz var 🎯\n\nDanışmanımız bütçenize tam uygun mülkleri, ödeme planı seçeneklerini ve beklenen getiri oranlarını içeren kişisel bir rapor hazırlayabilir.\n\nWhatsApp üzerinden bütçenizi ve tercihlerinizi paylaşırsanız, 30 dakika içinde size özel seçenekler gönderelim!",
            actions: [
                { label: "💬 Bütçemi WhatsApp'tan paylaşayım", type: "whatsapp", target: "" },
                { label: "🏠 Tüm mülkleri gör", type: "scroll", target: "#portfolio" },
                { label: "📊 Yatırım getirisi hesapla", type: "scroll", target: "#calculator" }
            ]
        },
        en: {
            text: "Excellent! We have tailored options for your budget 🎯\n\nOur advisor can prepare a personal report with properties matching your budget, payment plan options, and expected returns.\n\nShare your budget and preferences via WhatsApp and we'll send customized options within 30 minutes!",
            actions: [
                { label: "💬 Share budget on WhatsApp", type: "whatsapp", target: "" },
                { label: "🏠 Browse all properties", type: "scroll", target: "#portfolio" },
                { label: "📊 Calculate ROI", type: "scroll", target: "#calculator" }
            ]
        },
        de: {
            text: "Ausgezeichnet! Wir haben maßgeschneiderte Optionen für Ihr Budget 🎯\n\nTeilen Sie Ihr Budget und Ihre Wünsche per WhatsApp mit und wir senden Ihnen innerhalb von 30 Minuten individuelle Optionen!",
            actions: [
                { label: "💬 Budget per WhatsApp teilen", type: "whatsapp", target: "" },
                { label: "🏠 Alle Immobilien ansehen", type: "scroll", target: "#portfolio" },
                { label: "📊 Rendite berechnen", type: "scroll", target: "#calculator" }
            ]
        },
        ru: {
            text: "Отлично! У нас есть варианты специально для вашего бюджета 🎯\n\nНапишите бюджет и пожелания в WhatsApp — мы отправим индивидуальные варианты в течение 30 минут!",
            actions: [
                { label: "💬 Написать бюджет в WhatsApp", type: "whatsapp", target: "" },
                { label: "🏠 Все объекты", type: "scroll", target: "#portfolio" },
                { label: "📊 Рассчитать доходность", type: "scroll", target: "#calculator" }
            ]
        }
    },

    OBJECTION_EXPENSIVE: {
        tr: {
            text: "Anlıyorum, fiyat önemli bir faktör. Ancak Kuzey Kıbrıs'ta 'pahalı' kavramı görecelidir! 💡\n\nNeden mi?\n• İspanya veya Portekiz'deki benzer mülklerin yarı fiyatına!\n• %8-12 kira getirisi ile mülk kendini 8-10 yılda amorti ediyor.\n• Esnek ödeme planları: %30 peşinat, kalan 2-5 yıl faizsiz taksit.\n\nBütçenize tam uygun 'gizli fırsat' mülklerimizi görmeniz için sizi bir danışmanımıza bağlayalım mı?",
            actions: [
                { label: "💰 Esnek ödeme planlarını gör", type: "whatsapp", target: "" },
                { label: "🏠 £100K altı fırsatlar", type: "scroll", target: "#portfolio" },
                { label: "📞 Danışmanla bütçe konuş", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "I understand, price is a major factor. However, 'expensive' is relative in North Cyprus! 💡\n\nHere's why:\n• Half the price of similar properties in Spain or Portugal!\n• 8-12% rental yield means the property pays for itself in 8-10 years.\n• Flexible payment plans: 30% down, remaining 2-5 years interest-free.\n\nShall I connect you with an advisor to see our 'hidden gem' properties that fit your budget?",
            actions: [
                { label: "💰 See flexible payment plans", type: "whatsapp", target: "" },
                { label: "🏠 Deals under £100K", type: "scroll", target: "#portfolio" },
                { label: "📞 Discuss budget with advisor", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Ich verstehe, der Preis ist wichtig. Aber 'teuer' ist in Nordzypern relativ! 💡\n\n• Halber Preis gegenüber Spanien oder Portugal!\n• 8-12% Mietrendite - finanziert sich in 8-10 Jahren selbst.\n• Flexible Zahlungspläne verfügbar.",
            actions: [
                { label: "💰 Zahlungspläne ansehen", type: "whatsapp", target: "" },
                { label: "🏠 Angebote unter £100K", type: "scroll", target: "#portfolio" },
                { label: "📞 Budget besprechen", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Понимаю, цена важна. Но 'дорого' на Северном Кипре — понятие относительное! 💡\n\n• В 2 раза дешевле, чем в Испании или Португалии!\n• Доходность 8-12% — окупаемость за 8-10 лет.\n• Рассрочка: 30% первый взнос, остаток на 2-5 лет без %.",
            actions: [
                { label: "💰 Посмотреть рассрочку", type: "whatsapp", target: "" },
                { label: "🏠 Объекты до £100K", type: "scroll", target: "#portfolio" },
                { label: "📞 Обсудить бюджет", type: "whatsapp", target: "" }
            ]
        }
    },

    OBJECTION_RISKY: {
        tr: {
            text: "Risk algınızı anlıyorum, ancak rakamlar ve gerçekler farklı söylüyor! 🛡️\n\n• Hukuki Güvence: Mülk alım süreci İngiliz hukuk sistemine dayanır.\n• Tapu Garantisi: Tüm satışlar Tapu Dairesi'nde tescil edilir.\n• Siyasi Stabilite: 40+ yıldır huzurlu bir ortam.\n• Artan Talep: Alman ve Rus yatırımcılar pazarı domine ediyor — onlar riskli bir yere yatırım yapmazlar!\n\nMerak ettiğiniz spesifik bir risk varsa, avukatımızla 10 dakikalık ücretsiz bir görüşme organize edebilirim.",
            actions: [
                { label: "⚖️ Avukatla görüşme ayarla", type: "whatsapp", target: "" },
                { label: "📋 Hukuki alım rehberi", type: "scroll", target: "#buying-guide" },
                { label: "💬 Neden şimdi tam zamanı?", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "I understand the concern, but the facts tell a different story! 🛡️\n\n• Legal Safety: Buying process is based on the British legal system.\n• Title Guarantee: All sales are registered at the Land Registry.\n• Political Stability: 40+ years of peaceful environment.\n• Growing Demand: German and Russian investors dominate the market — they don't invest in risky places!\n\nIf you have a specific concern, I can organize a free 10-minute call with our partner lawyer.",
            actions: [
                { label: "⚖️ Book call with lawyer", type: "whatsapp", target: "" },
                { label: "📋 Legal buying guide", type: "scroll", target: "#buying-guide" },
                { label: "💬 Why now is the time?", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Ich verstehe Ihre Bedenken, aber die Fakten sprechen eine andere Sprache! 🛡️\n\n• Rechtssicherheit: Das System basiert auf britischem Recht.\n• Grundbuchgarantie: Alle Verkäufe werden amtlich registriert.\n• Hohe Nachfrage: Deutsche Investoren dominieren den Markt.",
            actions: [
                { label: "⚖️ Gespräch mit Anwalt", type: "whatsapp", target: "" },
                { label: "📋 Kaufratgeber", type: "scroll", target: "#buying-guide" },
                { label: "💬 Warum jetzt investieren?", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Понимаю ваши опасения, но факты говорят об обратном! 🛡️\n\n• Юридическая безопасность: Система основана на британском праве.\n• Гарантия собственности: Все сделки регистрируются официально.\n• Растущий спрос: Немецкие инвесторы активно покупают здесь.",
            actions: [
                { label: "⚖️ Консультация юриста", type: "whatsapp", target: "" },
                { label: "📋 Юридический гид", type: "scroll", target: "#buying-guide" },
                { label: "💬 Почему сейчас?", type: "whatsapp", target: "" }
            ]
        }
    },

    OBJECTION_LATER: {
        tr: {
            text: "Beklemek mantıklı görünebilir, ancak maliyeti çok yüksek olabilir! ⏳\n\nNeden beklememelisiniz?\n• Fiyat artışı: Mülk fiyatları her yıl %15-20 artıyor. Gelecek yıl aynı evi £30,000 daha pahalıya alabilirsiniz.\n• En iyi birimler: Lansman projelerindeki 'en iyi manzara' ve 'en iyi fiyat' mülkleri ilk 2 haftada satılıyor.\n• Euro/Sterlin avantajı: Şu anki kurlarla yatırım yapmak çok avantajlı.\n\nSadece beklentilerinize uygun bir fırsat çıktığında haber vermemiz için sizi listemize ekleyelim mi?",
            actions: [
                { label: "🔔 Fırsat listesine ekle", type: "whatsapp", target: "" },
                { label: "📈 Fiyat artış grafiğini gör", type: "scroll", target: "#calculator" },
                { label: "💬 Üst yönetimle görüş", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Waiting might seem logical, but the cost of waiting is high! ⏳\n\nWhy you shouldn't wait:\n• Price appreciation: Property prices rise 15-20% annually. Next year, the same home could cost £30,000 more.\n• Best units: The 'best views' and 'best prices' sell within the first 2 weeks of a launch.\n• Currency advantage: Current rates make it a very opportunistic time to invest.\n\nShall we add you to our 'Hot Deals' list so you only hear from us when a perfect match appears?",
            actions: [
                { label: " Add to Hot Deals list", type: "whatsapp", target: "" },
                { label: "📈 See appreciation trends", type: "scroll", target: "#calculator" },
                { label: "💬 Talk to management", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Warten mag logisch erscheinen, aber die Kosten des Wartens sind hoch! ⏳\n\n• Wertsteigerung: Preise steigen jährlich um 15-20%.\n• Beste Einheiten: Die besten Angebote sind schnell vergriffen.\n• Währungsvorteil: Jetzt ist ein günstiger Zeitpunkt.",
            actions: [
                { label: "🔔 In Hot-Deals-Liste aufnehmen", type: "whatsapp", target: "" },
                { label: "📈 Wertsteigerung ansehen", type: "scroll", target: "#calculator" },
                { label: "💬 Mit Management sprechen", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Ожидание кажется логичным, но оно может дорого обойтись! ⏳\n\n• Рост цен: Недвижимость дорожает на 15-20% в год.\n• Лучшие варианты: Объекты с лучшим видом уходят первыми.\n• Выгода: Сейчас отличный момент для входа в рынок.",
            actions: [
                { label: "🔔 В список горячих предложений", type: "whatsapp", target: "" },
                { label: "📈 График роста цен", type: "scroll", target: "#calculator" },
                { label: "💬 Поговорить с руководством", type: "whatsapp", target: "" }
            ]
        }
    },

    OBJECTION_FAR: {
        tr: {
            text: "Uzaklık bir engel değil, bir avantaj! ✈️\n\n• Ulaşım: Ercan Havalimanı yeni terminali ile kapasiteyi 3 kat artırdı. Birçok şehirden doğrudan veya kısa aktarmalı uçuşlar var.\n• VIP Transfer: Havaalanından kapınıza kadar ücretsiz VIP transfer sağlıyoruz.\n• Yönetim: Siz burada değilken mülkünüzü biz yönetiyoruz (Airbnb, temizlik, bakım). Siz sadece kiranızı alıyorsunuz.\n\nKıbrıs'ı ziyaret etmeniz için size özel bir 'İnceleme Turu' organize edelim mi? (3 gece ücretsiz konaklama dahil!)",
            actions: [
                { label: "✈️ İnceleme turu detayları", type: "whatsapp", target: "" },
                { label: "📸 Uzaktan yönetim nasıl çalışır?", type: "whatsapp", target: "" },
                { label: "📍 Konumları haritada gör", type: "scroll", target: "#portfolio" }
            ]
        },
        en: {
            text: "Distance is an advantage, not a barrier! ✈️\n\n• Access: Ercan Airport's new terminal has tripled capacity. Easy access from Europe and MENA.\n• VIP Transfer: We provide free VIP transfers from the airport to your door.\n• Management: We manage your property while you're away (Airbnb, cleaning, maintenance). You just collect the rent.\n\nShall we organize a 'Discovery Tour' for you? (Includes 3 nights free accommodation!)",
            actions: [
                { label: "✈️ Discovery tour details", type: "whatsapp", target: "" },
                { label: "📸 How remote management works", type: "whatsapp", target: "" },
                { label: "📍 See locations on map", type: "scroll", target: "#portfolio" }
            ]
        },
        de: {
            text: "Entfernung ist ein Vorteil, kein Hindernis! ✈️\n\n• VIP-Transfer: Wir holen Sie kostenlos vom Flughafen ab.\n• Verwaltung: Wir kümmern uns um alles, während Sie weg sind.\n• Besichtigungstour: Wir organisieren eine Tour (3 Nächte kostenlos!)",
            actions: [
                { label: "✈️ Details Besichtigungstour", type: "whatsapp", target: "" },
                { label: "📸 Wie Fernverwaltung funktioniert", type: "whatsapp", target: "" },
                { label: "📍 Lagen auf Karte sehen", type: "scroll", target: "#portfolio" }
            ]
        },
        ru: {
            text: "Расстояние — это преимущество! ✈️\n\n• VIP Трансфер: Мы встретим вас в аэропорту.\n• Управление: Мы берем на себя всё обслуживание, пока вы в отъезде.\n• Ознакомительный тур: Организуем поездку (3 ночи бесплатно!)",
            actions: [
                { label: "✈️ Детали ознакомительного тура", type: "whatsapp", target: "" },
                { label: "📸 Как работает управление?", type: "whatsapp", target: "" },
                { label: "📍 Районы на карте", type: "scroll", target: "#portfolio" }
            ]
        }
    },

    OBJECTION_UNSURE: {
        tr: {
            text: "Kararsız olmanız çok doğal, büyük bir yatırım yapıyorsunuz. Sizi rahatlatmak için ne yapabiliriz? 🤔\n\n• Memnun müşterilerimizle görüştürebiliriz.\n• Bağımsız bir avukat raporu sunabiliriz.\n• Size özel bir kira getirisi projeksiyonu hazırlayabiliriz.\n\nKafanıza takılan en küçük soruyu bile sormaktan çekinmeyin. Size dürüst ve net yanıtlar vermek için buradayım.",
            actions: [
                { label: "💬 Uzmana soru sor", type: "whatsapp", target: "" },
                { label: "⭐ Müşteri yorumlarını oku", type: "scroll", target: "#testimonials" },
                { label: "📞 10 dk bilgi görüşmesi", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "It's natural to be unsure when making a significant investment. How can we help you feel more confident? 🤔\n\n• We can connect you with existing happy clients.\n• We can provide an independent lawyer's report.\n• We can create a personalized rental yield projection.\n\nFeel free to ask even the smallest question. I'm here to give you clear, honest answers.",
            actions: [
                { label: "💬 Ask a specialist", type: "whatsapp", target: "" },
                { label: "⭐ Read client reviews", type: "scroll", target: "#testimonials" },
                { label: "📞 10 min info call", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Es ist normal, bei einer Investition unsicher zu sein. Wie können wir Ihnen helfen? 🤔\n\nWir können Ihnen Referenzen geben, rechtliche Berichte vorlegen oder eine Rendite-Prognose erstellen.",
            actions: [
                { label: "💬 Experten fragen", type: "whatsapp", target: "" },
                { label: "⭐ Bewertungen lesen", type: "scroll", target: "#testimonials" },
                { label: "📞 10 Min. Gespräch", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Естественно сомневаться при крупных инвестициях. Чем мы можем помочь? 🤔\n\nМожем связать с клиентами, предоставить отчет юриста или составить прогноз доходности.",
            actions: [
                { label: "💬 Спросить эксперта", type: "whatsapp", target: "" },
                { label: "⭐ Читать отзывы", type: "scroll", target: "#testimonials" },
                { label: "📞 10 мин звонок", type: "whatsapp", target: "" }
            ]
        }
    },

    THANKS_BYE: {
        tr: {
            text: "Benimle görüştüğünüz için teşekkür ederim! 😊 Herhangi bir sorunuz olduğunda ben buradayım (7/24).\n\nKuzey Kıbrıs'ın en iyi mülklerini kaçırmamak için bizi takipte kalın!",
            actions: [
                { label: "🏠 Mülklere son kez bak", type: "scroll", target: "#portfolio" },
                { label: "💬 WhatsApp'ta iletişimde kal", type: "whatsapp", target: "" },
                { label: "📊 ROI hesapla", type: "scroll", target: "#calculator" }
            ]
        },
        en: {
            text: "Thank you for chatting with me! 😊 I'm here whenever you have more questions (24/7).\n\nDon't miss out on the best property opportunities in North Cyprus!",
            actions: [
                { label: "🏠 One last look at properties", type: "scroll", target: "#portfolio" },
                { label: "💬 Keep in touch on WhatsApp", type: "whatsapp", target: "" },
                { label: "📊 Calculate ROI", type: "scroll", target: "#calculator" }
            ]
        },
        de: {
            text: "Vielen Dank für das Gespräch! 😊 Ich bin jederzeit für Sie da.\n\nVerpassen Sie nicht die besten Gelegenheiten in Nordzypern!",
            actions: [
                { label: "🏠 Immobilien ansehen", type: "scroll", target: "#portfolio" },
                { label: "💬 In Kontakt bleiben (WhatsApp)", type: "whatsapp", target: "" },
                { label: "📊 Rendite berechnen", type: "scroll", target: "#calculator" }
            ]
        },
        ru: {
            text: "Спасибо за общение! 😊 Я всегда здесь, если возникнут вопросы.\n\nНе упустите лучшие возможности на Северном Кипре!",
            actions: [
                { label: "🏠 Еще раз глянуть объекты", type: "scroll", target: "#portfolio" },
                { label: "💬 Оставаться на связи в WhatsApp", type: "whatsapp", target: "" },
                { label: "📊 Рассчитать доходность", type: "scroll", target: "#calculator" }
            ]
        }
    },

    UNKNOWN: {
        tr: {
            text: "Teşekkürler! Bu konuda size daha detaylı bilgi verebilmem için sizi uzman danışmanlarımızla buluşturmak isterim. WhatsApp üzerinden 5 dakika içinde yanıt alabilirsiniz! 🚀",
            actions: [
                { label: "🏠 Mülkleri gör", type: "scroll", target: "#portfolio" },
                { label: "💰 Yatırım getirisi hesapla", type: "scroll", target: "#calculator" },
                { label: "💬 WhatsApp ile danışmana ulaş", type: "whatsapp", target: "" }
            ]
        },
        en: {
            text: "Thanks for your message! To give you the most detailed answer, I'd love to connect you with our expert advisors. They respond within 5 minutes on WhatsApp! 🚀",
            actions: [
                { label: "🏠 Browse properties", type: "scroll", target: "#portfolio" },
                { label: " Calculate investment returns", type: "scroll", target: "#calculator" },
                { label: "💬 WhatsApp an advisor", type: "whatsapp", target: "" }
            ]
        },
        de: {
            text: "Danke für Ihre Nachricht! Für die detaillierteste Antwort möchte ich Sie mit unseren Experten verbinden. Antwort innerhalb von 5 Minuten per WhatsApp! 🚀",
            actions: [
                { label: "🏠 Immobilien ansehen", type: "scroll", target: "#portfolio" },
                { label: "💰 Rendite berechnen", type: "scroll", target: "#calculator" },
                { label: "💬 WhatsApp-Berater", type: "whatsapp", target: "" }
            ]
        },
        ru: {
            text: "Спасибо за сообщение! Чтобы дать максимально подробный ответ, хочу связать вас с экспертами. Ответ в течение 5 минут через WhatsApp! 🚀",
            actions: [
                { label: "🏠 Смотреть объекты", type: "scroll", target: "#portfolio" },
                { label: "💰 Рассчитать доход", type: "scroll", target: "#calculator" },
                { label: "💬 WhatsApp консультанту", type: "whatsapp", target: "" }
            ]
        }
    }
};

export default function SalesChatbot({ initialLocale = 'en' }: { initialLocale?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [detectedLang, setDetectedLang] = useState<SupportedLang>(initialLocale as SupportedLang || 'en');
    const [messageCount, setMessageCount] = useState(0);
    const [contactCaptured, setContactCaptured] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowHint(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const addBotMessage = (response: ChatResponse) => {
        setIsTyping(true);
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now().toString(),
                text: response.text,
                sender: 'bot',
                timestamp: new Date(),
                actions: response.actions
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);

            if (response.followUp) {
                setTimeout(() => {
                    const followUpMsg: Message = {
                        id: (Date.now() + 1).toString(),
                        text: response.followUp!,
                        sender: 'bot',
                        timestamp: new Date()
                    };
                    setMessages(prev => [...prev, followUpMsg]);
                }, 3000);
            }
        }, 800);
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setMessageCount(prev => prev + 1);

        const lang = detectLanguage(text);
        setDetectedLang(prev => {
            if (lang === prev) return prev;
            return lang;
        });

        // Lead capture check
        const contact = extractContactInfo(text);
        if ((contact.email || contact.phone) && !contactCaptured) {
            setContactCaptured(true);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            addBotMessage({
                text: CONTACT_CAPTURED[lang],
                actions: [
                    { label: "🏠 Browse Properties", type: "scroll", target: "#portfolio" },
                    { label: "📞 WhatsApp Advisor", type: "whatsapp", target: "" }
                ]
            });
            return;
        }

        const intent = detectIntent(text, lang);
        const response = (RESPONSES[intent] || RESPONSES.UNKNOWN)[lang];
        addBotMessage(response);

        // Periodic lead capture
        if (messageCount > 0 && (messageCount + 1) % 3 === 0 && !contactCaptured) {
            setTimeout(() => {
                const leadMsg: Message = {
                    id: (Date.now() + 2).toString(),
                    text: LEAD_CAPTURE_MESSAGES[lang],
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, leadMsg]);
            }, 5000);
        }
    };

    const handleAction = (action: ChatAction) => {
        switch (action.type) {
            case 'scroll':
                const element = document.querySelector(action.target);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                }
                break;
            case 'whatsapp':
                window.open(getWhatsAppUrl(detectedLang), '_blank');
                break;
            case 'phone':
                window.location.href = action.target;
                break;
            case 'link':
                window.open(action.target, '_blank');
                break;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 lg:bottom-24 lg:right-8 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] md:h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f14]/98 backdrop-blur-2xl shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gold/10 border-b border-white/5 px-6 py-4 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gold" />
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                                    <Bot className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm leading-tight">NEXA LUXE</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                <X className="h-4 w-4 text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <Bot className="h-12 w-12 text-gold/20 mx-auto mb-4" />
                                    <p className="text-xs text-text-secondary uppercase tracking-widest">How can we help today?</p>
                                </div>
                            )}
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("space-y-2", msg.sender === 'bot' ? "" : "flex flex-col items-end")}>
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
                                        msg.sender === 'bot'
                                            ? "bg-white/[0.05] text-text-primary rounded-tl-none"
                                            : "bg-gold/10 border border-gold/20 text-text-primary rounded-tr-none"
                                    )}>
                                        {msg.text}
                                    </div>
                                    {msg.actions && (
                                        <div className="flex flex-col gap-2 w-full max-w-[85%]">
                                            {msg.actions.map((action, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleAction(action)}
                                                    className="w-full text-left bg-white/[0.04] hover:bg-gold/10 border border-white/[0.08] hover:border-gold/30 rounded-xl px-4 py-2.5 text-xs transition-all flex items-center justify-between group"
                                                >
                                                    <span className="font-medium text-text-secondary group-hover:text-white">{action.label}</span>
                                                    <MousePointer2 className="h-3 w-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="bg-white/[0.05] text-text-primary max-w-[60px] rounded-2xl p-3 flex gap-1 items-center rounded-tl-none">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-black/40 border-t border-white/5">
                            <form
                                className="relative"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend(inputValue);
                                }}
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-4 pr-12 text-sm text-text-primary focus:outline-none focus:border-gold/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1.5 h-9 w-9 bg-gold rounded-lg flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all"
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint Bubble */}
            <AnimatePresence>
                {showHint && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute bottom-20 right-0 mb-4 pr-2 w-[200px]"
                    >
                        <div className="relative bg-gold text-black px-6 py-3 rounded-2xl rounded-br-none font-bold text-[10px] uppercase tracking-widest shadow-xl">
                            {WELCOME_BUBBLES[detectedLang][0]}
                            <div className="absolute top-1/2 left-full -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-gold" />
                        </div>

                        {/* Success Overlay */}
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-3xl text-center p-8"
                                >
                                    <motion.div
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        className="h-20 w-20 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-6"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-black">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </motion.div>
                                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                                        {detectedLang === 'tr' ? 'Talebiniz Alındı!' : detectedLang === 'ru' ? 'Запрос получен!' : detectedLang === 'de' ? 'Anfrage erhalten!' : 'Request Received!'}
                                    </h3>
                                    <p className="text-sm text-text-secondary leading-relaxed">
                                        {detectedLang === 'tr' ? 'Uzman danışmanımız 5 dakika içinde sizinle iletişime geçecektir.' : detectedLang === 'ru' ? 'Наш эксперт свяжется с вами в течение 5 минут.' : detectedLang === 'de' ? 'Unser Experte wird sich in 5 Minuten bei Ihnen melden.' : 'Our expert will contact you within 5 minutes.'}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowHint(false);
                }}
                className="relative h-16 w-16 rounded-full bg-gradient-to-br from-gold to-gold/80 shadow-2xl flex items-center justify-center text-black group hover:scale-105 transition-all animate-pulse"
                style={{ animationDuration: '3s' }}
            >
                {isOpen ? (
                    <X className="h-7 w-7" />
                ) : (
                    <>
                        <MessageCircle className="h-7 w-7" />
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent-red rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#09090b]">
                            1
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
