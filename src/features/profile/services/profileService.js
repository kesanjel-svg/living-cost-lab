import { EMPTY_PROFILE, getSavedProfile } from '../../../shared/storage/profileStorage'

export const PROFILE_FIELD_KEYS = [
  'age',
  'gender',
  'householdSize',
  'region',
  'housingType',
  'monthlyIncome',
  'childCount',
  'isPregnant',
  'hasDisability',
  'isVeteran',
]

export function calculateProfileCompletion(profile = EMPTY_PROFILE) {
  const filled = PROFILE_FIELD_KEYS.filter((key) => Boolean(profile[key]))
  return Math.round((filled.length / PROFILE_FIELD_KEYS.length) * 100)
}

export function hasMinimumProfile(profile = getSavedProfile()) {
  return Boolean(
    profile.age &&
      profile.householdSize &&
      profile.region &&
      profile.housingType &&
      profile.monthlyIncome,
  )
}

export function profileToCostReportInput(profile = getSavedProfile()) {
  return {
    age: profile.age ?? '',
    householdSize: profile.householdSize ?? '',
    monthlyIncome: profile.monthlyIncome ?? '',
    region: profile.region ?? '',
    housingType: profile.housingType ?? '',
    childCount: profile.childCount ?? '',
    isPregnant: profile.isPregnant ?? '',
    hasDisability: profile.hasDisability ?? '',
    isVeteran: profile.isVeteran ?? '',
  }
}

export function profileToSupportFinderDefaults(profile = getSavedProfile()) {
  const incomeMap = {
    under200: 'low',
    '200to300': 'worker',
    '300to400': 'worker',
    over400: 'selfEmployed',
  }

  let household = 'single'

  if (profile.childCount && profile.childCount !== '0') {
    household = 'withChildren'
  } else if (profile.isPregnant === 'yes') {
    household = 'withChildren'
  } else if (profile.householdSize === '2') {
    household = 'newlywed'
  } else if (profile.householdSize === '3' || profile.householdSize === '4plus') {
    household = 'withChildren'
  }

  return {
    age: profile.age ?? '',
    household,
    income: incomeMap[profile.monthlyIncome] ?? '',
  }
}

const ELECTRIC_USAGE_BY_HOUSEHOLD = {
  '1': 180,
  '2': 280,
  '3': 350,
  '4plus': 420,
}

export function getDefaultElectricUsageFromProfile(profile = getSavedProfile()) {
  const usage = ELECTRIC_USAGE_BY_HOUSEHOLD[profile.householdSize]
  return usage ? String(usage) : ''
}

export function getProfileForForms() {
  return getSavedProfile()
}
