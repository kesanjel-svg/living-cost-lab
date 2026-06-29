import TodaySubsidies from '../components/TodaySubsidies'
import Hero from '../components/Hero'
import SupportFinder from '../features/support/components/SupportFinder'
import PopularCalculators from '../components/PopularCalculators'
import FeatureCards from '../components/FeatureCards'
import LatestBlog from '../components/LatestBlog'
import Seo from '../shared/seo/Seo'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
} from '../shared/seo/siteConfig'

export default function Home() {
  return (
    <>
      <Seo
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        keywords={DEFAULT_KEYWORDS}
        canonical="/"
        includeHomeSchemas
      />
      <TodaySubsidies />
      <Hero />
      <SupportFinder variant="compact" />
      <PopularCalculators />
      <FeatureCards />
      <LatestBlog />
    </>
  )
}
