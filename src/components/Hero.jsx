import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">생활비를 아끼는 가장 쉬운 방법</h1>
        <p className="hero__description">
          정부지원금, 생활비 계산기, AI 진단을 한곳에서.
        </p>
        <div className="hero__actions">
          <Link to="/support" className="hero__cta hero__cta--primary">
            지원금 찾기
          </Link>
          <Link to="/cost-report" className="hero__cta hero__cta--secondary">
            AI 생활비 진단
          </Link>
        </div>
      </div>
    </section>
  )
}
