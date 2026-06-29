import {
  DEFAULT_LOGO,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_NAME_EN,
  SITE_URL,
  toAbsoluteUrl,
} from './siteConfig'

function withContext(schema) {
  return {
    '@context': 'https://schema.org',
    ...schema,
  }
}

export function buildOrganizationSchema() {
  return withContext({
    '@type': 'Organization',
    name: SITE_NAME_EN,
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_LOGO,
  })
}

export function buildWebSiteSchema() {
  return withContext({
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    url: SITE_URL,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/support?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  })
}

export function buildWebApplicationSchema(description) {
  return withContext({
    '@type': 'WebApplication',
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    description:
      description ||
      '정부지원금 찾기와 생활비 계산 기능을 제공하는 생활비 계산 플랫폼',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    url: SITE_URL,
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
      item: toAbsoluteUrl(item.path),
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
    url: toAbsoluteUrl(path),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME_EN,
      alternateName: SITE_NAME,
      url: SITE_URL,
    },
  })
}

export function buildArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image = DEFAULT_OG_IMAGE,
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
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME_EN,
      alternateName: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_LOGO,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(path),
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
  const schemas = buildHomeSchemas(description)

  return {
    '@context': 'https://schema.org',
    '@graph': schemas.map(({ '@context': _, ...schema }) => schema),
  }
}
