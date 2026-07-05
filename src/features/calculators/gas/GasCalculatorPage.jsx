import { Link } from 'react-router-dom'
import GasCalculator from './GasCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '도시가스 계산기', path: '/calculators/gas' },
]

const GAS_CALCULATOR_SCHEMA = {
  name: '도시가스 계산기',
  description:
    '지역별 도시가스사 요금표 기준으로 월 사용량(㎥)으로 예상 도시가스요금을 계산하는 무료 계산기',
  path: '/calculators/gas',
}

export default function GasCalculatorPage() {
  return (
    <div className="page page--gas-calculator">
      <Seo
        title={formatPageTitle('도시가스 계산기')}
        description="서울·부산·대구·인천·광주·대전 지역 도시가스사 요금표 기준으로 예상 도시가스요금을 계산하세요. 무료 도시가스 계산기로 생활비를 점검해보세요."
        keywords="도시가스 계산기, 도시가스 요금, 가스비 계산기, 도시가스 요금표"
        canonical="/calculators/gas"
        breadcrumbs={BREADCRUMBS}
        calculators={[GAS_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <GasCalculator />
      </div>
    </div>
  )
}
