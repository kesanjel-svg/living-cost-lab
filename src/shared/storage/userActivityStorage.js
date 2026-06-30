const RECENT_SUPPORTS_KEY = 'living-cost-lab:recent-supports'
const COST_REPORT_KEY = 'living-cost-lab:cost-report'
const MAX_RECENT_SUPPORTS = 5

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota or privacy mode errors
  }
}

export function getRecentSupports() {
  return readJson(RECENT_SUPPORTS_KEY, [])
}

export function addRecentSupportView(program) {
  const current = getRecentSupports().filter((item) => item.id !== program.id)
  const next = [
    {
      id: program.id,
      slug: program.slug ?? program.id,
      title: program.title,
      category: program.category,
      viewedAt: new Date().toISOString(),
    },
    ...current,
  ].slice(0, MAX_RECENT_SUPPORTS)

  writeJson(RECENT_SUPPORTS_KEY, next)
  return next
}

export function getSavedCostReport() {
  return readJson(COST_REPORT_KEY, null)
}

export function saveCostReport(payload) {
  const data = {
    ...payload,
    savedAt: new Date().toISOString(),
  }
  writeJson(COST_REPORT_KEY, data)
  return data
}
