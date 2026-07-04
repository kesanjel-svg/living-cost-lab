import { Link } from 'react-router-dom'
import HealthInsuranceCalculator from './HealthInsuranceCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '건강보험 계산기', path: '/calculators/health' },
]

const HEALTH_CALCULATOR_SCHEMA = {
  name: '건강보험 계산기',
  description: '보수월액으로 예상 건강보험료·장기요양보험료를 계산하는 무료 계산기',
  path: '/calculators/health',
}

export default function HealthInsuranceCalculatorPage() {
  return (
    <div className="page page--health-calculator">
      <Seo
        title={formatPageTitle('건강보험 계산기')}
        description="보수월액으로 예상 건강보험료와 장기요양보험료를 계산하세요. 국민건강보험공단 공식 요율을 반영한 무료 계산기입니다."
        keywords="건강보험 계산기, 건강보험료, 장기요양보험료, 국민건강보험공단"
        canonical="/calculators/health"
        breadcrumbs={BREADCRUMBS}
        calculators={[HEALTH_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <HealthInsuranceCalculator />
      </div>
    </div>
  )
}
