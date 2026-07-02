const CHECKLIST_KEY_PREFIX = 'living-cost-lab:cost-report-checklist:'

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

export function getChecklistStorageKey(shareToken) {
  return `${CHECKLIST_KEY_PREFIX}${shareToken}`
}

export function getChecklistProgress(shareToken) {
  return readJson(getChecklistStorageKey(shareToken), {})
}

export function toggleChecklistItem(shareToken, itemId, completed) {
  const key = getChecklistStorageKey(shareToken)
  const current = getChecklistProgress(shareToken)
  const next = { ...current, [itemId]: completed }
  writeJson(key, next)
  return next
}

export function getChecklistCompletion(checklist, progress) {
  if (!checklist?.length) {
    return { completed: 0, total: 0, percent: 0 }
  }

  const completed = checklist.filter((item) => progress[item.id]).length
  const total = checklist.length
  const percent = Math.round((completed / total) * 100)

  return { completed, total, percent }
}
