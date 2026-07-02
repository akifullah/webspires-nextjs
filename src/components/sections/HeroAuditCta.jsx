'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useActionState } from 'react';
import { submitContact } from '@/app/actions/contact';

const fieldCls =
    'w-full bg-[#faf9f7] border border-gray-200 rounded-xl px-4 py-3 text-[15px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200';

export default function HeroAuditCta() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [state, action, pending] = useActionState(submitContact, null);

    useEffect(() => setMounted(true), []);

    // Lock body scroll + close on Escape while the modal is open.
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    const modal = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Get a Free Growth Audit"
        >
            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
            />

            {/* Panel */}
            <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {state?.success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12l5 5L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-[22px] font-extrabold text-[#1a1a2e]">
                            Request received!
                        </h3>
                        <p className="max-w-sm text-[15px] text-gray-500">
                            Thanks — we&apos;ll review your details and get back
                            to you within 24 hours with your free growth audit.
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary/90"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="mb-1 font-mono text-[12px] uppercase tracking-widest text-primary">
                            Free · No obligation
                        </p>
                        <h2 className="mb-1.5 text-[22px] font-extrabold text-[#1a1a2e] sm:text-[24px]">
                            Get a Free Growth Audit
                        </h2>
                        <p className="mb-5 text-[14px] text-gray-500">
                            Tell us a little about your business and we&apos;ll
                            send over a tailored growth audit.
                        </p>

                        <form action={action} className="space-y-4">
                            <input type="hidden" name="source" value="Hero Growth Audit" />
                            {/* Honeypot hidden from humans */}
                            <input
                                type="text"
                                name="company_website"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                className="hidden"
                            />

                            <div>
                                <label htmlFor="audit-name" className="mb-1.5 block text-[13px] font-bold text-[#1a1a2e]">
                                    Name *
                                </label>
                                <input id="audit-name" type="text" name="name" required placeholder="John Doe" className={fieldCls} />
                            </div>

                            <div>
                                <label htmlFor="audit-email" className="mb-1.5 block text-[13px] font-bold text-[#1a1a2e]">
                                    Email *
                                </label>
                                <input id="audit-email" type="email" name="email" required placeholder="example@mail.com" className={fieldCls} />
                            </div>

                            <div>
                                <label htmlFor="audit-phone" className="mb-1.5 block text-[13px] font-bold text-[#1a1a2e]">
                                    Phone Number
                                </label>
                                <input id="audit-phone" type="tel" name="phone" placeholder="0712 312 3456" className={fieldCls} />
                            </div>

                            <div>
                                <label htmlFor="audit-message" className="mb-1.5 block text-[13px] font-bold text-[#1a1a2e]">
                                    What would you like help with? *
                                </label>
                                <textarea id="audit-message" name="message" required rows={3} placeholder="e.g. more leads from Google, a new website, SEO…" className={`${fieldCls} resize-y`} />
                            </div>

                            {state?.error && (
                                <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                                    {state.error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={pending}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-[15px] font-bold text-white transition-all duration-200 hover:bg-primary/90 disabled:opacity-60"
                            >
                                {pending ? 'Sending…' : 'Get My Free Audit'}
                            </button>

                            <p className="text-center text-[12px] text-gray-400">
                                By submitting, you agree to our{' '}
                                <Link href="/privacy-policy" className="underline hover:text-primary">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-lg transition-colors duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Get a Free Growth Audit
            </button>
            {open && mounted ? createPortal(modal, document.body) : null}
        </>
    );
}
