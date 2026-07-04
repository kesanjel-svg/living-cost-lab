import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import {
  buildEmployeeHealthInsuranceResult,
  getHealthInsuranceRecommendations,
  HEALTH_TIPS,
  INSURED_TYPES,
} from '../services/healthInsuranceService'

export default function HealthInsuranceCalculator() {
  const [insuredType, setInsuredType] = useState(INSURED_TYPES.EMPLOYEE)
  const [wage, setWage] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const value = Number(wage)

    if (!wage.trim() || Number.isNaN(value) || value <= 0) {
      setError('0보다 큰 보수월액(원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    setResult(buildEmployeeHealthInsuranceResult(value))
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'health',
      insured_type: insuredType,
      monthly_wage: value,
    })
  }

  return (
    <CalculatorLayout
      title="건강보험료 계산기"
      description="가입 유형에 따라 예상 건강보험료와 장기요양보험료를 확인할 수 있습니다."
    >
      <div className="calculator__type-toggle" role="tablist" aria-label="가입 유형">
        <label>
          <input
            type="radio"
            name="insured-type"
            checked={insuredType === INSURED_TYPES.EMPLOYEE}
            onChange={() => {
              setInsuredType(INSURED_TYPES.EMPLOYEE)
              setResult(null)
            }}
          />
          직장가입자
        </label>
        <label className="calculator__type-toggle-disabled">
          <input type="radio" name="insured-type" disabled />
          지역가입자 (준비중)
        </label>
      </div>

      <CalculatorInputCard
        inputId="health-wage"
        label="보수월액(원)"
        placeholder="예: 3000000"
        value={wage}
        onChange={(event) => setWage(event.target.value)}
        buttonText="예상 보험료 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="내 부담분(근로자)"
            resultValue={formatCurrency(result.breakdown.employeeTotal)}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            <li>건강보험료(전체) {formatCurrency(result.breakdown.totalHealthInsurance)}</li>
            <li>건강보험료(근로자分) {formatCurrency(result.breakdown.employeeHealthShare)}</li>
            <li>건강보험료(사업주分) {formatCurrency(result.breakdown.employerHealthShare)}</li>
            <li>장기요양보험료(전체) {formatCurrency(result.breakdown.totalLongTermCare)}</li>
            <li>장기요양보험료(근로자分) {formatCurrency(result.breakdown.employeeLongTermShare)}</li>
          </ul>

          <CalculatorTipCard tips={HEALTH_TIPS} />

          <CalculatorRecommendCard items={getHealthInsuranceRecommendations()} />
        </div>
      )}
    </CalculatorLayout>
  )
}
