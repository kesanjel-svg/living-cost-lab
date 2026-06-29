export const SITE_NAME = '생활비연구소'
export const SITE_NAME_EN = 'Living Cost Lab'
export const SITE_URL = 'https://living-cost-lab.vercel.app'
export const DEFAULT_LOGO = `${SITE_URL}/favicon.svg`
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`

export const DEFAULT_TITLE = '생활비연구소 | 정부지원금 · 생활비 계산 플랫폼'

export const DEFAULT_DESCRIPTION =
  '생활비연구소(Living Cost Lab)는 정부지원금 찾기, 전기요금·도시가스 계산기, 생활비 절약 정보를 제공하는 웹 플랫폼입니다. 에너지바우처, 근로장려금, 청년월세지원 등 다양한 지원금 신청 방법을 한곳에서 확인하세요.'

export const DEFAULT_KEYWORDS =
  '정부지원금, 생활비, 전기요금 계산기, 에너지바우처, 근로장려금, 생활비 절약'

export function toAbsoluteUrl(path = '/') {
  if (path.startsWith('http')) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
