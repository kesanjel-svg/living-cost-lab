import { Link } from 'react-router-dom'
import { formatCurrency } from '../../../utils/formatCurrency'
import './DashboardStatCards.css'

function StatCard({ label, value, hint, to }) {
  const content = (
    <>
      <span className="dashboard-stat__label">{label}</span>
      <strong className="dashboard-stat__value">{value}</strong>
      {hint && <span className="dashboard-stat__hint">{hint}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className="dashboard-stat">
        {content}
      </Link>
    )
  }

  return <article className="dashboard-stat">{content}</article>
}

export default function DashboardStatCards({ stats }) {
  return (
    <div className="dashboard-stat-grid">
      <StatCard
        label="현재 추천 지원금"
        value={`${stats.supportCount}건`}
        hint={stats.supportTitle}
        to={stats.supportLink}
      />
      <StatCard
        label="생활비 점수"
        value={`${stats.score}점`}
        hint="0~100 기준"
        to="/cost-report"
      />
      <StatCard
        label="절약 가능 금액"
        value={`월 ${formatCurrency(stats.estimatedMonthlySavings)}`}
        hint="예시 데이터 기준"
        to="/cost-report"
      />
      <StatCard
        label="추천 계산기"
        value={`${stats.calculatorCount}개`}
        hint={stats.calculatorTitle}
        to={stats.calculatorLink}
      />
    </div>
  )
}
