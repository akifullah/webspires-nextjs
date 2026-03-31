const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '6', label: 'Service Categories' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '45+', label: 'Google Reviews' },
]

const categories = ['All', 'Web Design', 'SEO', 'Google Ads', 'Meta Ads', 'Shopify', 'CRM', 'Social Media']

export default function ProjectsHero() {
    return (
        <section
            id="projects-hero"
            aria-labelledby="projects-hero-heading"
            className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-0"
        >
            {/* Decorative glows */}
            <div
                className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-20 -left-60 w-[500px] h-[500px] rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
                aria-hidden="true"
            />

            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="mb-8">
                    <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                        <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                        <li aria-hidden="true" className="text-gray-600">/</li>
                        <li className="text-gray-300 font-medium">Projects</li>
                    </ol>
                </nav>

                {/* Heading */}
                <div className="max-w-[760px] mb-12">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        Our Portfolio
                    </span>
                    <h1
                        id="projects-hero-heading"
                        className="text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold text-white leading-[1.05] mb-6"
                    >
                        Real Work.{' '}
                        <span className="text-primary">Real Results.</span>
                    </h1>
                    <p className="text-gray-400 text-[17px] leading-relaxed max-w-[580px]">
                        Every project we deliver is built around one goal — growing your business. Browse
                        our portfolio of 500+ completed projects across web design, SEO, paid ads, CRM,
                        Shopify development, and social media.
                    </p>
                </div>
            </div>

            {/* Stats bar */}
            <div className="bg-[#13131f] border-t border-white/[0.06]">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
                        {stats.map((s) => (
                            <div key={s.label} className="py-7 px-6 text-center lg:text-left">
                                <p className="text-[32px] sm:text-[36px] font-extrabold text-primary leading-none mb-1">{s.value}</p>
                                <p className="text-[13px] text-gray-400 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
