const reviews = [
    {
        name: 'Catalin Buznea',
        text: 'Great guys, done my website, been very communicative. Recommend 100%.',
        stars: 5,
        initials: 'CB',
        color: '#EE314F',
    },
    {
        name: 'Qazi Yaseen',
        text: 'Outstanding work from the Webspires team! They delivered exactly what I needed and more. Professional, prompt, and the end result exceeded my expectations.',
        stars: 5,
        initials: 'QY',
        color: '#10b981',
    },
    {
        name: 'Starlight Customs',
        text: 'Working with Webspires was a game-changer. They truly understood my vision and transformed it into a stunning, user-friendly website.',
        stars: 5,
        initials: 'SC',
        color: '#3b82f6',
    },
]

export default function ProjectsCTA() {
    return (
        <section
            id="projects-cta"
            aria-labelledby="projects-cta-heading"
            className="bg-white py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Review cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    {reviews.map((r, i) => (
                        <div
                            key={i}
                            className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100"
                        >
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(r.stars)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                                <span className="ml-1 text-[11px] text-gray-400 font-bold">via Google</span>
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
                <div className="relative overflow-hidden bg-[#1a1a2e] rounded-3xl p-10 lg:p-16">
                    {/* Glows */}
                    <div
                        className="pointer-events-none absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-10"
                        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                        <div className="max-w-[580px]">
                            <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                                Start Your Project
                            </span>
                            <h2
                                id="projects-cta-heading"
                                className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold text-white leading-tight mb-4"
                            >
                                Ready to Be Our{' '}
                                <span className="text-primary">Next Success Story?</span>
                            </h2>
                            <p className="text-gray-400 text-[16px] leading-relaxed">
                                Every project you saw above started with a single conversation. Book a free
                                strategy call and let&apos;s talk about what results look like for your business.
                            </p>

                            {/* Trust signals */}
                            <div className="flex flex-wrap gap-5 mt-6 text-[13px] text-gray-400">
                                {['No upfront commitments', 'Free strategy session', 'UK-based team'].map((item) => (
                                    <span key={item} className="flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA buttons */}
                        <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
                            <a
                                id="projects-cta-call"
                                href="https://call.webspires.co.uk?utm_source=projectscta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] tracking-wide px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                Book a Free Call
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                id="projects-cta-phone"
                                href="tel:+441615241569"
                                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] tracking-wide px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 whitespace-nowrap"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                </svg>
                                +44 161 524 1569
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
