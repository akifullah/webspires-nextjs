const team = [
    {
        id: 'sami',
        name: 'Sami',
        role: 'CEO & Co-Founder',
        bio: 'Visionary leader behind Webspires. With deep expertise in digital strategy and client relations, Sami drives the company mission of delivering real results for UK businesses.',
        initials: 'SA',
        color: '#EE314F',
        expertise: ['Digital Strategy', 'Business Development', 'Leadership'],
        social: {
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 'web-lead',
        name: 'Design & Dev Team',
        role: 'Web Design & Development',
        bio: 'Our creative and technical team builds stunning, lightning-fast websites — from custom WordPress builds and Next.js apps to full Shopify eCommerce stores.',
        initials: 'DD',
        color: '#3b82f6',
        expertise: ['UI/UX Design', 'Next.js', 'Shopify', 'WordPress'],
        social: null,
    },
    {
        id: 'seo-lead',
        name: 'SEO Team',
        role: 'Search & Organic Growth',
        bio: 'Data-driven SEO specialists who have helped UK businesses rank on page one for competitive keywords — combining technical audits, link building, and content strategy.',
        initials: 'SE',
        color: '#10b981',
        expertise: ['Technical SEO', 'Local SEO', 'Link Building', 'Content'],
        social: null,
    },
    {
        id: 'ads-lead',
        name: 'Paid Media Team',
        role: 'Google Ads & Meta Ads',
        bio: 'Certified Google Ads and Meta Ads specialists who consistently deliver 5× ROAS for our clients through precision targeting, creative testing, and continuous optimisation.',
        initials: 'PM',
        color: '#f97316',
        expertise: ['Google Ads', 'Meta Ads', 'Shopping Ads', 'CRO'],
        social: null,
    },
    {
        id: 'crm-lead',
        name: 'CRM & Automation',
        role: 'Systems & Integration',
        bio: 'Our CRM developers build bespoke customer management systems that streamline your sales process, track every lead, and automate follow-ups to maximise conversion.',
        initials: 'CR',
        color: '#8b5cf6',
        expertise: ['CRM Dev', 'Automation', 'Integrations', 'Reporting'],
        social: null,
    },
    {
        id: 'social-lead',
        name: 'Social Media Team',
        role: 'Social & Content',
        bio: 'Creative social media managers who craft engaging content calendars, grow audiences, and turn followers into loyal customers for UK brands across all platforms.',
        initials: 'SM',
        color: '#ec4899',
        expertise: ['Content Creation', 'Scheduling', 'Community', 'Analytics'],
        social: null,
    },
]

export default function AboutTeam() {
    return (
        <section
            id="about-team"
            aria-labelledby="team-heading"
            className="bg-[#1a1a2e] py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Our Team
                    </span>
                    <h2 id="team-heading" className="text-[28px] sm:text-[34px] lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                        We Are Digital Marketing{' '}
                        <span className="text-primary">Experts</span>
                    </h2>
                    <p className="text-gray-400 text-[16px] max-w-[540px] mx-auto leading-relaxed">
                        Webspires boasts a close-knit team of specialists across every discipline of digital
                        marketing &mdash; strategic, creative, and technical.
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member) => (
                        <div
                            key={member.id}
                            id={`team-${member.id}`}
                            className="group relative bg-[#13131f] border border-white/[0.07] rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Avatar */}
                            <div className="flex items-start gap-4 mb-5">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-[18px] flex-shrink-0 shadow-lg"
                                    style={{ background: member.color }}
                                >
                                    {member.initials}
                                </div>
                                <div>
                                    <h3 className="text-[16px] font-extrabold text-white leading-tight">
                                        {member.name}
                                    </h3>
                                    <p className="text-[13px] font-semibold mt-0.5" style={{ color: member.color }}>
                                        {member.role}
                                    </p>
                                    {member.social && (
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <a href={member.social.linkedin} aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors">
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-[13.5px] text-gray-400 leading-relaxed mb-5">
                                {member.bio}
                            </p>

                            {/* Expertise tags */}
                            <div className="flex flex-wrap gap-2">
                                {member.expertise.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                                        style={{
                                            color: member.color,
                                            borderColor: `${member.color}33`,
                                            background: `${member.color}11`,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Join us banner */}
                <div className="mt-14 bg-gradient-to-r from-primary to-[#c01f3a] rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-6 justify-between">
                    <div>
                        <h3 className="text-[22px] lg:text-[26px] font-extrabold text-white mb-2">
                            Looking for Professional Growth?
                        </h3>
                        <p className="text-white/80 text-[15px] max-w-[480px]">
                            We&apos;re always looking for talented digital professionals to join our growing UK team.
                            If you&apos;re passionate about results, get in touch.
                        </p>
                    </div>
                    <a
                        id="team-careers-cta"
                        href="mailto:info@webspires.co.uk?subject=Career Enquiry"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-primary font-bold text-sm tracking-wide px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                    >
                        Be Part of Our Team
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
