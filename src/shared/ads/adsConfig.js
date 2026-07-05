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

export const AD_SLOT_IDS = {
  BLOG_DETAIL: 'blog-detail-inline',
  SUPPORT_DETAIL: 'support-detail-inline',
  BLOG_LIST: 'blog-list-sidebar',
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
