import { AD_SLOT_IDS, getAdSenseClientId, isAdSenseEnabled } from './adsConfig.js'
import './AdSlot.css'

/**
 * AdSense-ready slot. Renders only when VITE_ADSENSE_CLIENT is configured.
 * Does not load ads in development.
 */
export default function AdSlot({
  slotId,
  format = 'auto',
  className = '',
  label = '광고',
}) {
  const clientId = getAdSenseClientId()

  if (!isAdSenseEnabled() || !slotId) {
    return null
  }

  return (
    <aside
      className={`ad-slot ${className}`.trim()}
      aria-label={label}
      data-ad-slot={slotId}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  )
}

export { AD_SLOT_IDS }
