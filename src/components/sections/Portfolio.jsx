import Image from 'next/image'
import Link from 'next/link'

const projects = [
    {
        id: 1,
        title: 'Instant Tyre Resolutions',
        tags: ['Web Design', 'Local Business'],
        result: 'Leads 24/7',
        resultColor: '#EE314F',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/instanttyresolutions.co_.uk_-1-scaled.jpg',
        link: 'https://instanttyresolutions.co.uk',
    },
    {
        id: 2,
        title: 'Sky Dunstable Cars',
        tags: ['Web Design', 'Automotive'],
        result: 'More Enquiries',
        resultColor: '#10b981',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/skydunstablecars.co_.uk_-scaled.jpg',
        link: 'https://skydunstablecars.co.uk',
    },
    {
        id: 3,
        title: 'Shahid Stylist',
        tags: ['Web Design', 'Personal Brand'],
        result: 'Premium Brand',
        resultColor: '#ec4899',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/shahidstylist.com_-scaled-1.jpg',
        link: 'https://shahidstylist.com',
    },
    {
        id: 4,
        title: 'MAF Recovery',
        tags: ['Web Design', 'Recovery Services'],
        result: 'More Emergency Calls',
        resultColor: '#f97316',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/mafrecovery.co_.uk_-scaled.jpg',
        link: 'https://mafrecovery.co.uk',
    },
    {
        id: 5,
        title: 'Krishna Elite Events',
        tags: ['Web Design', 'Events'],
        result: 'Premium Bookings',
        resultColor: '#8b5cf6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/krishnaeliteevents.com_-scaled.jpg',
        link: 'https://krishnaeliteevents.com',
    },
    {
        id: 6,
        title: 'ManMet Entrepreneurs',
        tags: ['Web Design', 'Education'],
        result: 'Community Engaged',
        resultColor: '#3b82f6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/manmetentrepreneurs.co_.uk_-1-scaled.jpg',
        link: 'https://manmetentrepreneurs.co.uk',
    },
]

export default function Portfolio() {
    return (
        <section
            id="portfolio"
            aria-labelledby="portfolio-heading"
            className="bg-[#faf9f7] py-20 lg:py-28"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                    <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            Our Portfolio
                        </span>
                        <h2
                            id="portfolio-heading"
                            className="text-[28px] sm:text-[34px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight"
                        >
                            Work We&apos;re{' '}
                            <span className="text-primary">Proud Of</span>
                        </h2>
                        <p className="text-gray-500 text-[16px] mt-3 max-w-[480px] leading-relaxed">
                            Real websites for real UK businesses — each one built to convert visitors
                            into customers and rank where it matters.
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        id="portfolio-view-all"
                        className="flex-shrink-0 inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-[#1a1a2e] hover:text-primary font-bold text-[13px] px-6 py-3 rounded-xl transition-all duration-200 whitespace-nowrap self-start sm:self-auto"
                    >
                        View All Projects
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((p) => (
                        <a
                            key={p.id}
                            id={`portfolio-item-${p.id}`}
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${p.title} website`}
                            className="group relative block rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Screenshot image */}
                            <div className="relative h-52">
                                <Image
                                    src={p.image}
                                    alt={`${p.title} website screenshot`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-[#1a1a2e]/0 group-hover:bg-[#1a1a2e]/60 transition-colors duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#1a1a2e] text-[12px] font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5">
                                        View Live Site
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Card footer */}
                            <div className="bg-white px-5 py-4 flex items-center justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-[14px] font-extrabold text-[#1a1a2e] truncate">{p.title}</p>
                                    <div className="flex gap-1.5 mt-1 flex-wrap">
                                        {p.tags.map((tag) => (
                                            <span key={tag} className="text-[11px] font-semibold text-gray-400">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-shrink-0 text-right">
                                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-gray-300 mb-0.5">Result</p>
                                    <p className="text-[12px] font-extrabold" style={{ color: p.resultColor }}>{p.result}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA bar */}
                <div className="mt-12 bg-[#1a1a2e] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div>
                        <p className="text-white font-extrabold text-[16px] sm:text-[18px] mb-1">
                            500+ projects delivered across the UK
                        </p>
                        <p className="text-gray-400 text-[14px]">
                            Want to see more or discuss your project idea?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 flex-shrink-0">
                        <Link
                            href="/projects"
                            id="portfolio-cta-all"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[13px] px-6 py-3 rounded-xl border border-white/20 transition-all duration-200"
                        >
                            Full Portfolio
                        </Link>
                        <a
                            id="portfolio-cta-call"
                            href="https://call.webspires.co.uk?utm_source=homefportfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[13px] px-6 py-3 rounded-xl transition-all duration-200"
                        >
                            Start Your Project
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
