import { notFound } from 'next/navigation'
import Link from 'next/link'
import { industryProofPoints, industryPricingFactors } from '@/data/industries'
import { getContentItems, getContentItem } from '@/lib/content'

export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
    const items = await getContentItems('industries')
    return items.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const ind = await getContentItem('industries', slug)
    if (!ind) return {}
    return {
        // `absolute` bypasses the root "%s | Webspires" template so the brand
        // suffix already in metaTitle is not doubled.
        title: { absolute: ind.metaTitle },
        description: ind.metaDescription,
        alternates: { canonical: `https://webspires.co.uk/industries/${ind.slug}/` },
        openGraph: {
            type: 'website',
            locale: 'en_GB',
            title: ind.metaTitle,
            description: ind.metaDescription,
            url: `https://webspires.co.uk/industries/${ind.slug}/`,
        },
        twitter: {
            card: 'summary_large_image',
            title: ind.metaTitle,
            description: ind.metaDescription,
        },
    }
}

export default async function IndustryPage({ params }) {
    const { slug } = await params
    const items = await getContentItems('industries')
    const ind = items.find((i) => i.slug === slug)
    if (!ind) notFound()

    const otherIndustries = items.filter((i) => i.slug !== ind.slug).slice(0, 3)

    const painPoints = ind.painPoints || []
    const channels = ind.channels || []
    const searchOpportunities = ind.searchOpportunities || []
    const roadmap = ind.roadmap || []
    const servicesUsed = ind.servicesUsed || []
    const faqs = ind.faqs || []

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
                    style={{ background: `radial-gradient(circle, ${ind.color} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/industries" className="hover:text-primary transition-colors">Industries</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">{ind.name}</li>
                        </ol>
                    </nav>
                    <div className="max-w-[760px]">
                        <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                            style={{ color: ind.color, borderColor: `${ind.color}44`, background: `${ind.color}14` }}>
                            {ind.category}
                        </span>
                        <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.06] mb-5">
                            {ind.heroHeading}
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[620px]">
                            {ind.heroSub}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://call.webspires.co.uk?utm_source=industry"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                                Request an Industry Growth Audit
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
                <div className="mt-14 h-1 w-full" style={{ background: `linear-gradient(90deg, ${ind.color}, transparent)` }} aria-hidden="true" />
            </section>

            {/* ── PROOF / TRUST STRIP ── */}
            <section className="bg-[#1a1a2e] border-t border-white/5 py-6">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 list-none p-0 m-0">
                        {(ind.proofPoints || industryProofPoints).map((p) => (
                            <li key={p} className="flex items-center gap-2 text-[13px] font-semibold text-gray-300">
                                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke={ind.color}
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── PAIN POINTS ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: ind.color, background: `${ind.color}14` }}>
                            The Challenges
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            Common Problems for {ind.label}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {painPoints.map((p, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2">{p.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BEST CHANNELS ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: ind.color, background: `${ind.color}14` }}>
                            What We Recommend
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            The Best Channels for {ind.name}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {channels.map((c, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${ind.color}18` }}>
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={ind.color}
                                        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{c.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PLATFORM-SPECIFIC SUPPORT (optional) ── */}
            {ind.platforms?.length ? (
                <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="max-w-[680px] mb-12">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                style={{ color: ind.color, background: `${ind.color}14` }}>
                                Platform-Specific Support
                            </span>
                            <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                                Built Around Your {ind.name} Platform
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {ind.platforms.map((p, i) => (
                                <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                    <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{p.name}</h3>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── SEARCH OPPORTUNITIES + COMPETITOR INSIGHT ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <div>
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                style={{ color: ind.color, background: `${ind.color}14` }}>
                                Search Opportunities
                            </span>
                            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e] leading-tight mb-6">
                                What Your Buyers Are Searching
                            </h2>
                            <ul className="space-y-3 list-none p-0 m-0">
                                {searchOpportunities.map((s, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[15px] text-gray-600">
                                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke={ind.color}
                                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#1a1a2e] rounded-3xl p-8 lg:p-10">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                style={{ color: ind.color, background: `${ind.color}22` }}>
                                Competitor Insight
                            </span>
                            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-white leading-snug mb-4">
                                What the Winners Do Differently
                            </h2>
                            <p className="text-gray-400 text-[15px] leading-relaxed">
                                {ind.competitorInsight}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 90-DAY ROADMAP ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center max-w-[640px] mx-auto mb-14">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: ind.color, background: `${ind.color}14` }}>
                            Recommended Strategy
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            Your First 90 Days
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {roadmap.map((r, i) => (
                            <div key={i} className="relative bg-white rounded-2xl p-7 border border-gray-100">
                                <p className="text-[12px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ind.color }}>
                                    {r.phase}
                                </p>
                                <h3 className="text-[17px] font-extrabold text-[#1a1a2e] mb-2">{r.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES USED ── */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                        <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e]">
                            Services We Use for {ind.label}
                        </h2>
                        <Link href="/services" className="text-[13px] font-bold text-primary hover:underline">
                            View All Services →
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {servicesUsed.map((s) => (
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

            {/* ── CASE STUDY LINK ── */}
            <section className="bg-[#faf9f7] py-12 lg:py-16 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="bg-[#1a1a2e] rounded-3xl px-8 py-10 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-white leading-snug mb-2">
                                See the Results Behind the Method
                            </h2>
                            <p className="text-gray-400 text-[15px] max-w-[560px]">
                                Explore how we approach measurable growth and the metrics we hold
                                ourselves to across {ind.name.toLowerCase()} and beyond.
                            </p>
                        </div>
                        <Link href="/case-studies"
                            className="flex-shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline">
                            View Case Studies
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── PRICING & QUOTE FACTORS ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[680px] mb-12">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: ind.color, background: `${ind.color}14` }}>
                            Pricing &amp; Quote Factors
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-3">
                            What Shapes Your Quote
                        </h2>
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            We quote per project rather than list fixed prices, because the right
                            investment depends on your situation. These are the main factors:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(ind.pricingFactors || industryPricingFactors).map((f, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{f.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: ind.color, background: `${ind.color}14` }}>
                            FAQ
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e]">
                            {ind.name} Marketing Questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold mt-0.5"
                                        style={{ background: ind.color }}>
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

            {/* ── OTHER INDUSTRIES ── */}
            <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[22px] font-extrabold text-[#1a1a2e]">Other Industries</h2>
                        <Link href="/industries" className="text-[13px] font-bold text-primary hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {otherIndustries.map((o) => (
                            <Link key={o.slug} href={`/industries/${o.slug}`}
                                className="group bg-[#faf9f7] rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 no-underline">
                                <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: o.color }}>
                                    {o.category}
                                </p>
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5 group-hover:text-primary transition-colors duration-200">
                                    {o.label}
                                </h3>
                                <p className="text-[13px] text-gray-400 line-clamp-2">{o.heroSub}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${ind.color} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                        Grow Your {ind.name} Business
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[520px] mx-auto leading-relaxed">
                        Book a free strategy call. We&apos;ll review your market, competitors, and the
                        fastest opportunities for {ind.label.toLowerCase()}.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=industrycta"
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
