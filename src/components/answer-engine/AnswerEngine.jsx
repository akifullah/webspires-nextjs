// Answer Engine the site signature. A stylised generative-search surface:
// a mono query resolves to an answer block that surfaces the client brand as
// the cited source. Static + CSS-only shimmer, so it stays a server component
// and never blocks LCP. Fully resolved (and shimmer off) under reduced-motion.

export function Eyebrow({ children, tone = 'signal', className = '' }) {
    const color = tone === 'ai' ? 'text-ai' : 'text-signal';
    return (
        <span className={`font-mono text-[0.8125rem] tracking-[0.12em] uppercase ${color} ${className}`}>
            {children}
        </span>
    );
}

export function CitationChip({ label, tone = 'signal' }) {
    const dot = tone === 'ai' ? 'var(--ai)' : 'var(--signal)';
    return (
        <span className="inline-flex items-center gap-2 font-mono text-[12px] text-text-mid bg-white/[0.04] border border-hairline rounded-full pl-2.5 pr-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} aria-hidden="true" />
            {label}
        </span>
    );
}

const DEFAULT_ENGINES = ['ChatGPT', 'Perplexity', 'Gemini', 'Google AI Overviews', 'Copilot'];

export function EngineRow({ label = 'Be the brand surfaced on', engines = DEFAULT_ENGINES }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-x-8 gap-y-4">
            <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-text-mid/70 flex-shrink-0">{label}</span>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3 list-none p-0 m-0">
                {engines.map((e) => (
                    <li key={e}
                        className="font-display text-[15px] sm:text-[16px] font-medium text-text-mid/55 hover:text-text-hi transition-colors duration-200">
                        {e}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * The hero signature. `query` and `brand` are abstract by default so the
 * claim stays honest. Renders fully resolved.
 */
export function AnswerEngine({
    query = 'best removals company in Newcastle',
    brand = 'Your brand',
    sources = ['ChatGPT', 'Google AI Overviews'],
}) {
    return (
        <div className="relative w-full max-w-[460px] mx-auto lg:mx-0">
            {/* soft glow behind the surface */}
            <div className="absolute -inset-6 rounded-[32px] opacity-60 blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(60% 60% at 70% 20%, var(--ai-soft), transparent 70%)' }} aria-hidden="true" />

            <div className="relative rounded-[24px] border border-hairline bg-ink-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
                {/* query bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-hairline">
                    <span className="font-mono text-[13px] text-signal" aria-hidden="true">&gt;_</span>
                    <span className="font-mono text-[13px] text-text-hi truncate">{query}</span>
                    <span className="ml-auto w-2 h-4 rounded-[2px] bg-signal/80" aria-hidden="true" />
                </div>

                {/* answer block */}
                <div className="relative px-5 py-5">
                    {/* subtle generative shimmer over the answer */}
                    <div className="ae-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />

                    <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-text-mid/70 mb-3">Answer</p>
                    <div className="space-y-2.5 mb-5" aria-hidden="true">
                        <div className="h-2.5 rounded-full bg-white/[0.08]" />
                        <div className="h-2.5 rounded-full bg-white/[0.08] w-[88%]" />
                        <div className="h-2.5 rounded-full bg-white/[0.08] w-[64%]" />
                    </div>

                    {/* the cited result the brand surfaced as the answer */}
                    <div className="relative rounded-[16px] border p-4"
                        style={{ borderColor: 'rgba(242,44,79,0.45)', background: 'var(--signal-soft)' }}>
                        <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-white px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--signal)' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" /> Cited
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="w-9 h-9 rounded-[10px] flex items-center justify-center font-display font-bold text-white text-[15px] flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, var(--signal), var(--signal-700))' }} aria-hidden="true">W</span>
                            <div>
                                <p className="font-display text-[16px] font-semibold text-text-hi leading-tight">{brand}</p>
                                <p className="font-mono text-[11px] text-text-mid">recommended source</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* citation footer — illustrative, never attributed to a real AI product */}
                <div className="flex flex-col gap-2 px-5 py-4 border-t border-hairline bg-ink-800/60">
                    <div className="flex flex-wrap items-center gap-2">
                        <CitationChip label="AI search result" />
                        <CitationChip label="Illustration" />
                    </div>
                    <span className="font-mono text-[10px] text-text-mid/60">Illustrative example, not a real AI response.</span>
                </div>
            </div>
        </div>
    );
}
