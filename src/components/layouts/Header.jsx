'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const navLinks = [
    {
        label: 'Our Services',
        href: '#services',
        hasDropdown: true,
        children: [
            { label: 'CRM Services', href: '#crm' },
            { label: 'Social Media Services', href: '#social-media' },
            { label: 'Google Ads Services', href: '#google-ads' },
            { label: 'Meta Ads Services', href: '#meta-ads' },
            { label: 'SEO Services', href: '#seo' },
            { label: 'Shopify Development', href: '#shopify' },
            { label: 'Google Guarantee', href: '#google-guarantee' },
        ],
    },
    { label: 'About Us', href: '#about', hasDropdown: false },
    { label: 'Projects', href: '#portfolio', hasDropdown: false },
    { label: 'Our Blog', href: '#blog', hasDropdown: false },
    { label: 'Contact', href: '#contact', hasDropdown: false },
]

const Header = () => {
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
            <header
                role="banner"
                className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled
                    ? 'shadow-[0_4px_24px_0_rgba(0,0,0,0.13)]'
                    : 'shadow-[0_2px_16px_0_rgba(0,0,0,0.09)]'
                    }`}
            >
                {/* Inner container */}
                <div className="max-w-[1320px] mx-auto h-[90px] flex items-center px-8">

                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="Webspires – Home"
                        className="flex-shrink-0 flex items-center mr-8"
                    >
                        <Image
                            src="/images/webspires.png"
                            alt="Webspires"
                            width={160}
                            height={48}
                            priority
                            className="h-11 w-auto max-w-[180px] object-contain"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav
                        className="hidden lg:flex flex-1 items-center"
                        aria-label="Main navigation"
                    >
                        <ul className="flex items-center gap-1 list-none m-0 p-0" role="list">
                            {navLinks.map((link) => (
                                <li
                                    key={link.label}
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && openDropdown(link.label)}
                                    onMouseLeave={() => link.hasDropdown && closeDropdown()}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-1.5 px-3.5 py-2 text-[13.5px] font-semibold tracking-[0.07em] text-[#3a3a3a] no-underline rounded-md transition-colors duration-200 whitespace-nowrap hover:text-primary hover:bg-primary/[0.06]"
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

                    {/* Right Actions — desktop */}
                    <div className="hidden lg:flex items-center gap-3 ml-5 flex-shrink-0">
                        {/* Phone */}
                        <a
                            href="tel:+441615241569"
                            aria-label="Call Webspires"
                            className="flex items-center gap-2 text-[15px] font-bold text-primary no-underline tracking-wide whitespace-nowrap transition-opacity duration-200 hover:opacity-80"
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
                            <span>+44 161 524 1569</span>
                        </a>

                        {/* Book a Call CTA */}
                        <a
                            id="header-book-call-btn"
                            href="https://call.webspires.co.uk?utm_source=websiteheader"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[13px] tracking-wide px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
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
                        className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-0 cursor-pointer ml-auto flex-shrink-0"
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
                    className={`lg:hidden border-t border-black/[0.07] bg-white overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className="list-none m-0 px-6 pt-2 pb-4" role="list">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-3 px-1 text-[15px] font-semibold text-[#3a3a3a] no-underline border-b border-black/[0.06] transition-colors duration-200 hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a
                                href="tel:+441615241569"
                                className="block py-3 px-1 text-[15px] font-semibold text-primary no-underline mt-2 transition-opacity duration-200 hover:opacity-80"
                            >
                                📞 +44 161 524 1569
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