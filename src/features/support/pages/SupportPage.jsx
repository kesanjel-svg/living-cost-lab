import SupportFinder from '../components/SupportFinder'
import Seo from '../../../shared/seo/Seo'
import './SupportPage.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '지원금 찾기', path: '/support' },
]

export default function SupportPage() {
  return (
    <div className="support-page">
      <Seo
        title="지원금 찾기 | 생활비연구소"
        description="나이, 가구 형태, 소득 수준에 맞는 정부지원금을 찾아보세요. 에너지바우처, 근로장려금, 청년월세지원 등 다양한 지원금 정보를 확인할 수 있습니다."
        keywords="지원금 찾기, 정부지원금, 근로장려금, 청년월세, 에너지바우처"
        canonical="/support"
        breadcrumbs={BREADCRUMBS}
      />
      <div className="page__header">
        <h1 className="page__title">지원금 찾기</h1>
        <p className="page__description">
          나이, 가구 형태, 소득 수준을 선택하면 받을 가능성이 있는 지원금을
          확인할 수 있습니다.
        </p>
      </div>
      <SupportFinder variant="full" showPageHeader={false} />
    </div>
  )
}
