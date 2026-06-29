const TITLE_MIN = 10
const TITLE_MAX = 60
const DESC_MIN = 80
const DESC_IDEAL_MIN = 120
const DESC_IDEAL_MAX = 160

function evaluateStatus(passed, warning = false) {
  if (passed) return 'PASS'
  if (warning) return 'WARNING'
  return 'ERROR'
}

function parseHtml(html) {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}

function getMetaContent(doc, name) {
  return doc.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? null
}

function getOgContent(doc, property) {
  return (
    doc.querySelector(`meta[property="${property}"]`)?.getAttribute('content') ??
    null
  )
}

function getCanonical(doc) {
  return doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null
}

function extractSitemapUrl(robotsText) {
  const match = robotsText.match(/^Sitemap:\s*(.+)$/im)
  return match?.[1]?.trim() ?? null
}

function extractUrlsFromSitemap(xmlText) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'application/xml')
  const parseError = doc.querySelector('parsererror')

  if (parseError) {
    return { isXml: false, urls: [] }
  }

  const urls = [...doc.querySelectorAll('url loc, loc')]
    .map((node) => node.textContent?.trim())
    .filter(Boolean)

  return { isXml: true, urls }
}

async function fetchText(url) {
  const response = await fetch(url)

  return {
    ok: response.ok,
    status: response.status,
    text: response.ok ? await response.text() : '',
  }
}

export async function auditRobots(baseUrl) {
  const url = `${baseUrl}/robots.txt`
  const result = await fetchText(url)
  const hasUserAgent = /User-agent:/i.test(result.text)
  const sitemapUrl = extractSitemapUrl(result.text)
  const hasSitemap = Boolean(sitemapUrl)

  return {
    url,
    status: result.status,
    ok: result.ok && result.status === 200,
    hasUserAgent,
    hasSitemap,
    sitemapUrl,
    body: result.text,
  }
}

export async function auditSitemap(baseUrl, sitemapUrl) {
  const url = sitemapUrl || `${baseUrl}/sitemap.xml`
  const result = await fetchText(url)
  const { isXml, urls } = result.ok
    ? extractUrlsFromSitemap(result.text)
    : { isXml: false, urls: [] }

  return {
    url,
    status: result.status,
    ok: result.ok && result.status === 200,
    isXml,
    urlCount: urls.length,
    urls,
    body: result.text,
  }
}

export async function auditHome(baseUrl) {
  const url = `${baseUrl}/`
  const result = await fetchText(url)
  const doc = result.ok ? parseHtml(result.text) : null

  const meta = doc
    ? {
        title: doc.querySelector('title')?.textContent?.trim() ?? null,
        description: getMetaContent(doc, 'description'),
        canonical: getCanonical(doc),
        googleSiteVerification: getMetaContent(doc, 'google-site-verification'),
        ogTitle: getOgContent(doc, 'og:title'),
        ogDescription: getOgContent(doc, 'og:description'),
        ogImage: getOgContent(doc, 'og:image'),
        twitterCard: getMetaContent(doc, 'twitter:card'),
        schemaCount: doc.querySelectorAll(
          'script[type="application/ld+json"]',
        ).length,
      }
    : {
        title: null,
        description: null,
        canonical: null,
        googleSiteVerification: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        twitterCard: null,
        schemaCount: 0,
      }

  return {
    url,
    status: result.status,
    ok: result.ok && result.status === 200,
    meta,
  }
}

export function evaluateSearchConsoleFriendly(robots, sitemap, home) {
  const titleLength = home.meta.title?.length ?? 0
  const descriptionLength = home.meta.description?.length ?? 0

  const robotsStatus = evaluateStatus(
    robots.ok && robots.hasUserAgent && robots.hasSitemap,
    robots.ok && (!robots.hasUserAgent || !robots.hasSitemap),
  )

  const sitemapStatus = evaluateStatus(
    sitemap.ok && sitemap.isXml && sitemap.urlCount > 0,
    sitemap.ok && (!sitemap.isXml || sitemap.urlCount === 0),
  )

  const canonicalStatus = evaluateStatus(Boolean(home.meta.canonical))

  let metaStatus = 'ERROR'
  if (home.meta.title && home.meta.description) {
    const titleOk =
      titleLength >= TITLE_MIN && titleLength <= TITLE_MAX
    const descOk =
      descriptionLength >= DESC_IDEAL_MIN &&
      descriptionLength <= DESC_IDEAL_MAX

    if (titleOk && descOk) {
      metaStatus = 'PASS'
    } else if (home.meta.title && home.meta.description) {
      metaStatus = 'WARNING'
    }
  }

  const openGraphStatus = evaluateStatus(
    Boolean(
      home.meta.ogTitle &&
        home.meta.ogDescription &&
        home.meta.ogImage,
    ),
    Boolean(home.meta.ogTitle || home.meta.ogDescription),
  )

  const twitterStatus = evaluateStatus(Boolean(home.meta.twitterCard))

  const schemaStatus = evaluateStatus(
    home.meta.schemaCount > 0,
    false,
  )

  return {
    robots: robotsStatus,
    sitemap: sitemapStatus,
    canonical: canonicalStatus,
    metaDescription: metaStatus,
    titleLength: {
      status:
        titleLength >= TITLE_MIN && titleLength <= TITLE_MAX
          ? 'PASS'
          : titleLength > 0
            ? 'WARNING'
            : 'ERROR',
      value: titleLength,
    },
    descriptionLength: {
      status:
        descriptionLength >= DESC_IDEAL_MIN &&
        descriptionLength <= DESC_IDEAL_MAX
          ? 'PASS'
          : descriptionLength >= DESC_MIN
            ? 'WARNING'
            : 'ERROR',
      value: descriptionLength,
    },
    openGraph: openGraphStatus,
    twitter: twitterStatus,
    schema: schemaStatus,
  }
}

