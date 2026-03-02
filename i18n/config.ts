export const locales = ['en', 'tr', 'de', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
    en: 'English',
    tr: 'Türkçe',
    de: 'Deutsch',
    ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
    en: '🇬🇧',
    tr: '🇹🇷',
    de: '🇩🇪',
    ru: '🇷🇺',
};
