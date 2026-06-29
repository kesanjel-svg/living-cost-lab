import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'
import './CostReportResults.css'

function ResultLinkList({ title, items }) {
  if (!items?.length) {
    return null
  }

  return (
    <section className="cost-report-results__section">
      <h3 className="cost-report-results__title">{title}</h3>
      <ul className="cost-report-results__list">
        {items.map((item) => (
          <li key={item.id ?? item.link} className="cost-report-results__item">
            {item.status ? (
              <span className="cost-report-results__pending">
                {item.title}
                <span className="cost-report-results__badge">{item.status}</span>
              </span>
            ) : (
              <Link to={item.link} className="cost-report-results__link">
                <span>{item.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
            {item.summary && (
              <p className="cost-report-results__desc">{item.summary}</p>
            )}
            {item.exampleSaving != null && (
              <p className="cost-report-results__saving">
                예상 절약 월 {formatCurrency(item.exampleSaving)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function CostReportResults({ report }) {
  return (
    <div className="cost-report-results">
      <div className="cost-report-results__highlight">
        <p className="cost-report-results__highlight-label">절약 가능 금액 (예시)</p>
        <p className="cost-report-results__highlight-value">
          월 {formatCurrency(report.estimatedMonthlySavings)}
        </p>
        <p className="cost-report-results__highlight-note">
          지원금·에너지·주거 절약을 합산한 참고 수치입니다.
        </p>
      </div>

      <div className="cost-report-results__grid">
        <ResultLinkList title="추천 지원금" items={report.supports} />
        <ResultLinkList title="추천 계산기" items={report.calculators} />
        <ResultLinkList title="추천 블로그" items={report.blogs} />
      </div>
    </div>
  )
}
