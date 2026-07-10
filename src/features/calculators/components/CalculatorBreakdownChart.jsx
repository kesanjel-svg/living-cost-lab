import { formatCurrency } from '../../../utils/formatCurrency'

/**
 * 요금 구성 스택 바 차트.
 * 청구액이 어떤 항목으로 이루어지는지 비율 막대 + 범례로 보여준다.
 * 라이브러리 없이 CSS만 사용 — items: [{ label, value }]
 */
export default function CalculatorBreakdownChart({ title = '요금 구성', items, note }) {
  const validItems = (items || []).filter((item) => item && item.value > 0)
  const total = validItems.reduce((sum, item) => sum + item.value, 0)

  if (!total) {
    return null
  }

  return (
    <div className="calculator-chart">
      <p className="calculator-chart__title">{title}</p>

      <div
        className="calculator-chart__bar"
        role="img"
        aria-label={validItems
          .map((item) => `${item.label} ${formatCurrency(item.value)}`)
          .join(', ')}
      >
        {validItems.map((item, index) => (
          <span
            key={item.label}
            className={`calculator-chart__segment calculator-chart__segment--${index % 6}`}
            style={{ width: `${(item.value / total) * 100}%` }}
          />
        ))}
      </div>

      <ul className="calculator-chart__legend">
        {validItems.map((item, index) => (
          <li key={item.label} className="calculator-chart__legend-item">
            <span
              className={`calculator-chart__dot calculator-chart__segment--${index % 6}`}
            />
            <span className="calculator-chart__label">{item.label}</span>
            <span className="calculator-chart__value">
              {formatCurrency(item.value)}
              <em className="calculator-chart__percent">
                {Math.round((item.value / total) * 100)}%
              </em>
            </span>
          </li>
        ))}
      </ul>

      {note && <p className="calculator-chart__note">{note}</p>}
    </div>
  )
}
