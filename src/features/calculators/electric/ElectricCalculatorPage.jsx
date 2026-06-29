import { Link } from 'react-router-dom'
import ElectricCalculator from './ElectricCalculator'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

export default function ElectricCalculatorPage() {
  return (
    <div className="page page--electric-calculator">
      <Seo
        title="전기요금 계산기 | 생활비연구소"
        description="월 전력 사용량(kWh)으로 예상 전기요금을 계산하고 절약 방법을 확인하세요."
        keywords="전기요금 계산기, 전기요금, 전력 사용량"
        canonical="/calculators/electric"
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <ElectricCalculator />
      </div>
    </div>
  )
}
