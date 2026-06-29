import Seo from '../shared/seo/Seo'
import './Page.css'
import './ContentPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '문의하기', path: '/contact' },
]

export default function ContactPage() {
  return (
    <div className="page page--contact">
      <Seo
        title="문의하기 | 생활비연구소"
        description="생활비연구소 서비스 문의, 제휴·광고 문의, 오류 제보를 안내합니다. contact@livingcostlab.kr로 연락해주세요."
        keywords="문의하기, 생활비연구소, 제휴 문의, 오류 제보"
        canonical="/contact"
        breadcrumbs={BREADCRUMBS}
      />
      <div className="page__header">
        <h1 className="page__title">문의하기</h1>
        <p className="page__description">
          생활비연구소 이용 중 궁금한 점이나 제안 사항을 보내주세요.
        </p>
      </div>
      <div className="page__content">
        <article className="content-page__card">
          <section className="content-page__section">
            <h2>서비스 관련 문의</h2>
            <p>
              지원금 찾기, 계산기, 생활비 정보 등 서비스 이용과 관련된
              문의를 받습니다. 가능한 빠르게 답변드리겠습니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>제휴 및 광고 문의</h2>
            <p>
              콘텐츠 제휴, 광고 게재, 협업 제안 등 비즈니스 관련 문의를
              환영합니다. 제안 내용과 연락처를 함께 보내주세요.
            </p>
          </section>

          <section className="content-page__section">
            <h2>오류 제보</h2>
            <p>
              잘못된 지원금 정보, 계산 오류, 링크 문제 등을 발견하셨다면
              알려주세요. 서비스 품질 개선에 큰 도움이 됩니다.
            </p>
            <ul>
              <li>오류가 발생한 페이지 URL</li>
              <li>문제 상황 설명</li>
              <li>가능하다면 스크린샷</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>연락처</h2>
            <p>아래 이메일로 문의해주세요. (현재 MVP 단계, 답변에 시간이 걸릴 수 있습니다.)</p>
            <span className="content-page__email">contact@livingcostlab.kr</span>
          </section>
        </article>
      </div>
    </div>
  )
}
