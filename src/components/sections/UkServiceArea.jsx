import Link from 'next/link';

const locations = [
    { city: 'London', href: '/locations/london' },
    { city: 'Manchester', href: '/locations/manchester' },
    { city: 'Birmingham', href: '/locations/birmingham' },
    { city: 'Leeds', href: '/locations/leeds' },
    { city: 'Glasgow', href: '/locations/glasgow' },
];

export default function UkServiceArea() {
    return (
        <section
            aria-labelledby="uk-area-heading"
            className="bg-[#faf9f7] py-16 lg:py-20"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                            UK-wide coverage
                        </span>
                        <h2
                            id="uk-area-heading"
                            className="text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold text-[#1a1a2e] leading-tight mb-4"
                        >
                            Digital Marketing Services for UK Businesses
                        </h2>
                        <p className="text-gray-500 text-[15px] leading-relaxed">
                            We work with businesses across the UK helping
                            local service providers, ecommerce brands, B2B
                            companies and professional firms improve
                            visibility, generate leads and track marketing
                            performance.
                        </p>
                    </div>

                    <div className="lg:col-span-6">
                        <div className="flex flex-wrap gap-3">
                            {locations.map(({ city, href }) => (
                                <Link
                                    key={city}
                                    href={href}
                                    className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-[14px] font-bold text-[#1a1a2e] transition-colors hover:border-primary hover:text-primary"
                                >
                                    <svg
                                        className="h-4 w-4 text-primary"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                        />
                                        <circle
                                            cx="12"
                                            cy="10"
                                            r="2.5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    Digital Marketing {city}
                                </Link>
                            ))}
                        </div>
                        <p className="mt-4 text-[12px] text-gray-400">
                            Remote-first with a UK-based team serving clients
                            nationwide.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
