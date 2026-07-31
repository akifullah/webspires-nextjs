import Link from 'next/link'
import { getContentItems } from '@/lib/content'

export const revalidate = false

export const metadata = {
    title: { absolute: 'Industries We Work With | Digital Marketing by Sector | Webspires' },
    description: 'Webspires delivers digital marketing tailored to your industry ecommerce, local businesses, B2B, healthcare, real estate, and professional services.',
    alternates: { canonical: 'https://webspires.co.uk/industries/' },
    openGraph: {
        title: 'Industries We Work With | Webspires UK Digital Agency',
        description: 'Sector-specific digital marketing for UK businesses ecommerce, local, B2B, healthcare, real estate, and professional services.',
        url: 'https://webspires.co.uk/industries/',
    },
}

export default async function IndustriesHubPage() {
    const industriesData = await getContentItems('industries')
    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">Industries</li>
                        </ol>
                    </nav>
                    <div className="max-w-[720px]">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            Industries We Serve
                        </span>
                        <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.05] mb-5">
                            Digital Marketing Built Around{' '}
                            <span className="text-primary">Your Industry</span>
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[620px]">
                            Every sector has different buyers, search behaviour, and competition. We tailor
                            strategy, channels, and messaging to the industry you actually operate in.
                        </p>
                        <a href="https://call.webspires.co.uk?utm_source=industrieshub"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Request an Industry Growth Audit
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Industries grid */}
            <section aria-labelledby="industries-heading" className="bg-[#faf9f7] py-20 lg:py-28">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <h2 id="industries-heading" className="sr-only">All Industries</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industriesData.map((ind) => (
                            <Link
                                key={ind.slug}
                                href={`/industries/${ind.slug}`}
                                className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 no-underline"
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: `${ind.color}18` }}>
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke={ind.color}
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d={ind.iconPath} />
                                    </svg>
                                </div>
                                <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: ind.color }}>
                                    {ind.category}
                                </p>
                                <h3 className="text-[19px] font-extrabold text-[#1a1a2e] mb-3 group-hover:text-primary transition-colors duration-200">
                                    {ind.label}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                                    {ind.heroSub}
                                </p>
                                <div className="flex items-center gap-1.5 text-[13px] font-bold transition-colors duration-200"
                                    style={{ color: ind.color }}>
                                    Explore {ind.name}
                                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                        viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white mb-4">
                        Don&apos;t See Your Industry?
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[480px] mx-auto">
                        We work across many UK sectors. Book a free strategy call and we&apos;ll tell you
                        honestly whether we&apos;re the right fit for your market.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=industriesbottomcta"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Book a Free Call
                        </a>
                        <a href="tel:+441615241569"
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[15px] px-8 py-4 rounded-xl border border-white/20 transition-all duration-200">
                            +44 161 524 1569
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
