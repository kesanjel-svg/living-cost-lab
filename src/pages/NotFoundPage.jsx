import { Link } from 'react-router-dom'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <Seo
        title="페이지를 찾을 수 없습니다 | 생활비연구소"
        description="요청하신 페이지를 찾을 수 없습니다. 생활비연구소 홈으로 이동해주세요."
        canonical="/404"
      />
      <div className="page__header">
        <h1 className="page__title">404</h1>
        <p className="page__description">
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          주소가 변경되었거나 삭제된 페이지일 수 있습니다.
        </p>
      </div>
      <div className="page__content not-found__content">
        <Link to="/" className="not-found__btn">
          홈으로 이동
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
