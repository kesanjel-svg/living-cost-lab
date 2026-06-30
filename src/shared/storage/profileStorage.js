const PROFILE_KEY = 'living-cost-lab:profile'

export const EMPTY_PROFILE = {
  age: '',
  gender: '',
  householdSize: '',
  region: '',
  housingType: '',
  monthlyIncome: '',
  childCount: '',
  isPregnant: '',
  hasDisability: '',
  isVeteran: '',
}

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

export function getSavedProfile() {
  return { ...EMPTY_PROFILE, ...readJson(PROFILE_KEY, {}) }
}

export function saveProfile(profile) {
  const data = {
    ...profile,
    updatedAt: new Date().toISOString(),
  }
  writeJson(PROFILE_KEY, data)
  return data
}

export function clearProfile() {
  localStorage.removeItem(PROFILE_KEY)
}
