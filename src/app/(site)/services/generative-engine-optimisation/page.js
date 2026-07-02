import Link from 'next/link';
import OtherServicesSection from '@/components/sections/OtherServicesSection';
import { getContentItem } from '@/lib/content';
import { getServicePage } from '@/data/servicePages';
import { AnswerEngine, Eyebrow, CitationChip, EngineRow } from '@/components/answer-engine/AnswerEngine';

const BOOK = 'https://call.webspires.co.uk?utm_source=geo';
const CANONICAL = 'https://webspires.co.uk/services/generative-engine-optimisation/';
// Absolute URL on the canonical domain so og:image is immune to the env-driven
// metadataBase fallback (localhost in dev when NEXT_PUBLIC_BASE_URL is unset).
const OG_IMAGE = 'https://webspires.co.uk/images/webspires-logo-icon.png';
const PHONE = '+441615241569';
const PHONE_LABEL = '+44 161 524 1569';

export const revalidate = 3600;

// Flagship hub of the AI-search silo. Content is served from the backend
// dynamic system (the `servicePages` content type, slug
// `generative-engine-optimisation`), editable at /admin/content, and
// revalidated on save via the slug's entry in servicePages `extraPaths`.
// The DB record is MERGED over the static seed so a backend edit wins per
// field while fields added after the record was first seeded still render.
async function getPage() {
    const seed = getServicePage('generative-engine-optimisation') || {};
    const fromDb = await getContentItem('servicePages', 'generative-engine-optimisation');
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
            images: [{ url: OG_IMAGE, alt: 'Webspires Generative Engine Optimisation' }],
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

// Splits a service description so the trailing "The outcome: …" renders as a
// mono citation tag in the signal accent, echoing the answer motif.
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

// The measurement-dashboard signature for "How We Measure". Illustrative
// sample rows (not client data), themed to the answer motif: red = the
// chosen/recommended state, neutral = cited or still tracking.
function VisibilityTracker() {
    const rows = [
        { q: 'best [service] in [your city]', state: 'Recommended' },
        { q: 'top [category] companies uk', state: 'Cited' },
        { q: 'who should i use for [need]', state: 'Recommended' },
        { q: 'alternatives to [competitor]', state: 'Tracking' },
    ];
    const badge = {
        Recommended: 'bg-signal text-white',
        Cited: 'bg-white/[0.06] text-text-hi border border-hairline',
        Tracking: 'bg-white/[0.04] text-text-mid border border-hairline',
    };
    return (
        <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] opacity-60 blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(60% 60% at 70% 20%, var(--ai-soft), transparent 70%)' }} aria-hidden="true" />
            <div className="relative rounded-[24px] border border-hairline bg-ink-700 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-hairline">
                    <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-text-mid">AI visibility tracker</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-signal">
                        <span className="w-1.5 h-1.5 rounded-full bg-signal" aria-hidden="true" /> live
                    </span>
                </div>
                <ul className="p-5 space-y-3 list-none m-0">
                    {rows.map((r) => (
                        <li key={r.q} className="flex items-center gap-3">
                            <span className="font-mono text-[12px] text-signal" aria-hidden="true">&gt;_</span>
                            <span className="font-mono text-[12px] sm:text-[13px] text-text-hi truncate flex-1">{r.q}</span>
                            <span className={`font-mono text-[10px] uppercase tracking-[0.06em] px-2.5 py-1 rounded-full flex-shrink-0 ${badge[r.state]}`}>
                                {r.state}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between px-5 py-4 border-t border-hairline bg-ink-800/60">
                    <span className="font-mono text-[11px] text-text-mid">Cited vs recommended, tracked monthly</span>
                    <span className="font-mono text-[12px] text-signal">▲ trending</span>
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

export default async function GeoHubPage() {
    const data = await getPage();

    const heroChips = data.heroChips || [];
    const terms = data.buildRoutes || [];
    const statTiles = data.statTiles || [];
    const reasons = data.outgrownSigns || [];
    const services = data.services || [];
    const measureChips = data.integrations || [];
    const channelPoints = data.ppcSeoPoints || [];
    const processSteps = data.processSteps || [];
    const businessTypes = data.industries || [];
    const pricingBands = data.pricingBands || [];
    const whyChoose = data.whyChoose || [];
    const faqs = data.faqs || [];
    const heroEngines = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Copilot', 'Google AI Mode'];
    const auditChips = ['Where you are cited today', 'Queries you are missing', 'Competitor comparison', 'Quick wins'];

    /* ── JSON-LD (Organization is provided site-wide by the layout) ── */
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webspires.co.uk/' },
            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://webspires.co.uk/services/' },
            { '@type': 'ListItem', position: 3, name: 'Generative Engine Optimisation', item: CANONICAL },
        ],
    };
    const serviceLd = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Generative Engine Optimisation',
        name: 'Generative Engine Optimisation Services',
        description: data.metaDescription,
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        provider: { '@type': 'Organization', name: 'Webspires', url: 'https://webspires.co.uk/' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'GBP',
            lowPrice: '600',
            highPrice: '2500',
            offerCount: pricingBands.length,
            description: 'Indicative monthly retainer. Confirmed after a free AI visibility audit.',
        },
        url: CANONICAL,
    };
    const howToLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Our GEO Process',
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

            {/* ── SECTION 1: HERO (ink-900, glow, grain, full signature) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 pt-28 pb-16 lg:pb-24">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] text-text-mid/70">
                            <li><Link href="/" className="hover:text-signal transition-colors">Home</Link></li>
                            <li aria-hidden="true">/</li>
                            <li><Link href="/services" className="hover:text-signal transition-colors">Services</Link></li>
                            <li aria-hidden="true">/</li>
                            <li className="text-text-hi">Generative Engine Optimisation</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
                        <div className="reveal">
                            <Eyebrow className="block mb-5">{'// Generative engine optimisation'}</Eyebrow>
                            <h1 className="font-display font-semibold text-text-hi text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.04] tracking-tight mb-6">
                                {data.h1}
                            </h1>
                            <p className="font-body text-text-mid text-[17px] leading-relaxed mb-8 max-w-[600px]">
                                {data.heroSub}
                            </p>
                            <div className="flex flex-wrap gap-4 mb-9">
                                <a href={BOOK} target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                                    Get a free AI visibility audit
                                    <Arrow className="w-4 h-4" />
                                </a>
                                <a href="#how-geo-works" className={BTN_GHOST}>See how GEO works</a>
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

                        {/* Answer Engine signature + engine orbit */}
                        <div className="reveal">
                            <AnswerEngine
                                query="who is the best option near me"
                                brand="Your brand"
                                sources={['ChatGPT', 'Google AI Overviews']}
                            />
                            <div className="mt-8">
                                <EngineRow engines={heroEngines} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 2: WHAT GEO IS (ink-800, definition + term chips) ── */}
            <section className="bg-ink-800 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="reveal">
                        <Eyebrow className="block mb-4">The definition</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-6`}>{data.s2Heading}</h2>
                        <p className="font-body text-[17px] text-text-hi leading-relaxed bg-ink-700 border-l-4 border-signal rounded-r-xl p-6 mb-8">
                            {data.s2Definition}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {terms.map((t) => (
                            <div key={t.title} className="bg-ink-700 rounded-2xl p-5 border border-hairline">
                                <p className="font-mono text-[13px] font-bold text-signal mb-2">{t.title}</p>
                                <p className="font-body text-[13px] text-text-mid leading-relaxed">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s2Adoption}</p>
                </div>
            </section>

            {/* ── SECTION 3: WHY GEO NOW (ink-900, tiles + reasons) ── */}
            <section className="bg-ink-900 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[820px] mb-12 reveal">
                        <Eyebrow className="block mb-4">The shift</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-3`}>{data.s3Heading}</h2>
                        <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s3Intro}</p>
                    </div>
                    {statTiles.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                            {statTiles.map((s) => (
                                <div key={s.label} className="bg-ink-700 rounded-2xl p-7 border border-hairline">
                                    <p className="font-display text-[22px] font-bold text-signal mb-2 leading-tight">{s.value}</p>
                                    <p className="font-body text-[13px] text-text-mid leading-relaxed">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {reasons.map((r) => (
                            <div key={r.title} className="bg-ink-700 rounded-2xl p-6 border border-hairline transition-colors duration-200 hover:border-signal/40">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-signal/15">
                                    <Check className="w-4 h-4 text-signal" />
                                </div>
                                <h3 className="font-display text-[16px] font-semibold text-text-hi mb-2">{r.title}</h3>
                                <p className="font-body text-[14px] text-text-mid leading-relaxed">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 font-mono text-[11px] text-text-mid/60">Framing reflects documented shifts in AI search. Figures are added only when sourced.</p>
                </div>
            </section>

            {/* ── SECTION 4: OUR GEO SERVICES (ink-800, bento) ── */}
            <section id="how-geo-works" className="bg-ink-800 py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-12 reveal">
                        <Eyebrow className="block mb-4">What we deliver</Eyebrow>
                        <h2 className={`${H2} text-text-hi`}>{data.s5Heading}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((s, i) => (
                            <div key={s.title}
                                className={`bg-ink-700 rounded-2xl p-7 border border-hairline transition-all duration-200 hover:border-signal/40 ${i === 0 ? 'lg:col-span-2' : ''}`}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-signal/15">
                                    <Check className="w-4 h-4 text-signal" />
                                </div>
                                <h3 className="font-display text-[17px] font-semibold text-text-hi mb-2">{s.title}</h3>
                                <ServiceDesc desc={s.desc} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: HOW WE MEASURE (ink-900, glow, signature) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 py-16 lg:py-24 border-t border-hairline">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="reveal">
                            <Eyebrow className="block mb-4">{'// The proof'}</Eyebrow>
                            <h2 className={`${H2} text-text-hi mb-4`}>{data.s7Heading}</h2>
                            <p className="font-body text-text-mid text-[16px] leading-relaxed mb-6">{data.s7Body}</p>
                            <ul className="flex flex-wrap gap-2.5 list-none p-0 m-0">
                                {measureChips.map((c) => (
                                    <li key={c}><CitationChip label={c} /></li>
                                ))}
                            </ul>
                        </div>
                        <div className="reveal">
                            <VisibilityTracker />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: GEO VS SEO VS AEO (paper-50) ── */}
            <section className="bg-paper-50 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Term clarity</Eyebrow>
                        <h2 className={`${H2} text-ink-text mb-3`}>{data.compHeading}</h2>
                        <p className="font-body text-ink-mid text-[16px] leading-relaxed">{data.compIntro}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {channelPoints.map((p) => (
                            <div key={p.title} className="bg-white rounded-2xl p-7 border border-line-200">
                                <h3 className="font-display text-[16px] font-semibold text-ink-text mb-2">{p.title}</h3>
                                <p className="font-body text-[14px] text-ink-mid leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-2xl p-6 lg:p-8 border border-line-200">
                        <p className="font-body text-ink-mid text-[15px] leading-relaxed">
                            {data.ppcSeoVerdict}{' '}
                            <Link href="/services/seo" className="font-semibold text-signal hover:underline">Explore our SEO service</Link>.
                        </p>
                    </div>
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

            {/* ── SECTION 8: IS GEO RIGHT FOR YOU (ink-900, qualifier + types) ── */}
            <section className="bg-ink-900 py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[820px] mb-12 reveal">
                        <Eyebrow className="block mb-4">Honest fit</Eyebrow>
                        <h2 className={`${H2} text-text-hi mb-3`}>{data.s11Heading}</h2>
                        <p className="font-body text-text-mid text-[16px] leading-relaxed">{data.s11Intro}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {businessTypes.map((ind) => {
                            const inner = (
                                <>
                                    <h3 className="font-display text-[16px] font-semibold text-text-hi mb-2 group-hover:text-signal transition-colors">{ind.title}</h3>
                                    <p className="font-body text-[14px] text-text-mid leading-relaxed">{ind.desc}</p>
                                    {ind.href && (
                                        <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-signal mt-3">
                                            Explore <Arrow className="w-3.5 h-3.5" />
                                        </span>
                                    )}
                                </>
                            );
                            return ind.href ? (
                                <Link key={ind.title} href={ind.href}
                                    className="group bg-ink-700 rounded-2xl p-6 border border-hairline hover:border-signal/40 hover:-translate-y-0.5 transition-all duration-200 no-underline motion-reduce:transform-none">
                                    {inner}
                                </Link>
                            ) : (
                                <div key={ind.title} className="bg-ink-700 rounded-2xl p-6 border border-hairline">{inner}</div>
                            );
                        })}
                    </div>
                    <p className="mt-8 font-body text-[14px] text-text-mid">
                        Serving a local area?{' '}
                        <Link href="/services/seo/local-seo" className="font-semibold text-signal hover:underline">See our Local SEO service</Link>, where AEO for &ldquo;near me&rdquo; sits alongside the map pack.
                    </p>
                </div>
            </section>

            {/* ── SECTION 9: PRICING (paper-50, three tiers) ── */}
            <section id="pricing" className="bg-paper-50 py-16 lg:py-24 scroll-mt-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[760px] mb-10 reveal">
                        <Eyebrow className="block mb-4">Transparent pricing</Eyebrow>
                        <h2 className={`${H2} text-ink-text mb-3`}>{data.s12Heading}</h2>
                        <p className="font-body text-ink-mid text-[16px] leading-relaxed">{data.s12Intro}</p>
                    </div>

                    {pricingBands.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                            {pricingBands.map((b, i) => {
                                const featured = i === 1;
                                return (
                                    <div key={b.name}
                                        className={`relative rounded-2xl p-6 border-2 bg-white ${featured ? 'border-signal shadow-[0_12px_40px_rgba(242,44,79,0.12)]' : 'border-line-200'}`}>
                                        {featured && (
                                            <span className="absolute -top-3 left-6 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-white px-3 py-1 rounded-full bg-signal">
                                                Most popular
                                            </span>
                                        )}
                                        <h3 className="font-display text-[15px] font-semibold text-ink-text mb-1 mt-1">{b.name}</h3>
                                        <p className="font-mono text-[18px] font-medium mb-3 text-signal">{b.range}</p>
                                        <p className="font-body text-[13px] text-ink-mid leading-relaxed">{b.includes}</p>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-ink-900">
                        <p className="font-body text-text-mid text-[15px] leading-relaxed max-w-[640px]">{data.s12Note}</p>
                        <a href={BOOK} target="_blank" rel="noopener noreferrer" className={`flex-shrink-0 ${BTN_PRIMARY}`}>
                            Get a free audit
                            <Arrow className="w-4 h-4" />
                        </a>
                    </div>
                    <p className="mt-3 font-mono text-[11px] text-ink-mid/70">Pricing is indicative and confirmed after a free AI visibility audit.</p>
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
                        <Link href="/services/seo" className="inline-flex items-center gap-1.5 text-signal hover:underline">SEO hub <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/services/conversion-rate-optimisation" className="inline-flex items-center gap-1.5 text-signal hover:underline">CRO <Arrow className="w-3.5 h-3.5" /></Link>
                        <Link href="/about-us" className="inline-flex items-center gap-1.5 text-signal hover:underline">About our team <Arrow className="w-3.5 h-3.5" /></Link>
                    </div>
                </div>
            </section>

            {/* ── SECTION 11: REAL GEO RESULTS (ink-900) ── */}
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

            {/* ── SECTION 12: CTA BAND (ink-900, glow, signature echo) ── */}
            <section className="relative overflow-hidden grain bg-ink-900 py-16 lg:py-20 border-t border-hairline">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className={`${H2} text-text-hi mb-4`}>{data.s15Heading}</h2>
                    <p className="font-body text-text-mid text-[16px] mb-8 max-w-[640px] mx-auto leading-relaxed">{data.s15Body}</p>
                    <ul className="flex flex-wrap gap-2.5 justify-center list-none p-0 mb-8">
                        {auditChips.map((c) => (
                            <li key={c}><CitationChip label={c} /></li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href={BOOK} target="_blank" rel="noopener noreferrer" className={`${BTN_PRIMARY} text-[15px] px-8 py-4`}>
                            Get a free AI visibility audit
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

            <OtherServicesSection currentSlug="generative-engine-optimisation" />
        </>
    );
}
