import { Link } from 'react-router-dom'
import './SupportFinderResultCard.css'

export default function SupportFinderResultCard({ program, index }) {
  return (
    <article
      className="support-finder__result-card"
      style={{ animationDelay: `${0.08 + index * 0.06}s` }}
    >
      {program.category && (
        <span className="support-finder__result-category">{program.category}</span>
      )}
      <h3 className="support-finder__result-title">{program.title}</h3>
      <p className="support-finder__result-desc">{program.summary}</p>
      {program.target && (
        <p className="support-finder__result-target">
          <span>신청 대상</span>
          {program.target}
        </p>
      )}
      <Link to={`/support/${program.id}`} className="support-finder__result-btn">
        자세히 보기
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  )
}
