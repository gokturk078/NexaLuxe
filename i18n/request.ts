import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
    // Fallback to 'en' if locale is missing or invalid
    const activeLocale = locale && locales.includes(locale as any) ? locale : 'en';

    return {
        locale: activeLocale,
        messages: (await import(`./messages/${activeLocale}.json`)).default
    };
});
