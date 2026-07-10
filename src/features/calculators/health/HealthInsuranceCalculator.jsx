import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildEmployeeHealthInsuranceResult,
  buildRegionalHealthInsuranceResult,
  getHealthInsuranceRecommendations,
  HEALTH_SOURCE,
  HEALTH_TIPS,
  INSURED_TYPES,
} from '../services/healthInsuranceService'

export default function HealthInsuranceCalculator() {
  const [insuredType, setInsuredType] = useState(INSURED_TYPES.EMPLOYEE)
  const [income, setIncome] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const isEmployee = insuredType === INSURED_TYPES.EMPLOYEE

  const handleTypeChange = (type) => {
    setInsuredType(type)
    setResult(null)
    setError('')
  }

  const handleCalculate = () => {
    const value = Number(income)

    if (!income.trim() || Number.isNaN(value) || value <= 0) {
      setError(
        isEmployee
          ? '0보다 큰 보수월액(원)을 입력해주세요.'
          : '0보다 큰 월 소득(원)을 입력해주세요.',
      )
      setResult(null)
      return
    }

    setError('')
    setResult(
      isEmployee
        ? buildEmployeeHealthInsuranceResult(value)
        : buildRegionalHealthInsuranceResult(value),
    )
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'health',
      insured_type: insuredType,
      monthly_income: value,
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
            checked={isEmployee}
            onChange={() => handleTypeChange(INSURED_TYPES.EMPLOYEE)}
          />
          직장가입자
        </label>
        <label>
          <input
            type="radio"
            name="insured-type"
            checked={!isEmployee}
            onChange={() => handleTypeChange(INSURED_TYPES.REGIONAL)}
          />
          지역가입자
        </label>
      </div>

      <CalculatorInputCard
        inputId="health-income"
        label={isEmployee ? '보수월액(원)' : '월 소득(원)'}
        placeholder="예: 3000000"
        value={income}
        onChange={(event) => setIncome(event.target.value)}
        buttonText="예상 보험료 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && result.insuredType === INSURED_TYPES.EMPLOYEE && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="내 부담분(근로자)"
            resultAmount={result.breakdown.employeeTotal}
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

      {result && result.insuredType === INSURED_TYPES.REGIONAL && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 보험료(간이 추정치)"
            resultAmount={result.breakdown.total}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            <li>건강보험료(소득 기반 추정) {formatCurrency(result.breakdown.incomeBasedEstimate)}</li>
            <li>장기요양보험료(추정) {formatCurrency(result.breakdown.longTermCareEstimate)}</li>
          </ul>

          <CalculatorTipCard tips={HEALTH_TIPS} />

          <CalculatorRecommendCard items={getHealthInsuranceRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={HEALTH_SOURCE.label}
        url={HEALTH_SOURCE.url}
        effectiveDate={HEALTH_SOURCE.effectiveDate}
      />
    </CalculatorLayout>
  )
}
