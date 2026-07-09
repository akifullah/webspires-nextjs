import { notFound } from 'next/navigation'
import Link from 'next/link'
import { locationProofPoints, locationPricingFactors } from '@/data/locations'
import { getContentItems, getContentItem } from '@/lib/content'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
    const items = await getContentItems('locations')
    return items.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const loc = await getContentItem('locations', slug)
    if (!loc) return {}
    return {
        // `absolute` bypasses the root "%s | Webspires" template so the brand
        // suffix already in metaTitle is not doubled.
        title: { absolute: loc.metaTitle },
        description: loc.metaDescription,
        alternates: { canonical: `https://webspires.co.uk/locations/${loc.slug}/` },
        openGraph: {
            type: 'website',
            locale: 'en_GB',
            title: loc.metaTitle,
            description: loc.metaDescription,
            url: `https://webspires.co.uk/locations/${loc.slug}/`,
        },
    }
}

export default async function LocationPage({ params }) {
    const { slug } = await params
    const items = await getContentItems('locations')
    const loc = items.find((l) => l.slug === slug)
    if (!loc) notFound()

    const otherLocations = items.filter((l) => l.slug !== loc.slug)

    const localProblems = loc.localProblems || []
    const services = loc.services || []
    const localIndustries = loc.localIndustries || []
    const faqs = loc.faqs || []

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
    }

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
            />

            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16 lg:pb-20">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/locations" className="hover:text-primary transition-colors">Locations</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">{loc.city}</li>
                        </ol>
                    </nav>
                    <div className="max-w-[760px]">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            {loc.region}
                        </span>
                        <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.06] mb-5">
                            {loc.heroHeading}
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[620px]">
                            {loc.heroSub}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://call.webspires.co.uk?utm_source=location"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                                Book a Local Growth Audit
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a href="tel:+441615241569"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                                Call Us Now
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-14 h-1 w-full" style={{ background: 'linear-gradient(90deg, #EE314F, transparent)' }} aria-hidden="true" />
            </section>

            {/* ── TRUST STRIP ── */}
            <section className="bg-[#1a1a2e] border-t border-white/5 py-6">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 list-none p-0 m-0">
                        {locationProofPoints.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-[13px] font-semibold text-gray-300">
                                <svg className="w-4 h-4 flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── LOCAL PROBLEMS ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            The Local Challenge
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            What Makes {loc.city} Different
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {localProblems.map((p, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{p.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOCAL SEO ANGLE ── */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <span className="inline-block bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                        Our Local Approach
                    </span>
                    <h2 className="text-[24px] sm:text-[32px] font-extrabold text-white leading-snug mb-5">
                        How We Win Local Search in {loc.city}
                    </h2>
                    <p className="text-gray-400 text-[16px] leading-relaxed">
                        {loc.localSeoAngle}
                    </p>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                        <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e]">
                            Services for {loc.city} Businesses
                        </h2>
                        <Link href="/services" className="text-[13px] font-bold text-primary hover:underline">
                            View All Services →
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {services.map((s) => (
                            <Link key={s.href} href={s.href}
                                className="inline-flex items-center gap-2 bg-[#faf9f7] hover:bg-primary hover:text-white text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100 transition-all duration-200 no-underline">
                                {s.label}
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOCAL INDUSTRIES ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            Sectors We Support
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            Industries We Help in {loc.city}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {localIndustries.map((name, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100">
                                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="text-[14px] font-semibold text-[#1a1a2e]">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOCAL AREAS SERVED ── */}
            {loc.localAreas?.length ? (
                <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="max-w-[680px] mb-10">
                            <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                                Areas We Serve
                            </span>
                            <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                                {loc.city} Areas &amp; Business Districts
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2.5">
                            {loc.localAreas.map((area) => (
                                <span key={area}
                                    className="inline-flex items-center gap-2 bg-[#faf9f7] text-[#1a1a2e] font-semibold text-[13.5px] px-4 py-2.5 rounded-lg border border-gray-100">
                                    <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                        <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── PRICING & QUOTE FACTORS ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            Pricing &amp; Quote Factors
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            What Shapes Your {loc.city} Quote
                        </h2>
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            We quote per project rather than list fixed prices the right investment
                            depends on your situation. These are the main factors:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {locationPricingFactors.map((f, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{f.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOCAL FAQ ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            FAQ
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e]">
                            Working With Us in {loc.city}
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-extrabold mt-0.5">
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

            {/* ── OTHER LOCATIONS ── */}
            <section className="bg-[#faf9f7] py-14 lg:py-16 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[20px] font-extrabold text-[#1a1a2e]">Other Locations</h2>
                        <Link href="/locations" className="text-[13px] font-bold text-primary hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {otherLocations.map((o) => (
                            <Link key={o.slug} href={`/locations/${o.slug}`}
                                className="inline-flex items-center gap-2 bg-white hover:bg-primary hover:text-white text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100 transition-all duration-200 no-underline">
                                Digital Marketing in {o.city}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                        Grow Your Business in {loc.city}
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[520px] mx-auto leading-relaxed">
                        Book a free local growth audit. We&apos;ll review your visibility against
                        {' '}{loc.city} competitors and show you the fastest opportunities.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=locationcta"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Book a Free Call
                        </a>
                        <a href="tel:+441615241569"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] px-8 py-4 rounded-xl border border-white/20 transition-all duration-200">
                            +44 161 524 1569
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
