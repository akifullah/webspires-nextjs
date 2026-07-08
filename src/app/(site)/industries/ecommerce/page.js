import { notFound } from 'next/navigation'
import { getContentItem } from '@/lib/content'
import DeepServicePage from '@/components/services/DeepServicePage'

export const revalidate = 3600

const SITE = 'https://webspires.co.uk'
const SLUG = 'ecommerce-industry'

const OPTS = {
    hub: { label: 'Industries', href: '/industries' },
    relatedLabel: 'ecommerce',
    breadcrumb: [
        { name: 'Home', href: '/' },
        { name: 'Industries', href: '/industries' },
    ],
    utm: 'ecommerceindustry',
    signature: true,
}

export async function generateMetadata() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) return {}
    const url = `${SITE}/industries/ecommerce/`
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
    }
}

export default async function EcommerceIndustryPage() {
    const svc = await getContentItem('deepPages', SLUG)
    if (!svc) notFound()
    return <DeepServicePage svc={svc} siblings={[]} opts={OPTS} />
}
