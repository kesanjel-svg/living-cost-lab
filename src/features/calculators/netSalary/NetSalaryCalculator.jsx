import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorBreakdownChart from '../components/CalculatorBreakdownChart'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { SourceBadge } from '../../../shared/ui'
import {
  buildNetSalaryResult,
  getNetSalaryRecommendations,
  NET_SALARY_DISCLAIMER,
  NET_SALARY_SOURCE,
  NET_SALARY_TIPS,
} from '../services/netSalaryService'

const FAMILY_COUNT_OPTIONS = [1, 2, 3, 4, 5, 6]

export default function NetSalaryCalculator() {
  const [familyCount, setFamilyCount] = useState(1)
  const [monthlyGross, setMonthlyGross] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const value = Number(monthlyGross)

    if (!monthlyGross.trim() || Number.isNaN(value) || value <= 0) {
      setError('0보다 큰 월급여(세전, 원)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    setResult(buildNetSalaryResult(value, familyCount))
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'net_salary',
      family_count: familyCount,
      monthly_gross: value,
    })
  }

  return (
    <CalculatorLayout
      title="연봉 실수령액 계산기"
      description="월급여(세전)와 부양가족 수를 입력하면 4대보험료·소득세를 제외한 예상 실수령액을 확인할 수 있습니다."
    >
      <div className="calculator-input calculator-input--select">
        <label className="calculator-input__label" htmlFor="net-salary-family">
          부양가족 수(본인 포함)
        </label>
        <select
          id="net-salary-family"
          className="calculator-input__field calculator-input__field--select"
          value={familyCount}
          onChange={(event) => {
            setFamilyCount(Number(event.target.value))
            setResult(null)
          }}
        >
          {FAMILY_COUNT_OPTIONS.map((count) => (
            <option key={count} value={count}>
              {count}명{count === 1 ? ' (본인만)' : ''}
            </option>
          ))}
        </select>
        <p className="calculator-input__hint">
          경로우대·장애인 등 추가 인적공제는 반영하지 않습니다.
        </p>
      </div>

      <CalculatorInputCard
        inputId="net-salary-gross"
        label="월급여(세전, 원)"
        placeholder="예: 3500000"
        value={monthlyGross}
        onChange={(event) => setMonthlyGross(event.target.value)}
        buttonText="실수령액 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 실수령액"
            resultAmount={result.netSalary}
            badge={result.badge}
            analysis={result.analysis}
          />

          <CalculatorBreakdownChart
            title="공제 내역"
            items={[
              { label: '국민연금', value: result.breakdown.pension },
              { label: '건강보험', value: result.breakdown.health },
              { label: '장기요양보험', value: result.breakdown.longTermCare },
              { label: '고용보험', value: result.breakdown.employmentInsurance },
              { label: '소득세', value: result.breakdown.incomeTax },
              { label: '지방소득세', value: result.breakdown.localIncomeTax },
            ]}
          />

          <CalculatorTipCard tips={NET_SALARY_TIPS} />

          <CalculatorRecommendCard items={getNetSalaryRecommendations()} />
        </div>
      )}

      <SourceBadge
        label={NET_SALARY_SOURCE.label}
        url={NET_SALARY_SOURCE.url}
        effectiveDate={NET_SALARY_SOURCE.effectiveDate}
        note={NET_SALARY_DISCLAIMER}
      />
    </CalculatorLayout>
  )
}
