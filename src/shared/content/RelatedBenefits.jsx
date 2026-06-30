import { Link } from 'react-router-dom'
import DetailSection from './DetailSection'
import './RelatedBenefits.css'

export default function RelatedBenefits({
  title = '관련 지원금',
  intro,
  programs = [],
  id = 'related-benefits',
}) {
  if (!programs.length) {
    return null
  }

  return (
    <DetailSection id={id} title={title}>
      {intro && <p className="related-benefits__intro">{intro}</p>}
      <div className="related-benefits__grid">
        {programs.map((program) => (
          <article key={program.id} className="related-benefits__card">
            <span className="related-benefits__category">{program.category}</span>
            <h3 className="related-benefits__title">{program.title}</h3>
            <p className="related-benefits__summary">{program.summary}</p>
            <Link
              to={`/support/${program.slug ?? program.id}`}
              className="related-benefits__link"
            >
              자세히 보기
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </DetailSection>
  )
}
