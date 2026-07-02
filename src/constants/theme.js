import { BRAND } from './branding'

/** Design tokens — keep CSS variables in src/styles/theme.css in sync. */
export const THEME = {
  colors: {
    primary: BRAND.themeColor,
    primary50: '#eff6ff',
    primary100: '#dbeafe',
    primary200: '#bfdbfe',
    primary300: '#93c5fd',
    primary400: '#60a5fa',
    primary500: '#3b82f6',
    primary600: '#2563eb',
    primary700: '#1d4ed8',
    primary800: '#1e40af',
    primary900: '#1e3a8a',
    primary950: '#172554',
    success50: '#ecfdf5',
    success600: '#059669',
    success700: '#047857',
    bg: '#ffffff',
    bgSubtle: '#f8fafc',
    bgMuted: '#f1f5f9',
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
  },
  layout: {
    maxWidth: '1120px',
    sectionGap: '4.5rem',
  },
  radius: {
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadow: {
    xs: '0 1px 2px rgba(23, 37, 84, 0.04)',
    sm: '0 4px 12px rgba(23, 37, 84, 0.06)',
    md: '0 8px 24px rgba(23, 37, 84, 0.08)',
    lg: '0 16px 40px rgba(23, 37, 84, 0.1)',
    card: '0 1px 3px rgba(23, 37, 84, 0.04), 0 8px 24px rgba(23, 37, 84, 0.06)',
  },
  motion: {
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  font: {
    sans: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif",
  },
}

export const THEME_COLOR = THEME.colors.primary
