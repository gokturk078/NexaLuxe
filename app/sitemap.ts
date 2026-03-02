import { MetadataRoute } from 'next';
import { properties } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nexaluxe.com';
    const locales = ['en', 'tr', 'de'];

    // Core routes
    const staticRoutes = ['', '/portfolio', '/about', '/contact', '/insights', '/investment-guide'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add static routes for each locale
    locales.forEach(locale => {
        staticRoutes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });

        // Add property routes for each locale
        properties.forEach(property => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/property/${property.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            });
        });
    });

    return sitemapEntries;
}
