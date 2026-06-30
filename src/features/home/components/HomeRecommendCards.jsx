import { Link } from 'react-router-dom'
import {
  getTodaysSavingTip,
  getTodaysSupport,
} from '../services/homeService'
import './HomeRecommendCards.css'

export default function HomeRecommendCards() {
  const support = getTodaysSupport()
  const tip = getTodaysSavingTip()

  return (
    <section className="home-recommend" aria-labelledby="home-recommend-title">
      <h2 id="home-recommend-title" className="home-recommend__sr-only">
        오늘의 추천
      </h2>
      <div className="home-recommend__grid">
        <Link to={`/support/${support.slug}`} className="home-recommend__card">
          <span className="home-recommend__label">오늘 추천 지원금</span>
          <strong className="home-recommend__title">{support.title}</strong>
          <p className="home-recommend__desc">{support.summary}</p>
          <span className="home-recommend__cta">
            자세히 보기
            <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link to={tip.link} className="home-recommend__card home-recommend__card--tip">
          <span className="home-recommend__label">오늘의 절약 팁</span>
          <p className="home-recommend__tip">{tip.text}</p>
          <span className="home-recommend__cta">
            팁 읽기
            <span aria-hidden="true">→</span>
          </span>
        </Link>

        <Link
          to="/calculators/electric"
          className="home-recommend__card home-recommend__card--calc"
        >
          <span className="home-recommend__label">인기 계산기</span>
          <strong className="home-recommend__title">전기요금 계산기</strong>
          <p className="home-recommend__desc">
            월 사용량으로 예상 전기요금을 바로 계산합니다.
          </p>
          <span className="home-recommend__cta">
            계산하기
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
