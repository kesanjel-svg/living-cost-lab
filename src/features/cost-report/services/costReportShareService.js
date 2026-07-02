const SHAREABLE_KEYS = [
  'age',
  'householdSize',
  'monthlyIncome',
  'region',
  'housingType',
  'childCount',
  'isPregnant',
  'hasDisability',
]

function toBase64Url(value) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function fromBase64Url(token) {
  const padded = token.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (padded.length % 4)) % 4
  const base64 = padded + '='.repeat(padLength)
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeCostReportShare(input) {
  const payload = {}

  SHAREABLE_KEYS.forEach((key) => {
    if (input[key]) {
      payload[key] = input[key]
    }
  })

  return toBase64Url(JSON.stringify(payload))
}

export function decodeCostReportShare(token) {
  if (!token) {
    return null
  }

  try {
    const parsed = JSON.parse(fromBase64Url(token))
    const input = {}

    SHAREABLE_KEYS.forEach((key) => {
      if (parsed[key]) {
        input[key] = parsed[key]
      }
    })

    const required = ['age', 'householdSize', 'monthlyIncome', 'region', 'housingType']
    const isValid = required.every((key) => Boolean(input[key]))

    return isValid ? input : null
  } catch {
    return null
  }
}

export function buildCostReportSharePath(input) {
  const token = encodeCostReportShare(input)
  return `/cost-report/share/${token}`
}

export function buildCostReportShareUrl(input) {
  if (typeof window === 'undefined') {
    return buildCostReportSharePath(input)
  }

  return `${window.location.origin}${buildCostReportSharePath(input)}`
}
