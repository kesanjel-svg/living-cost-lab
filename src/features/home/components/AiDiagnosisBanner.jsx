import { Link } from 'react-router-dom'
import './AiDiagnosisBanner.css'

export default function AiDiagnosisBanner() {
  return (
    <section className="ai-banner" aria-labelledby="ai-banner-title">
      <div className="ai-banner__inner">
        <div className="ai-banner__copy">
          <p className="ai-banner__eyebrow">AI 맞춤 추천</p>
          <h2 id="ai-banner-title" className="ai-banner__title">
            내 생활비, 지금 점검해보세요
          </h2>
          <p className="ai-banner__desc">
            생활비 점수, 추천 지원금, 절약 가능 금액을 AI 진단으로 확인할 수
            있습니다.
          </p>
        </div>
        <Link to="/cost-report" className="ai-banner__cta">
          생활비 진단하기
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
