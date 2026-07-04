/** @typedef {import('./branding.types.js').BrandingConstants} BrandingConstants */

/** @type {BrandingConstants} */
export const BRAND = {
  name: '생활비연구소',
  nameEn: 'Living Cost Lab',
  tagline: '정부지원금부터 생활비 계산까지, 한곳에서',
  url: 'https://living-cost-lab.vercel.app',
  logoPath: '/favicon.svg',
  ogImagePath: '/og-image.svg',
  themeColor: '#2563eb',
  locale: 'ko_KR',
  copyright: '© 2026 생활비연구소',
  description:
    '생활비연구소는 정부지원금 찾기, 전기요금·도시가스 계산기, 생활비 절약 정보를 제공하는 웹 플랫폼입니다. 에너지바우처, 근로장려금, 청년월세지원 등 다양한 지원금 신청 방법을 한곳에서 확인하세요.',
  keywords:
    '정부지원금, 생활비, 전기요금 계산기, 에너지바우처, 근로장려금, 생활비 절약',
  searchPlaceholder: '생활비연구소에서 검색',
  searchPlaceholderDetailed: '생활비연구소에서 지원금·블로그·계산기 검색',
  notFoundTitle: '페이지를 찾을 수 없습니다',
  manifestShortName: '생활비연구소',
  manifestDescription:
    '정부지원금 찾기, 생활비 계산기, 절약 정보를 제공하는 생활비연구소',
  contactEmail: 'contact@livingcostlab.kr',
  operatorLabel: '운영',
}

export const BRAND_NAME = BRAND.name
export const BRAND_NAME_EN = BRAND.nameEn
export const BRAND_TAGLINE = BRAND.tagline
export const BRAND_URL = BRAND.url
export const BRAND_DEFAULT_TITLE = `${BRAND.name} | ${BRAND.tagline}`
export const BRAND_DESCRIPTION = BRAND.description
export const BRAND_KEYWORDS = BRAND.keywords
export const BRAND_SEARCH_PLACEHOLDER = BRAND.searchPlaceholder
export const BRAND_SEARCH_PLACEHOLDER_DETAILED = BRAND.searchPlaceholderDetailed
export const BRAND_COPYRIGHT = BRAND.copyright
export const BRAND_CONTACT_EMAIL = BRAND.contactEmail
export const BRAND_OPERATOR_LABEL = BRAND.operatorLabel
export const BRAND_NOT_FOUND_TITLE = BRAND.notFoundTitle
export const BRAND_NOT_FOUND_DESCRIPTION = `요청하신 페이지를 찾을 수 없습니다. ${BRAND.name} 홈으로 이동해주세요.`

export function formatPageTitle(pageTitle) {
  if (!pageTitle) {
    return BRAND_DEFAULT_TITLE
  }

  return `${pageTitle} | ${BRAND.name}`
}

export function resolvePageTitle(title) {
  if (!title || title === BRAND_DEFAULT_TITLE) {
    return BRAND_DEFAULT_TITLE
  }

  if (title.includes(`| ${BRAND.name}`)) {
    return title
  }

  return formatPageTitle(title)
}

export function toAbsoluteBrandUrl(path = '/') {
  if (path.startsWith('http')) {
    return path
  }

  return `${BRAND.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function getBrandLogoUrl() {
  return `${BRAND.url}${BRAND.logoPath}`
}

export function getBrandOgImageUrl() {
  return `${BRAND.url}${BRAND.ogImagePath}`
}
