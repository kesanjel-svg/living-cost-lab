import Hero from '../components/Hero'
import PopularCalculators from '../components/PopularCalculators'
import LatestBlog from '../components/LatestBlog'
import AiDiagnosisBanner from '../features/home/components/AiDiagnosisBanner'
import HomeFaq from '../features/home/components/HomeFaq'
import HomeRecommendCards from '../features/home/components/HomeRecommendCards'
import LatestSupports from '../features/home/components/LatestSupports'
import { HOME_FAQ } from '../features/home/data/homeFaq'
import '../features/home/home-sections.css'
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
        faq={HOME_FAQ}
      />
      <Hero />
      <HomeRecommendCards />
      <LatestSupports />
      <PopularCalculators />
      <LatestBlog title="인기 블로그" />
      <AiDiagnosisBanner />
      <HomeFaq />
    </>
  )
}
