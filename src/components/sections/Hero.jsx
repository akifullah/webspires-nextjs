import Image from 'next/image'

/* ── Partner / Badge logos ────────────────────────────────── */
const badges = [
    {
        label: 'Google Partner',
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="none" aria-hidden="true" focusable="false">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
    },
    {
        label: 'Meta Partner',
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="#0082FB" aria-hidden="true" focusable="false">
                <path d="M12 2.04C6.48 2.04 2 6.52 2 12.04c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-1 14.5v-4.5H9l3-6 3 6h-2v4.5h-2z" />
            </svg>
        ),
    },
    {
        label: 'Shopify Partner',
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="#96BF48" aria-hidden="true" focusable="false">
                <path d="M15.34 2.42a.42.42 0 00-.38-.35c-.16-.01-3.47-.07-3.47-.07s-2.3-2.23-2.54-2.47c-.23-.23-.7-.16-.88-.1L7.1 0C6.83.27 6 2.57 6 2.57S3.76 3.2 3.6 3.25c-.16.06-.16.22-.1.33l1.5 4.6c.18.55.7.9 1.26.9h11.38c.64 0 1.17-.47 1.26-1.1l1.1-7.75a.43.43 0 00-.37-.48l-4.29-.33z" />
            </svg>
        ),
    },
    {
        label: 'WordPress Expert',
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="#21759B" aria-hidden="true" focusable="false">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.918 12c0-1.22.263-2.379.729-3.425L8.26 19.39A8.087 8.087 0 013.918 12zm8.082 8.082a8.09 8.09 0 01-2.306-.336l2.449-7.116 2.51 6.878.06.125a8.073 8.073 0 01-2.713.449zm1.128-11.988c.494-.026.939-.078.939-.078.441-.052.39-.702-.052-.676 0 0-1.327.104-2.184.104-.806 0-2.158-.104-2.158-.104-.442-.026-.494.65-.052.676 0 0 .417.052.858.078l1.274 3.491-1.79 5.368-2.975-8.859c.494-.026.94-.078.94-.078.441-.052.39-.702-.052-.676 0 0-1.327.104-2.184.104-.154 0-.334-.004-.524-.009A8.086 8.086 0 0112 3.918c2.15 0 4.11.791 5.587 2.087a.56.56 0 01-.089-.004c-.806 0-1.378.702-1.378 1.456 0 .676.39 1.248.806 1.924.312.546.676 1.248.676 2.262 0 .702-.27 1.516-.624 2.652l-.819 2.734-2.032-6.041zm4.14 10.513l2.491-7.198c.468-1.17.624-2.106.624-2.938 0-.302-.02-.583-.056-.845A8.073 8.073 0 0120.082 12a8.086 8.086 0 01-2.814 6.107z" />
            </svg>
        ),
    },
    {
        label: 'SEMrush Certified',
        icon: (
            <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="#FF642D" aria-hidden="true" focusable="false">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
]

const socialProof = [
    { platform: 'Google', reviews: '50+', stars: 5 },
    { platform: 'Clutch', reviews: '30+', stars: 5 },
    { platform: 'Upwork', reviews: '100%', stars: 5, label: 'Job Success' },
]

export default function Hero() {
    return (
        <section aria-label="Hero — Web Development & Digital Marketing Agency Pakistan" className="bg-[#faf9f7] overflow-hidden">

            {/* ── Main hero ──────────────────────────────────────── */}
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-0 lg:pt-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

                {/* LEFT ── Content */}
                <div className="flex-1 max-w-[600px] lg:pr-10 z-10 w-full">

                    {/* Eyebrow */}
                    <p className="text-[#3a3a3a] font-semibold uppercase text-xs sm:text-sm mb-3 leading-relaxed">
                        Web Development &amp; Digital Marketing Agency In Pakistan
                    </p>

                    {/* Giant headline — single h1 per page */}
                    <h1 className="font-extrabold uppercase leading-[1.05] mb-6">
                        <span className="block text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[60px] text-primary">RESULTS</span>
                        <span className="block text-[36px] sm:text-[46px] lg:text-[52px] xl:text-[60px] text-[#f97316]">&amp; GROWTH</span>
                        <span className="block text-[18px] sm:text-[22px] lg:text-[26px] text-[#3a3a3a] font-bold normal-case leading-snug mt-2">
                            Powered By Strategy
                        </span>
                    </h1>

                    {/* CTA Buttons */}
                    <div className="flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center gap-3 sm:gap-4 mb-8">
                        <a
                            href="#contact"
                            id="hero-cta-primary"
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-lg transition-colors duration-200 hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Get Free Proposal
                        </a>
                        <a
                            href="#portfolio"
                            id="hero-cta-secondary"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#3a3a3a] font-bold text-sm tracking-wide px-7 py-3.5 rounded-lg border-2 border-gray-200 hover:border-primary hover:text-primary transition-colors duration-200 whitespace-nowrap"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            View Our Work
                        </a>
                    </div>

                    {/* Partner badge strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3" role="list" aria-label="Technology partners">
                        {badges.map((b) => (
                            <div
                                key={b.label}
                                role="listitem"
                                title={b.label}
                                className="flex items-center gap-1.5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                            >
                                {b.icon}
                                <span className="text-[11px] font-semibold text-gray-500 leading-tight hidden sm:block">{b.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT ── Person + Testimonial */}
                <div className="flex-1 relative flex justify-center lg:justify-end items-end self-end max-w-[540px] w-full min-h-[300px] sm:min-h-[400px] lg:min-h-0">

                    {/* Floating testimonial card — hidden on very small screens to avoid overflow */}
                    <div
                        className="hidden sm:block absolute top-8 left-0 lg:-left-8 z-20 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-4 sm:p-5 max-w-[220px] sm:max-w-[240px]"
                        aria-hidden="true"
                    >
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xl font-black mb-3 leading-none select-none">
                            "
                        </div>
                        <p className="text-[13px] text-gray-700 leading-relaxed font-medium">
                            We built their website from scratch — traffic grew <strong className="text-primary">3× in 4 months.</strong>
                        </p>
                        <p className="text-[12px] text-gray-400 mt-2 font-semibold">— Akif, Founder</p>
                    </div>

                    {/* Stats badge */}
                    <div
                        className="hidden sm:block absolute bottom-24 left-0 lg:-left-4 z-20 bg-primary text-white rounded-2xl shadow-lg px-4 py-3"
                        aria-hidden="true"
                    >
                        <p className="text-2xl font-extrabold leading-none">200+</p>
                        <p className="text-[11px] font-semibold opacity-90 mt-0.5">Successful Projects</p>
                    </div>

                    {/* Person image — lazy loaded below fold on mobile */}
                    <Image
                        src="/images/hero-person.png"
                        alt="Akif — Founder of Webspires digital marketing agency Pakistan"
                        width={500}
                        height={580}
                        priority
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 480px"
                        className="relative z-10 object-contain max-h-[420px] sm:max-h-[520px] w-auto"
                    />
                </div>
            </div>

            {/* ── Social proof bar ──────────────────────────────── */}
            <div className="bg-[#f0ede7] border-t border-gray-200 mt-6">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-wrap items-center justify-around gap-5 sm:gap-4">
                    {socialProof.map((item) => (
                        <div key={item.platform} className="flex items-center gap-3 sm:gap-4">
                            <div>
                                <p className="text-lg sm:text-xl font-extrabold text-gray-800">{item.platform}</p>
                                <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium">{item.label || 'Reviews'}</p>
                            </div>
                            <div>
                                <p className="text-xl sm:text-2xl font-extrabold text-primary">{item.reviews}</p>
                                <div className="flex gap-0.5 mt-0.5" aria-label={`${item.stars} stars`}>
                                    {Array.from({ length: item.stars }).map((_, i) => (
                                        <svg key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Client avatars */}
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2" aria-hidden="true">
                            {['bg-primary/30', 'bg-orange-300', 'bg-blue-300', 'bg-green-300', 'bg-purple-300'].map((c, i) => (
                                <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-600`}>
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-800">100+ Clients</p>
                            <p className="text-[11px] sm:text-[12px] text-gray-500">Across Pakistan &amp; UAE</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
