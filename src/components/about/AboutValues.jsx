const values = [
    {
        title: 'Results First',
        description: 'Every decision we make is driven by one question: will this grow our client\'s business? Vanity metrics are not enough — we focus on revenue, leads, and measurable outcomes.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <path d="M4 24l6-10 5 6 4-5 5 9H4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#EE314F',
        bg: 'bg-[#EE314F]/10',
    },
    {
        title: 'Radical Transparency',
        description: 'We share exactly what we\'re doing, why we\'re doing it, and how it\'s performing. No hidden fees, no opaque dashboards — just complete clarity.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
                <path d="M16 10v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        color: '#f97316',
        bg: 'bg-[#f97316]/10',
    },
    {
        title: 'UK Market Mastery',
        description: 'We understand the UK business landscape deeply — consumer behaviour, platform trends, and local competition — giving our clients a genuine edge in their market.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" stroke="currentColor" strokeWidth="2" />
                <path d="M4 16h24M16 4c-3 4-4 8-4 12s1 8 4 12M16 4c3 4 4 8 4 12s-1 8-4 12" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        color: '#3b82f6',
        bg: 'bg-[#3b82f6]/10',
    },
    {
        title: 'Continuous Improvement',
        description: 'We never set-and-forget. Campaigns, websites, and strategies are reviewed and optimised regularly because better never stops.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <path d="M8 16a8 8 0 018-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 16a8 8 0 01-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12l4 4-4 4M28 20l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#10b981',
        bg: 'bg-[#10b981]/10',
    },
    {
        title: 'Genuine Partnership',
        description: 'We become an extension of your team. Your success is our success — we invest the same energy in your growth as if it were our own business.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <path d="M20 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" strokeWidth="2" />
                <path d="M6 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        color: '#8b5cf6',
        bg: 'bg-[#8b5cf6]/10',
    },
    {
        title: 'Excellence in Execution',
        description: 'From pixel-perfect web design to laser-targeted ad campaigns — we don\'t ship until it\'s right. High standards are non-negotiable in everything we deliver.',
        icon: (
            <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7" aria-hidden="true">
                <path d="M16 4l2.9 8.9H28l-7.4 5.4 2.8 8.7L16 21.8l-7.4 5.2 2.8-8.7L4 12.9h9.1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        color: '#eab308',
        bg: 'bg-[#eab308]/10',
    },
]

export default function AboutValues() {
    return (
        <section
            id="about-values"
            aria-labelledby="values-heading"
            className="bg-[#faf9f7] py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Our Core Values
                    </span>
                    <h2 id="values-heading" className="text-[28px] sm:text-[34px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight mb-4">
                        The Principles That Drive<br />
                        <span className="text-primary">Everything We Do</span>
                    </h2>
                    <p className="text-gray-500 text-[16px] max-w-[540px] mx-auto leading-relaxed">
                        Throughout our growth, we remain committed to the core beliefs that have made us
                        the UK&apos;s most trusted digital agency for ambitious businesses.
                    </p>
                </div>

                {/* Values grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <div
                            key={i}
                            id={`value-${i + 1}`}
                            className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_36px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${v.bg} transition-transform duration-300 group-hover:scale-110`}
                                style={{ color: v.color }}
                            >
                                {v.icon}
                            </div>
                            <h3 className="text-[17px] font-extrabold text-[#1a1a2e] mb-2.5">
                                {v.title}
                            </h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed">
                                {v.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Banner */}
                <div className="mt-14 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d5e] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-[22px] lg:text-[26px] font-extrabold text-white mb-2">
                            We Do Things the Right Way
                        </h3>
                        <p className="text-gray-400 text-[15px] max-w-[520px]">
                            From day-one transparency to long-term partnership, our values are not just words
                            on a page &mdash; they govern every client engagement, every campaign, and every line of code.
                        </p>
                    </div>
                    <a
                        id="values-cta"
                        href="https://call.webspires.co.uk?utm_source=aboutvalues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        Work With Us
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
