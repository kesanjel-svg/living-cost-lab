import { Link } from 'react-router-dom'
import NetSalaryCalculator from './NetSalaryCalculator'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '연봉 실수령액 계산기', path: '/calculators/net-salary' },
]

const NET_SALARY_CALCULATOR_SCHEMA = {
  name: '연봉 실수령액 계산기',
  description:
    '월급여와 부양가족 수로 4대보험료·소득세를 제외한 예상 실수령액을 계산하는 무료 계산기',
  path: '/calculators/net-salary',
}

export default function NetSalaryCalculatorPage() {
  return (
    <div className="page page--net-salary-calculator">
      <Seo
        title={formatPageTitle('연봉 실수령액 계산기')}
        description="월급여(세전)와 부양가족 수를 입력하면 국민연금·건강보험·고용보험·소득세를 제외한 예상 실수령액을 확인할 수 있습니다. 무료 연봉 실수령액 계산기."
        keywords="연봉 실수령액 계산기, 월급 실수령액, 세후 월급, 4대보험 계산기"
        canonical="/calculators/net-salary"
        breadcrumbs={BREADCRUMBS}
        calculators={[NET_SALARY_CALCULATOR_SCHEMA]}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <NetSalaryCalculator />
      </div>
    </div>
  )
}
