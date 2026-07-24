import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildParentalLeaveResult,
  getParentalLeaveRecommendations,
  PARENTAL_LEAVE_DISCLAIMER,
  PARENTAL_LEAVE_SOURCE,
  PARENTAL_LEAVE_TIPS,
} from '../services/parentalLeaveService'

const LEAVE_MONTHS_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1)

export default function ParentalLeaveCalculator() {
  const [monthlyWage, setMonthlyWage] = useState('')
  const [leaveMonths, setLeaveMonths] = useState(12)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const wageValue = Number(monthlyWage)
    if (!monthlyWage.trim() || Number.isNaN(wageValue) || wageValue <= 0) {
      setError('0보다 큰 월 통상임금(세전, 원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    const built = buildParentalLeaveResult({
      monthlyOrdinaryWage: wageValue,
      leaveMonths,
    })
    setResult(built)
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'parental_leave',
      leave_months: leaveMonths,
    })
  }

  return (
    <CalculatorLayout
      title="육아휴직급여 계산기"
      description="월 통상임금과 육아휴직 사용 개월수를 입력하면 구간별 지급률·상한액을 반영한 예상 총 지급액을 확인할 수 있습니다."
    >
      <form className="calculator-input" onSubmit={handleSubmit}>
        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="parental-leave-wage">
            월 통상임금(세전, 원)
          </label>
          <input
            id="parental-leave-wage"
            type="number"
            min="1"
            step="1"
            className="calculator-input__field"
            placeholder="예: 3000000"
            value={monthlyWage}
            onChange={(event) => setMonthlyWage(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="parental-leave-months">
            육아휴직 사용 개월수
          </label>
          <select
            id="parental-leave-months"
            className="calculator-input__field calculator-input__field--select"
            value={leaveMonths}
            onChange={(event) => setLeaveMonths(Number(event.target.value))}
          >
            {LEAVE_MONTHS_OPTIONS.map((months) => (
              <option key={months} value={months}>
                {months}개월
              </option>
            ))}
          </select>
        </div>

        <p className="calculator-input__hint">
          1~3개월은 통상임금 100%(상한 250만원), 4~6개월은 100%(상한 200만원), 7개월부터는
          80%(상한 160만원)가 적용되며, 전 구간 공통 하한액은 70만원입니다.
        </p>

        {error && <p className="calculator-input__error">{error}</p>}

        <button type="submit" className="calculator-input__submit">
          예상 육아휴직급여 계산하기
        </button>
      </form>

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 총 지급액"
            resultAmount={result.totalBenefit}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            {result.monthlyBreakdown.map((segment, index) => (
              <li key={`${segment.fromMonth}-${segment.toMonth}`}>
                {result.segmentLabels[index]} 월 {formatCurrency(segment.amount)}
              </li>
            ))}
          </ul>

          <CalculatorTipCard tips={PARENTAL_LEAVE_TIPS} />

          <CalculatorRecommendCard items={getParentalLeaveRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={PARENTAL_LEAVE_SOURCE.label}
        url={PARENTAL_LEAVE_SOURCE.url}
        effectiveDate={PARENTAL_LEAVE_SOURCE.effectiveDate}
        note={PARENTAL_LEAVE_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
