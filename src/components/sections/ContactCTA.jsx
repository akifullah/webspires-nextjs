'use client'

import { useState } from 'react'

export default function ContactCTA() {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

    const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        // Placeholder — wire to your backend/Formspree/etc.
        setSubmitted(true)
    }

    return (
        <section id="contact" aria-labelledby="contact-heading" className="bg-[#faf9f7] py-14 sm:py-20 lg:py-28">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Get In Touch
                    </span>
                    <h2 id="contact-heading" className="text-[28px] sm:text-[32px] lg:text-[44px] font-extrabold text-[#1a1a2e] leading-tight mb-4">
                        Let's Grow Your Business<br />
                        <span className="text-primary">Together</span>
                    </h2>
                    <p className="text-gray-500 text-[17px] max-w-[540px] mx-auto leading-relaxed">
                        Get your free strategy consultation today. We'll analyze your digital presence and show you exactly how to outrank competitors and generate more revenue.
                    </p>
                </div>

                {/* Two-col layout: form + info */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                    {/* Contact info — left */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Info cards */}
                        {[
                            {
                                icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" fill="currentColor" />
                                    </svg>
                                ),
                                label: 'Call Us',
                                value: '+44 161 524 1569',
                                href: 'tel:+441615241569',
                                color: '#10b981',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ),
                                label: 'Email Us',
                                value: 'info@webspires.co.uk',
                                href: 'mailto:info@webspires.co.uk',
                                color: '#3b82f6',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                ),
                                label: 'Office',
                                value: '39A Manchester Rd, Bolton BL3 2NZ, UK',
                                color: '#EE314F',
                            },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, color: item.color }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</p>
                                    {item.href
                                        ? <a href={item.href} className="text-[15px] font-bold text-[#1a1a2e] no-underline hover:text-primary transition-colors">{item.value}</a>
                                        : <p className="text-[15px] font-bold text-[#1a1a2e]">{item.value}</p>
                                    }
                                </div>
                            </div>
                        ))}

                        {/* Trust signals */}
                        <div className="p-6 bg-[#1a1a2e] rounded-2xl">
                            <p className="text-white font-extrabold text-[15px] mb-4">Why businesses trust us:</p>
                            {[
                                'Free strategy session — no obligation',
                                'Response within 24 hours',
                                'Custom proposals, not templates',
                                'No hidden fees, ever',
                            ].map((pt) => (
                                <div key={pt} className="flex items-center gap-2.5 mb-2.5">
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="text-[13px] text-gray-300">{pt}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form — right */}
                    <div className="lg:col-span-3">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.08)] text-center px-8">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="text-[22px] font-extrabold text-[#1a1a2e] mb-2">Message Sent!</h3>
                                <p className="text-gray-500 text-[15px]">Thanks! We'll get back to you within 24 hours with a custom strategy for your business.</p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-8 lg:p-10"
                                noValidate
                            >
                                <h3 className="text-[20px] font-extrabold text-[#1a1a2e] mb-6">Get Your Free Proposal</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label htmlFor="contact-name" className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                                            Full Name *
                                        </label>
                                        <input
                                            id="contact-name"
                                            name="name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="John Smith"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#faf9f7] text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                                            Email Address *
                                        </label>
                                        <input
                                            id="contact-email"
                                            name="email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#faf9f7] text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-phone" className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                                            Phone / WhatsApp
                                        </label>
                                        <input
                                            id="contact-phone"
                                            name="phone"
                                            type="tel"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+92 300 0000000"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#faf9f7] text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-service" className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                                            Service Needed
                                        </label>
                                        <select
                                            id="contact-service"
                                            name="service"
                                            value={form.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#faf9f7] text-[14px] text-gray-800 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                                        >
                                            <option value="">Select a service…</option>
                                            <option value="web-dev">Web Development</option>
                                            <option value="seo">SEO Services</option>
                                            <option value="digital-marketing">Digital Marketing</option>
                                            <option value="ui-ux">UI/UX Design</option>
                                            <option value="ecommerce">eCommerce Solutions</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="contact-message" className="block text-[12px] font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                                        Tell Us About Your Project *
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Describe your business, goals, and what you'd like to achieve…"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#faf9f7] text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 resize-none"
                                    />
                                </div>

                                <button
                                    id="contact-submit"
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-[15px] tracking-wide py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    Get My Free Proposal →
                                </button>

                                <p className="text-[12px] text-gray-400 text-center mt-4">
                                    🔒 Your information is 100% confidential. No spam, ever.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
