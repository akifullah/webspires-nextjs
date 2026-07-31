import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentItems, getContentItem } from '@/lib/content'

export const revalidate = false
export const dynamicParams = true

export async function generateStaticParams() {
    const items = await getContentItems('caseStudyCategories')
    return items.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const cs = await getContentItem('caseStudyCategories', slug)
    if (!cs) return {}
    return {
        title: cs.metaTitle,
        description: cs.metaDescription,
        alternates: { canonical: `https://webspires.co.uk/case-studies/${cs.slug}/` },
        openGraph: {
            title: cs.metaTitle,
            description: cs.metaDescription,
            url: `https://webspires.co.uk/case-studies/${cs.slug}/`,
        },
    }
}

export default async function CaseStudyCategoryPage({ params }) {
    const { slug } = await params
    const items = await getContentItems('caseStudyCategories')
    const cs = items.find((c) => c.slug === slug)
    if (!cs) notFound()

    const others = items.filter((c) => c.slug !== cs.slug)

    const approach = cs.approach || []
    const measured = cs.measured || []
    const relatedServices = cs.relatedServices || []
    const faqs = cs.faqs || []

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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16 lg:pb-20">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">{cs.name}</li>
                        </ol>
                    </nav>
                    <div className="max-w-[760px]">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            {cs.category}
                        </span>
                        <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.06] mb-5">
                            {cs.heroHeading}
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[620px]">
                            {cs.heroSub}
                        </p>
                        <Link href="/free-digital-marketing-audit"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline">
                            Request Similar Results
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="mt-14 h-1 w-full" style={{ background: 'linear-gradient(90deg, #EE314F, transparent)' }} aria-hidden="true" />
            </section>

            {/* INTRO */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e] leading-tight mb-5">
                        Our {cs.name} Approach
                    </h2>
                    <p className="text-gray-500 text-[16px] leading-relaxed">{cs.intro}</p>
                </div>
            </section>

            {/* APPROACH */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[620px] mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            How We Work
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            The Method Behind the Results
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {approach.map((a, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                                <p className="text-[12px] font-extrabold uppercase tracking-widest mb-2 text-primary">0{i + 1}</p>
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{a.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT WE MEASURE */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="max-w-[620px] mb-10">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            What We Measure
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                            The Metrics That Actually Matter
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {measured.map((m) => (
                            <span key={m} className="inline-flex items-center gap-2 bg-[#faf9f7] text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100">
                                <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* RELATED SERVICES */}
            <section className="bg-[#faf9f7] py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                        <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e]">
                            Services Behind {cs.name}
                        </h2>
                        <Link href="/services" className="text-[13px] font-bold text-primary hover:underline">
                            View All Services →
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {relatedServices.map((s) => (
                            <Link key={s.href} href={s.href}
                                className="inline-flex items-center gap-2 bg-white hover:bg-primary hover:text-white text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100 transition-all duration-200 no-underline">
                                {s.label}
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            FAQ
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e]">
                            {cs.name} Questions
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

            {/* OTHER CATEGORIES */}
            <section className="bg-[#faf9f7] py-14 lg:py-16 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-[20px] font-extrabold text-[#1a1a2e]">Other Case Studies</h2>
                        <Link href="/case-studies" className="text-[13px] font-bold text-primary hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {others.map((o) => (
                            <Link key={o.slug} href={`/case-studies/${o.slug}`}
                                className="inline-flex items-center gap-2 bg-white hover:bg-primary hover:text-white text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100 transition-all duration-200 no-underline">
                                {o.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOTTOM CTA */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                        Want Results Like These?
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[520px] mx-auto leading-relaxed">
                        Get a free digital marketing audit and we&apos;ll show you the fastest path
                        to {cs.name.toLowerCase()} growth for your business.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/free-digital-marketing-audit"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline">
                            Get a Free Audit
                        </Link>
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
