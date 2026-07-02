/**
 * @typedef {Object} CostReportInput
 * @property {string} age
 * @property {string} householdSize
 * @property {string} monthlyIncome
 * @property {string} region
 * @property {string} housingType
 * @property {string} [childCount]
 * @property {string} [isPregnant]
 * @property {string} [hasDisability]
 * @property {string} [isVeteran]
 */

/**
 * @typedef {Object} RecommendationItem
 * @property {string} id
 * @property {string} title
 * @property {string} link
 * @property {string} [summary]
 * @property {number} [exampleSaving]
 * @property {string} [status]
 * @property {string} [reason]
 */

/**
 * @typedef {Object} RecommendationResult
 * @property {RecommendationItem[]} supports
 * @property {RecommendationItem[]} calculators
 * @property {RecommendationItem[]} blogs
 * @property {string[]} [tips]
 * @property {string} summary
 */

/**
 * RecommendationEngine contract — swap implementations without changing callers.
 *
 * @typedef {Object} RecommendationEngine
 * @property {string} id
 * @property {string} name
 * @property {(input: CostReportInput, context?: RecommendationContext) => RecommendationResult} recommend
 */

/**
 * @typedef {Object} RecommendationContext
 * @property {import('../../data/supportPrograms').default} [programs]
 * @property {number} [maxSupport]
 * @property {number} [maxCalculator]
 * @property {number} [maxBlog]
 */

export const DEFAULT_LIMITS = {
  maxSupport: 5,
  maxCalculator: 4,
  maxBlog: 4,
}
