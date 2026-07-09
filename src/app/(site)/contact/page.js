import Link from 'next/link';
import ContactForm from '@/components/sections/ContactForm';

export const metadata = {
    title: { absolute: 'Contact Us | Webspires' },
    description: 'Get in touch with Webspires for Web Design, SEO, Meta Ads, Google Ads, and CRM development. Have a cool project? Let’s talk.',
    alternates: { canonical: 'https://webspires.co.uk/contact/' }
};

const pageColor = '#EE314F'; // Brand primary color

export default function ContactUsPage() {
    return (
        <main className="bg-[#faf9f7] min-h-screen">
            {/* ── HERO ── */}
            <section className="relative overflow-hidden bg-[#1a1a2e] pt-28 pb-32 lg:pt-32 lg:pb-40">
                <div className="pointer-events-none absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
                    style={{ background: `radial-gradient(circle, ${pageColor} 0%, transparent 70%)` }} aria-hidden="true" />
                <div className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
                    style={{ background: `radial-gradient(circle, ${pageColor} 0%, transparent 70%)` }} aria-hidden="true" />

                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 text-center">
                    <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
                        <ol className="flex items-center gap-2 text-[13px] text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li aria-hidden="true" className="text-gray-600">/</li>
                            <li className="text-gray-200 font-medium">Contact Us</li>
                        </ol>
                    </nav>
                    <h1 className="text-[34px] sm:text-[48px] lg:text-[60px] font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                        Get In <span style={{ color: pageColor }}>Touch</span>
                    </h1>
                    <p className="text-gray-400 text-[18px] max-w-2xl mx-auto leading-relaxed">
                        Ready to elevate your digital presence? We&apos;re here to help you build, scale, and optimize. Let us know how we can collaborate.
                    </p>
                </div>
            </section>

            {/* ── CONTACT SECTION OVERLAPPING HERO ── */}
            <section className="relative z-20 -mt-20 lg:-mt-24 pb-20 lg:pb-32">
                <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row">

                        {/* Left Side: Contact Information */}
                        <div className="w-full lg:w-2/5 bg-[#1f1f33] text-white p-10 lg:p-14 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 translate-x-1/3 -translate-y-1/3 blur-3xl"
                                style={{ background: pageColor }} aria-hidden="true" />

                            <div className="relative z-10 h-full flex flex-col">
                                <h2 className="text-[28px] font-extrabold mb-2">Main Office</h2>
                                <p className="text-gray-400 mb-10">Reach out to us directly through any of these channels.</p>

                                <div className="space-y-8 flex-1">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                                            <PhoneIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-gray-400 uppercase tracking-widest font-bold mb-1">Call Us</p>
                                            <a href="tel:+441615241569" className="text-[18px] font-semibold hover:text-primary transition-colors">
                                                +44 161 524 1569
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                                            <MailIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-gray-400 uppercase tracking-widest font-bold mb-1">Email Us</p>
                                            <a href="mailto:info@webspires.co.uk" className="text-[18px] font-semibold hover:text-primary transition-colors break-all">
                                                info@webspires.co.uk
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                                            <MapPinIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-gray-400 uppercase tracking-widest font-bold mb-1">Location</p>
                                            <p className="text-[16px] leading-relaxed">
                                                39A Manchester Rd,<br />
                                                Bolton BL3 2NZ,<br />
                                                United Kingdom
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-[#25d366]/20 flex items-center justify-center flex-shrink-0 text-[#25d366]">
                                            <MessageCircleIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[13px] text-gray-400 uppercase tracking-widest font-bold mb-1">WhatsApp</p>
                                            <a href="https://wa.me/447825501690?text=Hello,%20I%20need%20some%20help%20regarding%20to%20website%20designing?"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-[16px] leading-relaxed hover:text-[#25d366] transition-colors">
                                                Chat with Support
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10">
                                    <p className="text-[14px] text-gray-400">
                                        <span className="font-bold text-white">Working Hours:</span><br />
                                        Monday - Friday: 9:00 AM - 6:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="w-full lg:w-3/5 p-10 lg:p-14 bg-white">
                            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#1a1a2e] leading-tight mb-8">
                                Have a Cool Project? Get in touch!
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Inline Icon Components
function PhoneIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}
function MailIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}
function MapPinIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    )
}
function MessageCircleIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
    )
}
