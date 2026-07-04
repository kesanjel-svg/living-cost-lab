import { Link } from 'react-router-dom'
import PensionCalculator from './PensionCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '국민연금 계산기', path: '/calculators/pension' },
]

const PENSION_CALCULATOR_SCHEMA = {
  name: '국민연금 계산기',
  description: '월 소득으로 예상 국민연금 보험료를 계산하는 무료 계산기',
  path: '/calculators/pension',
}

export default function PensionCalculatorPage() {
  return (
    <div className="page page--pension-calculator">
      <Seo
        title={formatPageTitle('국민연금 계산기')}
        description="월 소득으로 예상 국민연금 보험료(사업장가입자/지역가입자)를 계산하세요. 기준소득월액 상·하한액을 반영한 무료 계산기입니다."
        keywords="국민연금 계산기, 국민연금 보험료, 기준소득월액, 국민연금공단"
        canonical="/calculators/pension"
        breadcrumbs={BREADCRUMBS}
        calculators={[PENSION_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <PensionCalculator />
      </div>
    </div>
  )
}
