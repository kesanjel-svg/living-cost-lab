import { Link } from 'react-router-dom'
import DetailSection from './DetailSection'
import './RelatedCalculators.css'

export default function RelatedCalculators({
  title = '관련 계산기',
  calculators = [],
  id = 'related-calculators',
}) {
  // 미제공(available: false) 계산기는 "준비중" 배지 대신 아예 노출하지 않는다.
  const availableCalculators = calculators.filter(
    (calculator) => calculator.available !== false,
  )

  if (!availableCalculators.length) {
    return null
  }

  return (
    <DetailSection id={id} title={title}>
      <ul className="related-calculators__list">
        {availableCalculators.map((calculator) => (
          <li key={calculator.id} className="related-calculators__item">
            <Link to={calculator.href} className="related-calculators__link">
              {calculator.title}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </DetailSection>
  )
}
