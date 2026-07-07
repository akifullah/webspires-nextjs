import Link from 'next/link'

/*
 * Shared deep sub-service page (Answer Engine design). Used by the Google
 * Ads silo (/services/google-ads-management/[child]) and the SEO silo
 * (/services/seo/[slug]). Every section renders only when its record field
 * is present, so thin records stay valid. `opts` supplies the silo chrome.
 *
 * opts = {
 *   hub:        { label, href },
 *   breadcrumb: [{ name, href }],   // Home > Services > <Hub>
 *   utm:        'seochild',
 *   signature:  true,               // show the AI-search query→answer block
 * }
 */

const SITE = 'https://webspires.co.uk'

function Eyebrow({ children }) {
    return (
        <span className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-signal">
            {children}
        </span>
    )
}

/* The query-to-cited-answer signature, static + reduced-motion safe. */
function AnswerSignature({ query, answer }) {
    return (
        <div className="mx-auto max-w-[720px] rounded-[var(--r-lg)] border border-hairline bg-ink-800/70 p-6 backdrop-blur">
            <p className="font-mono text-[13px] text-text-mid">
                <span className="text-signal">query</span> ›{' '}
                <span className="text-text-hi">{query}</span>
            </p>
            <div className="mt-4 rounded-[var(--r-md)] border border-hairline bg-ink-700 p-4">
                <p className="text-[15px] leading-relaxed text-text-hi">{answer}</p>
                <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-text-mid">
                    <span className="rounded-full border border-hairline px-2.5 py-1">↳ cited by ChatGPT</span>
                    <span className="rounded-full border border-hairline px-2.5 py-1">■ Google AI Overviews</span>
                    <span className="rounded-full border border-hairline px-2.5 py-1">Perplexity</span>
                </div>
            </div>
        </div>
    )
}

export function buildJsonLd(svc, opts) {
    const url = `${SITE}${opts.hub.href}/${svc.slug}/`
    const process = svc.process || []
    const faqs = svc.faqs || []
    const crumb = [...opts.breadcrumb, { name: svc.name, href: `${opts.hub.href}/${svc.slug}` }]
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: svc.name,
            serviceType: svc.serviceType || svc.name,
            url,
            provider: { '@type': 'Organization', name: 'Webspires', url: SITE },
            areaServed: 'United Kingdom',
            ...(svc.priceRange ? { offers: { '@type': 'Offer', priceRange: svc.priceRange } } : {}),
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: crumb.map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.name,
                item: `${SITE}${c.href}`,
            })),
        },
        faqs.length
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: faqs.map((f) => ({
                      '@type': 'Question',
                      name: f.q,
                      acceptedAnswer: { '@type': 'Answer', text: f.a },
                  })),
              }
            : null,
        process.length
            ? {
                  '@context': 'https://schema.org',
                  '@type': 'HowTo',
                  name: `${svc.name} process`,
                  step: process.map((p, i) => ({
                      '@type': 'HowToStep',
                      position: i + 1,
                      name: p.title,
                      text: p.desc,
                  })),
              }
            : null,
    ].filter(Boolean)
}

