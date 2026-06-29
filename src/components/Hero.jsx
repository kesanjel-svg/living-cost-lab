import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">생활비를 줄이는 가장 쉬운 방법</h1>
        <p className="hero__description">
          전기요금, 도시가스, 정부지원금, 생활비 절약 정보를 한 곳에서
          확인하세요.
        </p>
        <Link to="/calculators/electric" className="hero__cta">
          전기요금 계산하기
        </Link>
      </div>
    </section>
  )
}
