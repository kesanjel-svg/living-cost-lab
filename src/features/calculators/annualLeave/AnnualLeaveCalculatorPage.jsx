import { Link } from 'react-router-dom'
import AnnualLeaveCalculator from './AnnualLeaveCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '연차수당 계산기', path: '/calculators/annual-leave' },
]

const ANNUAL_LEAVE_CALCULATOR_SCHEMA = {
  name: '연차수당 계산기',
  description:
    '입사일과 월 통상임금으로 근로기준법 기준 발생 연차일수와 예상 연차수당을 계산하는 무료 계산기',
  path: '/calculators/annual-leave',
}

export default function AnnualLeaveCalculatorPage() {
  return (
    <div className="page page--annual-leave-calculator">
      <Seo
        title={formatPageTitle('연차수당 계산기')}
        description="입사일, 연차 산정 기준일, 월 통상임금을 입력하면 근로기준법 기준 발생 연차일수와 예상 연차수당을 확인할 수 있습니다. 무료 연차수당 계산기."
        keywords="연차수당 계산기, 연차수당 계산 방법, 연차 발생 기준, 미사용 연차수당"
        canonical="/calculators/annual-leave"
        breadcrumbs={BREADCRUMBS}
        calculators={[ANNUAL_LEAVE_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <AnnualLeaveCalculator />
      </div>
    </div>
  )
}
