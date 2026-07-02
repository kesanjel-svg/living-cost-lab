import { BRAND_NAME } from '../constants/branding'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './ContentPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '사이트 소개', path: '/about' },
]

export default function AboutPage() {
  return (
    <div className="page page--about">
      <Seo
        title="사이트 소개"
        description={`${BRAND_NAME}는 정부지원금, 생활비 계산기, 절약 정보를 제공하는 생활비 플랫폼입니다. 서비스 철학과 앞으로의 계획을 소개합니다.`}
        keywords={`사이트 소개, ${BRAND_NAME}, 생활비 플랫폼`}
        canonical="/about"
        breadcrumbs={BREADCRUMBS}
      />
      <div className="page__header">
        <h1 className="page__title">사이트 소개</h1>
        <p className="page__description">
          생활비 절약과 정부지원금 정보를 한곳에서 제공하는 {BRAND_NAME}입니다.
        </p>
      </div>
      <div className="page__content">
        <article className="content-page__card">
          <section className="content-page__section">
            <h2>{BRAND_NAME} 소개</h2>
            <p>
              {BRAND_NAME}는 누구나 쉽게 생활비를 점검하고
              지원금 정보를 확인할 수 있도록 돕는 웹 플랫폼입니다. 복잡한
              제도와 요금 정보를 이해하기 쉽게 정리해 제공합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>제공 서비스</h2>
            <ul>
              <li>나이·가구·소득 조건에 맞는 지원금 찾기</li>
              <li>전기요금 등 생활비 계산기</li>
              <li>정부지원금 상세 안내 및 FAQ</li>
              <li>생활비 절약 정보 및 블로그 콘텐츠</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>서비스 철학</h2>
            <p>
              {BRAND_NAME}는 정확하고 신뢰할 수 있는 정보, 누구나 사용하기
              쉬운 도구, 실생활에 도움이 되는 콘텐츠를 핵심 가치로 합니다.
              과장된 약속보다 실용적인 정보 제공을 우선합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>앞으로의 계획</h2>
            <ul>
              <li>도시가스·건강보험·국민연금 계산기 확대</li>
              <li>블로그 및 생활비 정보 콘텐츠 고도화</li>
              <li>AI 기반 맞춤 생활비 추천 서비스</li>
              <li>Search Console·Analytics 기반 SEO 및 품질 개선</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  )
}
