import { Helmet } from 'react-helmet-async'

const SITE_NAME = '생활비연구소'
const SITE_URL = 'https://livingcostlab.kr'
const DEFAULT_IMAGE = `${SITE_URL}/favicon.svg`

export default function Seo({
  title,
  description,
  keywords,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const canonicalUrl = canonical?.startsWith('http')
    ? canonical
    : canonical
      ? `${SITE_URL}${canonical}`
      : undefined

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
