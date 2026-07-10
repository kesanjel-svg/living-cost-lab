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
  buildPensionResult,
  getPensionRecommendations,
  PENSION_SOURCE,
  PENSION_TIPS,
} from '../services/pensionService'

export default function PensionCalculator() {
  const [income, setIncome] = useState('')
  const [isEmployed, setIsEmployed] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const value = Number(income)

    if (!income.trim() || Number.isNaN(value) || value <= 0) {
      setError('0보다 큰 월 소득(원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    setResult(buildPensionResult(value, isEmployed))
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'pension',
      monthly_income: value,
      is_employed: isEmployed,
    })
  }

  return (
    <CalculatorLayout
      title="국민연금 계산기"
      description="월 소득을 입력하면 기준소득월액 상·하한액을 반영한 예상 국민연금 보험료를 확인할 수 있습니다."
    >
      <div className="calculator__type-toggle" role="radiogroup" aria-label="가입 유형">
        <label>
          <input
            type="radio"
            name="pension-type"
            checked={isEmployed}
            onChange={() => setIsEmployed(true)}
          />
          사업장가입자(근로자)
        </label>
        <label>
          <input
            type="radio"
            name="pension-type"
            checked={!isEmployed}
            onChange={() => setIsEmployed(false)}
          />
          지역가입자
        </label>
      </div>

      <CalculatorInputCard
        inputId="pension-income"
        label="월 소득(원)"
        placeholder="예: 3000000"
        value={income}
        onChange={(event) => setIncome(event.target.value)}
        buttonText="예상 보험료 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel={result.isEmployed ? '내 부담분(근로자)' : '납부 보험료(전액)'}
            resultAmount={result.breakdown.employeeShare}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            <li>기준소득월액 {formatCurrency(result.breakdown.incomeBase)}</li>
            <li>전체 보험료(9.5%) {formatCurrency(result.breakdown.totalContribution)}</li>
            {result.isEmployed && (
              <li>사업주 부담분 {formatCurrency(result.breakdown.employerShare)}</li>
            )}
          </ul>

          <CalculatorTipCard tips={PENSION_TIPS} />

          <CalculatorRecommendCard items={getPensionRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={PENSION_SOURCE.label}
        url={PENSION_SOURCE.url}
        effectiveDate={PENSION_SOURCE.effectiveDate}
      />
    </CalculatorLayout>
  )
}
