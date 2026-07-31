import Link from 'next/link';
import { getContentItems } from '@/lib/content';
import { getPublishedPosts } from '@/lib/blog';
import { generateSEO } from '@/lib/seo';

export const revalidate = false;

export const metadata = {
    ...generateSEO({
        title: 'Sitemap',
        description:
            'Browse every page on the Webspires website — services, industries, locations, case studies, projects and blog articles.',
        path: '/sitemap',
    }),
};

// The hand-built service pages (authoritative list, mirrors the header nav).
const SERVICE_LINKS = [
    { label: 'All Services', href: '/services' },
    { label: 'CRM Development', href: '/services/crm-development' },
    { label: 'Social Media Management', href: '/services/social-media-management' },
    { label: 'Google Ads Management', href: '/services/google-ads-management' },
    { label: 'Meta Ads Management', href: '/services/meta-ads-management' },
    { label: 'SEO Services', href: '/services/seo' },
    { label: 'Local SEO', href: '/services/seo/local-seo' },
    { label: 'AI Search Optimisation (GEO)', href: '/services/generative-engine-optimisation' },
    { label: 'Shopify Development', href: '/services/shopify-development' },
    { label: 'Conversion Rate Optimisation', href: '/services/conversion-rate-optimisation' },
    { label: 'Google Guarantee', href: '/services/google-guarantee' },
];

const MAIN_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Free Digital Marketing Audit', href: '/free-digital-marketing-audit' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
];

async function safe(promise, fallback = []) {
    try {
        return await promise;
    } catch {
        return fallback;
    }
}

function title(item) {
    return item.title || item.name || item.city || item.slug;
}

function Section({ heading, links }) {
    if (!links.length) return null;
    return (
        <section className="mb-10">
            <h2 className="mb-4 border-b border-black/10 pb-2 text-lg font-extrabold text-[#1a1a2e]">
                {heading}
                <span className="ml-2 text-sm font-normal text-gray-400">
                    ({links.length})
                </span>
            </h2>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((l) => (
                    <li key={l.href}>
                        <Link
                            href={l.href}
                            className="group flex items-center gap-2 text-[14px] text-gray-600 no-underline transition-colors duration-150 hover:text-primary"
                        >
                            <svg
                                className="h-3 w-3 flex-shrink-0 text-primary/40 transition-colors group-hover:text-primary"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M9 18l6-6-6-6"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default async function HtmlSitemapPage() {
    const [
        industries,
        locations,
        caseStudies,
        googleAdsChildren,
        projects,
        blog,
    ] = await Promise.all([
        safe(getContentItems('industries')),
        safe(getContentItems('locations')),
        safe(getContentItems('caseStudyCategories')),
        safe(getContentItems('googleAdsChildren')),
        safe(getContentItems('projects')),
        safe(getPublishedPosts({ page: 1, limit: 1000 }), { posts: [] }),
    ]);

    const toLinks = (items, base) =>
        items.map((i) => ({ label: title(i), href: `${base}/${i.slug}` }));

    const industryLinks = toLinks(industries, '/industries');
    const locationLinks = toLinks(locations, '/locations');
    const caseStudyLinks = toLinks(caseStudies, '/case-studies');
    const projectLinks = toLinks(projects, '/projects');
    const googleAdsLinks = toLinks(
        googleAdsChildren,
        '/services/google-ads-management'
    );
    const blogLinks = (blog.posts || []).map((p) => ({
        label: p.title,
        href: `/blog/${p.slug}`,
    }));

    // Prepend the index pages to the collections that have one.
    const industriesSection = industryLinks.length
        ? [{ label: 'All Industries', href: '/industries' }, ...industryLinks]
        : [];
    const locationsSection = locationLinks.length
        ? [{ label: 'All Locations', href: '/locations' }, ...locationLinks]
        : [];
    const caseStudiesSection = caseStudyLinks.length
        ? [{ label: 'All Case Studies', href: '/case-studies' }, ...caseStudyLinks]
        : [];

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-[1100px] px-5 py-16 lg:px-8">
                <header className="mb-12">
                    <p className="mb-2 font-mono text-[12px] uppercase tracking-widest text-primary">
                        Sitemap
                    </p>
                    <h1 className="text-3xl font-extrabold text-[#1a1a2e] lg:text-4xl">
                        Everything on Webspires
                    </h1>
                    <p className="mt-3 max-w-2xl text-[15px] text-gray-500">
                        A complete list of every page on our website. Looking
                        for the machine-readable version?{' '}
                        <a
                            href="/sitemap.xml"
                            className="font-semibold text-primary hover:underline"
                        >
                            View the XML sitemap
                        </a>
                        .
                    </p>
                </header>

                <Section heading="Main Pages" links={MAIN_LINKS} />
                <Section heading="Services" links={SERVICE_LINKS} />
                <Section
                    heading="Google Ads Services"
                    links={googleAdsLinks}
                />
                <Section heading="Industries" links={industriesSection} />
                <Section heading="Locations" links={locationsSection} />
                <Section heading="Case Studies" links={caseStudiesSection} />
                <Section heading="Projects" links={projectLinks} />
                <Section heading="Blog Articles" links={blogLinks} />
            </div>
        </div>
    );
}
