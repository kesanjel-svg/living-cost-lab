import {
  BRAND_NOT_FOUND_DESCRIPTION,
  BRAND_NOT_FOUND_TITLE,
  formatPageTitle,
} from '../constants/branding'
import { CtaButton, EmptyState } from '../shared/ui'
import Seo from '../shared/seo/Seo'
import './Page.css'
import './NotFoundPage.css'

const QUICK_LINKS = [
  { label: '지원금 찾기', to: '/support', variant: 'soft' },
  { label: '생활비 계산기', to: '/calculators', variant: 'outline' },
]

export default function NotFoundPage() {
  return (
    <div className="page page--not-found">
      <Seo
        title={formatPageTitle(BRAND_NOT_FOUND_TITLE)}
        description={BRAND_NOT_FOUND_DESCRIPTION}
        noindex
      />
      <div className="page__content not-found__content">
        <EmptyState
          icon="404"
          title={BRAND_NOT_FOUND_TITLE}
          description="요청하신 주소가 변경되었거나 삭제되었을 수 있습니다. 아래 링크로 이동해 보세요."
        >
          <div className="not-found__actions">
            <CtaButton to="/" variant="solid" size="md" showArrow>
              홈으로 이동
            </CtaButton>
            {QUICK_LINKS.map((link) => (
              <CtaButton
                key={link.to}
                to={link.to}
                variant={link.variant}
                size="sm"
              >
                {link.label}
              </CtaButton>
            ))}
          </div>
        </EmptyState>
      </div>
    </div>
  )
}
