import { getContentItems } from '@/lib/content';
import { getAllPublishedSlugs } from '@/lib/blog';

export const revalidate = 3600;

// A sitemap must always reference the canonical production domain, never
// the dev/local URL — otherwise crawlers index localhost URLs.
const CANONICAL_BASE = (
    process.env.NEXT_PUBLIC_BASE_URL || 'https://webspires.co.uk'
).replace(/\/$/, '');

export default async function sitemap() {
    const base = CANONICAL_BASE;
    const now = new Date();

    const [
        servicesData,
        industriesData,
        locationsData,
        googleAdsChildren,
        caseStudyCategories,
        projectsData,
    ] = await Promise.all([
        getContentItems('services'),
        getContentItems('industries'),
        getContentItems('locations'),
        getContentItems('googleAdsChildren'),
        getContentItems('caseStudyCategories'),
        getContentItems('projects'),
    ]);

    const staticRoutes = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/services/seo/local-seo', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/locations', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/free-digital-marketing-audit', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/projects', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
        { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
        { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms-conditions', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/sitemap', priority: 0.3, changeFrequency: 'weekly' },
    ].map((r) => ({
        url: `${base}${r.path}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
    }));

    const serviceRoutes = servicesData.map((s) => ({
        url: `${base}/services/${s.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    const industryRoutes = industriesData.map((i) => ({
        url: `${base}/industries/${i.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const locationRoutes = locationsData.map((l) => ({
        url: `${base}/locations/${l.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const googleAdsChildRoutes = googleAdsChildren.map((c) => ({
        url: `${base}/services/google-ads-management/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    const caseStudyRoutes = caseStudyCategories.map((c) => ({
        url: `${base}/case-studies/${c.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    const projectRoutes = projectsData.map((p) => ({
        url: `${base}/projects/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));

    let blogRoutes = [];
    try {
        const posts = await getAllPublishedSlugs();
        blogRoutes = posts.map((p) => ({
            url: `${base}/blog/${p.slug}`,
            lastModified: new Date(p.updatedAt || p.publishedAt || now),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch {
        // DB unavailable ship the rest of the sitemap anyway.
    }

    return [
        ...staticRoutes,
        ...serviceRoutes,
        ...googleAdsChildRoutes,
        ...industryRoutes,
        ...locationRoutes,
        ...caseStudyRoutes,
        ...projectRoutes,
        ...blogRoutes,
    ];
}
