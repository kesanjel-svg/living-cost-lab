/** @typedef {import('./analytics.js').AnalyticsEventName} AnalyticsEventName */

/** Standard GA4 event names used across Living Cost Lab. */
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  SEARCH: 'search',
  SEARCH_NO_RESULTS: 'search_no_results',
  SUPPORT_VIEW: 'support_view',
  SUPPORT_FINDER_SUBMIT: 'support_finder_submit',
  CALCULATOR_SUBMIT: 'calculator_submit',
  COST_REPORT_START: 'cost_report_start',
  COST_REPORT_COMPLETE: 'cost_report_complete',
  COST_REPORT_SHARE: 'cost_report_share',
  PROFILE_SAVE: 'profile_save',
  CTA_CLICK: 'cta_click',
  OUTBOUND_LINK: 'outbound_link',
  EXCEPTION: 'exception',
}

/** Human-readable labels for internal docs and QA. */
export const ANALYTICS_EVENT_LABELS = {
  [ANALYTICS_EVENTS.PAGE_VIEW]: '페이지 조회',
  [ANALYTICS_EVENTS.SEARCH]: '통합 검색',
  [ANALYTICS_EVENTS.SEARCH_NO_RESULTS]: '검색 결과 없음',
  [ANALYTICS_EVENTS.SUPPORT_VIEW]: '지원금 상세 조회',
  [ANALYTICS_EVENTS.SUPPORT_FINDER_SUBMIT]: '지원금 찾기 제출',
  [ANALYTICS_EVENTS.CALCULATOR_SUBMIT]: '계산기 실행',
  [ANALYTICS_EVENTS.COST_REPORT_START]: 'AI 진단 시작',
  [ANALYTICS_EVENTS.COST_REPORT_COMPLETE]: 'AI 진단 완료',
  [ANALYTICS_EVENTS.COST_REPORT_SHARE]: 'AI 진단 공유',
  [ANALYTICS_EVENTS.PROFILE_SAVE]: '프로필 저장',
  [ANALYTICS_EVENTS.CTA_CLICK]: 'CTA 클릭',
  [ANALYTICS_EVENTS.OUTBOUND_LINK]: '외부 링크 클릭',
  [ANALYTICS_EVENTS.EXCEPTION]: '예외 발생',
}
