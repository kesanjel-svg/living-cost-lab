import ruleBasedRecommendationEngine from './ruleBasedRecommendationEngine'

/** @type {import('./types').RecommendationEngine} */
let activeEngine = ruleBasedRecommendationEngine

/**
 * @returns {import('./types').RecommendationEngine}
 */
export function getRecommendationEngine() {
  return activeEngine
}

/**
 * @param {import('./types').RecommendationEngine} engine
 */
export function setRecommendationEngine(engine) {
  if (!engine?.recommend) {
    throw new Error('RecommendationEngine must implement recommend()')
  }
  activeEngine = engine
}

export { ruleBasedRecommendationEngine }
export * from './types'
export * from './mappers'
