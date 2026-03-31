import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutValues from '@/components/about/AboutValues'
import AboutTeam from '@/components/about/AboutTeam'
import AboutServices from '@/components/about/AboutServices'
import AboutCTA from '@/components/about/AboutCTA'

export const metadata = {
  title: 'About Us | Best Web Design Agency UK | Webspires Limited',
  description:
    'Learn about Webspires Limited — the UK\'s results-driven web design and digital marketing agency based in Bolton. Meet our team, discover our values, and see why 500+ businesses trust us.',
  alternates: {
    canonical: 'https://webspires.co.uk/about-us/',
  },
  openGraph: {
    title: 'About Us | Best Web Design Agency UK | Webspires Limited',
    description:
      'Webspires is the UK\'s leading web design and digital marketing agency. Discover our story, values, and expert team.',
    url: 'https://webspires.co.uk/about-us/',
    images: [{ url: '/images/webspires-logo-icon.png', width: 1200, height: 630 }],
  },
}

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Webspires Limited',
  url: 'https://webspires.co.uk/about-us/',
  description:
    "UK's leading web design and digital marketing agency — Webspires Limited, Bolton.",
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
