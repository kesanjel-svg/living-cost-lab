// 블로그 카드·상세 히어로용 실사 이미지(테마별 1장).
// 출처: Unsplash (unsplash.com/license — 상업적 사용 무료, 출처표기 불필요).
// 내려받아 WebP로 최적화한 로컬 자산이며, Vite가 빌드 시 해시 URL로 처리한다.
import energy from '../../../assets/images/energy.webp'
import support from '../../../assets/images/support.webp'
import health from '../../../assets/images/health.webp'
import gas from '../../../assets/images/gas.webp'
import housing from '../../../assets/images/housing.webp'
import saving from '../../../assets/images/saving.webp'

export const BLOG_THEME_IMAGES = {
  energy,
  support,
  health,
  gas,
  housing,
  saving,
}

export function getBlogThemeImage(theme) {
  return BLOG_THEME_IMAGES[theme] ?? BLOG_THEME_IMAGES.saving
}
