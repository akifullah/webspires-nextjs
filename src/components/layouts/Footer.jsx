'use client'

import Image from 'next/image'
import Link from 'next/link'

const services = [
    { label: 'SEO Services', href: '#seo' },
    { label: 'CRM Services', href: '#crm' },
    { label: 'Meta Ads Services', href: '#meta-ads' },
    { label: 'Google Ads Services', href: '#google-ads' },
    { label: 'Social Media Services', href: '#social-media' },
    { label: 'Google Guarantee Services', href: '#google-guarantee' },
    { label: 'Shopify Development Services', href: '#shopify' },
]

const company = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Projects', href: '#portfolio' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
]

const socialLinks = [
    {
        label: 'Facebook',
        href: 'https://facebook.com/webspires',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/webspires',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/company/webspires',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        ),
    },
    {
        label: 'Twitter / X',
        href: 'https://twitter.com/webspires',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'YouTube',
        href: 'https://youtube.com/@webspires',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/923000000000',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
]

const certifications = [
    { label: 'Google Partner', color: '#4285F4' },
    { label: 'Meta Partner', color: '#0082FB' },
    { label: 'Shopify Partner', color: '#96BF48' },
    { label: 'SEMrush Certified', color: '#FF642D' },
]

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer role="contentinfo" className="bg-[#0d0d1a] text-gray-300">

            {/* ── Top CTA Banner ─────────────────────────────────── */}
            <div className="bg-gradient-to-r from-primary to-[#c0223c]">
                <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div>
                        <p className="text-white font-extrabold text-[20px] lg:text-[24px] leading-tight">
                            Ready to Grow Your Business?
                        </p>
                        <p className="text-white/80 text-[14px] mt-1">
                            Get a free strategy session — no obligation, no fluff.
                        </p>
                    </div>
                    <a
                        id="footer-top-cta"
                        href="#contact"
                        className="flex-shrink-0 inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-extrabold text-[14px] tracking-wide px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                    >
                        Get Free Proposal
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ── Main Footer Body ────────────────────────────────── */}
            <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-16 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Col 1 — Brand */}
                    <div className="lg:col-span-4">
                        <Link href="/" aria-label="Webspires Home" className="inline-block mb-5">
                            <Image
                                src="/images/webspires-logo-light.png"
                                alt="Webspires"
                                width={160}
                                height={48}
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                        </Link>

                        <p className="text-[14px] text-gray-400 leading-relaxed mb-6 max-w-[300px]">
                            UK&apos;s results-driven digital agency. We build high-performance websites, run ROI-focused marketing campaigns, and help businesses grow online. Best Web Design Agency UK since 2023.
                        </p>

                        {/* Social Icons */}
                        <div className="flex flex-wrap gap-2.5 mb-7">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Certification badges */}
                        <div className="flex flex-wrap gap-2">
                            {certifications.map((c) => (
                                <span
                                    key={c.label}
                                    className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                                    style={{ color: c.color, borderColor: `${c.color}40`, background: `${c.color}10` }}
                                >
                                    {c.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Services */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-extrabold text-[14px] uppercase tracking-widest mb-5">
                            Our Services
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {services.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        className="flex items-center gap-2 text-[13.5px] text-gray-400 no-underline hover:text-primary transition-colors duration-200 group"
                                    >
                                        <svg
                                            className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors duration-200 flex-shrink-0"
                                            viewBox="0 0 24 24" fill="none" aria-hidden="true"
                                        >
                                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Company */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-extrabold text-[14px] uppercase tracking-widest mb-5">
                            Company
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                            {company.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href={s.href}
                                        className="flex items-center gap-2 text-[13.5px] text-gray-400 no-underline hover:text-primary transition-colors duration-200 group"
                                    >
                                        <svg
                                            className="w-3 h-3 text-primary/50 group-hover:text-primary transition-colors duration-200 flex-shrink-0"
                                            viewBox="0 0 24 24" fill="none" aria-hidden="true"
                                        >
                                            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 — Contact + Newsletter */}
                    <div className="lg:col-span-3">
                        <h3 className="text-white font-extrabold text-[14px] uppercase tracking-widest mb-5">
                            Get In Touch
                        </h3>

                        {/* Contact details */}
                        <div className="space-y-3.5 mb-7">
                            {[
                                {
                                    href: 'tel:+441615241569',
                                    label: '+44 161 524 1569',
                                    icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: 'mailto:info@webspires.co.uk',
                                    label: 'info@webspires.co.uk',
                                    icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: 'https://maps.google.com/?q=39A+Manchester+Rd+Bolton+BL3+2NZ',
                                    label: '39A Manchester Rd, Bolton BL3 2NZ, UK',
                                    icon: (
                                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                            <circle cx="12" cy="9" r="2.5" />
                                        </svg>
                                    ),
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="flex items-center gap-3 text-[13px] text-gray-400 no-underline hover:text-primary transition-colors duration-200"
                                >
                                    <span className="text-primary flex-shrink-0">{item.icon}</span>
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Newsletter */}
                        <div>
                            <p className="text-white font-bold text-[13px] mb-3">
                                📬 Get Free Digital Marketing Tips
                            </p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex gap-2"
                            >
                                <input
                                    id="footer-newsletter-email"
                                    type="email"
                                    placeholder="Your email address"
                                    aria-label="Email for newsletter"
                                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-200"
                                />
                                <button
                                    id="footer-newsletter-submit"
                                    type="submit"
                                    aria-label="Subscribe to newsletter"
                                    className="flex-shrink-0 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-[12px] font-bold rounded-lg transition-all duration-200 whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="text-[11px] text-gray-600 mt-2">
                                No spam. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Divider ─────────────────────────────────────────── */}
                <div className="h-px bg-white/10 my-10" />

                {/* ── Bottom Bar ──────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
                    <p>
                        Copyright &copy; {currentYear} <span className="text-white font-semibold">Webspires Ltd</span>. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center">
                        {[
                            { label: 'Privacy Policy', href: '/privacy-policy' },
                            { label: 'Terms of Service', href: '/terms' },
                            { label: 'Sitemap', href: '/sitemap.xml' },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-gray-500 no-underline hover:text-primary transition-colors duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>

                    {/* Review ratings row */}
                    <div className="flex items-center gap-3">
                        {[
                            { platform: 'Google', score: '5.0' },
                            { platform: 'Clutch', score: '5.0' },
                        ].map((r) => (
                            <div key={r.platform} className="flex items-center gap-1">
                                <span className="text-gray-400 font-semibold">{r.platform}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-white font-bold">{r.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
