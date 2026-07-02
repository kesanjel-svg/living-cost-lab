import { Link } from 'react-router-dom'
import { CtaButton } from '../ui'
import './ContentCtaSection.css'

export default function ContentCtaSection({
  title = '다음 단계',
  description = '프로필을 작성하면 더 정확한 추천을 받을 수 있습니다.',
  actions = [],
  id = 'cta',
}) {
  if (!actions.length) {
    return null
  }

  const variantMap = {
    primary: 'inverse-primary',
    secondary: 'inverse-secondary',
    ghost: 'inverse-ghost',
  }

  return (
    <section id={id} className="content-cta" aria-labelledby="content-cta-title">
      <h2 id="content-cta-title" className="content-cta__title">
        {title}
      </h2>
      {description && <p className="content-cta__desc">{description}</p>}
      <div className="content-cta__actions">
        {actions.map((action) => (
          <CtaButton
            key={action.to}
            to={action.to}
            variant={variantMap[action.variant ?? 'secondary']}
            size="sm"
          >
            {action.label}
          </CtaButton>
        ))}
      </div>
    </section>
  )
}
