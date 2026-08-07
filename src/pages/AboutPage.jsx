import {
  BRAND_CONTACT_EMAIL,
  BRAND_NAME,
  BRAND_NAME_EN,
  formatPageTitle,
} from '../constants/branding'
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
        title={formatPageTitle('사이트 소개')}
        description={`${BRAND_NAME}(${BRAND_NAME_EN})는 공식 출처 기반의 정부지원금 정보와 생활비 계산기를 제공합니다. 데이터 출처 원칙, 검증 절차, 갱신 주기를 확인하세요.`}
        keywords={`사이트 소개, ${BRAND_NAME}, ${BRAND_NAME_EN}, 생활비 플랫폼, 데이터 출처, 검증 절차`}
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
              {BRAND_NAME}({BRAND_NAME_EN})는 누구나 쉽게 생활비를 점검하고
              지원금 정보를 확인할 수 있도록 돕는 웹 플랫폼입니다. 전기요금
              누진제, 도시가스 지역별 요율, 4대보험 요율처럼 복잡한 제도와 요금
              구조를 직접 계산해볼 수 있는 도구와 함께, 이해하기 쉬운 해설로
              정리해 제공합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>제공 서비스</h2>
            <ul>
              <li>
                생활비 계산기 10종 — 전기요금(누진제)·도시가스(전국 48개
                지역)·국민연금·건강보험·연봉 실수령액·퇴직금·실업급여·
                연차수당·육아휴직급여·4대보험
              </li>
              <li>나이·가구·소득 조건에 맞는 정부지원금 찾기 및 상세 안내</li>
              <li>AI 생활비 진단 및 맞춤 추천</li>
              <li>생활비 절약 정보 및 제도 해설 블로그</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>데이터 출처 원칙</h2>
            <p>
              모든 요율·금액·기준은 정부 기관과 공공기관의 공식 1차 출처만
              사용합니다. 블로그나 커뮤니티 글 등 2차 자료만으로 수치를
              확정하지 않습니다.
            </p>
            <ul>
              <li>전기요금 — 한국전력공사(KEPCO) 전기요금표</li>
              <li>
                도시가스 — 한국도시가스협회 공식 요금표, 한국가스공사 공급구역
                안내, 각 지역 도시가스 공급사 공시 요금
              </li>
              <li>국민연금 — 국민연금공단(NPS) 보험료율·기준소득월액 고시</li>
              <li>건강보험·장기요양보험 — 국민건강보험공단(NHIS) 고시 요율</li>
              <li>
                고용보험·퇴직금·연차 — 고용노동부, 법제처 찾기쉬운
                생활법령정보, 관계 법령(근로기준법·고용보험법 등) 원문
              </li>
              <li>
                정부지원금 — 보건복지부·고용노동부·국토교통부 등 소관 부처
                공식 안내 페이지 및 보도자료
              </li>
            </ul>
            <p>
              각 계산기 하단에는 근거가 된 출처와 기준 시점을 배지로 상시
              표시해, 어떤 자료를 기반으로 계산되는지 직접 확인할 수 있습니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>검증 절차</h2>
            <ul>
              <li>
                공식 요금표·고시·법령 원문을 직접 확인해 수치를 확정합니다.
              </li>
              <li>
                하나의 출처만으로 확인이 어려운 경우 복수의 독립된 출처로
                교차 검증합니다.
              </li>
              <li>
                계산 산식은 공식 계산기(고용노동부 퇴직금 계산기 등)나 공식
                예시와 대조해 결과가 일치하는지 검산합니다.
              </li>
              <li>
                정확한 원자료 재현이 어려운 항목(예: 건강보험 지역가입자
                점수제)은 간이 추정치임을 명확히 고지하고 공식 모의계산
                링크를 함께 안내합니다.
              </li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>데이터 갱신 주기</h2>
            <ul>
              <li>
                요율·지원금 데이터는 월 1회 정기 점검하며, 요율 변경 고시가
                확인되면 수시로 반영합니다.
              </li>
              <li>
                모든 수치에는 출처와 적용 기준일을 함께 기록·표시합니다.
              </li>
              <li>
                잘못된 정보를 발견하셨다면{' '}
                <a href="/contact">문의하기</a>를 통해 알려주세요. 확인 후
                신속히 수정합니다.
              </li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>서비스 철학</h2>
            <p>
              {BRAND_NAME}는 정확하고 신뢰할 수 있는 정보, 누구나 사용하기
              쉬운 도구, 실생활에 도움이 되는 콘텐츠를 핵심 가치로 합니다.
              과장된 약속보다 실용적인 정보 제공을 우선하며, 계산 결과가
              법적 효력을 갖지 않는 참고용 추정치인 경우 그 한계를 함께
              안내합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>운영 정보</h2>
            <p>
              서비스명: {BRAND_NAME} ({BRAND_NAME_EN})
              <br />
              문의:{' '}
              <a href={`mailto:${BRAND_CONTACT_EMAIL}`}>{BRAND_CONTACT_EMAIL}</a>
            </p>
          </section>

          <section className="content-page__section">
            <h2>앞으로의 계획</h2>
            <ul>
              <li>"이번 달 신청 가능한 지원금" 마감 캘린더 제공</li>
              <li>시즌별 생활비 이슈(연말정산·난방비 등) 해설 콘텐츠 확충</li>
              <li>도시가스 계산기 지원 지역 지속 확대</li>
              <li>월 1회 요율·지원금 데이터 정기 점검 지속</li>
            </ul>
          </section>

          <p className="content-page__updated">최종 업데이트: 2026년 8월 8일</p>
        </article>
      </div>
    </div>
  )
}
