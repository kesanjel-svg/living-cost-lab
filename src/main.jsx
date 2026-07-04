import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import './styles/responsive.css'
import App from './app/App.jsx'
import ErrorBoundary from './shared/error/ErrorBoundary'
import { initAnalytics } from './shared/analytics'

initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  </StrictMode>,
)
