'use client'

import { useState } from 'react'

/*
 * Before/after redesign slider. Pure CSS panels (no image assets), driven by a
 * native range input so it is keyboard operable (arrow keys) and screen-reader
 * labelled. No storage, reduced-motion safe (user-driven, no auto animation).
 */
function ScorePill({ label, value, good }) {
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-[var(--r-pill)] px-2.5 py-1 font-mono text-[11px] ${good ? 'bg-signal-soft text-signal' : 'bg-white/10 text-text-mid'}`}>
            <span className="font-semibold">{value}</span>
            {label}
        </span>
    )
}

function Panel({ variant }) {
    const after = variant === 'after'
    return (
        <div className={`h-full w-full rounded-[var(--r-lg)] border p-5 ${after ? 'border-signal/40 bg-ink-800' : 'border-hairline bg-ink-700'}`}>
            <div className="mb-4 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 truncate font-mono text-[11px] text-text-mid">{after ? 'fast · found · converts' : 'slow · invisible · generic'}</span>
            </div>
            <div className={`mb-3 h-3 w-2/3 rounded-full ${after ? 'bg-text-hi/80' : 'bg-white/15'}`} />
            <div className="mb-2 h-2 w-full rounded-full bg-white/10" />
            <div className="mb-5 h-2 w-5/6 rounded-full bg-white/10" />
            <div className="flex flex-wrap gap-2">
                {after ? (
                    <>
                        <ScorePill label="Perf" value="99" good />
                        <ScorePill label="A11y" value="100" good />
                        <ScorePill label="SEO" value="100" good />
                    </>
                ) : (
                    <>
                        <ScorePill label="Perf" value="48" />
                        <ScorePill label="A11y" value="61" />
                        <ScorePill label="SEO" value="70" />
                    </>
                )}
            </div>
        </div>
    )
}

export default function BeforeAfterSlider() {
    const [pos, setPos] = useState(52)
    return (
        <figure className="m-0">
            <div className="relative select-none overflow-hidden rounded-[var(--r-lg)]">
                {/* Before (full width, underneath) */}
                <div aria-hidden="true">
                    <Panel variant="before" />
                </div>
                {/* After (clipped from the right by the slider) */}
                <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden="true">
                    <Panel variant="after" />
                </div>
                {/* Divider line */}
                <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-signal" style={{ left: `${pos}%` }} />
                {/* Labels */}
                <span className="pointer-events-none absolute left-3 top-3 rounded-[var(--r-pill)] bg-black/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white">Before</span>
                <span className="pointer-events-none absolute right-3 top-3 rounded-[var(--r-pill)] bg-signal px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white">After</span>
            </div>
            <label className="mt-4 block">
                <span className="mb-2 block font-mono text-[12px] uppercase tracking-[0.1em] text-text-mid">Drag to compare a rebuild</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    aria-label="Reveal the redesigned website, from before on the left to after on the right"
                    className="w-full accent-[var(--signal)]"
                />
            </label>
        </figure>
    )
}
