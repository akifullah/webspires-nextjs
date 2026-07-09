'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

/*
 * Config-driven channel-fit finder. No storage, no network, all state in
 * React. Given the user's answers it tallies the channels each selected
 * option points to and returns the top few, each linking to its service
 * page, plus the audit CTA. Keyboard accessible, reduced-motion safe.
 *
 * config = {
 *   heading, intro,
 *   questions: [{ id, label, options: [{ label, channels: [key] }] }],
 *   channelInfo: { key: { label, why, href } },
 *   cta: { label, href },
 *   resultLead: 'Your priority levers'
 * }
 */
export default function ChannelFinder({ config }) {
    const { questions = [], channelInfo = {}, cta, heading, intro, resultLead, disclaimer } = config || {}
    const [answers, setAnswers] = useState({})

    const answeredAll = questions.length > 0 && questions.every((q) => answers[q.id] != null)

    const results = useMemo(() => {
        if (!answeredAll) return []
        const tally = {}
        for (const q of questions) {
            const opt = q.options[answers[q.id]]
            for (const key of opt?.channels || []) tally[key] = (tally[key] || 0) + 1
        }
        return Object.entries(tally)
            .sort((a, b) => b[1] - a[1])
            .map(([key]) => key)
            .filter((key) => channelInfo[key])
            .slice(0, 3)
    }, [answers, answeredAll, questions, channelInfo])

    return (
        <div className="mx-auto max-w-[900px] rounded-[var(--r-lg)] border border-hairline bg-ink-800/70 p-6 backdrop-blur sm:p-9">
            {heading ? (
                <h2 className="font-display text-[24px] font-semibold leading-tight text-text-hi sm:text-[30px]">{heading}</h2>
            ) : null}
            {intro ? <p className="mt-3 text-[15px] leading-relaxed text-text-mid">{intro}</p> : null}

            <div className="mt-8 space-y-7">
                {questions.map((q, qi) => (
                    <fieldset key={q.id}>
                        <legend className="mb-3 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-signal">
                            <span aria-hidden="true">{String(qi + 1).padStart(2, '0')}</span>
                            <span className="text-text-mid">{q.label}</span>
                        </legend>
                        <div className="flex flex-wrap gap-2.5">
                            {q.options.map((opt, oi) => {
                                const active = answers[q.id] === oi
                                return (
                                    <button
                                        key={oi}
                                        type="button"
                                        aria-pressed={active}
                                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                                        className={`rounded-[var(--r-pill)] border px-4 py-2 text-[14px] font-medium transition ${
                                            active
                                                ? 'border-signal bg-signal text-white'
                                                : 'border-hairline bg-ink-700 text-text-mid hover:border-signal hover:text-text-hi'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                )
                            })}
                        </div>
                    </fieldset>
                ))}
            </div>

            <div className="mt-8 border-t border-hairline pt-7" aria-live="polite">
                {answeredAll ? (
                    <>
                        <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.1em] text-text-mid">
                            {resultLead || 'Your priority levers'}
                        </p>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {results.map((key) => {
                                const info = channelInfo[key]
                                return (
                                    <Link
                                        key={key}
                                        href={info.href}
                                        className="group rounded-[var(--r-md)] border border-hairline bg-ink-700 p-5 no-underline transition hover:-translate-y-0.5 hover:border-signal"
                                    >
                                        <p className="font-display text-[15px] font-semibold text-text-hi">{info.label}</p>
                                        <p className="mt-1.5 text-[13px] leading-relaxed text-text-mid">{info.why}</p>
                                        <span className="mt-3 inline-block text-[13px] font-bold text-signal group-hover:underline">
                                            Explore →
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                        {cta ? (
                            <a
                                href={cta.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-signal px-6 py-3 text-[14px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-signal-700"
                            >
                                {cta.label}
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        ) : null}
                        <p className="mt-4 text-[12px] text-text-mid">{disclaimer || 'Indicative guidance. The free audit confirms the right sequence for your budget.'}</p>
                    </>
                ) : (
                    <p className="text-[14px] text-text-mid">Answer the questions above to see the channels that fit your situation.</p>
                )}
            </div>
        </div>
    )
}
