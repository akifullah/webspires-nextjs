import { notFound } from 'next/navigation'
import { getContentItems, getContentItem } from '@/lib/content'
import DeepServicePage from '@/components/services/DeepServicePage'

export const revalidate = 3600
export const dynamicParams = true

const SITE = 'https://webspires.co.uk'
const HUB = '/services/seo'

const OPTS = {
    hub: { label: 'SEO', href: HUB },
    breadcrumb: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'SEO', href: HUB },
    ],
    utm: 'seochild',
    signature: true,
}

export async function generateStaticParams() {
    const items = await getContentItems('seoChildren')
    return items.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const svc = await getContentItem('seoChildren', slug)
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
    }
}

export default async function SeoChildPage({ params }) {
    const { slug } = await params
    const items = await getContentItems('seoChildren')
    const svc = items.find((c) => c.slug === slug)
    if (!svc) notFound()
    const siblings = items.filter((c) => c.slug !== svc.slug)
    return <DeepServicePage svc={svc} siblings={siblings} opts={OPTS} />
}
