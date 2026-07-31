import ProjectsHero from '@/components/projects/ProjectsHero'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import ProjectsCTA from '@/components/projects/ProjectsCTA'
import { getContentItems } from '@/lib/content'

export const revalidate = false

export const metadata = {
  title: { absolute: 'Our Projects | Web Design & Marketing Portfolio | Webspires' },
  description:
    'Browse Webspires\' portfolio of completed UK projects web design, Shopify stores, SEO campaigns, Google Ads, Meta Ads, CRM systems, and social media management.',
  alternates: {
    canonical: 'https://webspires.co.uk/projects/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    title: 'Our Projects | Web Design & Marketing Portfolio | Webspires',
    description:
      'See how Webspires helps UK businesses grow online through web design, SEO, paid ads, and digital marketing.',
    url: 'https://webspires.co.uk/projects/',
    images: [{ url: '/images/webspires-logo-icon.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | Web Design & Marketing Portfolio | Webspires',
    description:
      'See how Webspires helps UK businesses grow online through web design, SEO, paid ads, and digital marketing.',
    images: ['/images/webspires-logo-icon.png'],
  },
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Webspires Projects Portfolio',
  url: 'https://webspires.co.uk/projects/',
  description: 'Portfolio of web design, SEO, and digital marketing projects by Webspires Limited, UK.',
}

export default async function ProjectsPage() {
  const projects = await getContentItems('projects')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema).replace(/</g, '\\u003c') }}
      />
      <ProjectsHero />
      <ProjectsGrid projects={projects} />
      <ProjectsCTA />
    </>
  )
}
