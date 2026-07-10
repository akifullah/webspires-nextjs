'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { DEFAULT_SETTINGS, telHref, headerLogoCss } from '@/lib/settingsSchema'

const navLinks = [
    {
        label: 'Our Services',
        href: '/services',
        hasDropdown: true,
        children: [
            { label: 'Web Design', href: '/services/web-design' },
            { label: 'CRM Development', href: '/services/crm-development' },
            { label: 'Social Media Services', href: '/services/social-media-management' },
            { label: 'Google Ads Services', href: '/services/google-ads-management' },
            { label: 'Meta Ads Services', href: '/services/meta-ads-management' },
            { label: 'SEO Services', href: '/services/seo' },
            { label: 'Local SEO', href: '/services/seo/local-seo' },
            { label: 'AI Search Optimisation (GEO)', href: '/services/generative-engine-optimisation' },
            { label: 'Shopify Development Services', href: '/services/shopify-development' },
            { label: 'Conversion Rate Optimisation', href: '/services/conversion-rate-optimisation' },
            { label: 'Google Guarantee Services', href: '/services/google-guarantee' },
        ],
    },
    {
        label: 'Industries',
        href: '/industries',
        hasDropdown: true,
        children: [
            { label: 'Ecommerce', href: '/industries/ecommerce' },
            { label: 'Local Businesses', href: '/industries/local-businesses' },
            { label: 'B2B', href: '/industries/b2b-companies' },
            { label: 'Healthcare', href: '/industries/healthcare-clinics' },
            { label: 'Real Estate', href: '/industries/real-estate' },
            { label: 'Professional Services', href: '/industries/professional-services' },
        ],
    },
    {
        label: 'Locations',
        href: '/locations',
        hasDropdown: true,
        children: [
            { label: 'London', href: '/locations/london' },
            { label: 'Manchester', href: '/locations/manchester' },
            { label: 'Birmingham', href: '/locations/birmingham' },
            { label: 'Leeds', href: '/locations/leeds' },
            { label: 'Glasgow', href: '/locations/glasgow' },
        ],
    },
    { label: 'Case Studies', href: '/case-studies', hasDropdown: false },
    { label: 'About Us', href: '/about-us', hasDropdown: false },
    { label: 'Projects', href: '/projects', hasDropdown: false },
    { label: 'Blog', href: '/blog', hasDropdown: false },
    { label: 'Contact', href: '/contact', hasDropdown: false },
]

