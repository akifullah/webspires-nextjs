import Link from 'next/link';
import OtherServicesSection from '@/components/sections/OtherServicesSection';
import { getContentItem } from '@/lib/content';
import { getServicePage } from '@/data/servicePages';

const ACCENT = '#EE314F';
const BOOK = 'https://call.webspires.co.uk?utm_source=social-media-management';
const CANONICAL = 'https://webspires.co.uk/services/social-media-management/';

export const revalidate = false;

// Content is served from the backend dynamic system (the `servicePages`
// content type), editable at /admin/content. The static record acts as
// the seed + fallback so the page renders before the DB is seeded.
async function getPage() {
    const fromDb = await getContentItem('servicePages', 'social-media-management');
    return fromDb || getServicePage('social-media-management');
}

const OG_IMAGE = '/images/webspires-logo-icon.png';

export async function generateMetadata() {
    const data = await getPage();
    return {
        // `absolute` bypasses the root "%s | Webspires" title template so
        // the brand suffix already in metaTitle is not doubled.
        title: { absolute: data.metaTitle },
        description: data.metaDescription,
        alternates: { canonical: CANONICAL },
        openGraph: {
            title: data.metaTitle,
            description: data.metaDescription,
            url: CANONICAL,
            siteName: 'Webspires',
            type: 'website',
            locale: 'en_GB',
            // Relative URL resolves against metadataBase (webspires.co.uk).
            images: [{ url: OG_IMAGE, alt: 'Webspires Social Media Management Services' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: data.metaTitle,
            description: data.metaDescription,
            images: [OG_IMAGE],
        },
    };
}

function ldScript(obj) {
    return { __html: JSON.stringify(obj).replace(/</g, '\\u003c') };
}

function Check({ className, style }) {
    return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
        </svg>
    );
}

function Arrow({ className, style }) {
    return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Eyebrow({ children, onDark }) {
    return (
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ color: ACCENT, background: onDark ? `${ACCENT}22` : `${ACCENT}14` }}>
            {children}
        </span>
    );
}

