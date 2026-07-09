import Link from 'next/link'
import { getContentItems } from '@/lib/content'

export const revalidate = 3600

export const metadata = {
    title: { absolute: 'Case Studies | Digital Marketing Results | Webspires' },
    description: 'How Webspires drives real results for UK businesses across Google Ads, ecommerce, SEO, and local growth the method and the metrics that matter.',
    alternates: { canonical: 'https://webspires.co.uk/case-studies/' },
    openGraph: {
        title: 'Case Studies | Webspires UK Digital Agency',
        description: 'Our approach to measurable results across Google Ads, ecommerce, SEO, and local business growth.',
        url: 'https://webspires.co.uk/case-studies/',
    },
}

export default async function CaseStudiesHubPage() {
    const caseStudyCategories = await getContentItems('caseStudyCategories')
    return (
        <main>
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #EE314F 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">Case Studies</li>
                        </ol>
                    </nav>
                    <div className="max-w-[720px]">
                        <span className="inline-block bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                            Real Results
                        </span>
                        <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.05] mb-5">
                            Digital Marketing{' '}
                            <span className="text-primary">Results & Method</span>
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[620px]">
                            We publish results we can verify and that clients approve. Explore how we
                            approach each area and the metrics we hold ourselves to.
                        </p>
                        <a href="https://call.webspires.co.uk?utm_source=casestudieshub"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                            Want Results Like These? Get an Audit
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <section aria-labelledby="case-studies-heading" className="bg-[#faf9f7] py-20 lg:py-28">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <h2 id="case-studies-heading" className="sr-only">Case Study Categories</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {caseStudyCategories.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/case-studies/${c.slug}`}
                                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-transparent hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 no-underline"
                            >
                                <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5 text-primary">
                                    {c.category}
                                </p>
                                <h3 className="text-[21px] font-extrabold text-[#1a1a2e] mb-3 group-hover:text-primary transition-colors duration-200">
                                    {c.name}
                                </h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed mb-5">
                                    {c.heroSub}
                                </p>
                                <div className="flex items-center gap-1.5 text-[13px] font-bold text-primary transition-colors duration-200">
                                    View {c.name} Approach
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

            <section className="bg-[#1a1a2e] py-16 lg:py-20">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white mb-4">
                        Want Results Like These?
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[480px] mx-auto">
                        Start with a free digital marketing audit. We&apos;ll show you the fastest,
                        highest-impact opportunities for your business.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/free-digital-marketing-audit"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline">
                            Get a Free Audit
                        </Link>
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
