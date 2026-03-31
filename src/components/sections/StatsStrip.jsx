const stats = [
    {
        value: '200+',
        label: 'Projects Delivered',
        sub: 'Across all industries',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M4 20l6-8 5 6 4-5 5 7H4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="22" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
            </svg>
        ),
        color: '#EE314F',
    },
    {
        value: '100+',
        label: 'Happy Clients',
        sub: 'Pakistan, UAE & UK',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <circle cx="10" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="20" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
                <path d="M2 23c0-4 3.6-7 8-7M16 16c4.4 0 8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        color: '#f97316',
    },
    {
        value: '5×',
        label: 'Average ROI',
        sub: 'Across paid campaigns',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M4 22L10 14l5 5 4-6 5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 7h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#10b981',
    },
    {
        value: '8+',
        label: 'Years of Experience',
        sub: 'In digital services',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
                <path d="M14 8v6l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#3b82f6',
    },
    {
        value: '50+',
        label: 'Google Reviews',
        sub: 'Verified 5-star ratings',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M14 4l2.6 7.9H24l-6.6 4.8 2.5 7.8L14 19.5l-5.9 5 2.5-7.8L4 11.9h7.4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#eab308',
    },
    {
        value: '98%',
        label: 'Client Retention',
        sub: 'Long-term partnerships',
        icon: (
            <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M9 14l3.5 3.5L19 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#8b5cf6',
    },
]

const highlights = [
    {
        icon: (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
                <path d="M11 2L3 6v6c0 5 3.6 9.3 8 10.3C16.4 21.3 20 17 20 12V6l-9-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7.5 11l2.5 2.5 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        text: 'Google & Meta Certified Partner Agency',
    },
    {
        icon: (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
                <path d="M3 3h18v14H3zM3 7h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M7 17v2M15 17v2M5 19h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        text: 'Live reporting dashboards — full transparency',
    },
    {
        icon: (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
                <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M7 11l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        text: 'No lock-in contracts — results earn your trust',
    },
    {
        icon: (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
                <path d="M11 2v4M11 16v4M4.22 4.22l2.83 2.83M14.95 14.95l2.83 2.83M2 11h4M16 11h4M4.22 17.78l2.83-2.83M14.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        text: 'Dedicated account manager from day one',
    },
]

export default function StatsStrip() {
    return (
        <section id="results" aria-labelledby="results-heading" className="bg-[#0d0d1a] overflow-hidden relative">

            {/* Decorative background glows */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                {/* Grid lines */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20 lg:py-28">

                {/* ── Section label ─────────────────────────────── */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="h-px flex-1 max-w-[48px] bg-primary/50" />
                    <span className="text-primary text-xs font-extrabold uppercase tracking-[0.2em]">
                        Our Results
                    </span>
                </div>

                {/* ── Two-column layout ─────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT — Heading + highlights */}
                    <div>
                        <h2 id="results-heading" className="text-[30px] sm:text-[36px] lg:text-[52px] xl:text-[58px] font-extrabold text-white leading-[1.05] mb-5">
                            Numbers That<br />
                            <span className="text-primary">Prove</span> Our Work
                        </h2>
                        <p className="text-gray-400 text-[16px] leading-relaxed mb-10 max-w-[440px]">
                            Every stat below is backed by real client outcomes — not marketing fluff. We measure success by the revenue and growth we generate for your business.
                        </p>

                        {/* Highlights checklist */}
                        <div className="space-y-4">
                            {highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                                        {h.icon}
                                    </div>
                                    <p className="text-[14px] text-gray-300 font-medium">{h.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            id="results-cta"
                            href="#contact"
                            className="inline-flex items-center gap-2 mt-10 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] tracking-wide px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            See How We Do It
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* RIGHT — Stat cards grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                id={`stat-${i}`}
                                className="group relative flex flex-col p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Top accent line */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                                    style={{ background: `${stat.color}15`, color: stat.color }}
                                >
                                    {stat.icon}
                                </div>

                                {/* Value */}
                                <p
                                    className="text-[32px] xl:text-[36px] font-extrabold leading-none mb-1.5 tabular-nums"
                                    style={{ color: stat.color }}
                                >
                                    {stat.value}
                                </p>

                                {/* Label */}
                                <p className="text-[13px] text-white font-bold leading-tight mb-1">
                                    {stat.label}
                                </p>

                                {/* Sub */}
                                <p className="text-[11px] text-gray-500 font-medium leading-tight">
                                    {stat.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Trust bar ─────────────────────────────────── */}
                <div className="mt-16 pt-10 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-5">
                    <p className="text-gray-500 text-[13px] font-medium text-center sm:text-left">
                        Trusted by businesses across Pakistan, UAE &amp; the UK
                    </p>
                    <div className="flex items-center gap-6">
                        {[
                            { name: 'Google', rating: '5.0', reviews: '50+' },
                            { name: 'Clutch', rating: '5.0', reviews: '30+' },
                            { name: 'Upwork', rating: '100%', reviews: 'JSS' },
                        ].map((r) => (
                            <div key={r.name} className="flex items-center gap-2">
                                <div>
                                    <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wide leading-none mb-0.5">{r.name}</p>
                                    <div className="flex items-center gap-1">
                                        <div className="flex gap-px">
                                            {[...Array(5)].map((_, s) => (
                                                <svg key={s} className="w-2.5 h-2.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white font-extrabold text-[12px]">{r.rating}</span>
                                        <span className="text-gray-600 text-[11px]">({r.reviews})</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
