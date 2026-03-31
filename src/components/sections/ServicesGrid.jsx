'use client'

import { useState } from 'react'

const services = [
    {
        id: 'web-dev',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#EE314F" fillOpacity=".1" />
                <path d="M14 18l-6 6 6 6M34 18l6 6-6 6M28 12l-8 24" stroke="#EE314F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: 'Web Development',
        description: 'High-performance, conversion-driven websites built with modern tech stacks — from landing pages to full-scale eCommerce platforms.',
        tags: ['WordPress', 'Next.js', 'Shopify', 'Laravel'],
        href: '#web-development',
    },
    {
        id: 'seo',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#f97316" fillOpacity=".1" />
                <circle cx="22" cy="22" r="8" stroke="#f97316" strokeWidth="2.5" />
                <path d="M28 28l6 6" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 22h8M22 18v8" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'SEO Services',
        description: 'Dominate Google rankings with data-backed SEO strategies — technical audits, keyword research, link building & content optimization.',
        tags: ['Technical SEO', 'Local SEO', 'Link Building', 'Content'],
        href: '#seo',
    },
    {
        id: 'digital-marketing',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#3b82f6" fillOpacity=".1" />
                <path d="M12 36l8-12 6 8 5-6 5 10" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="36" cy="14" r="4" stroke="#3b82f6" strokeWidth="2.5" />
            </svg>
        ),
        title: 'Digital Marketing',
        description: 'ROI-focused paid campaigns on Google, Meta & TikTok. We craft compelling ad strategies that generate real leads and measurable revenue.',
        tags: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'PPC'],
        href: '#digital-marketing',
    },
    {
        id: 'ui-ux',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#8b5cf6" fillOpacity=".1" />
                <rect x="12" y="14" width="24" height="20" rx="3" stroke="#8b5cf6" strokeWidth="2.5" />
                <path d="M19 22h10M19 27h6" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive designs that convert visitors into customers. We combine aesthetics with psychology to create unforgettable user experiences.',
        tags: ['Figma', 'Prototyping', 'User Research', 'Branding'],
        href: '#ui-ux',
    },
    {
        id: 'ecommerce',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#10b981" fillOpacity=".1" />
                <path d="M10 14h4l3 14h14l3-10H17" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="23" cy="33" r="2" fill="#10b981" />
                <circle cx="31" cy="33" r="2" fill="#10b981" />
            </svg>
        ),
        title: 'eCommerce Solutions',
        description: 'End-to-end eCommerce stores built to sell — optimized product pages, fast checkout, payment integration & abandoned cart recovery.',
        tags: ['Shopify', 'WooCommerce', 'Payment Gateway', 'CRO'],
        href: '#ecommerce',
    },
    {
        id: 'content',
        icon: (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
                <rect width="48" height="48" rx="12" fill="#ec4899" fillOpacity=".1" />
                <path d="M15 14h18M15 20h13M15 26h16M15 32h10" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        title: 'Content Marketing',
        description: 'Strategic content that ranks, converts and builds authority. Blog posts, case studies, social content and email sequences that drive growth.',
        tags: ['Blog Writing', 'Email Marketing', 'Social Media', 'Copywriting'],
        href: '#content',
    },
]

export default function ServicesGrid() {
    const [hovered, setHovered] = useState(null)

    return (
        <section id="services" aria-labelledby="services-heading" className="bg-white py-14 sm:py-20 lg:py-28">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        What We Do
                    </span>
                    <h2 id="services-heading" className="text-[28px] sm:text-[32px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight mb-4">
                        Full-Stack Digital Services<br />
                        <span className="text-primary">Built to Grow Your Business</span>
                    </h2>
                    <p className="text-gray-500 text-[17px] max-w-[600px] mx-auto leading-relaxed">
                        From strategy to execution — we deliver every digital service your business needs to dominate online and drive real revenue.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {services.map((svc) => (
                        <a
                            key={svc.id}
                            id={`service-card-${svc.id}`}
                            href={svc.href}
                            onMouseEnter={() => setHovered(svc.id)}
                            onMouseLeave={() => setHovered(null)}
                            className={`group relative flex flex-col p-7 rounded-2xl border transition-all duration-300 no-underline cursor-pointer
                                ${hovered === svc.id
                                    ? 'bg-[#1a1a2e] border-[#1a1a2e] shadow-[0_20px_60px_rgba(0,0,0,0.2)] -translate-y-1'
                                    : 'bg-white border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1'
                                }`}
                        >
                            {/* Icon */}
                            <div className="mb-5 transition-transform duration-300 group-hover:scale-110">
                                {svc.icon}
                            </div>

                            {/* Title */}
                            <h3 className={`text-[19px] font-extrabold mb-3 transition-colors duration-200 ${hovered === svc.id ? 'text-white' : 'text-[#1a1a2e]'}`}>
                                {svc.title}
                            </h3>

                            {/* Description */}
                            <p className={`text-[14px] leading-relaxed mb-5 flex-1 transition-colors duration-200 ${hovered === svc.id ? 'text-gray-300' : 'text-gray-500'}`}>
                                {svc.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {svc.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200
                                            ${hovered === svc.id
                                                ? 'bg-white/10 text-gray-200'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Arrow */}
                            <div className={`absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hovered === svc.id ? 'bg-primary opacity-100' : 'bg-gray-100 opacity-0 group-hover:opacity-100'}`}>
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <a
                        id="services-cta"
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Get a Free Strategy Session
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
