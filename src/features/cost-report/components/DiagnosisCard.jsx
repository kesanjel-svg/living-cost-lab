import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'
import './DiagnosisCard.css'

function getScoreLabel(score) {
  if (score >= 75) {
    return '양호'
  }
  if (score >= 50) {
    return '보통'
  }
  return '주의'
}

export default function DiagnosisCard({ report }) {
  const { score, savingsPotential, supports, nextActions, summary } = report
  const scoreLabel = getScoreLabel(score)

  return (
    <article className="diagnosis-card">
      <div className="diagnosis-card__score-block">
        <div
          className="diagnosis-card__ring"
          style={{ '--score': score }}
          aria-hidden="true"
        >
          <span className="diagnosis-card__score-value">{score}</span>
        </div>
        <div className="diagnosis-card__score-meta">
          <p className="diagnosis-card__eyebrow">생활비 점수</p>
          <h2 className="diagnosis-card__score-title">
            {score}점 · {scoreLabel}
          </h2>
          <p className="diagnosis-card__summary">{summary}</p>
        </div>
      </div>

      <div className="diagnosis-card__metrics">
        <div className="diagnosis-card__metric">
          <span className="diagnosis-card__metric-label">절약 가능성</span>
          <span
            className={`diagnosis-card__badge diagnosis-card__badge--${savingsPotential.level}`}
          >
            {savingsPotential.label}
          </span>
        </div>
        <div className="diagnosis-card__metric">
          <span className="diagnosis-card__metric-label">예상 절약 금액</span>
          <strong className="diagnosis-card__metric-value">
            월 {formatCurrency(report.estimatedMonthlySavings)}
          </strong>
          <span className="diagnosis-card__metric-note">예시 데이터 기준</span>
        </div>
        <div className="diagnosis-card__metric">
          <span className="diagnosis-card__metric-label">추천 지원금</span>
          <strong className="diagnosis-card__metric-value">
            {supports.length}건
          </strong>
        </div>
      </div>

      {supports.length > 0 && (
        <div className="diagnosis-card__supports">
          <h3 className="diagnosis-card__section-title">정부지원금 추천</h3>
          <ul className="diagnosis-card__support-list">
            {supports.map((item) => (
              <li key={item.id}>
                <Link to={item.link} className="diagnosis-card__support-link">
                  {item.title}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nextActions.length > 0 && (
        <div className="diagnosis-card__actions">
          <h3 className="diagnosis-card__section-title">다음 행동 제안</h3>
          <ul className="diagnosis-card__action-list">
            {nextActions.map((action) => (
              <li key={action.text}>
                <Link to={action.link} className="diagnosis-card__action-link">
                  {action.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
