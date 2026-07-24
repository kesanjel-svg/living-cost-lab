import { Link } from 'react-router-dom'
import ParentalLeaveCalculator from './ParentalLeaveCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '육아휴직급여 계산기', path: '/calculators/parental-leave' },
]

const PARENTAL_LEAVE_CALCULATOR_SCHEMA = {
  name: '육아휴직급여 계산기',
  description:
    '월 통상임금과 사용 개월수로 구간별 지급률·상한액을 반영한 예상 육아휴직급여 총액을 계산하는 무료 계산기',
  path: '/calculators/parental-leave',
}

export default function ParentalLeaveCalculatorPage() {
  return (
    <div className="page page--parental-leave-calculator">
      <Seo
        title={formatPageTitle('육아휴직급여 계산기')}
        description="월 통상임금과 육아휴직 사용 개월수를 입력하면 1~3개월·4~6개월·7개월 이후 구간별 지급률과 상한액을 반영한 예상 육아휴직급여 총액을 확인할 수 있습니다. 무료 육아휴직급여 계산기."
        keywords="육아휴직급여 계산기, 육아휴직 급여 계산, 육아휴직 상한액, 6+6 부모육아휴직제"
        canonical="/calculators/parental-leave"
        breadcrumbs={BREADCRUMBS}
        calculators={[PARENTAL_LEAVE_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <ParentalLeaveCalculator />
      </div>
    </div>
  )
}
