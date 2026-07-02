import { formatCurrency } from '../../../utils/formatCurrency'
import './SavingsBreakdown.css'

export default function SavingsBreakdown({ breakdown, total }) {
  if (!breakdown?.items?.length) {
    return null
  }

  return (
    <section className="savings-breakdown" aria-labelledby="savings-breakdown-title">
      <h2 id="savings-breakdown-title" className="savings-breakdown__title">
        절약 예상 금액
      </h2>
      <p className="savings-breakdown__desc">
        지원금·주거·에너지 절약을 합산한 참고 수치입니다.
      </p>
      <ul className="savings-breakdown__list">
        {breakdown.items.map((item) => (
          <li key={item.id} className="savings-breakdown__item">
            <div className="savings-breakdown__item-head">
              <span className="savings-breakdown__label">{item.label}</span>
              <strong className="savings-breakdown__amount">
                월 {formatCurrency(item.amount)}
              </strong>
            </div>
            <p className="savings-breakdown__note">{item.note}</p>
          </li>
        ))}
      </ul>
      <div className="savings-breakdown__total">
        <span>합계 (예상)</span>
        <strong>월 {formatCurrency(total ?? breakdown.total)}</strong>
      </div>
    </section>
  )
}