const Header = ({ settings }) => {
    const s = settings || DEFAULT_SETTINGS
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const closeTimer = useRef(null)

    const openDropdown = (label) => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        setActiveDropdown(label)
    }

    const closeDropdown = () => {
        closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (closeTimer.current) clearTimeout(closeTimer.current)
        }
    }, [])

    return (
        <>
            {/* Admin-controlled responsive logo height (mobile/tablet/laptop/large). */}
            <style dangerouslySetInnerHTML={{ __html: headerLogoCss(s) }} />
            <header
                role="banner"
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled
                    ? 'shadow-[0_4px_24px_0_rgba(0,0,0,0.13)]'
                    : 'shadow-[0_2px_16px_0_rgba(0,0,0,0.09)]'
                    }`}
            >
                {/* Inner container */}
                <div className="max-w-[1320px] mx-auto h-[90px] flex items-center px-5 xl:px-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="Webspires – Home"
                        className="flex-shrink-0 flex items-center mr-4 xl:mr-6"
                    >
                        <Image
                            src={s.logoHeader || DEFAULT_SETTINGS.logoHeader}
                            alt={s.siteName || 'Webspires'}
                            width={160}
                            height={48}
                            priority
                            className="site-header-logo w-auto max-w-[260px] object-contain"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden xl:flex flex-1 items-center justify-center"
                        aria-label="Main navigation"
                    >
                        <ul className="flex items-center gap-0.5 list-none m-0 p-0" role="list">
                            {navLinks.map((link) => (
                                <li
                                    key={link.label}
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && openDropdown(link.label)}
                                    onMouseLeave={() => link.hasDropdown && closeDropdown()}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-1 px-2.5 py-2 text-[12.5px] font-semibold tracking-[0.02em] text-[#3a3a3a] no-underline rounded-md transition-colors duration-200 whitespace-nowrap hover:text-primary hover:bg-primary/[0.06]"
                                        aria-haspopup={link.hasDropdown ? 'true' : undefined}
                                        aria-expanded={activeDropdown === link.label ? 'true' : undefined}
                                    >
                                        {link.label.toUpperCase()}
                                        {link.hasDropdown && (
                                            <svg
                                                className={`transition-transform duration-250 ${activeDropdown === link.label
                                                    ? 'rotate-180 opacity-100'
                                                    : 'opacity-60'
                                                    }`}
                                                width="10"
                                                height="6"
                                                viewBox="0 0 10 6"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M1 1L5 5L9 1"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    {link.hasDropdown && link.children && (
                                        <div
                                            className={`absolute top-full left-0 pt-2 min-w-[200px] transition-all duration-200 ${activeDropdown === link.label
                                                ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                                                : 'opacity-0 invisible -translate-y-1.5 pointer-events-none'
                                                }`}
                                        >
                                            <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-black/[0.06] py-2">
                                                <ul className="list-none m-0 p-0" role="list">
                                                    {link.children.map((child) => (
                                                        <li key={child.label}>
                                                            <Link
                                                                href={child.href}
                                                                className="block px-5 py-2.5 text-sm font-medium text-[#3a3a3a] no-underline transition-colors duration-150 border-l-[3px] border-transparent hover:text-primary hover:bg-primary/[0.05] hover:border-l-primary"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Actions desktop */}
                    <div className="hidden xl:flex items-center gap-2.5 ml-3 flex-shrink-0">
                        {/* Phone only on very wide screens to keep the bar uncluttered */}
                        <a
                            href={telHref(s.phone) || 'tel:+441615241569'}
                            aria-label="Call Webspires"
                            className="hidden 2xl:flex items-center gap-2 text-[13.5px] font-bold text-primary no-underline tracking-wide whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
                        >
                            <svg
                                className="w-[18px] h-[18px] flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z"
                                    fill="currentColor"
                                />
                            </svg>
                            <span>{s.phone || DEFAULT_SETTINGS.phone}</span>
                        </a>

                        {/* Book a Call CTA */}
                        <a
                            id="header-book-call-btn"
                            href={s.bookCallUrl || DEFAULT_SETTINGS.bookCallUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[12.5px] tracking-wide px-4 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            Book a Call
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="xl:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-0 cursor-pointer ml-auto flex-shrink-0"
                    >
                        <span
                            className={`block w-6 h-0.5 bg-[#3a3a3a] rounded-sm transition-transform duration-300 origin-center ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-[#3a3a3a] rounded-sm transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''
                                }`}
                        />
                        <span
                            className={`block w-6 h-0.5 bg-[#3a3a3a] rounded-sm transition-transform duration-300 origin-center ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
                                }`}
                        />
                    </button>
                </div>

                {/* Mobile Nav */}
                <nav
                    id="mobile-nav"
                    aria-label="Mobile navigation"
                    aria-hidden={!mobileOpen}
                    className={`xl:hidden border-t border-black/[0.07] bg-white transition-all duration-300 ${mobileOpen ? 'max-h-[calc(100vh-90px)] overflow-y-auto opacity-100' : 'max-h-0 overflow-hidden opacity-0'
                        }`}
                >
                    <ul className="list-none m-0 px-6 pt-2 pb-4" role="list">
                        {/* Top-level links */}
                        <li>
                            <Link href="/services" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Our Services
                            </Link>
                            {/* Service sub-links */}
                            <ul className="list-none m-0 pl-3 pb-1" role="list">
                                {navLinks[0].children.map((child) => (
                                    <li key={child.label}>
                                        <Link href={child.href} onClick={() => setMobileOpen(false)}
                                            className="block py-2 px-2 text-[13px] font-medium text-gray-500 no-underline border-l-2 border-gray-100 hover:text-primary hover:border-primary transition-colors duration-150">
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link href="/industries" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Industries
                            </Link>
                            <ul className="list-none m-0 pl-3 pb-1" role="list">
                                {navLinks[1].children.map((child) => (
                                    <li key={child.label}>
                                        <Link href={child.href} onClick={() => setMobileOpen(false)}
                                            className="block py-2 px-2 text-[13px] font-medium text-gray-500 no-underline border-l-2 border-gray-100 hover:text-primary hover:border-primary transition-colors duration-150">
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link href="/locations" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Locations
                            </Link>
                            <ul className="list-none m-0 pl-3 pb-1" role="list">
                                {navLinks[2].children.map((child) => (
                                    <li key={child.label}>
                                        <Link href={child.href} onClick={() => setMobileOpen(false)}
                                            className="block py-2 px-2 text-[13px] font-medium text-gray-500 no-underline border-l-2 border-gray-100 hover:text-primary hover:border-primary transition-colors duration-150">
                                            {child.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            <Link href="/case-studies" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Case Studies
                            </Link>
                        </li>
                        <li>
                            <Link href="/about-us" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" onClick={() => setMobileOpen(false)}
                                className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/free-digital-marketing-audit" onClick={() => setMobileOpen(false)}
                                className="block text-center py-3 px-1 text-[14px] font-bold text-white bg-primary rounded-lg no-underline mt-3 transition-opacity duration-200 hover:opacity-90">
                                Get a Free Audit
                            </Link>
                        </li>
                        <li>
                            <a href={telHref(s.phone) || 'tel:+441615241569'}
                                className="flex items-center gap-2 py-3 px-1 text-[15px] font-semibold text-primary no-underline mt-2 transition-opacity duration-200 hover:opacity-80">
                                <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01L6.62 10.79z" />
                                </svg>
                                {s.phone || DEFAULT_SETTINGS.phone}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Spacer to offset fixed header */}
            <div className="h-[90px]" aria-hidden="true" />
        </>
    )
}

export default Header