import { Link } from 'react-router-dom'
import DetailSection from './DetailSection'
import './RelatedCalculators.css'

export default function RelatedCalculators({
  title = '관련 계산기',
  calculators = [],
  id = 'related-calculators',
}) {
  if (!calculators.length) {
    return null
  }

  return (
    <DetailSection id={id} title={title}>
      <ul className="related-calculators__list">
        {calculators.map((calculator) => (
          <li key={calculator.id} className="related-calculators__item">
            {calculator.available !== false ? (
              <Link to={calculator.href} className="related-calculators__link">
                {calculator.title}
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span className="related-calculators__pending">
                {calculator.title}
                <span className="related-calculators__badge">준비중</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </DetailSection>
  )
}
