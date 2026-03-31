'use client'
import { useState } from 'react'
import Image from 'next/image'

const categories = ['All', 'Web Design', 'Shopify', 'Google Ads', 'Meta Ads', 'SEO', 'CRM', 'Social Media']

const projects = [
    {
        id: 1,
        title: 'Instant Tyre Resolutions',
        category: 'Web Design',
        tags: ['Web Design', 'Local Business'],
        description: 'A clean, conversion-focused website for a UK tyre repair company. Fast load times and clear calls-to-action drive leads around the clock.',
        result: 'Leads 24/7',
        resultColor: '#EE314F',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/instanttyresolutions.co_.uk_-1-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://instanttyresolutions.co.uk',
    },
    {
        id: 2,
        title: '24/7 Recovery Oldham',
        category: 'Web Design',
        tags: ['Web Design', 'Emergency Services'],
        description: 'Professional roadside recovery website built for visibility and trust. Designed to rank locally and convert visitors into emergency call-outs.',
        result: 'Top Local Rankings',
        resultColor: '#f97316',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/247recoveryoldham.co_.uk_-1-scaled.jpg',
        location: 'Oldham, UK',
        link: 'https://247recoveryoldham.co.uk',
    },
    {
        id: 3,
        title: 'Tyrezone Oldham',
        category: 'Web Design',
        tags: ['Web Design', 'Auto Services'],
        description: 'Bold, trustworthy website for a leading tyre centre in Oldham. Built with speed and mobile-first design to capture local search traffic.',
        result: 'Increased Footfall',
        resultColor: '#3b82f6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/tyrezone-oldham.co_.uk_-scaled.jpg',
        location: 'Oldham, UK',
        link: 'https://tyrezone-oldham.co.uk',
    },
    {
        id: 4,
        title: 'Sky Dunstable Cars',
        category: 'Web Design',
        tags: ['Web Design', 'Automotive'],
        description: 'Polished automotive dealership website showcasing stock listings, clear financing options, and an enquiry flow designed to convert browsers into buyers.',
        result: 'More Enquiries',
        resultColor: '#10b981',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/skydunstablecars.co_.uk_-scaled.jpg',
        location: 'Dunstable, UK',
        link: 'https://skydunstablecars.co.uk',
    },
    {
        id: 5,
        title: 'Shahid Stylist',
        category: 'Web Design',
        tags: ['Web Design', 'Personal Brand'],
        description: 'Stylish personal brand website for a UK fashion stylist. Premium visuals and a portfolio layout that communicates expertise at first glance.',
        result: 'Premium Brand Presence',
        resultColor: '#ec4899',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/01/shahidstylist.com_-scaled-1.jpg',
        location: 'United Kingdom',
        link: 'https://shahidstylist.com',
    },
    {
        id: 6,
        title: 'Fair Deal Carpet',
        category: 'Web Design',
        tags: ['Web Design', 'Home Services'],
        description: 'Clean, trustworthy website for a UK carpet and flooring company. Focused on showcasing products and driving local quote requests.',
        result: 'More Quote Requests',
        resultColor: '#8b5cf6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/fairdealcarpet.co_.uk_-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://fairdealcarpet.co.uk',
    },
    {
        id: 7,
        title: 'MAF Recovery',
        category: 'Web Design',
        tags: ['Web Design', 'Recovery Services'],
        description: 'Fast, professional recovery services website built to generate emergency leads. Clear branding and easy-to-find contact info for on-the-go users.',
        result: 'More Emergency Calls',
        resultColor: '#EE314F',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/mafrecovery.co_.uk_-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://mafrecovery.co.uk',
    },
    {
        id: 8,
        title: 'Newcastle Recovery',
        category: 'Web Design',
        tags: ['Web Design', 'Recovery Services'],
        description: 'A strong, high-converting recovery service website for the Newcastle area. Built to rank for local emergency keywords and capture mobile traffic.',
        result: 'Page 1 Rankings',
        resultColor: '#f97316',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/newcastlerecovery.co_.uk_-1-1-scaled.jpg',
        location: 'Newcastle, UK',
        link: 'https://newcastlerecovery.co.uk',
    },
    {
        id: 9,
        title: 'GCR Recovery',
        category: 'Web Design',
        tags: ['Web Design', 'Auto Recovery'],
        description: 'Professional vehicle recovery website with a focus on trust signals, quick contact options, and service area pages to dominate local SEO.',
        result: 'Booking Growth',
        resultColor: '#3b82f6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/gcrrecovery.co_.uk_-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://gcrrecovery.co.uk',
    },
    {
        id: 10,
        title: 'ManMet Entrepreneurs',
        category: 'Web Design',
        tags: ['Web Design', 'Education', 'Community'],
        description: 'A vibrant, community-driven website for the Manchester Metropolitan University entrepreneurs network. Events, resources, and membership features.',
        result: 'Community Engaged',
        resultColor: '#10b981',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/manmetentrepreneurs.co_.uk_-1-scaled.jpg',
        location: 'Manchester, UK',
        link: 'https://manmetentrepreneurs.co.uk',
    },
    {
        id: 11,
        title: 'ABZ Recovery Services',
        category: 'Web Design',
        tags: ['Web Design', 'Recovery Services'],
        description: 'Impact-first recovery company website with a mobile-optimised layout, emergency call button, and service area coverage to maximise local reach.',
        result: 'More Local Leads',
        resultColor: '#8b5cf6',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/abzrecoveryservices.co_.uk_-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://abzrecoveryservices.co.uk',
    },
    {
        id: 12,
        title: 'Birmingham Scrap My Car',
        category: 'Web Design',
        tags: ['Web Design', 'Lead Gen'],
        description: 'High-converting lead generation website for a Birmingham scrap car service. Instant quote calculator and trust badges drive a high volume of enquiries.',
        result: 'High Lead Volume',
        resultColor: '#eab308',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/birminghamscrapmycar786.co_.uk_-scaled.jpg',
        location: 'Birmingham, UK',
        link: 'https://birminghamscrapmycar786.co.uk',
    },
    {
        id: 13,
        title: 'Krishna Elite Events',
        category: 'Web Design',
        tags: ['Web Design', 'Events', 'Premium'],
        description: 'Elegant event planning website for a luxury UK events brand. Stunning imagery-focused layout, gallery section, and enquiry flow for premium occasions.',
        result: 'Premium Bookings',
        resultColor: '#ec4899',
        image: 'https://webspires.co.uk/wp-content/uploads/2025/03/krishnaeliteevents.com_-scaled.jpg',
        location: 'United Kingdom',
        link: 'https://krishnaeliteevents.com',
    },
]

