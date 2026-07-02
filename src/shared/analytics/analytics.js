import { ANALYTICS_EVENTS } from './events.js'

let initialized = false

function getMeasurementId() {
  return import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || ''
}

function isEnabled() {
  return Boolean(getMeasurementId()) && !import.meta.env.DEV
}

export function initAnalytics() {
  const measurementId = getMeasurementId()
  if (!measurementId || initialized) {
    return
  }

  initialized = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  })
}

/**
 * @param {import('./events.js').AnalyticsEventName | string} eventName
 * @param {Record<string, string | number | boolean | undefined>} [params]
 */
export function trackEvent(eventName, params = {}) {
  if (!isEnabled() || typeof window.gtag !== 'function') {
    if (import.meta.env.DEV) {
      console.debug('[analytics]', eventName, params)
    }
    return
  }

  window.gtag('event', eventName, params)
}

export function trackPageView(path, title) {
  trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page_path: path,
    page_title: title,
  })
}

export { ANALYTICS_EVENTS }
