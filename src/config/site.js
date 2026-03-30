export const siteConfig = {
    name: 'Webspires',
    url: process.env.NEXT_PUBLIC_DEV === 'true'
        ? (process.env.NEXT_PUBLIC_LOCAL_URL || 'http://localhost:3000')
        : (process.env.NEXT_PUBLIC_BASE_URL || 'https://webspires.com.pk'),
    description:
        'Grow your business with a trusted digital marketing agency in Pakistan. We build high-performance websites, SEO strategies, and ROI-driven solutions.',
    defaultImage: '/images/webspires-logo-icon.png',
    twitter: '@webspires',
};