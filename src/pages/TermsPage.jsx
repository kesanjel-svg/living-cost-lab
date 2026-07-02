import { formatPageTitle } from '../constants/branding'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './ContentPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '이용약관', path: '/terms' },
]

export default function TermsPage() {
  return (
    <div className="page page--terms">
      <Seo
        title={formatPageTitle('이용약관')}
        description="생활비연구소 서비스 이용약관입니다. 서비스 목적, 정보 제공 한계, 계산기·지원금 안내, 이용자 책임 및 면책 조항을 확인하세요."
        keywords="이용약관, 생활비연구소, 서비스 약관"
        canonical="/terms"
        breadcrumbs={BREADCRUMBS}
      />
      <div className="page__header">
        <h1 className="page__title">이용약관</h1>
        <p className="page__description">
          생활비연구소 서비스 이용과 관련한 기본적인 약관입니다.
        </p>
      </div>
      <div className="page__content">
        <article className="content-page__card">
          <section className="content-page__section">
            <h2>서비스 목적</h2>
            <p>
              생활비연구소는 정부지원금 정보, 생활비 계산기, 절약 정보를
              제공하여 이용자의 생활비 관리와 절약에 도움을 주는 것을
              목적으로 합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>정보 제공의 한계</h2>
            <p>
              본 서비스에서 제공하는 정보는 일반적인 참고용이며, 법률·세무·
              복지 전문가의 상담을 대체하지 않습니다. 최종 신청 여부와
              지원금액은 공식 기관 안내를 기준으로 확인해야 합니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>계산기 결과는 참고용</h2>
            <p>
              전기요금, 도시가스, 건강보험, 국민연금 등 계산기 결과는
              단순화된 계산식을 기반으로 한 예상치입니다. 실제 요금·납부액은
              지역, 요금제, 할인, 정책 변경 등에 따라 달라질 수 있습니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>정부지원금 정보 변경 가능</h2>
            <p>
              정부지원금 제도는 수시로 변경될 수 있습니다. 생활비연구소는
              최신 정보 제공을 위해 노력하나, 신청 기간·대상·지원 내용의
              정확성과 완전성을 보장하지 않습니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>이용자 책임</h2>
            <ul>
              <li>서비스 이용 시 제공되는 정보를 스스로 검증할 책임이 있습니다.</li>
              <li>타인의 권리를 침해하거나 불법적인 목적으로 이용해서는 안 됩니다.</li>
              <li>서비스의 무단 복제·배포·상업적 이용을 금합니다.</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>면책 조항</h2>
            <p>
              생활비연구소는 천재지변, 시스템 장애, 제3자 서비스 오류 등
              불가피한 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
            </p>
            <p>
              본 서비스 정보를 바탕으로 이용자가 취한 결정으로 발생한
              손해에 대해 생활비연구소는 법령이 허용하는 범위 내에서
              책임을 부담하지 않습니다.
            </p>
          </section>

          <p className="content-page__updated">시행일: 2026년 6월 27일</p>
        </article>
      </div>
    </div>
  )
}
