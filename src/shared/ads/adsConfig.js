import { BRAND } from '../../constants/branding.js'

export function getAdSenseClientId() {
  return import.meta.env.VITE_ADSENSE_CLIENT?.trim() || ''
}

export function isAdSenseEnabled() {
  return Boolean(getAdSenseClientId()) && !import.meta.env.DEV
}

let sdkInjected = false

/**
 * Injects the AdSense SDK script (`adsbygoogle.js`) into <head> once.
 * No-op in development or when the client id is not configured.
 */
export function initAdSense() {
  if (!isAdSenseEnabled() || sdkInjected) {
    return
  }

  if (document.querySelector('script[data-adsbygoogle-sdk]')) {
    sdkInjected = true
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.crossOrigin = 'anonymous'
  script.dataset.adsbygoogleSdk = 'true'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${getAdSenseClientId()}`
  document.head.appendChild(script)

  sdkInjected = true
}

/**
 * 광고 단위 ID(`data-ad-slot`).
 *
 * 애드센스 대시보드에서 광고 단위를 생성하면 발급되는 **숫자 ID**여야 한다
 * (예: "1234567890"). 임의 문자열을 넣으면 광고 요청 자체가 성립하지 않아
 * 슬롯이 항상 `data-ad-status="unfilled"` 상태로 남는다 — 실제로 이전에
 * 'blog-detail-inline' 같은 문자열을 쓰고 있어 광고가 채워질 수 없었다.
 *
 * 값이 비어 있으면 AdSlot이 아예 렌더링되지 않으므로(=잘못된 광고 요청 방지),
 * 애드센스 승인 후 광고 단위를 만들어 Vercel 환경변수에 넣으면 그때부터 노출된다.
 */
export const AD_SLOT_IDS = {
  BLOG_DETAIL: import.meta.env.VITE_ADSENSE_SLOT_BLOG_DETAIL?.trim() || '',
  SUPPORT_DETAIL: import.meta.env.VITE_ADSENSE_SLOT_SUPPORT_DETAIL?.trim() || '',
  BLOG_LIST: import.meta.env.VITE_ADSENSE_SLOT_BLOG_LIST?.trim() || '',
  CALCULATOR_RESULT: import.meta.env.VITE_ADSENSE_SLOT_CALCULATOR?.trim() || '',
}

export const ADSENSE_READY_CHECKLIST = {
  hasAdsTxt: Boolean(import.meta.env.VITE_ADSENSE_PUBLISHER_ID),
  hasClientId: Boolean(getAdSenseClientId()),
  hasPrivacyPolicy: true,
  hasContactPage: true,
  hasAboutPage: true,
  contentPagesMin: 30,
  brandName: BRAND.name,
}
