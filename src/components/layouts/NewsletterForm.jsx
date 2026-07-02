'use client';

import { useActionState } from 'react';
import { subscribeNewsletter } from '@/app/actions/newsletter';

export default function NewsletterForm({ source = 'Footer' }) {
    const [state, action, pending] = useActionState(subscribeNewsletter, null);

    return (
        <div>
            <form action={action} className="flex gap-2">
                <input type="hidden" name="source" value={source} />
                {/* Honeypot: hidden from humans, bots tend to fill it. */}
                <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                />
                <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    aria-label="Email for newsletter"
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button
                    id="footer-newsletter-submit"
                    type="submit"
                    disabled={pending}
                    aria-label="Subscribe to newsletter"
                    className="flex-shrink-0 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-[12px] font-bold rounded-lg transition-all duration-200 whitespace-nowrap disabled:opacity-60"
                >
                    {pending ? 'Subscribing…' : 'Subscribe'}
                </button>
            </form>

            {state?.error ? (
                <p className="text-[11px] text-red-400 mt-2">{state.error}</p>
            ) : state?.success ? (
                <p className="text-[11px] text-green-400 mt-2">
                    {state.success}
                </p>
            ) : (
                <p className="text-[11px] text-gray-600 mt-2">
                    No spam. Unsubscribe anytime.
                </p>
            )}
        </div>
    );
}
