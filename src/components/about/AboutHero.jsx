const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '45+', label: 'Google Reviews' },
    { value: '98%', label: 'Client Retention' },
    { value: '2023', label: 'Established' },
]

export default function AboutHero() {
    return (
        <section
            id="about-hero"
            aria-labelledby="about-hero-heading"
            className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-0"
        >
            {/* Decorative radial glow */}
            <div
                className="pointer-events-none absolute -top-80 -left-80 w-[700px] h-[700px] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-20 right-0 w-[500px] h-[500px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8">
                    <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                        <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                        <li aria-hidden="true" className="text-gray-600">/</li>
                        <li className="text-gray-300 font-medium">About Us</li>
                    </ol>
                </nav>

                {/* Content */}
                <div className="max-w-[780px]">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        Who We Are
                    </span>

                    <h1
                        id="about-hero-heading"
                        className="text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold text-white leading-[1.05] mb-6"
                    >
                        Your Trusted{' '}
                        <span className="text-primary">Digital Growth</span>{' '}
                        Partner in the UK
                    </h1>

                    <p className="text-gray-400 text-[17px] leading-relaxed mb-10 max-w-[620px]">
                        Webspires Limited is a results-driven digital agency based in Bolton, UK. We build
                        high-performance websites and run ROI-focused marketing campaigns that help ambitious
                        businesses grow online — consistently and measurably.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            id="about-hero-cta"
                            href="https://call.webspires.co.uk?utm_source=aboutpage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] tracking-wide px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Book a Free Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            id="about-hero-portfolio"
                            href="/#portfolio"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] tracking-wide px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                        >
                            View Our Work
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div className="mt-16 bg-[#13131f] border-t border-white/[0.06]">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
                        {stats.map((s) => (
                            <div key={s.label} className="py-7 px-6 first:pl-0 last:pr-0 text-center lg:text-left">
                                <p className="text-[32px] sm:text-[38px] font-extrabold text-primary leading-none mb-1">
                                    {s.value}
                                </p>
                                <p className="text-[13px] text-gray-400 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
