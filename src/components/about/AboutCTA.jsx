const reviews = [
    {
        name: 'Catalin Buznea',
        text: 'Great guys, done my website, been very communicative. Recommend 100%.',
        stars: 5,
        initials: 'CB',
        color: '#EE314F',
    },
    {
        name: 'Super Ara',
        text: "I can't put into words how amazing the team have been from start to end. Helping my vision and dream come true — website, logo, everything is absolutely perfect!",
        stars: 5,
        initials: 'SA',
        color: '#f97316',
    },
    {
        name: 'Starlight Customs',
        text: 'Working with Webspires was a game-changer. They truly understood my vision and transformed it into a stunning, user-friendly website. Quick responses, stress-free process.',
        stars: 5,
        initials: 'SC',
        color: '#3b82f6',
    },
]

export default function AboutCTA() {
    return (
        <section
            id="about-cta"
            aria-labelledby="about-cta-heading"
            className="bg-[#faf9f7] py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Mini testimonials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
                        >
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(r.stars)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-[14px] text-gray-600 leading-relaxed mb-4 italic">
                                &ldquo;{r.text}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[11px] font-extrabold"
                                    style={{ background: r.color }}
                                >
                                    {r.initials}
                                </div>
                                <span className="text-[13px] font-bold text-[#1a1a2e]">{r.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main CTA block */}
                <div className="relative overflow-hidden bg-[#1a1a2e] rounded-3xl p-10 lg:p-16 text-center">
                    {/* Glows */}
                    <div
                        className="pointer-events-none absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -bottom-20 right-0 w-[400px] h-[400px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            Ready to Grow?
                        </span>

                        <h2
                            id="about-cta-heading"
                            className="text-[32px] sm:text-[42px] lg:text-[52px] font-extrabold text-white leading-tight mb-5"
                        >
                            Let&apos;s Build Something{' '}
                            <span className="text-primary">Great Together</span>
                        </h2>

                        <p className="text-gray-400 text-[16px] sm:text-[18px] mb-10 max-w-[540px] mx-auto leading-relaxed">
                            Book a free strategy call with our team. No pressure, no obligation &mdash; just 
                            a genuine conversation about how we can help your business grow online.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                id="about-final-cta"
                                href="https://call.webspires.co.uk?utm_source=aboutcta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] tracking-wide px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(238,49,79,0.4)]"
                            >
                                Book a Free Call
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                id="about-phone-cta"
                                href="tel:+441615241569"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] tracking-wide px-8 py-4 rounded-xl border border-white/20 transition-all duration-200"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                </svg>
                                +44 161 524 1569
                            </a>
                        </div>

                        {/* Trust signals */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-gray-500">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                No obligation
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Free strategy consultation
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                UK-based team
                            </span>
                        </div>
                    </div>
                </div>

                {/* Office info */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            label: 'Our Office',
                            value: '39A Manchester Rd, Bolton BL3 2NZ, United Kingdom',
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            ),
                            color: '#EE314F',
                        },
                        {
                            label: 'Phone',
                            value: '+44 161 524 1569',
                            href: 'tel:+441615241569',
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                </svg>
                            ),
                            color: '#10b981',
                        },
                        {
                            label: 'Email',
                            value: 'info@webspires.co.uk',
                            href: 'mailto:info@webspires.co.uk',
                            icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            ),
                            color: '#3b82f6',
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${item.color}15`, color: item.color }}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 mb-0.5">
                                    {item.label}
                                </p>
                                {item.href ? (
                                    <a href={item.href} className="text-[14px] font-semibold text-[#1a1a2e] hover:text-primary transition-colors">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-[14px] font-semibold text-[#1a1a2e]">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