export default function ProjectsGrid() {
    const [activeCategory, setActiveCategory] = useState('All')

    const filtered = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory)

    return (
        <section id="projects-grid" aria-labelledby="projects-grid-heading" className="bg-[#faf9f7] py-16 lg:py-24">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Filter projects by category">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                            role="tab"
                            aria-selected={activeCategory === cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all duration-200 border ${activeCategory === cat
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Result count */}
                <div className="mb-8">
                    <h2 id="projects-grid-heading" className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                        Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                    </h2>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <article
                            key={project.id}
                            id={`project-${project.id}`}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Project screenshot */}
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${project.title}`}
                                className="block relative h-48 overflow-hidden bg-gray-100"
                            >
                                <Image
                                    src={project.image}
                                    alt={`${project.title} website screenshot`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Category badge */}
                                <span className="absolute top-3 left-3 bg-[#1a1a2e]/80 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 z-10">
                                    {project.category}
                                </span>
                                {/* View arrow overlay */}
                                <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center z-10">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-[#1a1a2e] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5">
                                        View Site
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </a>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-2 leading-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Result + Location */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-0.5">Result</p>
                                        <p className="text-[13px] font-extrabold" style={{ color: project.resultColor }}>
                                            {project.result}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-0.5">Location</p>
                                        <p className="text-[12px] font-semibold text-gray-500">{project.location}</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="mt-14 text-center">
                    <div className="inline-flex flex-col items-center gap-4">
                        <p className="text-gray-500 text-[15px]">
                            These are just a sample of our 500+ completed projects. Want to see work in your industry?
                        </p>
                        <a
                            id="projects-contact-link"
                            href="https://call.webspires.co.uk?utm_source=projectspage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] tracking-wide px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Discuss Your Project
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
