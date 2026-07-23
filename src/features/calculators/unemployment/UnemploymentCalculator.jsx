import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildUnemploymentResult,
  getUnemploymentRecommendations,
  INSURANCE_PERIOD_OPTIONS,
  UNEMPLOYMENT_DISCLAIMER,
  UNEMPLOYMENT_SOURCE,
  UNEMPLOYMENT_TIPS,
} from '../services/unemploymentService'

export default function UnemploymentCalculator() {
  const [age, setAge] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [insurancePeriodId, setInsurancePeriodId] = useState(INSURANCE_PERIOD_OPTIONS[2].id)
  const [monthlyWage, setMonthlyWage] = useState('')
  const [isInvoluntaryLeave, setIsInvoluntaryLeave] = useState(true)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const ageValue = Number(age)
    if (!age.trim() || Number.isNaN(ageValue) || ageValue < 15 || ageValue > 100) {
      setError('만 나이를 정확히 입력해주세요.')
      setResult(null)
      return
    }

    const wageValue = Number(monthlyWage)
    if (!monthlyWage.trim() || Number.isNaN(wageValue) || wageValue <= 0) {
      setError('0보다 큰 이직 전 평균 월급여(세전, 원)를 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    const built = buildUnemploymentResult({
      monthlyWage: wageValue,
      age: ageValue,
      isDisabled,
      insurancePeriodId,
      isInvoluntaryLeave,
    })
    setResult(built)
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'unemployment',
      insurance_period: insurancePeriodId,
      benefit_days: built.benefitDays,
    })
  }

  return (
    <CalculatorLayout
      title="실업급여(구직급여) 계산기"
      description="나이·고용보험 가입기간과 이직 전 평균 월급여를 입력하면 예상 구직급여 총액을 확인할 수 있습니다."
    >
      <form className="calculator-input" onSubmit={handleSubmit}>
        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="unemployment-age">
            만 나이
          </label>
          <input
            id="unemployment-age"
            type="number"
            min="15"
            max="100"
            step="1"
            className="calculator-input__field"
            placeholder="예: 35"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="unemployment-period">
            고용보험 가입기간
          </label>
          <select
            id="unemployment-period"
            className="calculator-input__field calculator-input__field--select"
            value={insurancePeriodId}
            onChange={(event) => setInsurancePeriodId(event.target.value)}
          >
            {INSURANCE_PERIOD_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="unemployment-wage">
            이직 전 평균 월급여(세전, 원)
          </label>
          <input
            id="unemployment-wage"
            type="number"
            min="1"
            step="1"
            className="calculator-input__field"
            placeholder="예: 3000000"
            value={monthlyWage}
            onChange={(event) => setMonthlyWage(event.target.value)}
          />
        </div>

        <div className="calculator__type-toggle">
          <label>
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(event) => setIsDisabled(event.target.checked)}
            />
            장애인입니다
          </label>
        </div>

        <div className="calculator__type-toggle">
          <label>
            <input
              type="checkbox"
              checked={isInvoluntaryLeave}
              onChange={(event) => setIsInvoluntaryLeave(event.target.checked)}
            />
            권고사직·계약만료·해고 등 비자발적 이직입니다
          </label>
        </div>

        <p className="calculator-input__hint">
          1일 평균임금은 이직 전 평균 월급여를 30으로 나눈 근사치이며, 상한(113,500원×60%=68,100원)과
          하한(66,048원) 사이로 제한됩니다.
        </p>

        {error && <p className="calculator-input__error">{error}</p>}

        <button type="submit" className="calculator-input__submit">
          예상 구직급여 계산하기
        </button>
      </form>

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 구직급여 총액"
            resultAmount={result.totalBenefit}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            <li>1일 평균임금(근사) {formatCurrency(result.averageDailyWage)}</li>
            <li>1일 구직급여액 {formatCurrency(result.dailyBenefit)}</li>
            <li>소정급여일수 {result.benefitDays}일</li>
            <li>
              {result.periodLabel}
              {result.isOver50OrDisabled ? ' · 50세 이상/장애인 기준' : ' · 50세 미만 기준'}
            </li>
          </ul>

          <CalculatorTipCard tips={UNEMPLOYMENT_TIPS} />

          <CalculatorRecommendCard items={getUnemploymentRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={UNEMPLOYMENT_SOURCE.label}
        url={UNEMPLOYMENT_SOURCE.url}
        effectiveDate={UNEMPLOYMENT_SOURCE.effectiveDate}
        note={UNEMPLOYMENT_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