export default async function SocialMediaManagementPage() {
    const data = await getPage();

    const heroChips = data.heroChips || [];
    const buildRoutes = data.buildRoutes || [];
    const outgrownSigns = data.outgrownSigns || [];
    const services = data.services || [];
    const platforms = data.platforms || [];
    const orgPaidPoints = data.orgPaidPoints || [];
    const processSteps = data.processSteps || [];
    const industries = data.industries || [];
    const costDrivers = data.costDrivers || [];
    const pricingBands = data.pricingBands || [];
    const comparisonTable = data.comparisonTable || [];
    const whyChoose = data.whyChoose || [];
    const faqs = data.faqs || [];

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webspires.co.uk/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://webspires.co.uk/services/' },
            { '@type': 'ListItem', position: 3, name: 'Social Media Management', item: CANONICAL },
        ],
    };
    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Social Media Management',
        name: 'Social Media Management Services',
        description: data.metaDescription,
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        provider: { '@type': 'Organization', name: 'Webspires', url: 'https://webspires.co.uk/' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: '500',
            highPrice: '3000',
            offerCount: pricingBands.length,
            description: 'Indicative monthly management fee. Ad spend separate.',
        },
        url: CANONICAL,
    };
    const howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Our Social Media Management Process',
        step: processSteps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.title,
            text: s.desc,
        })),
    };
    const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    };

    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(breadcrumbLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(serviceLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(howToLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(faqLd)} />

            {/* ── SECTION 1: HERO ── */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16 lg:pb-20">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
                    style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">Social Media Management</li>
                        </ol>
                    </nav>
                    <div className="max-w-[820px]">
                        <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                            style={{ color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}14` }}>
                            Social Media Management Services
                        </span>
                        <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.05] mb-5">
                            {data.h1}
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[680px]">
                            {data.heroSub}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-9">
                            <a href={BOOK} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                                Book a Free Social Media Strategy Call
                                <Arrow className="w-4 h-4" />
                            </a>
                            <a href="tel:+441615241569"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                                Call Us Now
                            </a>
                        </div>
                        <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none p-0 m-0">
                            {heroChips.map((t) => (
                                <li key={t} className="flex items-center gap-2 text-[13px] font-semibold text-gray-300">
                                    <Check className="w-4 h-4 flex-shrink-0" />
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-14 h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} aria-hidden="true" />
            </section>

            {/* ── SECTION 2: WHAT IT INCLUDES ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <Eyebrow>Scope</Eyebrow>
                    <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-6">
                        {data.s2Heading}
                    </h2>
                    <p className="text-[17px] text-[#1a1a2e] leading-relaxed bg-[#faf9f7] border-l-4 rounded-r-xl p-6 mb-8" style={{ borderColor: ACCENT }}>
                        {data.s2Definition}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {buildRoutes.map((r) => (
                            <div key={r.title} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{r.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-gray-500 text-[16px] leading-relaxed">
                        {data.s2Adoption}{' '}
                        <a href="#services" className="font-bold text-primary hover:underline">See the full service breakdown</a>.
                    </p>
                </div>
            </section>

            {/* ── SECTION 3: SIGNS YOU NEED TO OUTSOURCE ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>The Tipping Point</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.s4Heading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.s4Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {outgrownSigns.map((s) => (
                            <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: OUR SERVICES ── */}
            <section id="services" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>What We Deliver</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            {data.s5Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {services.map((s) => (
                            <div key={s.title} className="bg-[#faf9f7] rounded-2xl p-7 border border-gray-100">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
                                    <Check className="w-4 h-4" style={{ color: ACCENT }} />
                                </div>
                                <h3 className="text-[17px] font-extrabold text-[#1a1a2e] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 text-[13px] font-semibold">
                        <a href="#organic-paid" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            How organic and paid work together <Arrow className="w-3.5 h-3.5" />
                        </a>
                        <a href="#pricing" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            See pricing <Arrow className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: PLATFORMS WE MANAGE ── */}
            <section id="platforms" className="bg-[#faf9f7] py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Platform Fit</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.platformsHeading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.platformsIntro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {platforms.map((p) => (
                            <div key={p.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{p.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-[13px] font-semibold">
                        <a href="#industries" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            See platform fit by industry <Arrow className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: ORGANIC VS PAID ── */}
            <section id="organic-paid" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Organic + Paid</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.orgPaidHeading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.orgPaidIntro}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        {orgPaidPoints.map((p) => (
                            <div key={p.title} className="bg-[#faf9f7] rounded-2xl p-7 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{p.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#1a1a2e] rounded-2xl p-6 lg:p-8">
                        <p className="text-gray-300 text-[15px] leading-relaxed mb-4">{data.orgPaidVerdict}</p>
                        <div className="flex flex-wrap gap-4 text-[13px] font-semibold">
                            <Link href="/services/meta-ads-management" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                Meta Ads management <Arrow className="w-3.5 h-3.5" />
                            </Link>
                            <Link href="/services/google-ads-management" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                Google Ads management <Arrow className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: OUR PROCESS ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>How We Work</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.s10Heading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.s10Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((s, i) => (
                            <div key={s.title} className="relative bg-white rounded-2xl p-7 border border-gray-100">
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-white text-[14px] mb-4"
                                    style={{ background: ACCENT }}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-[13px] font-semibold">
                        <a href="#cta" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            Start with a free strategy call <Arrow className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 8: INDUSTRIES ── */}
            <section id="industries" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Sector Fit</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            {data.s11Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {industries.map((ind) => {
                            const inner = (
                                <>
                                    <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                                    <p className="text-[14px] text-gray-500 leading-relaxed">{ind.desc}</p>
                                    {ind.href ? (
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary mt-3">
                                            Explore the sector <Arrow className="w-3.5 h-3.5" />
                                        </span>
                                    ) : null}
                                </>
                            );
                            return ind.href ? (
                                <Link key={ind.title} href={ind.href}
                                    className="group bg-[#faf9f7] rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 no-underline">
                                    {inner}
                                </Link>
                            ) : (
                                <div key={ind.title} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                    {inner}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── SECTION 9: PRICING ── */}
            <section id="pricing" className="bg-[#faf9f7] py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Our Pricing</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.s12Heading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.s12Intro}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                        {costDrivers.map((d) => (
                            <div key={d.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{d.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>

                    {pricingBands.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                            {pricingBands.map((b) => (
                                <div key={b.name} className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: `${ACCENT}22` }}>
                                    <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1">{b.name}</h3>
                                    <p className="text-[16px] font-extrabold mb-3" style={{ color: ACCENT }}>{b.range}</p>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">{b.includes}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-[#1a1a2e] rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                        <p className="text-gray-300 text-[15px] leading-relaxed max-w-[600px]">{data.s12Note}</p>
                        <a href={BOOK} target="_blank" rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Get an Indicative Quote
                            <Arrow className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 10: AGENCY VS FREELANCER VS IN-HOUSE VS SOFTWARE ── */}
            <section id="comparison" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Your Options</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            {data.compHeading}
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed">{data.compIntro}</p>
                    </div>
                    <div className="overflow-x-auto rounded-2xl border border-gray-200">
                        <table className="w-full text-left text-[14px] min-w-[820px]">
                            <thead>
                                <tr className="bg-[#1a1a2e] text-white">
                                    <th className="px-5 py-4 font-bold">Factor</th>
                                    <th className="px-5 py-4 font-bold" style={{ color: ACCENT }}>Agency</th>
                                    <th className="px-5 py-4 font-bold">Freelancer</th>
                                    <th className="px-5 py-4 font-bold">In-house hire</th>
                                    <th className="px-5 py-4 font-bold">Software</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonTable.map((row) => (
                                    <tr key={row.factor} className="align-top">
                                        <td className="px-5 py-4 font-extrabold text-[#1a1a2e] whitespace-nowrap">{row.factor}</td>
                                        <td className="px-5 py-4 text-[#1a1a2e] leading-relaxed font-medium bg-[#faf9f7]">{row.agency}</td>
                                        <td className="px-5 py-4 text-gray-500 leading-relaxed">{row.freelancer}</td>
                                        <td className="px-5 py-4 text-gray-500 leading-relaxed">{row.inhouse}</td>
                                        <td className="px-5 py-4 text-gray-500 leading-relaxed">{row.software}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 bg-[#faf9f7] rounded-2xl p-6 lg:p-8 border border-gray-100">
                        <h3 className="text-[18px] font-extrabold text-[#1a1a2e] mb-3">The honest verdict</h3>
                        <p className="text-gray-500 text-[15px] leading-relaxed mb-4">{data.compVerdict}</p>
                        <div className="flex flex-wrap gap-4 text-[13px] font-semibold">
                            <a href="#pricing" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                Compare against our pricing <Arrow className="w-3.5 h-3.5" />
                            </a>
                            <a href="#why" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                                Why our integrated model fits <Arrow className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 11: WHY CHOOSE US ── */}
            <section id="why" className="bg-[#faf9f7] py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>The Difference</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            {data.s13Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {whyChoose.map((w) => (
                            <div key={w.title} className="bg-white rounded-2xl p-7 border border-gray-100">
                                <h3 className="text-[17px] font-extrabold text-[#1a1a2e] mb-2">{w.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 text-[13px] font-semibold">
                        <Link href="/about-us" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            About our team <Arrow className="w-3.5 h-3.5" />
                        </Link>
                        <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                            See our approach to results <Arrow className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 12: CASE STUDY / PROOF ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Proof</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            {data.s14Heading}
                        </h2>
                    </div>
                    {data.caseMetric ? (
                        <div className="inline-flex items-baseline gap-2 rounded-2xl px-6 py-4 mb-6" style={{ background: `${ACCENT}10` }}>
                            <span className="text-[28px] font-extrabold" style={{ color: ACCENT }}>{data.caseMetric}</span>
                        </div>
                    ) : null}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-[#faf9f7] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Problem</p>
                            <p className="text-[14px] text-gray-600 leading-relaxed">{data.caseProblem}</p>
                        </div>
                        <div className="bg-[#faf9f7] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Solution</p>
                            <p className="text-[14px] text-gray-600 leading-relaxed">{data.caseSolution}</p>
                        </div>
                        <div className="bg-[#faf9f7] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Outcome</p>
                            <p className="text-[14px] text-gray-600 leading-relaxed">{data.caseOutcome}</p>
                        </div>
                    </div>
                    {data.caseNote ? (
                        <p className="mt-6 text-[13px] text-gray-400 leading-relaxed">{data.caseNote}</p>
                    ) : null}
                </div>
            </section>

            {/* ── SECTION 13: CTA ── */}
            <section id="cta" className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden scroll-mt-24">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[28px] sm:text-[38px] font-extrabold text-white leading-tight mb-4">
                        {data.s15Heading}
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[640px] mx-auto leading-relaxed">{data.s15Body}</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href={BOOK} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Book a Free Social Media Strategy Call
                            <Arrow className="w-4 h-4" />
                        </a>
                        <a href="tel:+441615241569"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] px-8 py-4 rounded-xl border border-white/20 transition-all duration-200">
                            +44 161 524 1569
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 14: FAQ ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <Eyebrow>FAQ</Eyebrow>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e]">
                            {data.faqHeading}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold mt-0.5"
                                        style={{ background: ACCENT }}>
                                        {i + 1}
                                    </span>
                                    {faq.q}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed pl-9">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <OtherServicesSection currentSlug="social-media-management" />
        </main>
    );
}
