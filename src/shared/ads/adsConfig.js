import { BRAND } from '../../constants/branding.js'

export function getAdSenseClientId() {
  return import.meta.env.VITE_ADSENSE_CLIENT?.trim() || ''
}

export function isAdSenseEnabled() {
  return Boolean(getAdSenseClientId()) && !import.meta.env.DEV
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