function statusToScore(status, maxPoints) {
  if (status === 'PASS') return maxPoints
  if (status === 'WARNING') return Math.round(maxPoints * 0.5)
  return 0
}

export function calculateSeoScore(friendly) {
  const breakdown = {
    robots: statusToScore(friendly.robots, 10),
    sitemap: statusToScore(friendly.sitemap, 20),
    meta: statusToScore(friendly.metaDescription, 20),
    openGraph: statusToScore(friendly.openGraph, 15),
    twitter: statusToScore(friendly.twitter, 10),
    canonical: statusToScore(friendly.canonical, 10),
    schema: statusToScore(friendly.schema, 15),
  }

  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

  return { total, breakdown }
}

export function buildCheckResults(robots, sitemap, home, friendly) {
  const results = []

  results.push({
    status: friendly.robots,
    message:
      friendly.robots === 'PASS'
        ? 'robots 정상'
        : friendly.robots === 'WARNING'
          ? 'robots 일부 항목 누락'
          : 'robots 접근 실패',
  })

  results.push({
    status: friendly.sitemap,
    message:
      friendly.sitemap === 'PASS'
        ? 'sitemap 정상'
        : friendly.sitemap === 'WARNING'
          ? 'sitemap 형식 또는 URL 확인 필요'
          : 'sitemap 접근 실패',
  })

  results.push({
    status: friendly.canonical,
    message:
      friendly.canonical === 'PASS' ? 'canonical 정상' : 'canonical 없음',
  })

  if (friendly.descriptionLength.status === 'WARNING') {
    results.push({
      status: 'WARNING',
      message: 'description 길이 최적화 필요',
    })
  } else if (friendly.descriptionLength.status === 'ERROR') {
    results.push({
      status: 'ERROR',
      message: 'description 없음 또는 너무 짧음',
    })
  } else {
    results.push({
      status: 'PASS',
      message: 'description 길이 적절',
    })
  }

  if (friendly.titleLength.status !== 'PASS') {
    results.push({
      status: friendly.titleLength.status,
      message:
        friendly.titleLength.status === 'ERROR'
          ? 'title 없음'
          : 'title 길이 최적화 필요',
    })
  } else {
    results.push({ status: 'PASS', message: 'title 길이 적절' })
  }

  if (!home.meta.googleSiteVerification) {
    results.push({
      status: 'WARNING',
      message: 'google-site-verification 없음',
    })
  } else {
    results.push({
      status: 'PASS',
      message: 'Search Console 인증 태그 존재',
    })
  }

  results.push({
    status: friendly.openGraph,
    message:
      friendly.openGraph === 'PASS'
        ? 'Open Graph 태그 정상'
        : 'Open Graph 태그 불완전',
  })

  results.push({
    status: friendly.twitter,
    message:
      friendly.twitter === 'PASS'
        ? 'Twitter Card 정상'
        : 'Twitter Card 없음',
  })

  results.push({
    status: friendly.schema,
    message:
      friendly.schema === 'PASS' ? 'Schema(JSON-LD) 존재' : 'schema 없음',
  })

  if (!robots.sitemapUrl?.includes('vercel.app')) {
    results.push({
      status: 'WARNING',
      message: 'Sitemap URL이 운영 도메인과 다를 수 있음',
    })
  }

  return results
}

export function buildSuggestions(home, friendly) {
  const suggestions = []
  const descriptionLength = home.meta.description?.length ?? 0
  const titleLength = home.meta.title?.length ?? 0

  if (
    friendly.descriptionLength.status !== 'PASS' ||
    descriptionLength < DESC_IDEAL_MIN
  ) {
    suggestions.push('description을 120~150자로 수정하세요.')
  }

  if (titleLength > TITLE_MAX || titleLength < TITLE_MIN) {
    suggestions.push('title을 30~60자 내외로 조정하세요.')
  }

  if (friendly.schema === 'ERROR') {
    suggestions.push('JSON-LD Schema를 추가하세요.')
    suggestions.push('FAQ Schema를 추가하면 좋습니다.')
    suggestions.push('Breadcrumb Schema를 추천합니다.')
  }

  if (friendly.openGraph === 'WARNING' || friendly.openGraph === 'ERROR') {
    suggestions.push('og:title, og:description, og:image 태그를 확인하세요.')
  }

  if (!home.meta.googleSiteVerification) {
    suggestions.push('Google Search Console 인증 메타 태그를 추가하세요.')
  }

  if (friendly.canonical === 'ERROR') {
    suggestions.push('canonical URL을 index.html에 추가하세요.')
  }

  if (suggestions.length === 0) {
    suggestions.push(
      '현재 SEO 기본 설정이 양호합니다. AdSense 승인을 위해 콘텐츠를 지속적으로 보강하세요.',
    )
  }

  return [...new Set(suggestions)]
}

export async function runSeoAudit(baseUrl = window.location.origin) {
  const robots = await auditRobots(baseUrl)
  const sitemap = await auditSitemap(baseUrl, robots.sitemapUrl)
  const home = await auditHome(baseUrl)
  const friendly = evaluateSearchConsoleFriendly(robots, sitemap, home)
  const score = calculateSeoScore(friendly)
  const checks = buildCheckResults(robots, sitemap, home, friendly)
  const suggestions = buildSuggestions(home, friendly)

  return {
    baseUrl,
    robots,
    sitemap,
    home,
    friendly,
    score,
    checks,
    suggestions,
  }
}
