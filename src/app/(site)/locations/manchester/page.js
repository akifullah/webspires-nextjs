import { notFound } from 'next/navigation'
import { getContentItem } from '@/lib/content'
import { getSettings } from '@/lib/settings'
import DeepServicePage from '@/components/services/DeepServicePage'

export const revalidate = false

const SITE = 'https://webspires.co.uk'
const SLUG = 'manchester-location'

const OPTS = {
    hub: { label: 'Locations', href: '/locations' },
    relatedLabel: 'related',
    breadcrumb: [
        { name: 'Home', href: '/' },
        { name: 'Locations', href: '/locations' },
    ],
    utm: 'manchester',
    signature: true,
}

export async function generateMetadata() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) return {}
    const url = `${SITE}/locations/manchester/`
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
            images: [{ url: `${SITE}/images/webspires-logo-icon.png`, width: 1200, height: 630, alt: 'Digital marketing for Greater Manchester by Webspires' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE}/images/webspires-logo-icon.png`],
        },
    }
}

export default async function ManchesterLocationPage() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) notFound()

    // Honest LocalBusiness schema — the REAL registered Bolton address, area
    // served Greater Manchester. Unlike the London page, proximity is genuine
    // here, so this signal is truthful. Distinct @id from the site-wide node.
    let settings = {}
    try { settings = await getSettings() } catch { /* fall back to defaults below */ }
    const localBusiness = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE}/locations/manchester/#localbusiness`,
        name: 'Webspires Limited',
        url: `${SITE}/locations/manchester/`,
        telephone: settings.phone || '+44 161 524 1569',
        address: {
            '@type': 'PostalAddress',
            streetAddress: settings.addressStreet || '39A Manchester Rd',
            addressLocality: settings.addressLocality || 'Bolton',
            addressRegion: 'Greater Manchester',
            postalCode: settings.addressPostalCode || 'BL3 2NZ',
            addressCountry: settings.addressCountry || 'GB',
        },
        areaServed: 'Greater Manchester',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, '\\u003c') }}
            />
            <DeepServicePage svc={svc} siblings={[]} opts={OPTS} />
        </>
    )
}
