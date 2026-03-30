import { siteConfig } from '@/config/site';

export function generateSEO({ title, description, path, image }) {
    const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const seoDescription = description || siteConfig.description;
    const seoUrl = `${siteConfig.url}${path || ''}`;
    const seoImage = image || siteConfig.defaultImage;

    return {
        metadataBase: new URL(siteConfig.url),

        title: {
            default: seoTitle,
            template: '%s | ' + siteConfig.name,
        },

        description: seoDescription,

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-snippet': -1,
                'max-image-preview': 'large',
                'max-video-preview': -1,
            },
        },

        alternates: {
            canonical: seoUrl,
        },

        openGraph: {
            type: 'website',
            locale: 'en_US',
            url: seoUrl,
            siteName: siteConfig.name,
            title: seoTitle,
            description: seoDescription,
            images: [
                {
                    url: seoImage,
                    width: 512,
                    height: 512,
                    alt: seoTitle,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: [seoImage],
            creator: siteConfig.twitter,
        },
    };
}


// export function generateSEO({ title, description, image, url }) {
//     return {
//         title,
//         description,
//         openGraph: {
//             title,
//             description,
//             url,
//             images: [image],
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title,
//             description,
//             images: [image],
//         },
//     };
// }