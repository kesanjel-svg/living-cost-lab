/**
 * 브랜드 심볼 마크 — 네이비 라운드 타일 위 ₩ 모노그램.
 * public/favicon.svg와 동일한 도형을 공유한다(수정 시 함께 갱신할 것).
 */
export default function BrandLogo({ size = 28, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="brand-logo-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#46619f" />
          <stop offset="1" stopColor="#2f457c" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#brand-logo-fill)" />
      <path
        d="M9 10.5 12.2 21.5 16 13 19.8 21.5 23 10.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 15.2H24.5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
