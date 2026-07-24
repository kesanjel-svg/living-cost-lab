import AdSlot, { AD_SLOT_IDS } from '../../../shared/ads/AdSlot'

/**
 * 계산기 결과 하단 광고 슬롯.
 * 결과를 확인한 뒤(체류가 긴 지점)에만 노출되도록 각 계산기의 결과 블록 맨 끝에 둔다.
 * 결과 금액·추천 카드와의 간격/구분선은 `.ad-slot--calculator`에서 처리한다.
 */
export default function CalculatorResultAd() {
  return (
    <AdSlot
      slotId={AD_SLOT_IDS.CALCULATOR_RESULT}
      className="ad-slot--calculator"
    />
  )
}
