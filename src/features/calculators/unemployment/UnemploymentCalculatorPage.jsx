import { Link } from 'react-router-dom'
import UnemploymentCalculator from './UnemploymentCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '실업급여 계산기', path: '/calculators/unemployment' },
]

const UNEMPLOYMENT_CALCULATOR_SCHEMA = {
  name: '실업급여(구직급여) 계산기',
  description:
    '나이·고용보험 가입기간과 이직 전 평균 월급여로 예상 구직급여 총액을 계산하는 무료 계산기',
  path: '/calculators/unemployment',
}

export default function UnemploymentCalculatorPage() {
  return (
    <div className="page page--unemployment-calculator">
      <Seo
        title={formatPageTitle('실업급여 계산기')}
        description="나이, 고용보험 가입기간, 이직 전 평균 월급여를 입력하면 소정급여일수와 1일 구직급여액을 반영한 예상 실업급여 총액을 확인할 수 있습니다. 무료 실업급여 계산기."
        keywords="실업급여 계산기, 구직급여 계산, 실업급여 조건, 소정급여일수"
        canonical="/calculators/unemployment"
        breadcrumbs={BREADCRUMBS}
        calculators={[UNEMPLOYMENT_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <UnemploymentCalculator />
      </div>
    </div>
  )
}
