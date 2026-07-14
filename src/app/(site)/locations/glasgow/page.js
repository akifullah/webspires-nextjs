import { notFound } from 'next/navigation'
import { getContentItem } from '@/lib/content'
import DeepServicePage from '@/components/services/DeepServicePage'

export const revalidate = 3600

const SITE = 'https://webspires.co.uk'
const SLUG = 'glasgow-location'

const OPTS = {
    hub: { label: 'Locations', href: '/locations' },
    relatedLabel: 'related',
    breadcrumb: [
        { name: 'Home', href: '/' },
        { name: 'Locations', href: '/locations' },
    ],
    utm: 'glasgow',
    signature: true,
}

export async function generateMetadata() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) return {}
    const url = `${SITE}/locations/glasgow/`
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
            images: [{ url: `${SITE}/images/webspires-logo-icon.png`, width: 1200, height: 630, alt: 'Digital marketing for Glasgow by Webspires' }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE}/images/webspires-logo-icon.png`],
        },
    }
}

export default async function GlasgowLocationPage() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) notFound()
    return <DeepServicePage svc={svc} siblings={[]} opts={OPTS} />
}
