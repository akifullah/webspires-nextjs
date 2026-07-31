import Link from 'next/link';
import OtherServicesSection from '@/components/sections/OtherServicesSection';
import { getContentItem, getContentItems } from '@/lib/content';
import { getServicePage } from '@/data/servicePages';

const ACCENT = '#EE314F';
const DARK = '#1a1a2e';
const BOOK = 'https://call.webspires.co.uk?utm_source=google-ads-management';
const CANONICAL = 'https://webspires.co.uk/services/google-ads-management/';
const OG_IMAGE = '/images/webspires-logo-icon.png';

export const revalidate = false;

// Content is served from the backend dynamic system (the `servicePages`
// content type), editable at /admin/content. The static record acts as
// the seed + fallback so the page renders before the DB is seeded.
async function getPage() {
    const fromDb = await getContentItem('servicePages', 'google-ads-management');
    return fromDb || getServicePage('google-ads-management');
}

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
            images: [{ url: OG_IMAGE, alt: 'Webspires Google Ads Management Services' }],
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

function Chevron({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

// Splits a service description so the trailing "The outcome: …" renders in
// the accent colour, per the design spec.
function ServiceDesc({ desc }) {
    const marker = 'The outcome:';
    const i = desc.indexOf(marker);
    if (i === -1) return <p className="text-[14px] text-gray-500 leading-relaxed">{desc}</p>;
    const body = desc.slice(0, i).trim();
    const outcome = desc.slice(i + marker.length).trim();
    return (
        <>
            <p className="text-[14px] text-gray-500 leading-relaxed">{body}</p>
            <p className="text-[13px] font-bold mt-2" style={{ color: ACCENT }}>Outcome: {outcome}</p>
        </>
    );
}

export default async function GoogleAdsManagementPage() {
    const [data, children] = await Promise.all([
        getPage(),
        getContentItems('googleAdsChildren'),
    ]);

    const heroChips = data.heroChips || [];
    const buildRoutes = data.buildRoutes || [];
    const outgrownSigns = data.outgrownSigns || [];
    const services = data.services || [];
    const campaignTypes = data.campaignTypes || [];
    const trackingChips = data.integrations || [];
    const costDrivers = data.costDrivers || [];
    const pricingBands = data.pricingBands || [];
    const processSteps = data.processSteps || [];
    const industries = data.industries || [];
    const ppcSeoPoints = data.ppcSeoPoints || [];
    const comparisonTable = data.comparisonTable || [];
    const whyChoose = data.whyChoose || [];
    const faqs = data.faqs || [];
    const auditChips = ['Account structure', 'Wasted spend', 'Tracking gaps', 'Quick wins'];

    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webspires.co.uk/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://webspires.co.uk/services/' },
            { '@type': 'ListItem', position: 3, name: 'Google Ads Management', item: CANONICAL },
        ],
    };
    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Google Ads Management',
        name: 'Google Ads Management Services',
        description: data.metaDescription,
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        provider: { '@type': 'Organization', name: 'Webspires', url: 'https://webspires.co.uk/' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: '200',
            highPrice: '650',
            offerCount: pricingBands.length,
            description: 'Indicative monthly management fee. Ad spend separate, no markup.',
        },
        url: CANONICAL,
    };
    const howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Our Google Ads Management Process',
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

            {/* ── SECTION 1: HERO (dark) ── */}
            <section className="relative overflow-hidden pt-28 pb-16 lg:pb-20" style={{ background: DARK }}>
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
                            <li className="text-gray-300 font-medium">Google Ads Management</li>
                        </ol>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                        <div>
                            <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                                style={{ color: ACCENT, borderColor: `${ACCENT}44`, background: `${ACCENT}14` }}>
                                Google Ads Management
                            </span>
                            <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-white leading-[1.05] mb-5">
                                {data.h1}
                            </h1>
                            <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[600px]">
                                {data.heroSub}
                            </p>
                            <div className="flex flex-wrap gap-4 mb-9">
                                <a href={BOOK} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                                    Get a Free Google Ads Audit
                                    <Arrow className="w-4 h-4" />
                                </a>
                                <a href="tel:+441615241569"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] px-7 py-3.5 rounded-2xl border border-white/20 transition-all duration-200">
                                    Call us
                                </a>
                            </div>
                            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none p-0 m-0">
                                {heroChips.map((t) => (
                                    <li key={t} className="flex items-center gap-2 text-[13px] font-semibold text-gray-300">
                                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Abstract results panel */}
                        <div className="hidden lg:block">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-7">
                                <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-5">Campaign snapshot</p>
                                <div className="space-y-4">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-[13px] text-gray-400">Cost per enquiry</span>
                                        <span className="text-[26px] font-extrabold" style={{ color: ACCENT }}>down</span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-[13px] text-gray-400">Qualified enquiries</span>
                                        <span className="text-[26px] font-extrabold text-white">up</span>
                                    </div>
                                    <div className="h-px bg-white/10" />
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-[13px] text-gray-400">Wasted spend</span>
                                        <span className="text-[26px] font-extrabold text-white">cut</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {['GA4', 'Call tracking', 'No markup'].map((c) => (
                                        <span key={c} className="text-[11px] font-bold px-3 py-1 rounded-full text-gray-300 bg-white/5 border border-white/10">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-14 h-1 w-full" style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }} aria-hidden="true" />
            </section>

            {/* ── SECTION 2: WHAT IT INCLUDES (light) ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <Eyebrow>Scope</Eyebrow>
                    <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight mb-6">
                        {data.s2Heading}
                    </h2>
                    <p className="text-[17px] text-[#101014] leading-relaxed bg-[#f7f7f9] border-l-4 rounded-r-xl p-6 mb-8" style={{ borderColor: ACCENT }}>
                        {data.s2Definition}
                    </p>
                    <div className="flex flex-wrap gap-2.5 mb-8">
                        {buildRoutes.map((r) => (
                            <span key={r.title} className="inline-flex items-center gap-2 bg-[#f7f7f9] border border-gray-100 rounded-full pl-3 pr-4 py-2 text-[13px] font-semibold text-[#101014]">
                                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
                                {r.title}
                            </span>
                        ))}
                    </div>
                    <p className="text-[#5B5B66] text-[16px] leading-relaxed">
                        {data.s2Adoption}{' '}
                        <a href="#services" className="font-bold text-primary hover:underline">See the full service breakdown</a>.
                    </p>
                </div>
            </section>

            {/* ── SECTION 3: WHY ACCOUNTS WASTE MONEY (soft-tint) ── */}
            <section className="bg-[#f7f7f9] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Where Budget Leaks</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight mb-3">
                            {data.s4Heading}
                        </h2>
                        <p className="text-[#5B5B66] text-[16px] leading-relaxed">{data.s4Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {outgrownSigns.map((s) => (
                            <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                                    </svg>
                                </div>
                                <h3 className="text-[16px] font-extrabold text-[#101014] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-[#5B5B66] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: OUR SERVICES (light) ── */}
            <section id="services" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>What We Deliver</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight">
                            {data.s5Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((s) => (
                            <div key={s.title} className="bg-[#f7f7f9] rounded-2xl p-7 border border-gray-100 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transform-none">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${ACCENT}18` }}>
                                    <Check className="w-4 h-4" style={{ color: ACCENT }} />
                                </div>
                                <h3 className="text-[17px] font-extrabold text-[#101014] mb-2">{s.title}</h3>
                                <ServiceDesc desc={s.desc} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: CAMPAIGN TYPES (soft-tint) ── */}
            <section id="campaign-types" className="bg-[#f7f7f9] py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Campaign Coverage</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight mb-3">
                            {data.campaignTypesHeading}
                        </h2>
                        <p className="text-[#5B5B66] text-[16px] leading-relaxed">{data.campaignTypesIntro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {campaignTypes.map((c) => {
                            const inner = (
                                <>
                                    <h3 className="text-[16px] font-extrabold text-[#101014] mb-2 group-hover:text-primary transition-colors">{c.title}</h3>
                                    <p className="text-[14px] text-[#5B5B66] leading-relaxed">{c.desc}</p>
                                    {c.href ? (
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary mt-3">
                                            Explore <Arrow className="w-3.5 h-3.5" />
                                        </span>
                                    ) : null}
                                </>
                            );
                            return c.href ? (
                                <Link key={c.title} href={c.href}
                                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 no-underline motion-reduce:transform-none">
                                    {inner}
                                </Link>
                            ) : (
                                <div key={c.title} className="bg-white rounded-2xl p-6 border border-gray-100">{inner}</div>
                            );
                        })}
                    </div>

                    {/* LSA / Google Guaranteed routed to its own page */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-2xl p-5 border border-gray-100">
                        <p className="text-[14px] text-[#5B5B66] leading-relaxed flex-1">
                            Looking for Local Services Ads and the Google Guaranteed badge? That runs separately from search and shopping.
                        </p>
                        <Link href="/services/google-guarantee" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline flex-shrink-0">
                            See Google Guarantee <Arrow className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Child silo links */}
                    {children.length > 0 && (
                        <div className="mt-8">
                            <p className="text-[13px] font-bold uppercase tracking-widest text-[#5B5B66] mb-4">Explore each Google Ads service</p>
                            <div className="flex flex-wrap gap-3">
                                {children.map((c) => (
                                    <Link key={c.slug} href={`/services/google-ads-management/${c.slug}`}
                                        className="inline-flex items-center gap-2 bg-white hover:bg-primary hover:text-white text-[#101014] font-bold text-[14px] px-5 py-3 rounded-2xl border border-gray-100 transition-all duration-200 no-underline">
                                        {c.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── SECTION 6: CONVERSION TRACKING (dark) ── */}
            <section className="py-16 lg:py-24" style={{ background: DARK }}>
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <Eyebrow onDark>Proof, Not Guesswork</Eyebrow>
                            <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-white leading-tight mb-4">
                                {data.s7Heading}
                            </h2>
                            <p className="text-gray-400 text-[16px] leading-relaxed mb-6">{data.s7Body}</p>
                            <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
                                {trackingChips.map((c) => (
                                    <li key={c} className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-200 bg-white/5 border border-white/10 rounded-full pl-3 pr-4 py-2">
                                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { k: 'Calls tracked', v: 'Yes' },
                                    { k: 'Forms tracked', v: 'Yes' },
                                    { k: 'Offline sales', v: 'Imported' },
                                    { k: 'Reported as', v: 'Cost per enquiry' },
                                ].map((row) => (
                                    <div key={row.k} className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                                        <p className="text-[12px] text-gray-400 mb-1">{row.k}</p>
                                        <p className="text-[15px] font-extrabold text-white">{row.v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: PRICING (light) ── */}
            <section id="pricing" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Transparent Pricing</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight mb-3">
                            {data.s12Heading}
                        </h2>
                        <p className="text-[#5B5B66] text-[16px] leading-relaxed">{data.s12Intro}</p>
                    </div>

                    {/* Fee vs spend clarity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                        {costDrivers.map((d, i) => (
                            <div key={d.title} className="rounded-2xl p-6 border-2"
                                style={{ borderColor: i === 0 ? `${ACCENT}33` : '#eee', background: i === 0 ? `${ACCENT}08` : '#f7f7f9' }}>
                                <h3 className="text-[15px] font-extrabold text-[#101014] mb-1.5">{d.title}</h3>
                                <p className="text-[14px] text-[#5B5B66] leading-relaxed">{d.desc}</p>
                            </div>
                        ))}
                    </div>

                    {pricingBands.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                            {pricingBands.map((b, i) => {
                                const featured = i === 1;
                                return (
                                    <div key={b.name}
                                        className="relative rounded-2xl p-6 border-2 bg-white"
                                        style={{ borderColor: featured ? ACCENT : `${ACCENT}22` }}>
                                        {featured && (
                                            <span className="absolute -top-3 left-6 text-[11px] font-extrabold uppercase tracking-widest text-white px-3 py-1 rounded-full" style={{ background: ACCENT }}>
                                                Most popular
                                            </span>
                                        )}
                                        <h3 className="text-[16px] font-extrabold text-[#101014] mb-1 mt-1">{b.name}</h3>
                                        <p className="text-[14px] font-extrabold mb-3" style={{ color: ACCENT }}>{b.range}</p>
                                        <p className="text-[13px] text-[#5B5B66] leading-relaxed">{b.includes}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5" style={{ background: DARK }}>
                        <p className="text-gray-300 text-[15px] leading-relaxed max-w-[600px]">{data.s12Note}</p>
                        <a href={BOOK} target="_blank" rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-6 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5">
                            Get a Free Audit
                            <Arrow className="w-4 h-4" />
                        </a>
                    </div>
                    <p className="mt-3 text-[12px] text-gray-400">Pricing is indicative and confirmed after a free audit.</p>
                </div>
            </section>

            {/* ── SECTION 8: PROCESS (soft-tint) ── */}
            <section className="bg-[#f7f7f9] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>How We Work</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight mb-3">
                            {data.s10Heading}
                        </h2>
                        <p className="text-[#5B5B66] text-[16px] leading-relaxed">{data.s10Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {processSteps.map((s, i) => (
                            <div key={s.title} className="relative bg-white rounded-2xl p-7 border border-gray-100">
                                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-white text-[14px] mb-4" style={{ background: ACCENT }}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                                <h3 className="text-[16px] font-extrabold text-[#101014] mb-2">{s.title}</h3>
                                <p className="text-[14px] text-[#5B5B66] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 9: INDUSTRIES (light) ── */}
            <section id="industries" className="bg-white py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow>Sector Fit</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight">
                            {data.s11Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {industries.map((ind) => {
                            const inner = (
                                <>
                                    <h3 className="text-[16px] font-extrabold text-[#101014] mb-2 group-hover:text-primary transition-colors">{ind.title}</h3>
                                    <p className="text-[14px] text-[#5B5B66] leading-relaxed">{ind.desc}</p>
                                    {ind.href ? (
                                        <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary mt-3">
                                            Explore the sector <Arrow className="w-3.5 h-3.5" />
                                        </span>
                                    ) : null}
                                </>
                            );
                            return ind.href ? (
                                <Link key={ind.title} href={ind.href}
                                    className="group bg-[#f7f7f9] rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 no-underline motion-reduce:transform-none">
                                    {inner}
                                </Link>
                            ) : (
                                <div key={ind.title} className="bg-[#f7f7f9] rounded-2xl p-6 border border-gray-100">{inner}</div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── SECTION 10: COMPARISON (soft-tint) ── */}
            <section id="comparison" className="bg-[#f7f7f9] py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Make the Right Call</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight">
                            {data.compHeading}
                        </h2>
                    </div>

                    {/* PPC vs SEO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {ppcSeoPoints.map((p) => (
                            <div key={p.title} className="bg-white rounded-2xl p-7 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#101014] mb-2">{p.title}</h3>
                                <p className="text-[14px] text-[#5B5B66] leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-12">
                        <p className="text-[#5B5B66] text-[15px] leading-relaxed">
                            {data.ppcSeoVerdict}{' '}
                            <Link href="/services/seo" className="font-bold text-primary hover:underline">Explore our SEO service</Link>.
                        </p>
                    </div>

                    {/* Agency vs Freelancer vs In-house */}
                    <p className="text-[#5B5B66] text-[16px] leading-relaxed max-w-[760px] mb-6">{data.compIntro}</p>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <table className="w-full text-left text-[14px]">
                            <thead>
                                <tr className="text-white" style={{ background: DARK }}>
                                    <th className="px-5 py-4 font-bold">Factor</th>
                                    <th className="px-5 py-4 font-bold" style={{ color: ACCENT }}>Agency</th>
                                    <th className="px-5 py-4 font-bold">Freelancer</th>
                                    <th className="px-5 py-4 font-bold">In-house</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {comparisonTable.map((row) => (
                                    <tr key={row.factor} className="align-top">
                                        <td className="px-5 py-4 font-extrabold text-[#101014] whitespace-nowrap">{row.factor}</td>
                                        <td className="px-5 py-4 text-[#101014] leading-relaxed font-medium" style={{ background: `${ACCENT}08` }}>{row.agency}</td>
                                        <td className="px-5 py-4 text-[#5B5B66] leading-relaxed">{row.freelancer}</td>
                                        <td className="px-5 py-4 text-[#5B5B66] leading-relaxed">{row.inhouse}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Mobile stacked cards */}
                    <div className="md:hidden space-y-4">
                        {comparisonTable.map((row) => (
                            <div key={row.factor} className="bg-white rounded-2xl p-5 border border-gray-100">
                                <p className="text-[15px] font-extrabold text-[#101014] mb-3">{row.factor}</p>
                                <dl className="space-y-2 text-[13px]">
                                    <div className="flex gap-2 rounded-lg p-2" style={{ background: `${ACCENT}0c` }}>
                                        <dt className="font-bold w-24 flex-shrink-0" style={{ color: ACCENT }}>Agency</dt>
                                        <dd className="text-[#101014]">{row.agency}</dd>
                                    </div>
                                    <div className="flex gap-2 p-2">
                                        <dt className="font-bold w-24 flex-shrink-0 text-[#5B5B66]">Freelancer</dt>
                                        <dd className="text-[#5B5B66]">{row.freelancer}</dd>
                                    </div>
                                    <div className="flex gap-2 p-2">
                                        <dt className="font-bold w-24 flex-shrink-0 text-[#5B5B66]">In-house</dt>
                                        <dd className="text-[#5B5B66]">{row.inhouse}</dd>
                                    </div>
                                </dl>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
                        <h3 className="text-[18px] font-extrabold text-[#101014] mb-3">The honest verdict</h3>
                        <p className="text-[#5B5B66] text-[15px] leading-relaxed">{data.compVerdict}</p>
                    </div>
                </div>
            </section>

            {/* ── SECTION 11: WHY CHOOSE US (dark) ── */}
            <section id="why" className="py-16 lg:py-24 scroll-mt-24" style={{ background: DARK }}>
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12">
                        <Eyebrow onDark>The Difference</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-white leading-tight">
                            {data.s13Heading}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {whyChoose.map((w) => (
                            <div key={w.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ background: `${ACCENT}22` }}>
                                    <Check className="w-4 h-4" style={{ color: ACCENT }} />
                                </div>
                                <h3 className="text-[16px] font-extrabold text-white mb-2">{w.title}</h3>
                                <p className="text-[14px] text-gray-400 leading-relaxed">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4 text-[13px] font-semibold">
                        <Link href="/services/seo" className="inline-flex items-center gap-1.5 text-primary hover:underline">SEO <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/services/social-media-management" className="inline-flex items-center gap-1.5 text-primary hover:underline">Social media <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/services/conversion-rate-optimisation" className="inline-flex items-center gap-1.5 text-primary hover:underline">Conversion rate optimisation <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/about-us" className="inline-flex items-center gap-1.5 text-primary hover:underline">About our team <Arrow className="w-3.5 h-3.5" /></Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 12: RESULTS (light) ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10">
                        <Eyebrow>Proof</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014] leading-tight">
                            {data.s14Heading}
                        </h2>
                    </div>
                    {data.caseMetric ? (
                        <div className="inline-flex items-baseline gap-2 rounded-2xl px-6 py-4 mb-6" style={{ background: `${ACCENT}10` }}>
                            <span className="text-[28px] font-extrabold" style={{ color: ACCENT }}>{data.caseMetric}</span>
                        </div>
                    ) : null}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-[#f7f7f9] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Problem</p>
                            <p className="text-[14px] text-[#5B5B66] leading-relaxed">{data.caseProblem}</p>
                        </div>
                        <div className="bg-[#f7f7f9] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Solution</p>
                            <p className="text-[14px] text-[#5B5B66] leading-relaxed">{data.caseSolution}</p>
                        </div>
                        <div className="bg-[#f7f7f9] rounded-2xl p-7 border border-gray-100">
                            <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Outcome</p>
                            <p className="text-[14px] text-[#5B5B66] leading-relaxed">{data.caseOutcome}</p>
                        </div>
                    </div>
                    {data.caseNote ? (
                        <p className="mt-6 text-[13px] text-gray-400 leading-relaxed">{data.caseNote}</p>
                    ) : null}
                    <div className="mt-6">
                        <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline">
                            See our case studies <Arrow className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 13: CTA BAND (dark) ── */}
            <section className="py-16 lg:py-20 relative overflow-hidden" style={{ background: DARK }}>
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-white leading-tight mb-4">
                        {data.s15Heading}
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-6 max-w-[640px] mx-auto leading-relaxed">{data.s15Body}</p>
                    <ul className="flex flex-wrap gap-2.5 justify-center list-none p-0 mb-8">
                        {auditChips.map((c) => (
                            <li key={c} className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-200 bg-white/5 border border-white/10 rounded-full pl-3 pr-4 py-2">
                                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: ACCENT }} />
                                {c}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href={BOOK} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5">
                            Get a Free Google Ads Audit
                            <Arrow className="w-4 h-4" />
                        </a>
                        <a href="tel:+441615241569"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] px-8 py-4 rounded-2xl border border-white/20 transition-all duration-200">
                            +44 161 524 1569
                        </a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 14: FAQ (light, accordion) ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <Eyebrow>FAQ</Eyebrow>
                        <h2 className="text-[clamp(2rem,3.5vw,2.5rem)] font-extrabold text-[#101014]">
                            {data.faqHeading}
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-[#f7f7f9] rounded-2xl border border-gray-100 overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-extrabold text-[15px] text-[#101014] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                    {faq.q}
                                    <Chevron className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <p className="text-[14px] text-[#5B5B66] leading-relaxed px-5 pb-5">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <OtherServicesSection currentSlug="google-ads-management" />
        </main>
    );
}
