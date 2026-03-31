import { notFound } from 'next/navigation'
import Link from 'next/link'
import { servicesData, getServiceBySlug } from '@/data/services'

export async function generateStaticParams() {
    return servicesData.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const svc = getServiceBySlug(slug)
    if (!svc) return {}
    return {
        title: svc.metaTitle,
        description: svc.metaDescription,
        alternates: { canonical: `https://webspires.co.uk/services/${svc.slug}/` },
        openGraph: {
            title: svc.metaTitle,
            description: svc.metaDescription,
            url: `https://webspires.co.uk/services/${svc.slug}/`,
        },
    }
}

export default async function ServicePage({ params }) {
    const { slug } = await params
    const svc = getServiceBySlug(slug)
    if (!svc) notFound()

    const otherServices = servicesData.filter(s => s.slug !== svc.slug).slice(0, 3)

    return (
        <main>
            {/* ── HERO ── */}
            <section
                aria-labelledby={`${svc.slug}-hero-heading`}
                className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-0"
            >
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${svc.color} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
                    style={{ background: `radial-gradient(circle, ${svc.color} 0%, transparent 70%)` }} aria-hidden="true" />

                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">{svc.shortTitle}</li>
                        </ol>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <div>
                            <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                                style={{ color: svc.color, borderColor: `${svc.color}44`, background: `${svc.color}14` }}>
                                {svc.category}
                            </span>
                            <h1 id={`${svc.slug}-hero-heading`}
                                className="text-[34px] sm:text-[44px] lg:text-[54px] font-extrabold text-white leading-[1.05] mb-5">
                                {svc.heroHeading}
                            </h1>
                            <p className="text-gray-400 text-[17px] leading-relaxed mb-9 max-w-[560px]">
                                {svc.heroSub}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a href="https://call.webspires.co.uk?utm_source=servicepage"
                                    target="_blank" rel="noopener noreferrer"
                                    id={`${svc.slug}-hero-cta`}
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                                    Get a Free Proposal
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a href="tel:+441615241569"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                    </svg>
                                    Call Us Now
                                </a>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {svc.stats.map((s) => (
                                <div key={s.label}
                                    className="bg-white/[0.06] border border-white/10 rounded-2xl px-6 py-5 text-center hover:bg-white/10 transition-colors duration-200">
                                    <p className="text-[30px] sm:text-[36px] font-extrabold leading-none mb-1" style={{ color: svc.color }}>
                                        {s.value}
                                    </p>
                                    <p className="text-[13px] text-gray-400 font-medium">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Accent bar */}
                <div className="mt-16 h-1 w-full" style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }} aria-hidden="true" />
            </section>

            {/* ── INTRO ── */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                                style={{ color: svc.color, background: `${svc.color}14` }}>
                                About This Service
                            </span>
                            <h2 className="text-[26px] sm:text-[32px] lg:text-[38px] font-extrabold text-[#1a1a2e] leading-tight mb-5">
                                Why UK Businesses Choose <span style={{ color: svc.color }}>Webspires</span> for {svc.shortTitle}
                            </h2>
                            <p className="text-gray-500 text-[16px] leading-relaxed">
                                {svc.intro}
                            </p>
                        </div>
                        {/* Feature highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {svc.features.map((f, i) => (
                                <div key={i} className="bg-[#faf9f7] rounded-2xl p-5 border border-gray-100 hover:-translate-y-0.5 transition-transform duration-200">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${svc.color}18` }}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={svc.color}
                                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[14px] font-extrabold text-[#1a1a2e] mb-1.5">{f.title}</h3>
                                    <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PROCESS ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-24">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-14">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: svc.color, background: `${svc.color}14` }}>
                            Our Process
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold text-[#1a1a2e] leading-tight">
                            How We Deliver Your{' '}
                            <span style={{ color: svc.color }}>{svc.shortTitle} Results</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {svc.process.map((step, i) => (
                            <div key={i} className="relative bg-white rounded-2xl p-6 border border-gray-100">
                                {/* Step number */}
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-white text-[14px] mb-5"
                                    style={{ background: svc.color }}>
                                    {step.step}
                                </div>
                                {/* Connector line (desktop) */}
                                {i < svc.process.length - 1 && (
                                    <div className="hidden lg:block absolute top-[46px] left-[calc(100%+2px)] w-6 h-0.5 bg-gray-200" aria-hidden="true" />
                                )}
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2">{step.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="bg-white py-16 lg:py-24">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                            style={{ color: svc.color, background: `${svc.color}14` }}>
                            FAQ
                        </span>
                        <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e]">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {svc.faqs.map((faq, i) => (
                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2 flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold mt-0.5"
                                        style={{ background: svc.color }}>
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

            {/* ── OTHER SERVICES ── */}
            <section className="bg-[#faf9f7] py-16 lg:py-20 border-t border-gray-100">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[22px] font-extrabold text-[#1a1a2e]">Explore Other Services</h2>
                        <Link href="/services" className="text-[13px] font-bold text-primary hover:underline">
                            View All →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {otherServices.map((s) => (
                            <Link key={s.slug} href={`/services/${s.slug}`}
                                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 no-underline">
                                <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: s.color }}>
                                    {s.category}
                                </p>
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5 group-hover:text-primary transition-colors duration-200">
                                    {s.title}
                                </h3>
                                <p className="text-[13px] text-gray-400">{s.tagline}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM CTA ── */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${svc.color} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
                        style={{ color: svc.color, borderColor: `${svc.color}44`, background: `${svc.color}14` }}>
                        Ready to Start?
                    </span>
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-extrabold text-white leading-tight mb-4">
                        Let&apos;s Grow Your Business<br />
                        <span style={{ color: svc.color }}>with {svc.shortTitle}</span>
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[480px] mx-auto leading-relaxed">
                        Book a free strategy call with our team — no obligation, no hard sell.
                        Just honest advice about what {svc.shortTitle} can do for your UK business.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=servicecta"
                            target="_blank" rel="noopener noreferrer"
                            id={`${svc.slug}-bottom-cta`}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Book a Free Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="tel:+441615241569"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] px-8 py-4 rounded-xl border border-white/20 transition-all duration-200">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                            </svg>
                            +44 161 524 1569
                        </a>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-6 text-[13px] text-gray-500">
                        {['No obligation', 'Free strategy session', 'UK-based team', '500+ projects delivered'].map(t => (
                            <span key={t} className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
