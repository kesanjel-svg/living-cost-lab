import {
  BRAND_DESCRIPTION,
  BRAND_NAME,
  BRAND_URL,
  getBrandLogoUrl,
  getBrandOgImageUrl,
  toAbsoluteBrandUrl,
} from '../../constants/branding'

function withContext(schema) {
  return {
    '@context': 'https://schema.org',
    ...schema,
  }
}

export function buildOrganizationSchema() {
  return withContext({
    '@type': 'Organization',
    name: BRAND_NAME,
    url: BRAND_URL,
    logo: getBrandLogoUrl(),
  })
}

export function buildWebSiteSchema() {
  return withContext({
    '@type': 'WebSite',
    name: BRAND_NAME,
    url: BRAND_URL,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BRAND_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })
}

export function buildWebApplicationSchema(description) {
  return withContext({
    '@type': 'WebApplication',
    name: BRAND_NAME,
    description:
      description ||
      '정부지원금 찾기와 생활비 계산 기능을 제공하는 생활비 계산 플랫폼',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    url: BRAND_URL,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
  })
}

export function buildBreadcrumbSchema(items) {
  return withContext({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteBrandUrl(item.path),
    })),
  })
}

export function buildFaqSchema(faqItems) {
  if (!faqItems?.length) {
    return null
  }

  return withContext({
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })
}

export function buildSoftwareApplicationSchema({
  name,
  description,
  path,
  applicationCategory = 'FinanceApplication',
}) {
  return withContext({
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem: 'Web',
    url: toAbsoluteBrandUrl(path),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BRAND_URL,
    },
  })
}

export function buildArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image = getBrandOgImageUrl(),
}) {
  return withContext({
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: BRAND_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: getBrandLogoUrl(),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteBrandUrl(path),
    },
  })
}

export function buildHomeSchemas(description) {
  return [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebApplicationSchema(description),
    buildBreadcrumbSchema([{ name: '홈', path: '/' }]),
  ]
}

export function collectPageSchemas({
  includeHomeSchemas = false,
  description,
  breadcrumbs = [],
  faq = [],
  calculators = [],
  articles = [],
}) {
  const schemas = []

  if (includeHomeSchemas) {
    schemas.push(...buildHomeSchemas(description))
  } else if (breadcrumbs.length > 0) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs))
  }

  const faqSchema = buildFaqSchema(faq)
  if (faqSchema) {
    schemas.push(faqSchema)
  }

  calculators.forEach((calculator) => {
    schemas.push(buildSoftwareApplicationSchema(calculator))
  })

  articles.forEach((article) => {
    schemas.push(buildArticleSchema(article))
  })

  return schemas
}

export function buildHomeSchemaGraph(description) {
  const schemas = buildHomeSchemas(description || BRAND_DESCRIPTION)

  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(({ '@context': _, ...schema }) => schema),
  }
}
