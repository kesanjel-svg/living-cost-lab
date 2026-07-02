import { Helmet } from 'react-helmet-async'
import { resolvePageTitle } from '../../constants/branding'
import { collectPageSchemas } from './schemaBuilders'
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  toAbsoluteUrl,
} from './siteConfig'

function renderSchemaScripts(schema) {
  if (!schema) {
    return null
  }

  const schemas = Array.isArray(schema) ? schema : [schema]

  return schemas.map((item, index) => (
    <script
      key={`${item['@type'] ?? 'schema'}-${index}`}
      type="application/ld+json"
    >
      {JSON.stringify(item)}
    </script>
  ))
}

export default function SeoHead({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  breadcrumbs = [],
  faq = [],
  calculators = [],
  articles = [],
  includeHomeSchemas = false,
  noindex = false,
  structuredData,
}) {
  const pageTitle = resolvePageTitle(title)
  const canonicalUrl = canonical ? toAbsoluteUrl(canonical) : undefined
  const schemas =
    structuredData ??
    collectPageSchemas({
      includeHomeSchemas,
      description,
      breadcrumbs,
      faq,
      calculators,
      articles,
    })

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={pageTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {renderSchemaScripts(schemas)}
    </Helmet>
  )
}
