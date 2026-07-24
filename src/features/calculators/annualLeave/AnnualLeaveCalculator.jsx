import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  ANNUAL_LEAVE_DISCLAIMER,
  ANNUAL_LEAVE_SOURCE,
  ANNUAL_LEAVE_TIPS,
  buildAnnualLeaveResult,
  getAnnualLeaveRecommendations,
} from '../services/annualLeaveService'

export default function AnnualLeaveCalculator() {
  const [startDate, setStartDate] = useState('')
  const [baseDate, setBaseDate] = useState('')
  const [usedLeaveDays, setUsedLeaveDays] = useState('')
  const [monthlyWage, setMonthlyWage] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!startDate || !baseDate) {
      setError('입사일과 연차 산정 기준일을 모두 입력해주세요.')
      setResult(null)
      return
    }

    if (new Date(baseDate) <= new Date(startDate)) {
      setError('연차 산정 기준일은 입사일보다 이후 날짜여야 합니다.')
      setResult(null)
      return
    }

    const wageValue = Number(monthlyWage)
    if (!monthlyWage.trim() || Number.isNaN(wageValue) || wageValue <= 0) {
      setError('0보다 큰 월 통상임금(세전, 원)을 입력해주세요.')
      setResult(null)
      return
    }

    const usedValue = Number(usedLeaveDays) || 0
    if (usedValue < 0) {
      setError('이미 사용한 연차일수는 0 이상이어야 합니다.')
      setResult(null)
      return
    }

    setError('')
    const built = buildAnnualLeaveResult({
      startDate,
      baseDate,
      usedLeaveDays: usedValue,
      monthlyWage: wageValue,
    })
    setResult(built)
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'annual_leave',
      tenure_years: built.tenureYears,
      unused_leave_days: built.unusedLeaveDays,
    })
  }

  return (
    <CalculatorLayout
      title="연차수당 계산기"
      description="입사일과 월 통상임금을 입력하면 근로기준법 기준 발생 연차일수와 예상 연차수당을 확인할 수 있습니다."
    >
      <form className="calculator-input" onSubmit={handleSubmit}>
        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="annual-leave-start">
            입사일
          </label>
          <input
            id="annual-leave-start"
            type="date"
            className="calculator-input__field"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="annual-leave-base">
            연차 산정 기준일
          </label>
          <input
            id="annual-leave-base"
            type="date"
            className="calculator-input__field"
            value={baseDate}
            onChange={(event) => setBaseDate(event.target.value)}
          />
          <p className="calculator-input__hint">
            보통 오늘 날짜 또는 퇴사 예정일을 입력합니다.
          </p>
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="annual-leave-used">
            이미 사용한 연차일수(선택)
          </label>
          <input
            id="annual-leave-used"
            type="number"
            min="0"
            step="1"
            className="calculator-input__field"
            placeholder="예: 5 (없으면 비워두세요)"
            value={usedLeaveDays}
            onChange={(event) => setUsedLeaveDays(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="annual-leave-wage">
            월 통상임금(세전, 원)
          </label>
          <input
            id="annual-leave-wage"
            type="number"
            min="1"
            step="1"
            className="calculator-input__field"
            placeholder="예: 3000000"
            value={monthlyWage}
            onChange={(event) => setMonthlyWage(event.target.value)}
          />
        </div>

        <p className="calculator-input__hint">
          발생 연차일수는 근로기준법 기준(1년 이상 15일, 3년 이상부터 매 2년마다 1일 가산, 최대
          25일)으로 자동 계산됩니다.
        </p>

        {error && <p className="calculator-input__error">{error}</p>}

        <button type="submit" className="calculator-input__submit">
          예상 연차수당 계산하기
        </button>
      </form>

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 연차수당"
            resultAmount={result.allowance}
            badge={result.badge}
            analysis={result.analysis}
          />

          <ul className="calculator__breakdown">
            <li>근속기간 {result.tenureYears}년({result.tenureDays}일)</li>
            <li>발생 연차일수 {result.accruedLeaveDays}일</li>
            <li>미사용 연차일수 {result.unusedLeaveDays}일</li>
            <li>1일 통상임금(근사) {formatCurrency(result.dailyOrdinaryWage)}</li>
          </ul>

          <CalculatorTipCard tips={ANNUAL_LEAVE_TIPS} />

          <CalculatorRecommendCard items={getAnnualLeaveRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={ANNUAL_LEAVE_SOURCE.label}
        url={ANNUAL_LEAVE_SOURCE.url}
        effectiveDate={ANNUAL_LEAVE_SOURCE.effectiveDate}
        note={ANNUAL_LEAVE_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
