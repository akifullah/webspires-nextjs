const milestones = [
    { year: '2023', label: 'Founded', desc: 'Webspires Limited was established in Bolton, UK, with a clear mission: help local businesses win online.' },
    { year: '2023', label: 'First 50 Clients', desc: 'Within our first year, we successfully delivered projects for over 50 businesses across the UK, earning 5-star reviews on Google.' },
    { year: '2024', label: '500+ Projects', desc: 'Crossed 500+ completed projects milestone, spanning web design, SEO, Google Ads, Meta Ads, CRM, and Shopify development.' },
    { year: '2025', label: 'UK Market Leaders', desc: 'Recognised as one of the UK\'s fastest-growing digital agencies, trusted by businesses from Bolton to London.' },
]

export default function AboutStory() {
    return (
        <section
            id="about-story"
            aria-labelledby="story-heading"
            className="bg-white py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT — Story text */}
                    <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                            Our Story
                        </span>
                        <h2 id="story-heading" className="text-[28px] sm:text-[34px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight mb-6">
                            We&apos;re All About{' '}
                            <span className="text-primary">Relationships</span> and Results
                        </h2>
                        <div className="space-y-4 text-gray-500 text-[16px] leading-relaxed">
                            <p>
                                Webspires Limited was founded in 2023 with a straightforward belief: every business,
                                regardless of size, deserves a powerful digital presence. What started as a small,
                                passionate team in Bolton has grown into a full-service UK digital agency trusted by
                                500+ businesses.
                            </p>
                            <p>
                                We don&apos;t just build websites or run ad campaigns. We partner with ambitious business
                                owners to craft digital strategies that generate real, measurable growth &mdash; from
                                Google rankings and paid traffic to CRM systems and Shopify stores that sell.
                            </p>
                            <p>
                                Our team is made up of specialists who have spent years mastering their craft across
                                web design, SEO, paid media, and CRM development. We bring global-standard expertise
                                with a genuine understanding of the UK market.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href="/#portfolio"
                                id="story-portfolio-link"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                            >
                                Our Portfolio
                            </a>
                            <a
                                href="/#testimonials"
                                id="story-testimonials-link"
                                className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-[#1a1a2e] hover:text-primary font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200"
                            >
                                Client Success Stories
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — Timeline */}
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-[#f97316] to-[#3b82f6] opacity-30" aria-hidden="true" />

                        <ol className="space-y-10 pl-12 relative">
                            {milestones.map((m, i) => (
                                <li key={i} className="relative">
                                    {/* Dot */}
                                    <span
                                        className="absolute -left-12 mt-0.5 w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold shadow-lg"
                                        style={{
                                            background: ['#EE314F', '#f97316', '#3b82f6', '#10b981'][i],
                                        }}
                                        aria-hidden="true"
                                    >
                                        {m.year.slice(2)}
                                    </span>
                                    <div className="bg-[#faf9f7] rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400">{m.year}</span>
                                            <span className="text-[15px] font-extrabold text-[#1a1a2e]">{m.label}</span>
                                        </div>
                                        <p className="text-[14px] text-gray-500 leading-relaxed">{m.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Review logos strip */}
                <div className="mt-16 pt-12 border-t border-gray-100 flex flex-wrap items-center gap-x-10 gap-y-6">
                    <p className="text-[13px] text-gray-400 font-semibold uppercase tracking-widest">Recognised on</p>
                    {['Google', 'Clutch', 'Trustpilot', 'UpCity'].map((name) => (
                        <span
                            key={name}
                            className="text-[15px] font-extrabold text-gray-300 hover:text-gray-500 transition-colors duration-200"
                        >
                            {name}
                        </span>
                    ))}
                    <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ))}
                        <span className="ml-2 text-[14px] font-bold text-gray-700">5.0 on Google</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
