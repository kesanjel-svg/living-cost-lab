import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import './styles/responsive.css'
import App from './app/App.jsx'
import ErrorBoundary from './shared/error/ErrorBoundary'
import { initAnalytics } from './shared/analytics'
import { initAdSense } from './shared/ads/adsConfig.js'

initAnalytics()
initAdSense()

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  </StrictMode>
)

// 프리렌더된 페이지는 하이드레이션, 프리렌더되지 않은 경로(SPA 셸)는 일반 렌더
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
