import { formatPageTitle, BRAND_CONTACT_EMAIL } from '../constants/branding'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './ContentPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '개인정보처리방침', path: '/privacy' },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="page page--privacy">
      <Seo
        title={formatPageTitle('개인정보처리방침')}
        description="생활비연구소의 개인정보 수집·이용, 쿠키, 광고 및 제휴 링크, 보관·파기, 문의 방법에 대한 개인정보처리방침입니다."
        keywords="개인정보처리방침, 생활비연구소, 개인정보, 쿠키"
        canonical="/privacy"
        breadcrumbs={BREADCRUMBS}
      />
      <div className="page__header">
        <h1 className="page__title">개인정보처리방침</h1>
        <p className="page__description">
          생활비연구소는 이용자의 개인정보를 소중히 여기며, 관련 법령을
          준수합니다.
        </p>
      </div>
      <div className="page__content">
        <article className="content-page__card">
          <section className="content-page__section">
            <h2>수집하는 개인정보</h2>
            <p>
              생활비연구소는 회원가입 없이 대부분의 서비스를 이용할 수
              있습니다. 현재 MVP 단계에서는 이름, 이메일 등 직접적인
              개인정보를 별도로 수집하지 않습니다.
            </p>
            <p>다만 서비스 이용 과정에서 아래 정보가 자동으로 생성·수집될 수 있습니다.</p>
            <ul>
              <li>접속 IP, 브라우저 종류, 운영체제 등 기기 정보</li>
              <li>방문 일시, 이용 기록, 오류 로그</li>
              <li>쿠키 및 유사 기술을 통해 수집되는 이용 정보</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>개인정보 이용 목적</h2>
            <p>수집된 정보는 아래 목적에 한해 이용됩니다.</p>
            <ul>
              <li>서비스 제공 및 기능 개선</li>
              <li>이용 통계 분석 및 사용자 경험 향상</li>
              <li>오류 확인 및 서비스 안정성 확보</li>
              <li>법령 준수 및 분쟁 대응</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>쿠키 사용 안내</h2>
            <p>
              생활비연구소는 이용자에게 더 나은 서비스를 제공하기 위해 쿠키를
              사용할 수 있습니다. 쿠키는 웹사이트 방문 시 브라우저에 저장되는
              소량의 정보입니다.
            </p>
            <ul>
              <li>방문 및 이용 패턴 분석</li>
              <li>광고 성과 측정 및 맞춤형 광고 제공</li>
              <li>사용자 설정 유지</li>
            </ul>
            <p>
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부
              기능 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section className="content-page__section">
            <h2>광고 및 제휴 링크 안내</h2>
            <p>
              생활비연구소는 Google AdSense 등 제3자 광고 서비스를 사용할 수
              있으며, 제휴 링크를 포함할 수 있습니다.
            </p>
            <ul>
              <li>광고주 및 제휴사는 자체 쿠키를 사용할 수 있습니다.</li>
              <li>외부 링크 이동 시 해당 사이트의 정책이 적용됩니다.</li>
              <li>광고 및 제휴 수익은 서비스 운영에 사용될 수 있습니다.</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>개인정보 보관 및 파기</h2>
            <p>
              수집된 정보는 이용 목적 달성 후 지체 없이 파기합니다. 다만
              관련 법령에 따라 일정 기간 보관이 필요한 경우 해당 기간 동안
              안전하게 보관합니다.
            </p>
            <ul>
              <li>전자적 파일: 복구 불가능한 방법으로 삭제</li>
              <li>출력물: 분쇄 또는 소각</li>
            </ul>
          </section>

          <section className="content-page__section">
            <h2>문의 방법</h2>
            <p>
              개인정보 처리와 관련한 문의는 문의하기 페이지 또는 아래
              이메일로 연락해주세요.
            </p>
            <a href={`mailto:${BRAND_CONTACT_EMAIL}`} className="content-page__email">
              {BRAND_CONTACT_EMAIL}
            </a>
          </section>

          <p className="content-page__updated">시행일: 2026년 6월 27일</p>
        </article>
      </div>
    </div>
  )
}
