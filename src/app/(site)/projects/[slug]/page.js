import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getContentItems } from '@/lib/content'
import BlogContent from '@/components/blog/BlogContent'

export const revalidate = false
export const dynamicParams = true

const ACCENT_FALLBACK = '#EE314F'

export async function generateStaticParams() {
    const items = await getContentItems('projects')
    return items.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const items = await getContentItems('projects')
    const p = items.find((i) => i.slug === slug)
    if (!p) return {}
    const title = p.metaTitle || `${p.title} ${p.category || 'Project'} | Webspires`
    const description =
        p.metaDescription ||
        p.description ||
        `See how Webspires built ${p.title}.`
    const ogImage = p.ogImage || p.image
    const keywords = Array.isArray(p.keywords) ? p.keywords : []
    return {
        title,
        description,
        keywords: keywords.length ? keywords : undefined,
        alternates: {
            canonical:
                p.canonicalUrl ||
                `https://webspires.co.uk/projects/${p.slug}/`,
        },
        robots: p.noIndex ? { index: false, follow: false } : undefined,
        openGraph: {
            title,
            description,
            url: `https://webspires.co.uk/projects/${p.slug}/`,
            images: ogImage ? [{ url: ogImage }] : undefined,
        },
    }
}

export default async function ProjectDetailPage({ params }) {
    const { slug } = await params
    const items = await getContentItems('projects')
    const p = items.find((i) => i.slug === slug)
    if (!p) notFound()

    const accent = p.resultColor || ACCENT_FALLBACK
    const tags = p.tags || []
    const services = p.services || []
    const approach = p.approach || []
    const outcomes = p.outcomes || []
    const gallery = p.gallery || []
    const others = items.filter((i) => i.slug !== p.slug).slice(0, 3)
    const hasContent =
        p.content && p.content.replace(/<[^>]+>/g, '').trim().length > 0

    const metaChips = [
        p.industry && { label: 'Industry', value: p.industry },
        p.location && { label: 'Location', value: p.location },
        p.timeframe && { label: 'Timeframe', value: p.timeframe },
        p.category && { label: 'Type', value: p.category },
    ].filter(Boolean)

    const creativeWorkSchema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        description: p.description || '',
        url: `https://webspires.co.uk/projects/${p.slug}/`,
        ...(p.image ? { image: p.image } : {}),
        ...(p.link ? { sameAs: p.link } : {}),
        creator: { '@type': 'Organization', name: 'Webspires' },
    }

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema).replace(/</g, '\\u003c') }}
            />

            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-16 lg:pb-20">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-500">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-300 font-medium">{p.title}</li>
                        </ol>
                    </nav>
                    <div className="max-w-[820px]">
                        {p.category ? (
                            <span className="inline-block border text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                                style={{ color: accent, borderColor: `${accent}44`, background: `${accent}14` }}>
                                {p.category}
                            </span>
                        ) : null}
                        <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.06] mb-5">
                            {p.title}
                        </h1>
                        <p className="text-gray-400 text-[17px] leading-relaxed mb-8 max-w-[640px]">
                            {p.overview || p.description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {p.link ? (
                                <a href={p.link} target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                                    Visit Live Site
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            ) : null}
                            <a href="https://call.webspires.co.uk?utm_source=projectdetail"
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[14px] px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                                Start a Project Like This
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-14 h-1 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} aria-hidden="true" />
            </section>

            {/* ── SCREENSHOT ── */}
            {p.image ? (
                <section className="bg-[#1a1a2e]">
                    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 -mt-2 pb-16 lg:pb-20">
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl">
                            <Image
                                src={p.image}
                                alt={`${p.title} website screenshot`}
                                fill
                                sizes="(max-width: 1120px) 100vw, 1120px"
                                className="object-cover object-top"
                                priority
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── META STRIP + HEADLINE RESULT ── */}
            <section className="bg-white border-b border-gray-100 py-8">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                        {p.result ? (
                            <div>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">Result</p>
                                <p className="text-[20px] font-extrabold" style={{ color: accent }}>{p.result}</p>
                            </div>
                        ) : null}
                        {metaChips.map((c) => (
                            <div key={c.label}>
                                <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">{c.label}</p>
                                <p className="text-[15px] font-semibold text-[#1a1a2e]">{c.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FULL WRITE-UP (rich text) ── */}
            {hasContent ? (
                <section className="bg-white py-16 lg:py-20">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
                            style={{ color: accent, background: `${accent}14` }}>
                            About This Project
                        </span>
                        <BlogContent html={p.content} />
                    </div>
                </section>
            ) : null}

            {/* ── CHALLENGE + APPROACH ── */}
            {(p.challenge || approach.length) ? (
                <section className="bg-white py-16 lg:py-24">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            {p.challenge ? (
                                <div>
                                    <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                        style={{ color: accent, background: `${accent}14` }}>
                                        The Challenge
                                    </span>
                                    <p className="text-gray-600 text-[16px] leading-relaxed whitespace-pre-line">
                                        {p.challenge}
                                    </p>
                                </div>
                            ) : null}
                            {approach.length ? (
                                <div>
                                    <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                        style={{ color: accent, background: `${accent}14` }}>
                                        Our Approach
                                    </span>
                                    <div className="space-y-5">
                                        {approach.map((a, i) => (
                                            <div key={i} className="bg-[#faf9f7] rounded-2xl p-6 border border-gray-100">
                                                <h3 className="text-[16px] font-extrabold text-[#1a1a2e] mb-1.5">{a.title}</h3>
                                                <p className="text-[14px] text-gray-500 leading-relaxed">{a.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── OUTCOMES ── */}
            {outcomes.length ? (
                <section className="bg-[#faf9f7] py-16 lg:py-24">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="max-w-[680px] mb-12">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
                                style={{ color: accent, background: `${accent}14` }}>
                                The Results
                            </span>
                            <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight">
                                What This Project Delivered
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {outcomes.map((o, i) => (
                                <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 text-center">
                                    <p className="text-[32px] font-extrabold mb-1" style={{ color: accent }}>{o.value}</p>
                                    <p className="text-[13px] text-gray-500 font-semibold">{o.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── SERVICES DELIVERED ── */}
            {(services.length || tags.length) ? (
                <section className="bg-white py-16 lg:py-20">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                            <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e]">
                                What We Delivered
                            </h2>
                            <Link href="/services" className="text-[13px] font-bold text-primary hover:underline">
                                View All Services →
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {(services.length ? services : tags).map((s) => (
                                <span key={s}
                                    className="inline-flex items-center gap-2 bg-[#faf9f7] text-[#1a1a2e] font-bold text-[14px] px-5 py-3 rounded-xl border border-gray-100">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} aria-hidden="true" />
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── GALLERY ── */}
            {gallery.length ? (
                <section className="bg-[#faf9f7] py-16 lg:py-20 border-t border-gray-100">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <h2 className="text-[24px] sm:text-[30px] font-extrabold text-[#1a1a2e] mb-8">Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {gallery.map((src, i) => (
                                <div key={i} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-gray-100 bg-white">
                                    <Image
                                        src={src}
                                        alt={`${p.title} gallery image ${i + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 50vw"
                                        className="object-cover object-top"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── TESTIMONIAL ── */}
            {p.testimonial ? (
                <section className="bg-white py-16 lg:py-24">
                    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
                        <svg className="w-10 h-10 mx-auto mb-6 opacity-20" viewBox="0 0 24 24" fill={accent} aria-hidden="true">
                            <path d="M9.5 7A4.5 4.5 0 005 11.5V17h5.5v-5.5H7A2.5 2.5 0 019.5 9zm9 0A4.5 4.5 0 0014 11.5V17h5.5v-5.5H16A2.5 2.5 0 0118.5 9z" />
                        </svg>
                        <blockquote className="text-[22px] sm:text-[26px] font-semibold text-[#1a1a2e] leading-snug mb-6">
                            “{p.testimonial}”
                        </blockquote>
                        {p.testimonialAuthor ? (
                            <p className="text-[14px] font-bold text-gray-500"> {p.testimonialAuthor}</p>
                        ) : null}
                    </div>
                </section>
            ) : null}

            {/* ── OTHER PROJECTS ── */}
            {others.length ? (
                <section className="bg-[#faf9f7] py-16 lg:py-20 border-t border-gray-100">
                    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-[22px] font-extrabold text-[#1a1a2e]">More Projects</h2>
                            <Link href="/projects" className="text-[13px] font-bold text-primary hover:underline">
                                View All →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {others.map((o) => (
                                <Link key={o.slug} href={`/projects/${o.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-200 no-underline">
                                    <div className="relative h-40 overflow-hidden bg-gray-100">
                                        {o.image ? (
                                            <Image src={o.image} alt={`${o.title} screenshot`} fill
                                                sizes="(max-width: 640px) 100vw, 33vw"
                                                className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                                        ) : null}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1" style={{ color: o.resultColor || ACCENT_FALLBACK }}>
                                            {o.category}
                                        </p>
                                        <h3 className="text-[15px] font-extrabold text-[#1a1a2e] group-hover:text-primary transition-colors duration-200">
                                            {o.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── BOTTOM CTA ── */}
            <section className="bg-[#1a1a2e] py-16 lg:py-20 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 text-center relative z-10">
                    <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-tight mb-4">
                        Want Results Like {p.title}?
                    </h2>
                    <p className="text-gray-400 text-[16px] mb-8 max-w-[520px] mx-auto leading-relaxed">
                        Book a free strategy call and we&apos;ll show you exactly how we&apos;d approach your project.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="https://call.webspires.co.uk?utm_source=projectdetailcta"
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
