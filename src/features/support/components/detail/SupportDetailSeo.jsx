import Seo from '../../../../shared/seo/Seo'
import { buildSupportSeoConfig } from '../../services/supportDetailService'

export default function SupportDetailSeo({ program }) {
  const seo = buildSupportSeoConfig(program)

  return (
    <Seo
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
      canonical={seo.canonical}
      type={seo.type}
      breadcrumbs={seo.breadcrumbs}
      faq={seo.faq}
      articles={seo.articles}
    />
  )
}
