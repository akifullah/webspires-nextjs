import ProjectsHero from '@/components/projects/ProjectsHero'
import ProjectsGrid from '@/components/projects/ProjectsGrid'
import ProjectsCTA from '@/components/projects/ProjectsCTA'

export const metadata = {
  title: 'Our Projects | Web Design & Digital Marketing Portfolio | Webspires UK',
  description:
    'Browse Webspires\' portfolio of 500+ completed UK projects — web design, Shopify stores, SEO campaigns, Google Ads, Meta Ads, CRM systems, and social media management.',
  alternates: {
    canonical: 'https://webspires.co.uk/projects/',
  },
  openGraph: {
    title: 'Our Projects | Web Design & Digital Marketing Portfolio | Webspires UK',
    description:
      'See how Webspires has helped 500+ UK businesses grow online through web design, SEO, paid ads, and digital marketing.',
    url: 'https://webspires.co.uk/projects/',
    images: [{ url: '/images/webspires-logo-icon.png', width: 1200, height: 630 }],
  },
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Webspires Projects Portfolio',
  url: 'https://webspires.co.uk/projects/',
  description: 'Portfolio of web design, SEO, and digital marketing projects by Webspires Limited, UK.',
}

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </>
  )
}
