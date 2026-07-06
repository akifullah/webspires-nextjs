import Link from 'next/link';
import OtherServicesSection from '@/components/sections/OtherServicesSection';
import { getContentItem } from '@/lib/content';
import { getServicePage } from '@/data/servicePages';
import { AnswerEngine, Eyebrow, CitationChip } from '@/components/answer-engine/AnswerEngine';

const BOOK = 'https://call.webspires.co.uk?utm_source=shopify';
const CANONICAL = 'https://webspires.co.uk/services/shopify-development/';
// Absolute URL on the canonical domain so og:image is immune to the env-driven
// metadataBase fallback (localhost in dev when NEXT_PUBLIC_BASE_URL is unset).
const OG_IMAGE = 'https://webspires.co.uk/images/webspires-logo-icon.png';
const PHONE = '+441615241569';
const PHONE_LABEL = '+44 161 524 1569';

export const revalidate = 3600;

// Web-and-dev silo page. Content is served from the backend dynamic system
// (the `servicePages` content type, slug `shopify-development`), editable at
// /admin/content, and revalidated on save via the slug's entry in servicePages
// `extraPaths`. The DB record is MERGED over the static seed so a backend edit
// wins per field while fields added after first seed still render.
async function getPage() {
    const seed = getServicePage('shopify-development') || {};
    const fromDb = await getContentItem('servicePages', 'shopify-development');
    return fromDb ? { ...seed, ...fromDb } : seed;
}

export async function generateMetadata() {
    const data = await getPage();
    return {
        // `absolute` bypasses the root "%s | Webspires" title template.
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
            images: [{ url: OG_IMAGE, alt: 'Webspires Shopify Development' }],
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

/* ── Inline icons (server-rendered, no client JS) ── */
function Check({ className, style }) {
    return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
        </svg>
    );
}

function Arrow({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function AlertIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
    );
}

// Splits a service description so the trailing "The outcome: …" renders as a
// mono citation tag in the signal accent.
function ServiceDesc({ desc }) {
    const marker = 'The outcome:';
    const i = desc.indexOf(marker);
    if (i === -1) return <p className="font-body text-[14px] text-text-mid leading-relaxed">{desc}</p>;
    const body = desc.slice(0, i).trim();
    const outcome = desc.slice(i + marker.length).trim();
    return (
        <>
            <p className="font-body text-[14px] text-text-mid leading-relaxed">{body}</p>
            <p className="font-mono text-[12px] mt-3 text-signal leading-snug">↳ {outcome}</p>
        </>
    );
}

// Clean storefront mockup for the hero CSS only, ink-indigo framed.
function StoreMockup() {
    return (
        <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] opacity-50 blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(60% 60% at 70% 20%, var(--ai-soft), transparent 70%)' }} aria-hidden="true" />
            <div className="relative rounded-[24px] border border-hairline bg-ink-700 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-hairline">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" aria-hidden="true" />
                    <span className="ml-3 font-mono text-[11px] text-text-mid truncate">yourstore.myshopify.com</span>
                </div>
                <div className="p-5">
                    <div className="rounded-xl bg-ink-600 border border-hairline p-4 mb-4 flex items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="h-2.5 w-28 rounded-full bg-white/15" />
                            <div className="h-2 w-20 rounded-full bg-white/[0.08]" />
                        </div>
                        <span className="font-mono text-[11px] text-white px-3 py-1.5 rounded-lg bg-signal flex-shrink-0">Shop now</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="rounded-lg border border-hairline bg-ink-600 p-2">
                                <div className="aspect-square rounded-md bg-white/[0.06] mb-2" />
                                <div className="h-1.5 w-3/4 rounded-full bg-white/[0.12] mb-1.5" />
                                <div className="h-1.5 w-1/2 rounded-full bg-signal/60" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-hairline bg-ink-800/60">
                    <span className="font-mono text-[11px] text-text-mid">Core Web Vitals</span>
                    <span className="font-mono text-[12px] text-signal">▲ passed</span>
                </div>
            </div>
        </div>
    );
}