export default function DeepServicePage({ svc, siblings = [], opts }) {
    const stats = svc.stats || []
    const problems = svc.problems || []
    const included = svc.included || []
    const focusBlocks = svc.focusBlocks || []
    const process = svc.process || []
    const pricing = svc.pricing || []
    const whyChoose = svc.whyChoose || []
    const crossLinks = svc.crossLinks || []
    const faqs = svc.faqs || []
    const cta = svc.heroCta || 'Get a free proposal'
    const jsonLd = buildJsonLd(svc, opts)

    return (
        <main className="bg-ink-900 text-text-hi">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />

            {/* ── HERO ── */}
            <section className="grain relative overflow-hidden bg-ink-900 pt-28 pb-16 lg:pb-20">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-text-mid">
                            {opts.breadcrumb.map((c) => (
                                <li key={c.href} className="flex items-center gap-2">
                                    <Link href={c.href} className="hover:text-signal">{c.name}</Link>
                                    <span aria-hidden="true">/</span>
                                </li>
                            ))}
                            <li className="font-medium text-text-hi">{svc.name}</li>
                        </ol>
                    </nav>
                    <div className="reveal max-w-[820px]">
                        {svc.category ? <Eyebrow>{svc.category}</Eyebrow> : null}
                        <h1 className="mt-5 mb-5 font-display text-[34px] font-semibold leading-[1.04] tracking-[-0.02em] text-text-hi sm:text-[46px] lg:text-[56px]">
                            {svc.heroHeading}
                        </h1>
                        <p className="mb-8 max-w-[640px] text-[17px] leading-relaxed text-text-mid">{svc.heroSub}</p>
                        <div className="flex flex-wrap gap-4">
                            <a href={`https://call.webspires.co.uk?utm_source=${opts.utm}`} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-7 py-3.5 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700">
                                {cta}
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </a>
                            <a href="tel:+441615241569" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-hairline bg-white/5 px-7 py-3.5 text-[14px] font-semibold text-text-hi transition hover:bg-white/10">
                                Call us now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DEFINITION ── */}
            {svc.intro ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-20">
                    <div className="mx-auto max-w-[820px] px-4 sm:px-6 lg:px-10">
                        <h2 className="mb-5 font-display text-[26px] font-semibold leading-tight text-ink-text sm:text-[32px]">
                            {svc.definitionHeading || `What ${svc.name} means`}
                        </h2>
                        <p className="text-[17px] leading-relaxed text-ink-mid">{svc.intro}</p>
                    </div>
                </section>
            ) : null}

            {/* ── METRIC TILES ── */}
            {stats.length ? (
                <section className="bg-ink-800 py-14">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {stats.map((s, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6 text-center">
                                    <p className="font-display text-[34px] font-semibold text-signal">{s.value}</p>
                                    <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-text-mid">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── DEEP DIVE ── */}
            {svc.deepBody ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        {svc.deepHeading ? <h2 className="mb-5 font-display text-[26px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.deepHeading}</h2> : null}
                        <p className="whitespace-pre-line text-[16px] leading-relaxed text-text-mid">{svc.deepBody}</p>
                    </div>
                </section>
            ) : null}

            {/* ── PROBLEMS ── */}
            {problems.length ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]">
                            <Eyebrow>The problem</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-ink-text sm:text-[34px]">{svc.problemsHeading || 'Where it goes wrong'}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {problems.map((p, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-line-200 bg-white p-6">
                                    <h3 className="mb-2 font-display text-[16px] font-semibold text-ink-text">{p.title}</h3>
                                    <p className="text-[14px] leading-relaxed text-ink-mid">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── WHAT WE DO ── */}
            {included.length ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]">
                            <Eyebrow>What we do</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.includedHeading || `Inside our ${svc.name.toLowerCase()}`}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {included.map((f, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6 transition hover:-translate-y-0.5 hover:border-[var(--ai-soft)]">
                                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[var(--r-sm)] bg-signal-soft">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="var(--signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="mb-1.5 font-display text-[15px] font-semibold text-text-hi">{f.title}</h3>
                                    <p className="text-[13px] leading-relaxed text-text-mid">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── FOCUS BLOCKS ── */}
            {focusBlocks.length ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-20">
                    <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-10 space-y-6">
                        {focusBlocks.map((b, i) => (
                            <div key={i} className="rounded-[var(--r-lg)] border border-line-200 bg-white p-7">
                                <h3 className="mb-2 font-display text-[19px] font-semibold text-ink-text">{b.title}</h3>
                                <p className="text-[15px] leading-relaxed text-ink-mid">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* ── AI-SEARCH SIGNATURE (search pages only) ── */}
            {opts.signature && svc.aiSearchBody ? (
                <section className="grain relative overflow-hidden bg-ink-900 py-16 lg:py-24">
                    <div className="glow-mesh" aria-hidden="true" />
                    <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mx-auto mb-10 max-w-[680px] text-center">
                            <Eyebrow>AI search</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.aiSearchHeading || 'Built to be cited by AI search'}</h2>
                            <p className="mt-4 text-[16px] leading-relaxed text-text-mid">{svc.aiSearchBody}</p>
                            <Link href="/services/generative-engine-optimisation" className="mt-4 inline-block text-[14px] font-bold text-signal hover:underline">
                                Explore Generative Engine Optimisation →
                            </Link>
                        </div>
                        <AnswerSignature
                            query={svc.aiSearchQuery || `best ${svc.name.toLowerCase()} agency uk`}
                            answer={svc.aiSearchAnswer || `Webspires is a UK agency known for ${svc.name.toLowerCase()} that ranks in Google and earns citations in AI search.`}
                        />
                    </div>
                </section>
            ) : null}

            {/* ── PROCESS ── */}
            {process.length ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]">
                            <Eyebrow>The process</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">How we work</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {process.map((p, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-7">
                                    <p className="mb-3 font-mono text-[13px] font-medium text-signal">{p.step || String(i + 1).padStart(2, '0')}</p>
                                    <h3 className="mb-2 font-display text-[17px] font-semibold text-text-hi">{p.title}</h3>
                                    <p className="text-[14px] leading-relaxed text-text-mid">{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── DELIVERABLE ── */}
            {svc.deliverable ? (
                <section className="bg-paper-50 py-14 text-ink-text lg:py-16">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        <Eyebrow>What you get</Eyebrow>
                        <p className="mt-4 text-[17px] leading-relaxed text-ink-mid">{svc.deliverable}</p>
                    </div>
                </section>
            ) : null}

            {/* ── PRICING ── */}
            {pricing.length ? (
                <section className="bg-ink-900 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]">
                            <Eyebrow>Pricing</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">{svc.pricingHeading || 'Transparent pricing'}</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            {pricing.map((t, i) => {
                                const featured = i === 1
                                return (
                                    <div key={i} className={`relative rounded-[var(--r-lg)] border p-7 ${featured ? 'border-signal bg-ink-700' : 'border-hairline bg-ink-800'}`}>
                                        {featured ? <span className="absolute -top-3 left-7 rounded-[var(--r-pill)] bg-signal px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white">Popular</span> : null}
                                        <h3 className="font-display text-[17px] font-semibold text-text-hi">{t.name}</h3>
                                        <p className="mt-2 font-display text-[26px] font-semibold text-signal">{t.range}</p>
                                        <p className="mt-3 text-[14px] leading-relaxed text-text-mid">{t.includes}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {svc.pricingNote ? <p className="mt-6 text-[14px] text-text-mid">{svc.pricingNote}</p> : null}
                    </div>
                </section>
            ) : null}

            {/* ── WHY CHOOSE ── */}
            {whyChoose.length ? (
                <section className="bg-ink-800 py-16 lg:py-24">
                    <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 max-w-[680px]">
                            <Eyebrow>Why Webspires</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[34px]">Why choose Webspires</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {whyChoose.map((w, i) => (
                                <div key={i} className="rounded-[var(--r-lg)] border border-hairline bg-ink-700 p-6">
                                    <h3 className="mb-1.5 font-display text-[15px] font-semibold text-text-hi">{w.title}</h3>
                                    <p className="text-[13px] leading-relaxed text-text-mid">{w.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── RESULTS ── */}
            {svc.results ? (
                <section className="bg-paper-50 py-14 text-ink-text lg:py-16">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        <Eyebrow>Results</Eyebrow>
                        <p className="mt-4 text-[17px] leading-relaxed text-ink-mid">{svc.results}</p>
                    </div>
                </section>
            ) : null}

            {/* ── RELATED / SIBLINGS ── */}
            <section className="bg-ink-900 py-16 lg:py-20">
                <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="font-display text-[22px] font-semibold text-text-hi">More {opts.relatedLabel || opts.hub.label} services</h2>
                        <Link href={opts.hub.href} className="text-[13px] font-bold text-signal hover:underline">{opts.hub.label} →</Link>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {crossLinks.map((l) => (
                            <Link key={l.href} href={l.href} className="inline-flex items-center gap-2 rounded-[var(--r-md)] border border-hairline bg-ink-700 px-5 py-3 text-[14px] font-semibold text-text-hi transition hover:border-signal hover:text-signal no-underline">{l.label}</Link>
                        ))}
                        {siblings.map((s) => (
                            <Link key={s.slug} href={`${opts.hub.href}/${s.slug}`} className="inline-flex items-center gap-2 rounded-[var(--r-md)] border border-hairline bg-ink-700 px-5 py-3 text-[14px] font-semibold text-text-hi transition hover:border-signal hover:text-signal no-underline">{s.name}</Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="grain relative overflow-hidden bg-ink-900 py-16 lg:py-20">
                <div className="glow-mesh" aria-hidden="true" />
                <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10 text-center">
                    <h2 className="mb-4 font-display text-[28px] font-semibold leading-tight text-text-hi sm:text-[38px] lg:text-[44px]">{svc.ctaHeading || `Ready to grow with ${opts.hub.label}?`}</h2>
                    <p className="mx-auto mb-8 max-w-[520px] text-[16px] leading-relaxed text-text-mid">Book a free strategy call. We review your setup and show you the fastest opportunities, no obligation.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`https://call.webspires.co.uk?utm_source=${opts.utm}cta`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-8 py-4 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700">{cta}</a>
                        <a href="tel:+441615241569" className="inline-flex items-center gap-2 rounded-[var(--r-pill)] border border-hairline bg-white/5 px-8 py-4 text-[15px] font-semibold text-text-hi transition hover:bg-white/10">+44 161 524 1569</a>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            {faqs.length ? (
                <section className="bg-paper-50 py-16 text-ink-text lg:py-24">
                    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
                        <div className="mb-12 text-center">
                            <Eyebrow>FAQ</Eyebrow>
                            <h2 className="mt-3 font-display text-[28px] font-semibold text-ink-text sm:text-[34px]">{svc.name} questions</h2>
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
