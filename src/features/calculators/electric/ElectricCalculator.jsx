import { useState } from 'react'
import CalculatorLayout from '../components/CalculatorLayout'
import CalculatorInputCard from '../components/CalculatorInputCard'
import CalculatorResultCard from '../components/CalculatorResultCard'
import CalculatorSavingCard from '../components/CalculatorSavingCard'
import CalculatorTipCard from '../components/CalculatorTipCard'
import CalculatorRecommendCard from '../components/CalculatorRecommendCard'
import { getDefaultElectricUsageFromProfile } from '../../profile/services/profileService'
import { formatCurrency } from '../../../utils/formatCurrency'
import {
  buildElectricResult,
  ELECTRIC_TIPS,
  getElectricRecommendations,
} from '../services/electricService'

export default function ElectricCalculator() {
  const [usage, setUsage] = useState(() => getDefaultElectricUsageFromProfile())
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
    setResult(buildElectricResult(value))
  }

  return (
    <CalculatorLayout
      title="전기요금 계산기"
      description="월 사용 전력(kWh)을 입력하면 예상 전기요금과 사용량 분석 결과를 확인할 수 있습니다."
    >
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
    </CalculatorLayout>
  )
}