const BTN_PRIMARY =
    'inline-flex items-center gap-2 bg-signal hover:bg-signal-700 text-white font-semibold text-[14px] px-7 py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const BTN_GHOST =
    'inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] text-text-hi font-semibold text-[14px] px-7 py-3.5 rounded-2xl border border-hairline transition-all duration-200';
const H2 = 'font-display font-bold text-[clamp(2rem,3.6vw,2.75rem)] leading-[1.1]';

export default async function ShopifyDevelopmentPage() {
    const data = await getPage();

    const heroChips = data.heroChips || [];
    const deliverables = data.buildRoutes || [];
    const underperform = data.outgrownSigns || [];
    const services = data.services || [];
    const searchChips = data.integrations || [];
    const migrationSteps = data.migrationSteps || [];
    const migrationSources = data.migrationSources || [];
    const processSteps = data.processSteps || [];
    const pricingBands = data.pricingBands || [];
    const channelPoints = data.ppcSeoPoints || [];
    const comparison = data.comparisonTable || [];
    const whyChoose = data.whyChoose || [];
    const faqs = data.faqs || [];
    const consultChips = ['Your goals', 'Store or platform review', 'Search and speed snapshot', 'Clear scope and price'];

    /* ── JSON-LD (Organization is provided site-wide by the layout) ── */
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webspires.co.uk/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://webspires.co.uk/services/' },
            { '@type': 'ListItem', position: 3, name: 'Shopify Development', item: CANONICAL },
        ],
    };
    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Shopify Development',
        name: 'Shopify Development Services',
        description: data.metaDescription,
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        provider: { '@type': 'Organization', name: 'Webspires', url: 'https://webspires.co.uk/' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: '2500',
            highPrice: '15000',
            offerCount: pricingBands.length,
            description: 'Indicative starting points. Confirmed after a free Shopify consultation.',
        },
        url: CANONICAL,
    };
    const howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Our Shopify Build Process',
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
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(breadcrumbLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(serviceLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(howToLd)} />
            <script type="application/ld+json" dangerouslySetInnerHTML={ldScript(faqLd)} />

            {/* ── SECTION 1: HERO (ink-900, glow, grain, store mockup) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 pt-28 pb-16 lg:pb-24">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-text-mid/70">
                            <li><Link href="/" className="hover:text-signal transition-colors">Home</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link href="/services" className="hover:text-signal transition-colors">Services</Link></li>
                            <li aria-hidden="true">/</li>
                            <li className="text-text-hi">Shopify Development</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
                        <div className="reveal">
                            <Eyebrow className="block mb-5">{'// Shopify development'}</Eyebrow>
                            <h1 className="font-display font-semibold text-text-hi text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.04] tracking-tight mb-6">
                                {data.h1}
                            </h1>
                            <p className="font-body text-text-mid text-[17px] leading-relaxed mb-8 max-w-[600px]">
                                {data.heroSub}
                            </p>
                            <div className="flex flex-wrap gap-4 mb-9">
                                <a href={BOOK} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                                    Book a free Shopify consultation
                                    <Arrow className="w-4 h-4" />
                                </a>
                                <a href="#work" className={BTN_GHOST}>See our work</a>
                            </div>
                            <ul className="flex flex-wrap gap-x-6 gap-y-3 list-none p-0 m-0">
                                {heroChips.map((t) => (
                                    <li key={t} className="flex items-center gap-2 font-mono text-[12px] tracking-wide text-text-mid">
                                        <Check className="w-3.5 h-3.5 flex-shrink-0 text-signal" />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:block reveal">
                            <StoreMockup />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: WHAT WE BUILD (paper-50, definition + pills) ── */}
            <section className="bg-paper-50 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="reveal">
                        <Eyebrow className="block mb-4">The scope</Eyebrow>
                        <h2 className={`${H2} text-ink-text mb-6`}>{data.s2Heading}</h2>
                        <p className="font-body text-[17px] text-ink-text leading-relaxed bg-white border-l-4 border-signal rounded-r-xl p-6 mb-8 shadow-[0_1px_0_var(--line-200)]">
                            {data.s2Definition}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5 mb-8">
                        {deliverables.map((r) => (
                            <span key={r.title} className="inline-flex items-center gap-2 bg-white border border-line-200 rounded-full pl-3.5 pr-4 py-2 text-[13px] font-semibold text-ink-text">
                                <Check className="w-3.5 h-3.5 flex-shrink-0 text-signal" />
                                {r.title}
                            </span>
                        ))}
                    </div>
                    <p className="font-body text-ink-mid text-[16px] leading-relaxed">
                        {data.s2Adoption}{' '}
                        <a href="#work" className="font-semibold text-signal hover:underline">See our Shopify services</a>.
                    </p>
                </div>
            </section>

            {/* ── SECTION 3: WHY MOST STORES UNDERPERFORM (ink-800, bento) ── */}
            <section className="bg-ink-800 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12 reveal">
                        <Eyebrow className="block mb-4">The gap</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-3`}>{data.s4Heading}</h2>
                        <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s4Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {underperform.map((s) => (
                            <div key={s.title} className="bg-ink-700 rounded-2xl p-6 border border-hairline transition-colors duration-200 hover:border-signal/40">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-signal/15">
                                    <AlertIcon className="w-4 h-4 text-signal" />
                                </div>
                                <h3 className="font-display text-[16px] font-semibold text-text-hi mb-2">{s.title}</h3>
                                <p className="font-body text-[14px] text-text-mid leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: OUR SHOPIFY SERVICES (ink-900, bento) ── */}
            <section id="work" className="bg-ink-900 py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12 reveal">
                        <Eyebrow className="block mb-4">What we deliver</Eyebrow>
                        <h2 className={`${H2} text-text-hi`}>{data.s5Heading}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((s, i) => {
                            const featured = i === 0;
                            const inner = (
                                <>
                                    <div className="flex items-center justify-between gap-3 mb-3">
                                        <h3 className="font-display text-[17px] font-semibold text-text-hi">{s.title}</h3>
                                        {s.href && <Arrow className="w-4 h-4 text-text-mid group-hover:text-signal transition-colors flex-shrink-0" />}
                                    </div>
                                    <ServiceDesc desc={s.desc} />
                                </>
                            );
                            const cls = `bg-ink-700 rounded-2xl p-7 border border-hairline transition-all duration-200 hover:bg-ink-600 hover:border-signal/40 hover:-translate-y-0.5 motion-reduce:transform-none ${featured ? 'lg:col-span-2' : ''}`;
                            return s.href ? (
                                <Link key={s.title} href={s.href} className={`group no-underline ${cls}`}>{inner}</Link>
                            ) : (
                                <div key={s.title} className={cls}>{inner}</div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: SEARCH-NATIVE SHOPIFY (ink-900, glow, signature) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 py-16 lg:py-24 border-t border-hairline">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="reveal">
                            <Eyebrow className="block mb-4">{'// The differentiator'}</Eyebrow>
                            <h2 className={`${H2} text-text-hi mb-4`}>{data.s7Heading}</h2>
                            <p className="font-body text-text-mid text-[16px] leading-relaxed mb-6">{data.s7Body}</p>
                            <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0 mb-6">
                                {searchChips.map((c) => (
                                    <li key={c}><CitationChip label={c} /></li>
                                ))}
                            </ul>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
                                <Link href="/services/seo/ecommerce-seo" className="inline-flex items-center gap-1.5 text-signal hover:underline">Ecommerce SEO <Arrow className="w-3.5 h-3.5" /></Link>
                                <Link href="/services/generative-engine-optimisation" className="inline-flex items-center gap-1.5 text-signal hover:underline">AI search (GEO) <Arrow className="w-3.5 h-3.5" /></Link>
                            </div>
                        </div>
                        <div className="reveal">
                            <AnswerEngine
                                query="best [your product] store uk"
                                brand="Your store"
                                sources={['Google AI Overviews', 'ChatGPT']}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: SEO-SAFE MIGRATION (paper-50) ── */}
            <section className="bg-paper-50 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Replatform safely</Eyebrow>
                        <h2 className={`${H2} text-ink-text mb-3`}>{data.s8Heading}</h2>
                        <p className="font-body text-ink-mid text-[16px] leading-relaxed">{data.s8Intro}</p>
                    </div>

                    {migrationSources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 mb-10">
                            {migrationSources.map((src) => (
                                <span key={src} className="inline-flex items-center gap-2 bg-white border border-line-200 rounded-full px-4 py-2 text-[13px] font-semibold text-ink-text">
                                    {src}
                                </span>
                            ))}
                            <Arrow className="w-5 h-5 text-signal" />
                            <span className="inline-flex items-center gap-2 bg-ink-900 text-text-hi rounded-full px-4 py-2 text-[13px] font-bold">
                                Shopify
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {migrationSteps.map((s) => (
                            <div key={s.title} className="bg-white rounded-2xl p-6 border border-line-200">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 bg-signal/10">
                                    <Check className="w-4 h-4 text-signal" />
                                </div>
                                <h3 className="font-display text-[15px] font-semibold text-ink-text mb-2">{s.title}</h3>
                                <p className="font-body text-[14px] text-ink-mid leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 font-body text-[14px] text-ink-mid">
                        Migrating to grow organic sales?{' '}
                        <Link href="/services/seo/ecommerce-seo" className="font-semibold text-signal hover:underline">See our ecommerce SEO service</Link>.
                    </p>
                </div>
            </section>

            {/* ── SECTION 7: PROCESS (ink-800, numbered timeline) ── */}
            <section className="bg-ink-800 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12 reveal">
                        <Eyebrow className="block mb-4">How we work</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-3`}>{data.s10Heading}</h2>
                        <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s10Intro}</p>
                    </div>
                    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
                        {processSteps.map((s, i) => (
                            <li key={s.title} className="relative bg-ink-700 rounded-2xl p-7 border border-hairline">
                                <span className="font-mono inline-flex w-11 h-11 rounded-2xl items-center justify-center font-bold text-white text-[14px] mb-4 bg-signal">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-display text-[16px] font-semibold text-text-hi mb-2">{s.title}</h3>
                                <p className="font-body text-[14px] text-text-mid leading-relaxed">{s.desc}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ── SECTION 8: PRICING (ink-900, tiers + care plan) ── */}
            <section id="pricing" className="bg-ink-900 py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Transparent pricing</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-3`}>{data.s12Heading}</h2>
                        <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s12Intro}</p>
                    </div>

                    {pricingBands.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                            {pricingBands.map((b, i) => {
                                const featured = i === 1;
                                return (
                                    <div key={b.name}
                                        className={`relative rounded-2xl p-6 border-2 bg-ink-700 ${featured ? 'border-signal' : 'border-hairline'}`}>
                                        {featured && (
                                            <span className="absolute -top-3 left-6 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-white px-3 py-1 rounded-full bg-signal">
                                                Most popular
                                            </span>
                                        )}
                                        <h3 className="font-display text-[15px] font-semibold text-text-hi mb-1 mt-1">{b.name}</h3>
                                        <p className="font-mono text-[18px] font-medium mb-3 text-signal">{b.range}</p>
                                        <p className="font-body text-[13px] text-text-mid leading-relaxed">{b.includes}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-ink-700 border border-hairline">
                        <p className="font-body text-text-mid text-[15px] leading-relaxed max-w-[640px]">{data.s12Note}</p>
                        <a href={BOOK} target="_blank" rel="noopener noreferrer" className={`flex-shrink-0 ${BTN_PRIMARY}`}>
                            Book a consultation
                            <Arrow className="w-4 h-4" />
                        </a>
                    </div>
                    <p className="mt-3 font-mono text-[11px] text-text-mid/70">Figures are starting points, confirmed after a free consultation.</p>
                </div>
            </section>

            {/* ── SECTION 9: SHOPIFY VS WOO + AGENCY VS FREELANCER (paper-50) ── */}
            <section className="bg-paper-50 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Make the right call</Eyebrow>
                        <h2 className={`${H2} text-ink-text`}>{data.compHeading}</h2>
                    </div>

                    {/* Shopify vs WooCommerce */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {channelPoints.map((p) => (
                            <div key={p.title} className="bg-white rounded-2xl p-7 border border-line-200">
                                <h3 className="font-display text-[16px] font-semibold text-ink-text mb-2">{p.title}</h3>
                                <p className="font-body text-[14px] text-ink-mid leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-line-200 mb-12">
                        <p className="font-body text-ink-mid text-[15px] leading-relaxed">{data.ppcSeoVerdict}</p>
                    </div>

                    {/* Agency vs Freelancer vs In-house */}
                    <p className="font-body text-ink-mid text-[16px] leading-relaxed max-w-[760px] mb-6">{data.compIntro}</p>
                    <div className="hidden md:block overflow-hidden rounded-2xl border border-line-200">
                        <table className="w-full text-left text-[14px]">
                            <thead>
                                <tr className="bg-ink-900 text-text-hi">
                                    <th scope="col" className="px-5 py-4 font-display font-semibold">Factor</th>
                                    <th scope="col" className="px-5 py-4 font-display font-semibold text-signal">Agency</th>
                                    <th scope="col" className="px-5 py-4 font-display font-semibold">Freelancer</th>
                                    <th scope="col" className="px-5 py-4 font-display font-semibold">In-house</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-line-200 bg-white">
                                {comparison.map((row) => (
                                    <tr key={row.factor} className="align-top">
                                        <th scope="row" className="px-5 py-4 font-semibold text-ink-text whitespace-nowrap text-left">{row.factor}</th>
                                        <td className="px-5 py-4 text-ink-text leading-relaxed font-medium bg-signal/[0.05]">{row.agency}</td>
                                        <td className="px-5 py-4 text-ink-mid leading-relaxed">{row.freelancer}</td>
                                        <td className="px-5 py-4 text-ink-mid leading-relaxed">{row.inhouse}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {comparison.map((row) => (
                            <div key={row.factor} className="bg-white rounded-2xl p-5 border border-line-200">
                                <p className="font-display text-[15px] font-semibold text-ink-text mb-3">{row.factor}</p>
                                <dl className="space-y-2 text-[13px]">
                                    <div className="flex gap-2 rounded-lg p-2 bg-signal/[0.06]">
                                        <dt className="font-semibold w-24 flex-shrink-0 text-signal">Agency</dt>
                                        <dd className="text-ink-text">{row.agency}</dd>
                                    </div>
                                    <div className="flex gap-2 p-2">
                                        <dt className="font-semibold w-24 flex-shrink-0 text-ink-mid">Freelancer</dt>
                                        <dd className="text-ink-mid">{row.freelancer}</dd>
                                    </div>
                                    <div className="flex gap-2 p-2">
                                        <dt className="font-semibold w-24 flex-shrink-0 text-ink-mid">In-house</dt>
                                        <dd className="text-ink-mid">{row.inhouse}</dd>
                                    </div>
                                </dl>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 bg-white rounded-2xl p-6 lg:p-8 border border-line-200">
                        <h3 className="font-display text-[18px] font-semibold text-ink-text mb-3">The honest verdict</h3>
                        <p className="font-body text-ink-mid text-[15px] leading-relaxed">{data.compVerdict}</p>
                    </div>
                </div>
            </section>

            {/* ── SECTION 10: WHY CHOOSE WEBSPIRES (ink-800, red-tick grid) ── */}
            <section id="why" className="bg-ink-800 py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12 reveal">
                        <Eyebrow className="block mb-4">The difference</Eyebrow>
                        <h2 className={`${H2} text-text-hi`}>{data.s13Heading}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {whyChoose.map((w) => (
                            <div key={w.title} className="bg-ink-700 border border-hairline rounded-2xl p-6">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 bg-signal/20">
                                    <Check className="w-4 h-4 text-signal" />
                                </div>
                                <h3 className="font-display text-[15px] font-semibold text-text-hi mb-2 leading-snug">{w.title}</h3>
                                <p className="font-body text-[13px] text-text-mid leading-relaxed">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[12px]">
                        <Link href="/services/web-design" className="inline-flex items-center gap-1.5 text-signal hover:underline">Web design <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/services/seo/ecommerce-seo" className="inline-flex items-center gap-1.5 text-signal hover:underline">Ecommerce SEO <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/services/conversion-rate-optimisation" className="inline-flex items-center gap-1.5 text-signal hover:underline">CRO <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/about-us" className="inline-flex items-center gap-1.5 text-signal hover:underline">About our team <Arrow className="w-3.5 h-3.5" /></Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 11: REAL SHOPIFY RESULTS (ink-900) ── */}
            <section className="bg-ink-900 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Proof</Eyebrow>
                        <h2 className={`${H2} text-text-hi`}>{data.s14Heading}</h2>
                    </div>
                    {data.caseMetric ? (
                        <div className="inline-flex items-baseline gap-2 rounded-2xl px-6 py-4 mb-6 bg-signal/10">
                            <span className="font-display text-[28px] font-bold text-signal">{data.caseMetric}</span>
                        </div>
                    ) : null}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-ink-700 rounded-2xl p-7 border border-hairline">
                            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] mb-3 text-signal">Problem</p>
                            <p className="font-body text-[14px] text-text-mid leading-relaxed">{data.caseProblem}</p>
                        </div>
                        <div className="bg-ink-700 rounded-2xl p-7 border border-hairline">
                            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] mb-3 text-signal">Solution</p>
                            <p className="font-body text-[14px] text-text-mid leading-relaxed">{data.caseSolution}</p>
                        </div>
                        <div className="bg-ink-700 rounded-2xl p-7 border border-signal/30">
                            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] mb-3 text-signal">Outcome</p>
                            <p className="font-body text-[14px] text-text-mid leading-relaxed mb-4">{data.caseOutcome}</p>
                            <CitationChip label="↳ verified internally" />
                        </div>
                    </div>
                    {data.caseNote ? (
                        <p className="mt-6 font-body text-[13px] text-text-mid/80 leading-relaxed">{data.caseNote}</p>
                    ) : null}
                    <div className="mt-6">
                        <Link href="/case-studies" className="inline-flex items-center gap-1.5 font-mono text-[12px] text-signal hover:underline">
                            See our case studies <Arrow className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 12: CTA BAND (ink-900, glow) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 py-16 lg:py-20 border-t border-hairline">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className={`${H2} text-text-hi mb-4`}>{data.s15Heading}</h2>
                    <p className="font-body text-text-mid text-[16px] mb-8 max-w-[640px] mx-auto leading-relaxed">{data.s15Body}</p>
                    <ul className="flex flex-wrap gap-2.5 justify-center list-none p-0 mb-8">
                        {consultChips.map((c) => (
                            <li key={c}><CitationChip label={c} /></li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href={BOOK} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} text-[15px] px-8 py-4`}>
                            Book a free Shopify consultation
                            <Arrow className="w-4 h-4" />
                        </a>
                        <a href={`tel:${PHONE}`} className={`${BTN_GHOST} text-[15px] px-8 py-4`}>{PHONE_LABEL}</a>
                    </div>
                </div>
            </section>

            {/* ── SECTION 13: FAQ (paper-50, accordion) ── */}
            <section className="bg-paper-50 py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12 reveal">
                        <Eyebrow className="block mb-4">FAQ</Eyebrow>
                        <h2 className={`${H2} text-ink-text`}>{data.faqHeading}</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-white rounded-2xl border border-line-200 overflow-hidden">
                                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-display font-semibold text-[15px] text-ink-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                                    {faq.q}
                                    <Chevron className="w-5 h-5 flex-shrink-0 text-ink-mid transition-transform duration-200 group-open:rotate-180" />
                                </summary>
                                <p className="font-body text-[14px] text-ink-mid leading-relaxed px-5 pb-5">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <OtherServicesSection currentSlug="shopify-development" />
        </>
    );
}
