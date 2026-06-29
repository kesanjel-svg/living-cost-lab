import supportPrograms from '../../../data/supportPrograms'

function mapAge(value) {
  if (value === '20s') return '20'
  if (value === '30s') return '30'
  if (value === '40s') return '40'
  if (value === '50plus') return '50'
  return value
}

function mapIncomeLevel(value) {
  if (value === 'low') return 'low'
  return 'middle'
}

function mapFamily(value) {
  if (value === 'single' || value === 'newlywed') return 'single'
  if (value === 'withChildren') return 'child'
  return 'all'
}

function matchesCriteria(programValue, selectedValue) {
  return programValue === 'all' || programValue === selectedValue
}

export function filterSupportPrograms(filters, programs) {
  const { age, household, income } = filters

  if (!age || !household || !income) {
    return []
  }

  const selectedAge = mapAge(age)
  const selectedIncomeLevel = mapIncomeLevel(income)
  const selectedFamily = mapFamily(household)

  return programs.filter(
    (program) =>
      matchesCriteria(program.age, selectedAge) &&
      matchesCriteria(program.incomeLevel, selectedIncomeLevel) &&
      matchesCriteria(program.family, selectedFamily),
  )
}

export function getSupportById(id, programs) {
  return programs.find((program) => program.id === id)
}

export function getSimilarSupports(currentSupport, programs, limit = 2) {
  const sameCategory = programs.filter(
    (program) =>
      program.id !== currentSupport.id &&
      program.category === currentSupport.category,
  )

  if (sameCategory.length > 0) {
    return sameCategory
  }

  return programs
    .filter((program) => program.id !== currentSupport.id)
    .slice(0, limit)
}

export function getRecommendedPrograms(filters) {
  return filterSupportPrograms(filters, supportPrograms)
}

export function getProgramById(id) {
  return getSupportById(id, supportPrograms)
}

export function getProgramsByCalculator(calculatorId) {
  return supportPrograms.filter((program) =>
    program.relatedCalculator.includes(calculatorId),
  )
}

export function getSimilarPrograms(id, limit = 2) {
  const current = getProgramById(id)
  if (!current) {
    return []
  }

  return getSimilarSupports(current, supportPrograms, limit)
}
