import { notFound } from 'next/navigation'
import { getContentItems, getContentItem } from '@/lib/content'
import DeepServicePage from '@/components/services/DeepServicePage'

export const revalidate = 3600
export const dynamicParams = true

const SITE = 'https://webspires.co.uk'
const HUB = '/services/google-ads-management'

const OPTS = {
    hub: { label: 'Google Ads Management', href: HUB },
    breadcrumb: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Google Ads Management', href: HUB },
    ],
    utm: 'googleadschild',
    signature: false,
}

export async function generateStaticParams() {
    const items = await getContentItems('googleAdsChildren')
    return items.map((c) => ({ child: c.slug }))
}

export async function generateMetadata({ params }) {
    const { child } = await params
    const svc = await getContentItem('googleAdsChildren', child)
    if (!svc) return {}
    const url = `${SITE}${HUB}/${svc.slug}/`
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
            images: [{ url: `${SITE}/images/webspires-logo-icon.png`, width: 1200, height: 630, alt: `${svc.name} by Webspires` }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${SITE}/images/webspires-logo-icon.png`],
        },
    }
}

export default async function GoogleAdsChildPage({ params }) {
    const { child } = await params
    const items = await getContentItems('googleAdsChildren')
    const svc = items.find((c) => c.slug === child)
    if (!svc) notFound()
    const siblings = items.filter((c) => c.slug !== svc.slug)
    return <DeepServicePage svc={svc} siblings={siblings} opts={OPTS} />
}
