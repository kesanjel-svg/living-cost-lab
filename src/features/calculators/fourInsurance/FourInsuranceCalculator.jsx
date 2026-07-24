import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorBreakdownChart from '../components/CalculatorBreakdownChart'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import CalculatorResultAd from '../components/CalculatorResultAd'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildFourInsuranceResult,
  EMPLOYMENT_STABILITY_OPTIONS,
  FOUR_INSURANCE_DISCLAIMER,
  FOUR_INSURANCE_SOURCE,
  FOUR_INSURANCE_TIPS,
  getFourInsuranceRecommendations,
} from '../services/fourInsuranceService'

export default function FourInsuranceCalculator() {
  const [monthlyWage, setMonthlyWage] = useState('')
  const [companySizeId, setCompanySizeId] = useState(EMPLOYMENT_STABILITY_OPTIONS[0].id)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const wageValue = Number(monthlyWage)
    if (!monthlyWage.trim() || Number.isNaN(wageValue) || wageValue <= 0) {
      setError('0보다 큰 보수월액(세전, 원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    const built = buildFourInsuranceResult({ monthlyWage: wageValue, companySizeId })
    setResult(built)
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'four_insurance',
      company_size: companySizeId,
      monthly_wage: wageValue,
    })
  }

  return (
    <CalculatorLayout
      title="4대보험 계산기"
      description="보수월액을 입력하면 국민연금·건강보험·장기요양보험·고용보험의 근로자 부담분과 사업주 부담분을 함께 확인할 수 있습니다."
    >
      <form className="calculator-input" onSubmit={handleSubmit}>
        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="four-insurance-wage">
            보수월액(세전, 원)
          </label>
          <input
            id="four-insurance-wage"
            type="number"
            min="1"
            step="1"
            className="calculator-input__field"
            placeholder="예: 3500000"
            value={monthlyWage}
            onChange={(event) => setMonthlyWage(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="four-insurance-size">
            사업장 규모
          </label>
          <select
            id="four-insurance-size"
            className="calculator-input__field calculator-input__field--select"
            value={companySizeId}
            onChange={(event) => setCompanySizeId(event.target.value)}
          >
            {EMPLOYMENT_STABILITY_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="calculator-input__hint">
            사업장 규모는 사업주가 전액 부담하는 고용안정·직업능력개발사업 요율에만 영향을 줍니다.
          </p>
        </div>

        {error && <p className="calculator-input__error">{error}</p>}

        <button type="submit" className="calculator-input__submit">
          4대보험료 계산하기
        </button>
      </form>

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="근로자 부담 합계(월)"
            resultAmount={result.employee.total}
            badge={result.badge}
            analysis={result.analysis}
          />

          <CalculatorBreakdownChart
            title="근로자 부담 내역"
            items={[
              { label: '국민연금', value: result.employee.pension },
              { label: '건강보험', value: result.employee.health },
              { label: '장기요양보험', value: result.employee.longTermCare },
              { label: '고용보험', value: result.employee.employment },
            ]}
          />

          <ul className="calculator__breakdown">
            <li>
              <strong>사업주 부담 합계</strong> {formatCurrency(result.employer.total)}
            </li>
            <li>국민연금 {formatCurrency(result.employer.pension)}</li>
            <li>건강보험 {formatCurrency(result.employer.health)}</li>
            <li>장기요양보험 {formatCurrency(result.employer.longTermCare)}</li>
            <li>
              고용보험 {formatCurrency(result.employer.employment)} (실업급여 0.9% +
              고용안정·직업능력개발 {(result.stabilityRate * 100).toFixed(2)}%)
            </li>
            <li>
              <strong>노사 합계</strong> {formatCurrency(result.grandTotal)}
            </li>
          </ul>

          <CalculatorTipCard tips={FOUR_INSURANCE_TIPS} />

          <CalculatorRecommendCard items={getFourInsuranceRecommendations()} />

          <CalculatorResultAd />
        </div>
      )}

      <SourceBadge
        label={FOUR_INSURANCE_SOURCE.label}
        url={FOUR_INSURANCE_SOURCE.url}
        effectiveDate={FOUR_INSURANCE_SOURCE.effectiveDate}
        note={FOUR_INSURANCE_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
