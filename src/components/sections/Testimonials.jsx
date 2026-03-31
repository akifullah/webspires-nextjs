'use client'

import { useState } from 'react'

const testimonials = [
    {
        id: 1,
        name: 'Bilal Hussain',
        role: 'CEO, TechVista Solutions',
        location: 'Karachi, Pakistan',
        avatar: 'BH',
        avatarBg: '#EE314F',
        stars: 5,
        platform: 'Google',
        text: 'Webspires transformed our online presence completely. Our website traffic tripled within 3 months of launching our new site with their SEO strategy. The team is professional, responsive, and truly cares about results.',
        tags: ['Web Development', 'SEO'],
        metric: '3× Traffic',
    },
    {
        id: 2,
        name: 'Sana Malik',
        role: 'Founder, Bloom Skincare',
        location: 'Lahore, Pakistan',
        avatar: 'SM',
        avatarBg: '#f97316',
        stars: 5,
        platform: 'Clutch',
        text: 'Our eCommerce store went from making PKR 50k/month to over PKR 400k after Webspires rebuilt it and ran our Google Ads. I genuinely couldn\'t be happier — they are worth every rupee!',
        tags: ['eCommerce', 'Google Ads'],
        metric: '8× Revenue',
    },
    {
        id: 3,
        name: 'Ahmed Al-Rashid',
        role: 'Director, Gulf Property Hub',
        location: 'Dubai, UAE',
        avatar: 'AR',
        avatarBg: '#3b82f6',
        stars: 5,
        platform: 'Upwork',
        text: 'Worked with Webspires remotely from Dubai. Excellent communication, delivered ahead of schedule, and the website they built for us has been generating quality leads since day one. Highly recommend!',
        tags: ['Web Development', 'Lead Gen'],
        metric: '200% More Leads',
    },
    {
        id: 4,
        name: 'Fatima Khan',
        role: 'Marketing Manager, MediCare Plus',
        location: 'Islamabad, Pakistan',
        avatar: 'FK',
        avatarBg: '#8b5cf6',
        stars: 5,
        platform: 'Google',
        text: 'The entire team at Webspires is phenomenal. From UI/UX design to SEO, they\'ve helped us rank on page 1 for all our key medical services. Patient inquiries are up 180% year-over-year.',
        tags: ['SEO', 'UI/UX Design'],
        metric: '180% More Inquiries',
    },
    {
        id: 5,
        name: 'Omar Sheikh',
        role: 'Owner, Sheikh Auto Parts',
        location: 'Rawalpindi, Pakistan',
        avatar: 'OS',
        avatarBg: '#10b981',
        stars: 5,
        platform: 'Google',
        text: 'I was skeptical about digital marketing but Webspires showed me the power of targeted Facebook and Google ads. We now get 30-40 qualified leads per week. Best investment for my business!',
        tags: ['Meta Ads', 'Google Ads'],
        metric: '40 Leads/Week',
    },
    {
        id: 6,
        name: 'Ayesha Tariq',
        role: 'Founder, The Learning Nest',
        location: 'Lahore, Pakistan',
        avatar: 'AT',
        avatarBg: '#ec4899',
        stars: 5,
        platform: 'Clutch',
        text: 'Webspires built our e-learning platform from scratch with a gorgeous UI and blazing fast performance. Student enrollment went up 250% after launch. They are truly a world-class team.',
        tags: ['Web Development', 'UI/UX'],
        metric: '250% Enrollment',
    },
]

const platformColors = {
    Google: '#4285F4',
    Clutch: '#EF4135',
    Upwork: '#14A800',
}

export default function Testimonials() {
    const [active, setActive] = useState(0)

    return (
        <section id="testimonials" aria-labelledby="testimonials-heading" className="bg-white py-14 sm:py-20 lg:py-28">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
                    <div>
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                            Client Results
                        </span>
                        <h2 id="testimonials-heading" className="text-[28px] sm:text-[32px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight">
                            Relationships &amp;<br />
                            <span className="text-primary">Real Results</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-1.5">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="font-bold text-[#1a1a2e]">5.0</span> across all platforms
                        </div>
                        <div className="h-4 w-px bg-gray-200" />
                        <span><strong className="text-[#1a1a2e]">180+</strong> verified reviews</span>
                    </div>
                </div>

                {/* Testimonial cards — 3-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            id={`testimonial-${t.id}`}
                            onClick={() => setActive(i)}
                            className={`group relative flex flex-col p-7 rounded-2xl border cursor-pointer transition-all duration-300
                                ${active === i
                                    ? 'bg-[#1a1a2e] border-[#1a1a2e] shadow-[0_20px_60px_rgba(0,0,0,0.2)] -translate-y-1'
                                    : 'bg-[#faf9f7] border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)]'
                                }`}
                        >
                            {/* Platform badge */}
                            <div className="flex items-center justify-between mb-5">
                                <span
                                    className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                                    style={{
                                        background: active === i ? 'rgba(255,255,255,0.1)' : `${platformColors[t.platform]}18`,
                                        color: active === i ? '#ccc' : platformColors[t.platform],
                                    }}
                                >
                                    {t.platform}
                                </span>
                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {[...Array(t.stars)].map((_, s) => (
                                        <svg key={s} className="w-3.5 h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Quote mark */}
                            <div className={`text-5xl font-black leading-none mb-1 transition-colors duration-200 ${active === i ? 'text-primary/60' : 'text-gray-200'}`}>"</div>

                            {/* Review text */}
                            <p className={`text-[14px] leading-relaxed mb-5 flex-1 transition-colors duration-200 ${active === i ? 'text-gray-300' : 'text-gray-600'}`}>
                                {t.text}
                            </p>

                            {/* Metric tag */}
                            <div className="mb-5">
                                <span className={`text-[12px] font-extrabold px-3 py-1.5 rounded-full ${active === i ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
                                    ↑ {t.metric}
                                </span>
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0"
                                    style={{ background: t.avatarBg }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className={`text-[14px] font-bold leading-tight transition-colors ${active === i ? 'text-white' : 'text-[#1a1a2e]'}`}>
                                        {t.name}
                                    </p>
                                    <p className={`text-[12px] transition-colors ${active === i ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {t.role} · {t.location}
                                    </p>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {t.tags.map((tag) => (
                                    <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${active === i ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
