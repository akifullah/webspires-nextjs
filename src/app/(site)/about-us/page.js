import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutValues from '@/components/about/AboutValues'
import AboutTeam from '@/components/about/AboutTeam'
import AboutServices from '@/components/about/AboutServices'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata = {
  // `absolute` bypasses the root "%s | Webspires" template (no doubling), and
  // the page-specific claim replaces the stale site-wide "Best Web Design" one.
  title: { absolute: 'About Us | Webspires' },
  description:
    'Learn about Webspires, a UK web design and digital marketing agency. Meet the team, discover our values, and see how we help businesses grow.',
  alternates: {
    canonical: 'https://webspires.co.uk/about-us/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    title: 'About Us | Webspires',
    description:
      'A UK web design and digital marketing agency. Discover our story, values, and team.',
    url: 'https://webspires.co.uk/about-us/',
    images: [{ url: '/images/webspires-logo-icon.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Webspires',
    description:
      'A UK web design and digital marketing agency. Discover our story, values, and team.',
    images: ['/images/webspires-logo-icon.png'],
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Webspires Limited',
  url: 'https://webspires.co.uk/about-us/',
  description:
    "UK's leading web design and digital marketing agency Webspires Limited, Bolton.",
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutServices />
      <AboutCTA />
    </>
  )
}
