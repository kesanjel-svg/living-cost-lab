import categoriesMeta from './categories.json'
import filters from './filters.json'

const programModules = import.meta.glob('./*/*.json', { eager: true })

function getCategoryKeyFromPath(filePath) {
  const segments = filePath.split('/')
  return segments[segments.length - 2]
}

function normalizeProgram(filePath, rawProgram) {
  const folderCategoryKey = getCategoryKeyFromPath(filePath)

  return {
    ...rawProgram,
    categoryKey: rawProgram.categoryKey ?? folderCategoryKey,
    slug: rawProgram.slug ?? rawProgram.id,
  }
}

function sortPrograms(programs) {
  return [...programs].sort((a, b) => {
    const orderA = categoriesMeta[a.categoryKey]?.order ?? 99
    const orderB = categoriesMeta[b.categoryKey]?.order ?? 99

    if (orderA !== orderB) {
      return orderA - orderB
    }

    return a.title.localeCompare(b.title, 'ko')
  })
}

function buildSupportPrograms() {
  const programs = Object.entries(programModules).map(([path, module]) => {
    const program = module.default ?? module
    return normalizeProgram(path, program)
  })

  return sortPrograms(programs)
}

const supportPrograms = buildSupportPrograms()

export function getSupportCategories() {
  const usedKeys = [...new Set(supportPrograms.map((program) => program.categoryKey))]

  return usedKeys
    .sort(
      (a, b) =>
        (categoriesMeta[a]?.order ?? 99) - (categoriesMeta[b]?.order ?? 99),
    )
    .map((key) => ({
      key,
      label: categoriesMeta[key]?.label ?? key,
    }))
}

export function getProgramsByCategory(categoryKey) {
  return supportPrograms.filter((program) => program.categoryKey === categoryKey)
}

export function buildCategoryFilterOptions() {
  return [
    { value: '', label: '전체' },
    ...getSupportCategories().map(({ key, label }) => ({
      value: key,
      label,
    })),
  ]
}

export const categoryFilterOptions = buildCategoryFilterOptions()
export const ageOptions = filters.ageOptions
export const householdOptions = filters.householdOptions
export const incomeOptions = filters.incomeOptions

export default supportPrograms
