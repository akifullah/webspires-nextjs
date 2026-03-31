const services = [
    {
        title: 'CRM Services',
        desc: 'Bespoke CRM development that helps you track, manage, and convert leads more effectively.',
        color: '#EE314F',
        href: '/#crm',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M14 18l-6 6 6 6M34 18l6 6-6 6M28 12l-8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <circle cx="20" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M4 24c0-4 3.6-7 8-7h8c4.4 0 8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Google Ads Services',
        desc: 'Certified Google Ads campaigns designed to generate real leads and measurable UK revenue.',
        color: '#f97316',
        href: '/#google-ads',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M4 20l6-8 5 6 4-5 5 7H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
    },
    {
        title: 'Meta Ads Services',
        desc: 'Precision-targeted Facebook & Instagram campaigns that reach your ideal UK audience and convert.',
        color: '#3b82f6',
        href: '/#meta-ads',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <rect x="4" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M10 12h8M10 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Shopify Development',
        desc: 'End-to-end Shopify stores optimised for the UK market — fast checkout, payment integration, and CRO.',
        color: '#8b5cf6',
        href: '/#shopify',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M6 6h4l3 12h10l2-8H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="14" cy="22" r="1.5" fill="currentColor" />
                <circle cx="20" cy="22" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: 'SEO Services',
        desc: 'Dominate Google UK rankings with data-backed SEO — technical audits, link building, and content.',
        color: '#10b981',
        href: '/#seo',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M17 17l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        title: 'Social Media Management',
        desc: 'Strategic social media management that builds your UK brand and turns followers into loyal customers.',
        color: '#ec4899',
        href: '/#social-media',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
                <circle cx="21" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
                <circle cx="17" cy="21" r="3" stroke="currentColor" strokeWidth="2" />
                <path d="M10 9l7-1M10 9l5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
]

export default function AboutServices() {
    return (
        <section
            id="about-services"
            aria-labelledby="about-services-heading"
            className="bg-white py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
                    <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            What We Do
                        </span>
                        <h2 id="about-services-heading" className="text-[28px] sm:text-[34px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight">
                            We&apos;re a Results-Driven<br />
                            <span className="text-primary">Digital Marketing Agency</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-[16px] leading-relaxed lg:text-right lg:max-w-[420px] ml-auto">
                        At Webspires, we take a strategy-first approach to show you real results. Our team
                        goes above and beyond to deliver campaigns that don&apos;t just generate leads &mdash; they
                        support sustainable, long-term growth.
                    </p>
                </div>

                {/* Services list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                    {services.map((s, i) => (
                        <a
                            key={i}
                            id={`about-service-${i + 1}`}
                            href={s.href}
                            className="group relative bg-white p-7 flex gap-5 items-start hover:bg-[#faf9f7] transition-colors duration-200"
                        >
                            {/* Left accent bar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ background: s.color }}
                                aria-hidden="true"
                            />

                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                style={{ background: `${s.color}15`, color: s.color }}
                            >
                                {s.icon}
                            </div>
                            <div>
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-1.5 group-hover:text-primary transition-colors duration-200">
                                    {s.title}
                                </h3>
                                <p className="text-[13.5px] text-gray-500 leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA row */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-gray-500 text-[15px]">
                        Not sure which service is right for you?{' '}
                        <a href="https://call.webspires.co.uk?utm_source=aboutservices" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                            Book a free consultation
                        </a>
                        {' '}— no obligation.
                    </p>
                    <a
                        id="about-services-all-link"
                        href="/#services"
                        className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-[#1a1a2e] hover:text-primary font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap"
                    >
                        View All Services
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
