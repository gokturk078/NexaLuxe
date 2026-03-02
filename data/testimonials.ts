export interface Testimonial {
    id: number;
    name: string;
    country: Record<'en' | 'tr' | 'de' | 'ru', string>;
    comment: Record<'en' | 'tr' | 'de' | 'ru', string>;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "James Whitmore",
        country: {
            en: "London, UK",
            tr: "Londra, İngiltere",
            de: "London, GB",
            ru: "Лондон, Великобритания"
        },
        comment: {
            en: "The Nexa Luxe team made the whole process incredibly easy. We are very happy with our investment in Cyprus. Their professionalism is truly impressive.",
            tr: "Nexa Luxe ekibi tüm süreci olağanüstü kolaylaştırdı. Kıbrıs'taki yatırımımızdan çok memnunuz. Profesyonellikleri gerçekten etkileyici.",
            de: "Das Team von Nexa Luxe hat den gesamten Prozess unglaublich einfach gemacht. Wir sind sehr glücklich mit unserer Investition in Zypern. Ihre Professionalität ist wirklich beeindruckend.",
            ru: "Команда Nexa Luxe сделала весь процесс невероятно простым. Мы очень довольны нашими инвестициями на Кипре. Их профессионализм действительно впечатляет."
        }
    },
    {
        id: 2,
        name: "Erik Lindqvist",
        country: {
            en: "Stockholm, Sweden",
            tr: "Stockholm, İsveç",
            de: "Stockholm, Schweden",
            ru: "Стокгольм, Швеция"
        },
        comment: {
            en: "Thanks to their professional approach and market knowledge, we found a property beyond our dreams. Trust is everything.",
            tr: "Profesyonel yaklaşımları ve piyasa bilgileri sayesinde hayallerimizin ötesinde bir mülk bulduk. Güven her şeydir.",
            de: "Dank ihres professionellen Ansatzes und ihrer Marktkenntnisse haben wir eine Immobilie gefunden, die unsere Träume übertrifft. Vertrauen ist alles.",
            ru: "Благодаря их профессиональному подходу и знанию рынка мы нашли недвижимость, о которой даже не мечтали. Доверие — это всё."
        }
    },
    {
        id: 3,
        name: "Sarah Mitchell",
        country: {
            en: "Manchester, UK",
            tr: "Manchester, İngiltere",
            de: "Manchester, GB",
            ru: "Манчестер, Великобритания"
        },
        comment: {
            en: "Their turnkey services are truly unique. They thought of every detail. Our moving process has never been more enjoyable.",
            tr: "Anahtar teslim hizmetleri gerçekten benzersiz. Her detayı düşünmüşlerdi. Taşınma sürecimiz hiç bu kadar keyifli olmamıştı.",
            de: "Ihr schlüsselfertiger Service ist wirklich einzigartig. Sie haben an jedes Detail gedacht. Unser Umzugsprozess war noch nie so angenehm.",
            ru: "Их услуги «под ключ» действительно уникальны. Они продумали каждую деталь. Наш процесс переезда никогда не был таким приятным."
        }
    }
];
