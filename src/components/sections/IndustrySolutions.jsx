import Link from 'next/link';

const industries = [
    { name: 'Local businesses', desc: 'Local SEO, Google Business Profile & lead generation.', href: '/industries/local-businesses' },
    { name: 'Ecommerce brands', desc: 'Shopify, paid social, shopping ads & CRO.', href: '/industries/ecommerce' },
    { name: 'B2B companies', desc: 'Demand generation, content & long sales-cycle nurture.', href: '/industries/b2b-companies' },
    { name: 'Startups', desc: 'Launch sites, growth experiments & rapid iteration.', href: '/services/web-design' },
    { name: 'Professional services', desc: 'Authority content, SEO & qualified enquiry generation.', href: '/industries/professional-services' },
    { name: 'Healthcare & clinics', desc: 'Local visibility, trust signals & compliant campaigns.', href: '/industries/healthcare-clinics' },
    { name: 'Real estate', desc: 'High-intent search, landing pages & lead capture.', href: '/industries/real-estate' },
    { name: 'Restaurants & hospitality', desc: 'Local search, bookings & social engagement.', href: '/industries/local-businesses' },
];

export default function IndustrySolutions() {
    return (
        <section
            aria-labelledby="industry-heading"
            className="bg-white py-16 lg:py-20"
        >
            <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                <div className="text-center mb-12">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                        Built around your business
                    </span>
                    <h2
                        id="industry-heading"
                        className="text-[26px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#1a1a2e] leading-tight"
                    >
                        Digital Growth Solutions for Different Business Types
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {industries.map((ind) => (
                        <Link
                            key={ind.name}
                            href={ind.href}
                            className="group flex flex-col rounded-2xl border border-gray-100 bg-[#faf9f7] p-6 transition-colors duration-200 hover:border-primary/30 hover:bg-white"
                        >
                            <h3 className="text-[15px] font-extrabold text-[#1a1a2e] mb-2 group-hover:text-primary transition-colors">
                                {ind.name}
                            </h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">
                                {ind.desc}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-primary">
                                Explore
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
