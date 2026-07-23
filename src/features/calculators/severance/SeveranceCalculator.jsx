import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorBreakdownChart from '../components/CalculatorBreakdownChart'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildSeveranceResult,
  getSeveranceRecommendations,
  SEVERANCE_DISCLAIMER,
  SEVERANCE_SOURCE,
  SEVERANCE_TIPS,
} from '../services/severanceService'

export default function SeveranceCalculator() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [monthlyBase, setMonthlyBase] = useState('')
  const [monthlyAllowance, setMonthlyAllowance] = useState('')
  const [annualBonus, setAnnualBonus] = useState('')
  const [annualLeavePay, setAnnualLeavePay] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!startDate || !endDate) {
      setError('입사일과 퇴사일을 모두 입력해주세요.')
      setResult(null)
      return
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError('퇴사일은 입사일보다 이후 날짜여야 합니다.')
      setResult(null)
      return
    }

    const base = Number(monthlyBase)
    if (!monthlyBase.trim() || Number.isNaN(base) || base <= 0) {
      setError('0보다 큰 월 기본급(원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    const built = buildSeveranceResult({
      startDate,
      endDate,
      monthlyBase: base,
      monthlyAllowance: Number(monthlyAllowance) || 0,
      annualBonus: Number(annualBonus) || 0,
      annualLeavePay: Number(annualLeavePay) || 0,
    })
    setResult(built)
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'severance',
      tenure_days: built.tenureDays,
    })
  }

  return (
    <CalculatorLayout
      title="퇴직금 계산기"
      description="입사일·퇴사일과 급여 정보를 입력하면 근로기준법 평균임금 산정 방식에 따른 예상 퇴직금을 확인할 수 있습니다."
    >
      <form className="calculator-input" onSubmit={handleSubmit}>
        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-start">
            입사일
          </label>
          <input
            id="severance-start"
            type="date"
            className="calculator-input__field"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-end">
            퇴사일
          </label>
          <input
            id="severance-end"
            type="date"
            className="calculator-input__field"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-base">
            월 기본급(원)
          </label>
          <input
            id="severance-base"
            type="number"
            min="1"
            step="1"
            className="calculator-input__field"
            placeholder="예: 3000000"
            value={monthlyBase}
            onChange={(event) => setMonthlyBase(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-allowance">
            월 기타수당(원, 선택)
          </label>
          <input
            id="severance-allowance"
            type="number"
            min="0"
            step="1"
            className="calculator-input__field"
            placeholder="식대·직책수당 등, 없으면 비워두세요"
            value={monthlyAllowance}
            onChange={(event) => setMonthlyAllowance(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-bonus">
            연간 상여금 총액(원, 선택)
          </label>
          <input
            id="severance-bonus"
            type="number"
            min="0"
            step="1"
            className="calculator-input__field"
            placeholder="최근 1년간 받은 상여금 합계"
            value={annualBonus}
            onChange={(event) => setAnnualBonus(event.target.value)}
          />
        </div>

        <div className="calculator-input__group">
          <label className="calculator-input__label" htmlFor="severance-leave-pay">
            연차수당(원, 선택)
          </label>
          <input
            id="severance-leave-pay"
            type="number"
            min="0"
            step="1"
            className="calculator-input__field"
            placeholder="최근 1년간 받은 연차수당"
            value={annualLeavePay}
            onChange={(event) => setAnnualLeavePay(event.target.value)}
          />
        </div>

        <p className="calculator-input__hint">
          최근 3개월간 기본급·기타수당이 동일하다고 가정한 근사 계산입니다. 상여금·연차수당은 연간
          총액의 3/12만 평균임금에 반영됩니다.
        </p>

        {error && <p className="calculator-input__error">{error}</p>}

        <button type="submit" className="calculator-input__submit">
          예상 퇴직금 계산하기
        </button>
      </form>

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 퇴직금(세전)"
            resultAmount={result.severancePay}
            badge={result.badge}
            analysis={result.analysis}
          />

          <CalculatorBreakdownChart
            title="평균임금 산정 근거"
            items={[
              { label: '3개월 기본급+수당', value: result.breakdown.threeMonthWage },
              { label: '상여금 반영분(3/12)', value: result.breakdown.bonusPortion },
              { label: '연차수당 반영분(3/12)', value: result.breakdown.leavePayPortion },
            ]}
            note={`1일 평균임금 ${formatCurrency(result.averageDailyWage)} · 산정기간 ${result.periodTotalDays}일 기준`}
          />

          <CalculatorTipCard tips={SEVERANCE_TIPS} />

          <CalculatorRecommendCard items={getSeveranceRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={SEVERANCE_SOURCE.label}
        url={SEVERANCE_SOURCE.url}
        effectiveDate={SEVERANCE_SOURCE.effectiveDate}
        note={SEVERANCE_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
