export default function CalculatorResultCard({
  resultLabel,
  resultValue,
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
      <p className="calculator-result__amount">{resultValue}</p>

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
