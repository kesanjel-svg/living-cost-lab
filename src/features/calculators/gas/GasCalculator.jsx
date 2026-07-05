import { useState } from 'react'
import { ANALYTICS_EVENTS, trackEvent } from '../../../shared/analytics'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorSavingCard from '../components/CalculatorSavingCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { formatCurrency } from '../../../utils/formatCurrency'
import {
  buildGasResult,
  DEFAULT_REGION_ID,
  GAS_TIPS,
  getGasRecommendations,
  getGasRegionOptions,
  USAGE_TYPES,
} from '../services/gasService'
import { getGasRegion } from '../services/gasRegions'

const REGION_OPTIONS = getGasRegionOptions()

export default function GasCalculator() {
  const [regionId, setRegionId] = useState(DEFAULT_REGION_ID)
  const [usageType, setUsageType] = useState(USAGE_TYPES.HEATING)
  const [usage, setUsage] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const region = getGasRegion(regionId)

  const handleCalculate = () => {
    const value = Number(usage)

    if (!usage.trim() || Number.isNaN(value) || value <= 0) {
      setError('0보다 큰 사용량(㎥)을 입력해주세요.')
      setResult(null)
      return
    }

    setError('')
    setResult(buildGasResult(value, regionId, usageType))
    trackEvent(ANALYTICS_EVENTS.CALCULATOR_SUBMIT, {
      calculator_name: 'gas',
      region_id: regionId,
      usage_type: usageType,
      usage_m3: value,
    })
  }

  return (
    <CalculatorLayout
      title="도시가스 계산기"
      description="지역과 월 사용량(㎥)을 입력하면 지역 도시가스사 요금표 기준 예상 요금을 확인할 수 있습니다."
    >
      <div className="calculator-input calculator-input--select">
        <label className="calculator-input__label" htmlFor="gas-region">
          지역
        </label>
        <select
          id="gas-region"
          className="calculator-input__field calculator-input__field--select"
          value={regionId}
          onChange={(event) => {
            setRegionId(event.target.value)
            setResult(null)
          }}
        >
          {REGION_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        {region && (
          <p className="calculator-input__hint">
            {region.provider}
            {region.effectiveDate ? ` · ${region.effectiveDate} 기준` : ''}
            {region.note ? ` — ${region.note}` : ''}
          </p>
        )}
      </div>

      <div className="calculator__type-toggle" role="radiogroup" aria-label="사용 용도">
        <label>
          <input
            type="radio"
            name="gas-usage-type"
            checked={usageType === USAGE_TYPES.HEATING}
            onChange={() => setUsageType(USAGE_TYPES.HEATING)}
          />
          개별난방용(취사+난방)
        </label>
        <label>
          <input
            type="radio"
            name="gas-usage-type"
            checked={usageType === USAGE_TYPES.COOKING}
            onChange={() => setUsageType(USAGE_TYPES.COOKING)}
          />
          취사용
        </label>
      </div>

      <CalculatorInputCard
        inputId="gas-usage"
        label="월 사용량(㎥)"
        placeholder="예: 30"
        value={usage}
        onChange={(event) => setUsage(event.target.value)}
        buttonText="예상 요금 계산하기"
        onCalculate={handleCalculate}
        error={error}
      />

      {result && (
        <div className="calculator__results">
          <CalculatorResultCard
            resultLabel={`예상 도시가스요금 (${result.breakdown.region.name})`}
            resultValue={formatCurrency(result.fee)}
            badge={result.badge}
            analysis={result.analysis}
            progressValue={result.progress}
            progressLabel={`${result.usage}㎥`}
            progressStartLabel="0㎥"
            progressEndLabel="100㎥+"
          />

          <ul className="calculator__breakdown">
            <li>환산 사용량 {result.breakdown.usageMJ.toLocaleString('ko-KR')}MJ</li>
            <li>기본요금 {formatCurrency(result.breakdown.baseFee)}</li>
            <li>사용량요금 {formatCurrency(result.breakdown.usageCharge)}</li>
            <li>부가가치세 {formatCurrency(result.breakdown.vat)}</li>
          </ul>

          <CalculatorSavingCard
            savingItems={[
              `10% 줄이면 약 ${formatCurrency(result.savings10)} 절약`,
              `20% 줄이면 약 ${formatCurrency(result.savings20)} 절약`,
            ]}
          />

          <CalculatorTipCard tips={GAS_TIPS} />

          <CalculatorRecommendCard items={getGasRecommendations(result.usage)} />
        </div>
      )}
    </CalculatorLayout>
  )
}
