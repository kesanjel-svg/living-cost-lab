import { Link } from 'react-router-dom'
import FourInsuranceCalculator from './FourInsuranceCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '4대보험 계산기', path: '/calculators/four-insurance' },
]

const FOUR_INSURANCE_CALCULATOR_SCHEMA = {
  name: '4대보험 계산기',
  description:
    '보수월액으로 국민연금·건강보험·장기요양보험·고용보험의 근로자 부담분과 사업주 부담분을 함께 계산하는 무료 계산기',
  path: '/calculators/four-insurance',
}

export default function FourInsuranceCalculatorPage() {
  return (
    <div className="page page--four-insurance-calculator">
      <Seo
        title={formatPageTitle('4대보험 계산기')}
        description="보수월액을 입력하면 국민연금·건강보험·장기요양보험·고용보험료의 근로자 부담분과 사업주 부담분을 한 번에 확인할 수 있습니다. 무료 4대보험 계산기."
        keywords="4대보험 계산기, 4대보험 요율, 사업주 부담금, 국민연금 건강보험 고용보험 계산"
        canonical="/calculators/four-insurance"
        breadcrumbs={BREADCRUMBS}
        calculators={[FOUR_INSURANCE_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <FourInsuranceCalculator />
      </div>
    </div>
  )
}
