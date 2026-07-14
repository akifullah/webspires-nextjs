import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getContentItem } from '@/lib/content'
import BeforeAfterSlider from '@/components/services/BeforeAfterSlider'

export const revalidate = 3600

const SITE = 'https://webspires.co.uk'
const SLUG = 'web-design'
const UTM = 'webdesign'

/* JSON parse for the comparison config stored as a string (admin-save safe). */
function parseJson(v) {
    if (!v) return null
    if (typeof v === 'object') return v
    try { return JSON.parse(v) } catch { return null }
}

export async function generateMetadata() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) return {}
    const url = `${SITE}/services/web-design/`
    const title = svc.metaTitle || `${svc.name} | Webspires`
    const description = svc.metaDescription || svc.heroSub || ''
    return {
        title: { absolute: title },
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            locale: 'en_GB',
            url,
            siteName: 'Webspires',
            title,
            description,
            images: [{ url: `${SITE}/images/webspires-logo-icon.png`, width: 1200, height: 630, alt: 'Web Design by Webspires' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE}/images/webspires-logo-icon.png`],
        },
    }
}

function Eyebrow({ children }) {
    return <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-signal">{children}</span>
}

export default async function WebDesignPage() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) notFound()

    const problems = svc.problems || []
    const focus = svc.focusBlocks || []
    const process = svc.process || []
    const pricing = svc.pricing || []
    const businessTypes = svc.businessTypes || []
    const whyChoose = svc.whyChoose || []
    const crossLinks = svc.crossLinks || []
    const faqs = svc.faqs || []
    const chips = svc.proofChips || []
    const compare = parseJson(svc.compareJson)
    const cta = svc.heroCta || 'Book a free website review'
    const [access, wired, rebuild] = focus

    const jsonLd = [
        {
            '@context': 'https://schema.org', '@type': 'Service', name: svc.name, serviceType: svc.serviceType || 'Web Design',
            url: `${SITE}/services/web-design/`, provider: { '@type': 'Organization', name: 'Webspires', url: SITE }, areaServed: 'United Kingdom',
        },
        {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
                { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
                { '@type': 'ListItem', position: 3, name: 'Web Design', item: `${SITE}/services/web-design` },
            ],
        },
        faqs.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) } : null,
        process.length ? { '@context': 'https://schema.org', '@type': 'HowTo', name: 'Our design and build process', step: process.map((p, i) => ({ '@type': 'HowToStep', position: i + 1, name: p.title, text: p.desc })) } : null,
    ].filter(Boolean)

    return (
        <main className="bg-ink-900 text-text-hi">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

            {/* ── 1. HERO ── */}
            <section className="grain relative overflow-hidden bg-ink-900 pt-28 pb-16 lg:pb-24">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-text-mid">
                            <li className="flex items-center gap-2"><Link href="/" className="hover:text-signal">Home</Link><span aria-hidden="true">/</span></li>
                            <li className="flex items-center gap-2"><Link href="/services" className="hover:text-signal">Services</Link><span aria-hidden="true">/</span></li>
                            <li className="font-medium text-text-hi">Web Design</li>
                        </ol>
                    </nav>
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="reveal">
                            {svc.category ? <Eyebrow>{svc.category}</Eyebrow> : null}
                            <h1 className="mt-5 mb-5 font-display text-[34px] font-semibold leading-[1.04] tracking-[-0.02em] text-text-hi sm:text-[46px] lg:text-[54px]">{svc.heroHeading}</h1>
                            <p className="mb-8 max-w-[560px] text-[17px] leading-relaxed text-text-mid">{svc.heroSub}</p>
                            <div className="flex flex-wrap gap-4">
                                <a href={`https://call.webspires.co.uk?utm_source=${UTM}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-7 py-3.5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700">{cta}
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </a>
                                <a href="#pricing" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-hairline bg-white/5 px-7 py-3.5 text-[14px] font-semibold text-text-hi transition hover:bg-white/10">See our pricing</a>
                            </div>
                            <ul className="mt-8 flex flex-wrap gap-2.5 font-mono text-[11px] text-text-mid">
                                {['Built for search & AI', 'WCAG 2.2 AA', 'Own your site', 'No lock-in'].map((p) => (
                                    <li key={p} className="rounded-[var(--r-pill)] border border-hairline px-3 py-1.5">{p}</li>
                                ))}
                            </ul>
                        </div>
                        {/* Hero composition: site → score → search → enquiry */}
                        <div className="reveal">
                            <div className="rounded-[var(--r-lg)] border border-hairline bg-ink-800/70 p-5 backdrop-blur">
                                <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
                                    <div className="rounded-[var(--r-md)] border border-hairline bg-ink-700 p-3 text-center"><p className="text-signal">LCP</p><p className="mt-1 text-text-hi">1.4s</p></div>
                                    <div className="rounded-[var(--r-md)] border border-hairline bg-ink-700 p-3 text-center"><p className="text-signal">Ranks</p><p className="mt-1 text-text-hi">Day one</p></div>
                                    <div className="rounded-[var(--r-md)] border border-hairline bg-ink-700 p-3 text-center"><p className="text-signal">Leads</p><p className="mt-1 text-text-hi">Tracked</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. WHAT WE BUILD ── */}
            {svc.intro ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-20">
                    <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-10">
                        <h2 className="mb-5 font-display text-[26px] font-semibold leading-tight text-ink-text sm:text-[32px]">{svc.definitionHeading || 'What We Build'}</h2>
                        <div className="border-l-2 border-signal pl-5">
                            <p className="text-[17px] leading-relaxed text-ink-mid">{svc.intro}</p>
                        </div>
                        {chips.length ? (
                            <ul className="mt-8 flex flex-wrap gap-2.5">
                                {chips.map((c) => (
                                    <li key={c} className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-line-200 bg-white px-4 py-2 text-[13px] font-medium text-ink-text">
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                </section>
            ) : null}

            {/* ── 3. PROBLEMS (asymmetric bento) ── */}
            {problems.length ? (
                <section className="bg-ink-800 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]"><Eyebrow>The problem</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.problemsHeading}</h2>
                        </div>
                        <div className="grid auto-rows-[1fr] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {problems.map((p, i) => (
                                <div key={i} className={`rounded-[var(--r-lg)] border p-6 ${p.big ? 'border-signal bg-signal-soft sm:col-span-2' : 'border-hairline bg-ink-700'}`}>
                                    <h3 className={`mb-2 font-display font-semibold ${p.big ? 'text-[19px] text-ink-text' : 'text-[16px] text-text-hi'}`}>{p.title}</h3>
                                    <p className={`leading-relaxed ${p.big ? 'text-[15px] text-ink-mid' : 'text-[14px] text-text-mid'}`}>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 4. SEARCH-NATIVE (signature) ── */}
            {svc.aiSearchBody ? (
                <section className="grain relative overflow-hidden bg-ink-900 py-16 lg:py-24">
                    <div className="glow-mesh" aria-hidden="true" />
                    <div className="relative z-10 mx-auto grid max-w-[1320px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
                        <div>
                            <Eyebrow>Search-native</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.aiSearchHeading}</h2>
                            <p className="mt-4 text-[16px] leading-relaxed text-text-mid">{svc.aiSearchBody}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/services/seo" className="text-[14px] font-bold text-signal hover:underline">SEO →</Link>
                                <Link href="/services/generative-engine-optimisation" className="text-[14px] font-bold text-signal hover:underline">Generative Engine Optimisation →</Link>
                                <Link href="/services/seo/technical-seo" className="text-[14px] font-bold text-signal hover:underline">Technical SEO →</Link>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-[520px] rounded-[var(--r-lg)] border border-hairline bg-ink-800/70 p-6 backdrop-blur">
                            <p className="font-mono text-[13px] text-text-mid"><span className="text-signal">query</span> › <span className="text-text-hi">{svc.aiSearchQuery}</span></p>
                            <div className="mt-4 rounded-[var(--r-md)] border border-hairline bg-ink-700 p-4">
                                <p className="text-[15px] leading-relaxed text-text-hi">{svc.aiSearchAnswer}</p>
                                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-text-mid">
                                    <span className="rounded-full border border-hairline px-2.5 py-1">AI SEARCH RESULT</span>
                                    <span className="rounded-full border border-hairline px-2.5 py-1">ILLUSTRATION</span>
                                </div>
                                <p className="mt-3 font-mono text-[10px] text-text-mid/60">Illustrative example, not a real AI response.</p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 5. ACCESSIBILITY (prose + checklist) ── */}
            {access ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-20">
                    <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-10">
                        <div>
                            <Eyebrow>Accessibility</Eyebrow>
                            <h2 className="mt-3 mb-4 font-display text-[26px] font-semibold leading-tight text-ink-text sm:text-[32px]">{access.title}</h2>
                            <p className="text-[16px] leading-relaxed text-ink-mid">{access.desc}</p>
                        </div>
                        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                            {['Colour contrast', 'Keyboard navigation', 'Screen-reader labels', 'Visible focus states', 'Accessible forms', 'Readable language'].map((a) => (
                                <li key={a} className="flex items-center gap-3 rounded-[var(--r-md)] border border-line-200 bg-white px-4 py-3 text-[14px] font-medium text-ink-text">
                                    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            ) : null}

            {/* ── 6. WIRED TO YOUR BUSINESS (split diagram) ── */}
            {wired ? (
                <section className="bg-ink-800 py-16 lg:py-24">
                    <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
                        <div>
                            <Eyebrow>Integration</Eyebrow>
                            <h2 className="mt-3 mb-4 font-display text-[26px] font-semibold leading-tight text-text-hi sm:text-[32px]">{wired.title}</h2>
                            <p className="text-[16px] leading-relaxed text-text-mid">{wired.desc}</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link href="/services/crm-development" className="text-[14px] font-bold text-signal hover:underline">CRM Development →</Link>
                                <Link href="/services/conversion-rate-optimisation" className="text-[14px] font-bold text-signal hover:underline">Conversion Optimisation →</Link>
                            </div>
                        </div>
                        <div className="relative rounded-[var(--r-lg)] border border-hairline bg-ink-900 p-6">
                            <div className="mx-auto mb-4 w-fit rounded-[var(--r-md)] border border-signal bg-signal-soft px-5 py-2.5 text-center font-display text-[14px] font-semibold text-text-hi">Your website</div>
                            <div className="mx-auto mb-4 h-6 w-0.5 bg-hairline" />
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {['Enquiry tracking', 'CRM', 'Marketing channels'].map((n) => (
                                    <div key={n} className="rounded-[var(--r-md)] border border-hairline bg-ink-700 p-3 font-mono text-[11px] text-text-mid">{n}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 7. PROCESS (timeline) ── */}
            {process.length ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]"><Eyebrow>The process</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">Our Design and Build Process, Step by Step</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {process.map((p, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6">
                                    <p className="mb-3 font-mono text-[13px] font-medium text-signal">{p.step || String(i + 1).padStart(2, '0')}</p>
                                    <h3 className="mb-2 font-display text-[16px] font-semibold text-text-hi">{p.title}</h3>
                                    <p className="text-[14px] leading-relaxed text-text-mid">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 8. REBUILDS (checklist band) ── */}
            {rebuild ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-20">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        <Eyebrow>Rebuilds & migrations</Eyebrow>
                        <h2 className="mt-3 mb-4 font-display text-[26px] font-semibold leading-tight text-ink-text sm:text-[32px]">{rebuild.title}</h2>
                        <p className="mb-6 text-[16px] leading-relaxed text-ink-mid">{rebuild.desc}</p>
                        <div className="flex flex-wrap gap-2.5">
                            {['URL mapping', '301 redirects', 'Metadata parity', 'Content parity', 'Schema', 'Launch monitoring'].map((c) => (
                                <span key={c} className="rounded-[var(--r-pill)] border border-line-200 bg-white px-4 py-2 font-mono text-[12px] text-ink-text">{c}</span>
                            ))}
                        </div>
                        <Link href="/services/seo/technical-seo" className="mt-6 inline-block text-[14px] font-bold text-signal hover:underline">Technical SEO →</Link>
                    </div>
                </section>
            ) : null}

            {/* ── 9. PRICING ── */}
            {pricing.length ? (
                <section id="pricing" className="scroll-mt-24 bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[720px]"><Eyebrow>Pricing</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.pricingHeading || 'What a Website Actually Costs in the UK'}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                            {pricing.map((t, i) => {
                                const featured = t.name === 'Business'
                                return (
                                    <div key={i} className={`relative rounded-[var(--r-lg)] border p-7 ${featured ? 'border-signal bg-ink-700' : 'border-hairline bg-ink-800'}`}>
                                        {featured ? <span className="absolute -top-3 left-7 rounded-[var(--r-pill)] bg-signal px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white">Most chosen</span> : null}
                                        <h3 className="font-display text-[17px] font-semibold text-text-hi">{t.name}</h3>
                                        <p className="mt-2 font-display text-[24px] font-semibold text-signal">{t.range}</p>
                                        <p className="mt-3 text-[13px] leading-relaxed text-text-mid">{t.includes}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {svc.pricingNote ? <p className="mt-6 max-w-[860px] text-[14px] leading-relaxed text-text-mid">{svc.pricingNote}</p> : null}
                        <a href={`https://call.webspires.co.uk?utm_source=${UTM}pricing`} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-7 py-3.5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700">{cta}</a>
                    </div>
                </section>
            ) : null}

            {/* ── 10. COMPARISON TABLE ── */}
            {compare && compare.rows?.length ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-24">
                    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-10 max-w-[720px]"><Eyebrow>How to choose</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-ink-text sm:text-[34px]">{compare.heading}</h2>
                            {compare.intro ? <p className="mt-4 text-[16px] leading-relaxed text-ink-mid">{compare.intro}</p> : null}
                        </div>
                        <div className="hidden overflow-hidden rounded-[var(--r-lg)] border border-line-200 md:block">
                            <table className="w-full border-collapse text-left">
                                <thead><tr className="bg-white">
                                    <th className="p-4 text-[13px] font-medium text-ink-mid"></th>
                                    {compare.columns.map((c, i) => (<th key={i} className={`p-4 font-display text-[14px] font-semibold ${i === compare.highlightCol ? 'bg-signal text-white' : 'text-ink-text'}`}>{c}</th>))}
                                </tr></thead>
                                <tbody>
                                    {compare.rows.map((r, ri) => (
                                        <tr key={ri} className="border-t border-line-200">
                                            <th scope="row" className="p-4 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-mid">{r.label}</th>
                                            {r.values.map((v, vi) => (<td key={vi} className={`p-4 text-[13px] leading-relaxed ${vi === compare.highlightCol ? 'bg-signal-soft font-medium text-ink-text' : 'text-ink-mid'}`}>{v}</td>))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="space-y-4 md:hidden">
                            {compare.columns.map((c, ci) => {
                                const hi = ci === compare.highlightCol
                                return (
                                    <div key={ci} className={`rounded-[var(--r-lg)] border p-5 ${hi ? 'border-signal bg-white' : 'border-line-200 bg-white'}`}>
                                        <p className={`mb-3 font-display text-[15px] font-semibold ${hi ? 'text-signal' : 'text-ink-text'}`}>{c}</p>
                                        <dl className="space-y-2">
                                            {compare.rows.map((r, ri) => (
                                                <div key={ri} className="flex gap-3 border-t border-line-200 pt-2 first:border-0 first:pt-0">
                                                    <dt className="w-[96px] flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-mid">{r.label}</dt>
                                                    <dd className="text-[13px] text-ink-text">{r.values[ci]}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </div>
                                )
                            })}
                        </div>
                        {compare.verdict ? <p className="mt-6 text-[14px] leading-relaxed text-ink-mid">{compare.verdict}</p> : null}
                    </div>
                </section>
            ) : null}

            {/* ── 11. BUSINESS TYPES ── */}
            {businessTypes.length ? (
                <section className="bg-ink-800 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]"><Eyebrow>By business type</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.businessTypesHeading || 'Websites by Business Type'}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {businessTypes.map((b, i) => (
                                <div key={i} className="flex flex-col rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6">
                                    <h3 className="font-display text-[17px] font-semibold text-text-hi">{b.type}</h3>
                                    <dl className="mt-4 space-y-2.5 text-[13px]">
                                        {b.channels ? (<div className="flex gap-2"><dt className="w-[74px] flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-signal">Needs</dt><dd className="text-text-hi">{b.channels}</dd></div>) : null}
                                        {b.metric ? (<div className="flex gap-2"><dt className="w-[74px] flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-signal">Metric</dt><dd className="text-text-hi">{b.metric}</dd></div>) : null}
                                    </dl>
                                    {b.reason ? <p className="mt-4 text-[13px] leading-relaxed text-text-mid">{b.reason}</p> : null}
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-[14px] text-text-mid">Building an online store? Our <Link href="/services/shopify-development" className="font-bold text-signal hover:underline">Shopify development</Link> service is built for ecommerce.</p>
                    </div>
                </section>
            ) : null}

            {/* ── 12. WHY CHOOSE ── */}
            {whyChoose.length ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]"><Eyebrow>Why Webspires</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">Why Businesses Choose Webspires for Web Design</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {whyChoose.map((w, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6">
                                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-[var(--r-sm)] bg-signal-soft">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="mb-1.5 font-display text-[15px] font-semibold text-text-hi">{w.title}</h3>
                                    <p className="text-[13px] leading-relaxed text-text-mid">{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 13. RESULTS (with slider) ── */}
            {svc.results ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-24">
                    <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
                        <div>
                            <Eyebrow>Results</Eyebrow>
                            <h2 className="mt-3 mb-4 font-display text-[26px] font-semibold leading-tight text-ink-text sm:text-[32px]">Real Results</h2>
                            <p className="text-[16px] leading-relaxed text-ink-mid">{svc.results}</p>
                            <Link href="/case-studies" className="mt-5 inline-block text-[14px] font-bold text-signal hover:underline">See our case studies →</Link>
                        </div>
                        <div className="rounded-[var(--r-lg)] border border-line-200 bg-ink-900 p-5">
                            <BeforeAfterSlider />
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 14. CTA ── */}
            <section className="grain relative overflow-hidden bg-ink-900 py-16 lg:py-20">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className="mb-4 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[38px] lg:text-[44px]">{svc.ctaHeading || 'Book a Free Website Review'}</h2>
                    <p className="mx-auto mb-6 max-w-[560px] text-[16px] leading-relaxed text-text-mid">The review covers your current site speed, mobile experience, accessibility, search visibility, and where enquiries leak, plus a clear scope and price. No obligation, and you keep the findings.</p>
                    <div className="mb-8 flex flex-wrap justify-center gap-2.5 font-mono text-[11px] text-text-mid">
                        {['Speed', 'Mobile', 'Accessibility', 'Search visibility', 'Enquiry leaks'].map((c) => (<span key={c} className="rounded-[var(--r-pill)] border border-hairline px-3 py-1.5">{c}</span>))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`https://call.webspires.co.uk?utm_source=${UTM}cta`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-8 py-4 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700">{cta}</a>
                        <a href="tel:+441615241569" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-hairline bg-white/5 px-8 py-4 text-[15px] font-semibold text-text-hi transition hover:bg-white/10">+44 161 524 1569</a>
                    </div>
                </div>
            </section>

            {/* ── related ── */}
            {crossLinks.length ? (
                <section className="bg-ink-900 pb-16">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="flex flex-wrap gap-3">
                            {crossLinks.map((l) => (<Link key={l.href} href={l.href} className="inline-flex items-center gap-2 rounded-[var(--r-md)] border border-hairline bg-ink-700 px-5 py-3 text-[14px] font-semibold text-text-hi transition hover:border-signal hover:text-signal no-underline">{l.label}</Link>))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── 15. FAQ ── */}
            {faqs.length ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-24">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 text-center"><Eyebrow>FAQ</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold text-ink-text sm:text-[34px]">Web Design FAQs</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-line-200 bg-white p-6">
                                    <h3 className="mb-2 flex items-start gap-3 font-display text-[15px] font-semibold text-ink-text">
                                        <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-signal text-[11px] font-bold text-white">{i + 1}</span>
                                        {faq.q}
                                    </h3>
                                    <p className="pl-9 text-[14px] leading-relaxed text-ink-mid">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </main>
    )
}
