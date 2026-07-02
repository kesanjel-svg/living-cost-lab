export {
  BRAND,
  BRAND_COPYRIGHT,
  BRAND_DEFAULT_TITLE,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
  BRAND_NAME,
  BRAND_NAME_EN,
  BRAND_NOT_FOUND_DESCRIPTION,
  BRAND_NOT_FOUND_TITLE,
  BRAND_SEARCH_PLACEHOLDER,
  BRAND_SEARCH_PLACEHOLDER_DETAILED,
  BRAND_TAGLINE,
  BRAND_URL,
  formatPageTitle,
  getBrandLogoUrl,
  getBrandOgImageUrl,
  resolvePageTitle,
  toAbsoluteBrandUrl,
} from '../../constants/branding'

import {
  BRAND_DEFAULT_TITLE,
  BRAND_DESCRIPTION,
  BRAND_KEYWORDS,
  BRAND_NAME,
  BRAND_URL,
  getBrandLogoUrl,
  getBrandOgImageUrl,
  toAbsoluteBrandUrl,
} from '../../constants/branding'

/** @deprecated Use BRAND_NAME from constants/branding.js */
export const SITE_NAME = BRAND_NAME

export const SITE_URL = BRAND_URL
export const DEFAULT_LOGO = getBrandLogoUrl()
export const DEFAULT_OG_IMAGE = getBrandOgImageUrl()
export const DEFAULT_TITLE = BRAND_DEFAULT_TITLE
export const DEFAULT_DESCRIPTION = BRAND_DESCRIPTION
export const DEFAULT_KEYWORDS = BRAND_KEYWORDS

/** @deprecated Use toAbsoluteBrandUrl from constants/branding.js */
export function toAbsoluteUrl(path = '/') {
  return toAbsoluteBrandUrl(path)
}
