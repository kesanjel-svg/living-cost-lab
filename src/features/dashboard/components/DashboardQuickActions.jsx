import { Link } from 'react-router-dom'
import './DashboardQuickActions.css'

const ACTIONS = [
  { label: '프로필 작성', to: '/profile', icon: '👤' },
  { label: '지원금 찾기', to: '/support', icon: '💰' },
  { label: '전기요금 계산기', to: '/calculators/electric', icon: '⚡' },
  { label: 'AI 생활비 진단', to: '/cost-report', icon: '🤖' },
]

export default function DashboardQuickActions() {
  return (
    <section className="dashboard-quick">
      <h2 className="dashboard-quick__title">빠른 실행</h2>
      <div className="dashboard-quick__grid">
        {ACTIONS.map((action) => (
          <Link key={action.to} to={action.to} className="dashboard-quick__btn">
            <span className="dashboard-quick__icon" aria-hidden="true">
              {action.icon}
            </span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
