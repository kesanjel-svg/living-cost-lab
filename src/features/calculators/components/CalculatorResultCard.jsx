import { formatCurrency } from '../../../utils/formatCurrency'
import useCountUp from '../hooks/useCountUp'

function AnimatedAmount({ amount }) {
  const animated = useCountUp(amount)
  return <p className="calculator-result__amount">{formatCurrency(animated)}</p>
}

export default function CalculatorResultCard({
  resultLabel,
  resultValue,
  resultAmount,
  badge,
  analysis,
  progressValue,
  progressLabel,
  progressStartLabel = '0kWh',
  progressEndLabel = '500kWh+',
}) {
  return (
    <div className="calculator-result-group">
      <div className="calculator-result__top">
        <p className="calculator-result__label">{resultLabel}</p>
        {badge && (
          <span
            className={`calculator-result__badge calculator-result__badge--${badge.variant}`}
          >
            {badge.label}
          </span>
        )}
      </div>
      {typeof resultAmount === 'number' ? (
        <AnimatedAmount amount={resultAmount} />
      ) : (
        <p className="calculator-result__amount">{resultValue}</p>
      )}

      {analysis && <p className="calculator-result__analysis">{analysis}</p>}

      {progressValue != null && (
        <div className="calculator-result__progress">
          <div className="calculator-result__progress-labels">
            <span>{progressStartLabel}</span>
            <span>{progressLabel}</span>
            <span>{progressEndLabel}</span>
          </div>
          <div className="calculator-result__progress-track">
            <div
              className="calculator-result__progress-bar"
              style={{ width: `${progressValue}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
