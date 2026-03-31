const reasons = [
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M20 4L4 12v16l16 8 16-8V12L20 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M14 19l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Results-First Approach',
        description: 'Every decision is backed by data. We don\'t chase vanity metrics — we focus on leads, revenue, and measurable business growth.',
        color: '#EE314F',
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
                <path d="M12 20l5 5 11-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: '100% Transparent Reporting',
        description: 'You get full access to live dashboards with real-time data. No smoke and mirrors — just honest reporting on every campaign.',
        color: '#f97316',
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M8 32V20M16 32V12M24 32V16M32 32V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Proven Track Record',
        description: '200+ successful projects across e-commerce, healthcare, real estate, and more — with measurable results verified by client testimonials.',
        color: '#3b82f6',
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'Dedicated Account Manager',
        description: 'You get a single point of contact who knows your business inside out. No bouncing between departments — just seamless communication.',
        color: '#8b5cf6',
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M20 6l2.45 7.54H30l-6.18 4.49 2.36 7.25L20 20.79l-6.18 4.49 2.36-7.25L10 13.54h7.55z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
        ),
        title: 'UK Market Expertise, Global Standards',
        description: 'We understand the UK market deeply while applying global best practices — giving your business the competitive edge locally and internationally.',
        color: '#10b981',
    },
    {
        icon: (
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <path d="M6 20h28M20 6v28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="10" y="10" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        title: 'Full-Service Under One Roof',
        description: 'From strategy to design to development to marketing — you don\'t need multiple agencies. We handle everything end-to-end.',
        color: '#ec4899',
    },
]

export default function WhyWebspires() {
    return (
        <section id="about" aria-labelledby="about-heading" className="bg-white py-14 sm:py-20 lg:py-28">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Two-col header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            Why Webspires
                        </span>
                        <h2 id="about-heading" className="text-[28px] sm:text-[32px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight mb-5">
                            More Than an Agency —<br />
                            <span className="text-primary">Your Growth Partner</span>
                        </h2>
                        <p className="text-gray-500 text-[16px] leading-relaxed mb-6">
                            We don&apos;t just build websites or run ads. We partner with ambitious UK businesses to craft digital strategies that generate real, sustainable growth. Here&apos;s what sets us apart.
                        </p>
                        <a
                            id="why-cta"
                            href="#contact"
                            className="inline-flex items-center gap-2 bg-[#1a1a2e] hover:bg-primary text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Work With Us
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>

                    {/* Right: Quick stats highlight */}
                    <div className="bg-[#faf9f7] rounded-2xl p-8 border border-gray-100">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { val: '500+', label: 'Projects Done' },
                                { val: '2023', label: 'Established' },
                                { val: '98%', label: 'Happy Clients' },
                                { val: '5×', label: 'Avg. ROI' },
                            ].map((s) => (
                                <div key={s.label} className="text-center p-4 bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                                    <p className="text-[34px] font-extrabold text-primary leading-none">{s.val}</p>
                                    <p className="text-[13px] text-gray-500 font-semibold mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <p className="text-[13px] text-gray-700 font-medium leading-snug">
                                <strong className="text-primary">No long-term lock-in.</strong> We earn your loyalty through results, not contracts.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reasons grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reasons.map((r, i) => (
                        <div
                            key={i}
                            id={`reason-${i + 1}`}
                            className="group flex gap-4 p-6 rounded-2xl border border-gray-100 bg-[#faf9f7] hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ background: `${r.color}15`, color: r.color }}
                            >
                                {r.icon}
                            </div>
                            <div>
                                <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-1.5">{r.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{r.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
