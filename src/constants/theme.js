import { BRAND } from './branding'

/** Design tokens — keep CSS variables in src/styles/theme.css in sync. */
export const THEME = {
  colors: {
    primary: BRAND.themeColor,
    primary50: '#f4f6fb',
    primary100: '#e8edf7',
    primary200: '#d2dcf0',
    primary300: '#aebfe2',
    primary400: '#8099cd',
    primary500: '#5673b1',
    primary600: '#3b5697',
    primary700: '#2f457c',
    primary800: '#263763',
    primary900: '#1c2949',
    primary950: '#101830',
    success50: '#ecfdf5',
    success600: '#059669',
    success700: '#047857',
    bg: '#ffffff',
    bgSubtle: '#f7f8fb',
    bgMuted: '#eef0f5',
    border: '#e4e7ee',
    borderLight: '#eef0f5',
    textSecondary: '#5c6575',
    textMuted: '#8f97a8',
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
    xs: '0 1px 2px rgba(16, 24, 48, 0.05)',
    sm: '0 2px 8px rgba(16, 24, 48, 0.06)',
    md: '0 6px 20px rgba(16, 24, 48, 0.07)',
    lg: '0 12px 32px rgba(16, 24, 48, 0.09)',
    card: '0 1px 2px rgba(16, 24, 48, 0.04), 0 6px 16px rgba(16, 24, 48, 0.04)',
  },
  motion: {
    easeOut: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  font: {
    sans: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif",
  },
}

export const THEME_COLOR = THEME.colors.primary
