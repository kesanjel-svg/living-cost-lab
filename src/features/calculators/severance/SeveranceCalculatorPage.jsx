import { Link } from 'react-router-dom'
import SeveranceCalculator from './SeveranceCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '퇴직금 계산기', path: '/calculators/severance' },
]

const SEVERANCE_CALCULATOR_SCHEMA = {
  name: '퇴직금 계산기',
  description:
    '입사일·퇴사일과 급여 정보로 근로기준법 평균임금 산정 방식에 따른 예상 퇴직금을 계산하는 무료 계산기',
  path: '/calculators/severance',
}

export default function SeveranceCalculatorPage() {
  return (
    <div className="page page--severance-calculator">
      <Seo
        title={formatPageTitle('퇴직금 계산기')}
        description="입사일·퇴사일과 월급, 상여금, 연차수당을 입력하면 근로기준법 평균임금 산정 방식에 따른 예상 퇴직금을 확인할 수 있습니다. 무료 퇴직금 계산기."
        keywords="퇴직금 계산기, 퇴직금 계산 방법, 평균임금 계산, 퇴직금 지급 기준"
        canonical="/calculators/severance"
        breadcrumbs={BREADCRUMBS}
        calculators={[SEVERANCE_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <SeveranceCalculator />
      </div>
    </div>
  )
}
