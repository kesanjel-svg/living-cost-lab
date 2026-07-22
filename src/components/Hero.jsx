import { CtaButton } from '../shared/ui'
import heroImage from '../assets/images/home-hero.webp'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">생활비를 아끼는 가장 쉬운 방법</h1>
          <p className="hero__description">
            정부지원금, 생활비 계산기, AI 진단을 한곳에서.
          </p>
          <div className="hero__actions">
            <CtaButton to="/support" variant="solid" size="md">
              지원금 찾기
            </CtaButton>
            <CtaButton to="/cost-report" variant="outline" size="md">
              AI 생활비 진단
            </CtaButton>
          </div>
        </div>
        <div className="hero__media">
          <img
            className="hero__img"
            src={heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
