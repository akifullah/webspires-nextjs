import Link from 'next/link'
import { servicesData } from '@/data/services'

export const metadata = {
    title: 'Our Services | Digital Marketing & Web Design Agency UK | Webspires',
    description: 'Webspires offers web design, SEO, Google Ads, Meta Ads, Shopify development, CRM systems, and social media management for UK businesses. Explore all services.',
    alternates: { canonical: 'https://webspires.co.uk/service/' },
    openGraph: {
        title: 'Our Services | Webspires UK Digital Agency',
        description: 'Full-service digital agency for UK businesses — web design, SEO, paid ads, CRM, Shopify & social media.',
        url: 'https://webspires.co.uk/service/',
    },
}

export default function ServicesListPage() {
    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">Services</li>
                        </ol>
                    </nav>
                    <div className="max-w-[700px]">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            What We Do
                        </span>
                        <h1 className="text-[36px] sm:text-[48px] lg:text-[58px] font-extrabold text-white leading-[1.05] mb-5">
                            UK Digital Services That{' '}
                            <span className="text-primary">Drive Real Growth</span>
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[560px]">
                            From stunning websites to ROI-focused ad campaigns — Webspires delivers
                            every digital service your UK business needs to grow online, all under one roof.
                        </p>
                        <a href="https://call.webspires.co.uk?utm_source=serviceslist"
                            target="_blank" rel="noopener noreferrer"
                            id="services-list-cta"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Book a Free Strategy Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Services grid */}
            <section aria-labelledby="services-list-heading" className="bg-[#faf9f7] py-20 lg:py-28">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <h2 id="services-list-heading" className="sr-only">All Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicesData.map((svc) => (
                            <Link
                                key={svc.slug}
                                href={`/services/${svc.slug}`}
                                id={`service-list-${svc.slug}`}
                                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 no-underline"
                            >
                                {/* Icon circle */}
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${svc.color}18` }}>
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke={svc.color}
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d={svc.iconPath} />
                                    </svg>
                                </div>

                                {/* Category */}
                                <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: svc.color }}>
                                    {svc.category}
                                </p>

                                {/* Title */}
                                <h3 className="text-[19px] font-extrabold text-[#1a1a2e] mb-3 group-hover:text-primary transition-colors duration-200">
                                    {svc.title}
                                </h3>

                                {/* Tagline */}
                                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                                    {svc.tagline}
                                </p>

                                {/* Learn more */}
                                <div className="flex items-center gap-1.5 text-[13px] font-bold transition-colors duration-200"
                                    style={{ color: svc.color }}>
                                    Learn More
                                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                        viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white mb-4">
                        Not Sure Which Service You Need?
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[480px] mx-auto">
                        Book a free 30-minute strategy call. We&apos;ll assess your business, identify the
                        biggest opportunities, and recommend the right mix of services.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=servicebottomcta"
                            target="_blank" rel="noopener noreferrer"
                            id="services-bottom-cta"
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
