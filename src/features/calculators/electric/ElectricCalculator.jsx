import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorSavingCard from '../components/CalculatorSavingCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { getDefaultElectricUsageFromProfile } from '../../profile/services/profileService'
import { formatCurrency } from '../../../utils/formatCurrency'
import { SourceBadge } from '../../../shared/ui'
import {
  buildElectricResult,
  ELECTRIC_SOURCE,
  ELECTRIC_TIPS,
  getElectricRecommendations,
  isCurrentSummerPeriod,
} from '../services/electricService'

export default function ElectricCalculator() {
  const [usage, setUsage] = useState(() => getDefaultElectricUsageFromProfile())
  const [isSummer, setIsSummer] = useState(() => isCurrentSummerPeriod())
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleCalculate = () => {
    const value = Number(usage)

    if (!usage.trim() || Number.isNaN(value) || value <= 0) {
      setError('0보다 큰 사용량(kWh)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    setResult(buildElectricResult(value, isSummer))
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'electric',
      usage_kwh: value,
      is_summer_rate: isSummer,
    })
  }

  return (
    <CalculatorLayout
      title="전기요금 계산기"
      description="월 사용 전력(kWh)을 입력하면 예상 전기요금과 사용량 분석 결과를 확인할 수 있습니다."
    >
      <label className="calculator__summer-toggle">
        <input
          type="checkbox"
          checked={isSummer}
          onChange={(event) => setIsSummer(event.target.checked)}
        />
        하계요금(7~8월) 구간 적용
      </label>

      <CalculatorInputCard
        inputId="electric-usage"
        label="월 사용량(kWh)"
        placeholder="예: 100"
        value={usage}
        onChange={(event) => setUsage(event.target.value)}
        buttonText="예상 요금 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel="예상 전기요금"
            resultValue={formatCurrency(result.fee)}
            badge={result.badge}
            analysis={result.analysis}
            progressValue={result.progress}
            progressLabel={`${result.usage}kWh`}
          />

          <ul className="calculator__breakdown">
            <li>기본요금 {formatCurrency(result.breakdown.baseFee)}</li>
            <li>전력량요금 {formatCurrency(result.breakdown.energyCharge)}</li>
            <li>기후환경요금 {formatCurrency(result.breakdown.climateCharge)}</li>
            <li>연료비조정요금 {formatCurrency(result.breakdown.fuelAdjustment)}</li>
            <li>부가가치세 {formatCurrency(result.breakdown.vat)}</li>
            <li>전력산업기반기금 {formatCurrency(result.breakdown.fund)}</li>
          </ul>

          <CalculatorSavingCard
            savingItems={[
              `10% 줄이면 약 ${formatCurrency(result.savings10)} 절약`,
              `20% 줄이면 약 ${formatCurrency(result.savings20)} 절약`,
            ]}
          />

          <CalculatorTipCard tips={ELECTRIC_TIPS} />

          <CalculatorRecommendCard items={getElectricRecommendations(result.usage)} />
        </div>
      )}

      <SourceBadge
        label={ELECTRIC_SOURCE.label}
        url={ELECTRIC_SOURCE.url}
        effectiveDate={ELECTRIC_SOURCE.effectiveDate}
      />
    </CalculatorLayout>
  )
}
