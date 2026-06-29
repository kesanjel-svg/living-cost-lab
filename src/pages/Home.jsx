import TodaySubsidies from '../components/TodaySubsidies'
import Hero from '../components/Hero'
import SupportFinder from '../features/support/components/SupportFinder'
import PopularCalculators from '../components/PopularCalculators'
import FeatureCards from '../components/FeatureCards'
import LatestBlog from '../components/LatestBlog'
import Seo from '../shared/seo/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="생활비연구소 | 정부지원금 · 생활비 계산 플랫폼"
        description="정부지원금 찾기, 전기요금 계산기, 생활비 절약 정보를 한곳에서 확인하는 생활비 플랫폼입니다."
        keywords="생활비, 정부지원금, 전기요금, 생활비 계산기, 절약"
        canonical="/"
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
