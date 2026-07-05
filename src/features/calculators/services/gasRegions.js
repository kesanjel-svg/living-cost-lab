// 지역별 도시가스 공급사 주택용 요금표.
// 각 공급사 공식 홈페이지(또는 관할 지자체 공공요금 안내) 기준으로 조사한 값이며,
// 도시가스 요금은 격월/수시로 조정되므로 반드시 effectiveDate·source를 함께 확인할 것.
//
// unitPrices.heating이 숫자면 전 구간 동일 단가, { below516, above516 }이면
// 월 516MJ를 기준으로 취사 단가/난방 단가가 갈리는 구간요금제(서울·대전 등)를 의미한다.
export const GAS_REGIONS = {
  seoul: {
    name: '서울',
    provider: '서울도시가스',
    effectiveDate: '2026-07-01',
    baseFee: 1250,
    unitPrices: {
      cooking: 22.3617,
      heating: 22.3617,
    },
    vatIncluded: false,
    source: 'https://www.seoulgas.co.kr/mobile/payment/gasPayTable',
  },
  incheon: {
    name: '인천',
    provider: '삼천리',
    effectiveDate: '2025-08-01',
    baseFee: 1000,
    unitPrices: {
      cooking: 22.5084,
      heating: 22.5084,
    },
    vatIncluded: false,
    source: 'https://www.incheon.go.kr/eco/ECO020806',
    note: '삼천리 공식 페이지 직접 열람이 되지 않아 인천광역시 공공요금 안내 자료(2025-08-01 기준) 값을 사용. 최신 고시 여부는 삼천리 고객센터로 재확인 필요.',
  },
  busan: {
    name: '부산',
    provider: '부산도시가스',
    effectiveDate: '2026-07-01',
    baseFee: 900,
    baseFeeApproximate: true,
    unitPrices: {
      cooking: 23.2186,
      heating: 23.2186,
    },
    vatIncluded: false,
    source: 'https://www.skens.com/busan/rate/guide.do',
    note: '공식 요금표 페이지에는 기본요금이 게시되어 있지 않아 부산광역시 공공요금 안내 자료 기준 근사값 사용. 정확한 금액은 고객센터(1544-0009) 확인 필요.',
  },
  daegu: {
    name: '대구',
    provider: '대성에너지',
    effectiveDate: '2026-07-01',
    baseFee: 950,
    baseFeeApproximate: true,
    unitPrices: {
      cooking: 23.6361,
      heating: 23.6361,
    },
    vatIncluded: false,
    source: 'https://cyber.daesungenergy.com/charge/pricetable',
    note: '공식 요금단가표에 기본요금이 게시되어 있지 않아 타 지역 평균치로 근사. 정확한 금액은 고객센터(1577-1190) 확인 필요.',
  },
  gwangju: {
    name: '광주',
    provider: '해양에너지',
    effectiveDate: '2026-07-01',
    baseFee: 750,
    unitPrices: {
      cooking: 22.0252,
      heating: 23.297,
    },
    vatIncluded: false,
    source: 'https://www.hyenergy.co.kr/charge/pay_notify01.asp',
    note: '부가세 별도/포함 여부가 공식 페이지에 명시되어 있지 않아 업계 관행(별도)으로 가정.',
  },
  daejeon: {
    name: '대전',
    provider: '씨엔씨티에너지',
    effectiveDate: '2026-07-01',
    baseFee: 850,
    unitPrices: {
      cooking: 23.2332,
      heating: { below516: 23.2332, above516: 24.074 },
    },
    vatIncluded: false,
    source: 'https://www.cncityenergy.com/jsp/customer/chargeInfoGas.jsp?menuId=882',
  },
  ulsan: {
    name: '울산',
    provider: '경동도시가스',
    effectiveDate: '2026-06-01',
    baseFee: 778,
    unitPrices: {
      cooking: 22.818,
      heating: 22.818,
    },
    vatIncluded: false,
    source: 'http://www.citygas.or.kr/info/charge.jsp',
    note: '한국도시가스협회 공식 요금표(2026-06-01 조정분) 기준. 경동도시가스 자체 홈페이지에서 동일 수치를 직접 재확인하지 못해 협회 취합 자료를 사용했으며, 정확한 금액은 고객센터(1577-8181)로 재확인 권장.',
  },
  gyeonggi: {
    name: '경기도',
    provider: '삼천리 외',
    effectiveDate: '2026-06-01',
    baseFee: 1250,
    unitPrices: {
      cooking: 22.6226,
      heating: 22.6226,
    },
    vatIncluded: false,
    source: 'http://www.citygas.or.kr/info/charge.jsp',
    note: '경기도 내 다수 지역(수원·성남·안양 등)을 공급하는 삼천리 기준 요금이며, 일부 시군(코원에너지·예스코 등 타 공급사 관할 지역)은 요금이 다를 수 있음. 한국도시가스협회 공식 요금표(2026-06-01 조정분) 기준.',
  },
  gyeongnam: {
    name: '경남',
    provider: '경남에너지',
    effectiveDate: '2026-06-01',
    baseFee: 850,
    baseFeeApproximate: true,
    unitPrices: {
      cooking: 24.2101,
      heating: 24.2101,
    },
    vatIncluded: false,
    source: 'http://www.citygas.or.kr/info/charge.jsp',
    note: '경남에너지 공급권역(창원·통영·김해·밀양·거제·의령·함안·창녕·고성) 대표값. 기본요금은 개별난방 기준 850원이며, 취사전용 요금제는 기본요금이 1,700원으로 더 높음(경남에너지 공식 홈페이지 www.knenergy.co.kr 요금안내에서 교차 확인). 진주(지에스이)·양산(경동도시가스) 등 경남 내 타 지역은 공급사가 달라 요금이 다름.',
  },
}

export const GAS_REGION_ORDER = [
  'seoul',
  'incheon',
  'busan',
  'daegu',
  'gwangju',
  'daejeon',
  'ulsan',
  'gyeonggi',
  'gyeongnam',
]

export const NATIONWIDE_AVERAGE_REGION_ID = 'nationwide-average'

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

function toFlatUnitPrice(heating) {
  return typeof heating === 'number' ? heating : heating.below516
}

// 미지원 지역용 근사치. 조사 완료된 9개 지역의 단순 평균으로 산출하며,
// 실제 거주 지역 도시가스사 요금표와 차이가 있을 수 있음을 계산기 UI에서 안내한다.
export function getNationwideAverageRegion() {
  const regions = GAS_REGION_ORDER.map((id) => GAS_REGIONS[id])

  return {
    name: '전국 평균(근사치)',
    provider: '미지원 지역 - 전국 평균 근사치',
    effectiveDate: null,
    baseFee: Math.round(average(regions.map((region) => region.baseFee))),
    baseFeeApproximate: true,
    unitPrices: {
      cooking: average(regions.map((region) => region.unitPrices.cooking)),
      heating: average(regions.map((region) => toFlatUnitPrice(region.unitPrices.heating))),
    },
    vatIncluded: false,
    source: null,
    note: '아직 지원하지 않는 지역이라 조사 완료된 9개 지역(서울·인천·부산·대구·광주·대전·울산·경기·경남) 요금의 단순 평균으로 근사 계산한 값입니다. 실제 거주 지역 도시가스사 요금표를 확인하세요.',
    isApproximate: true,
  }
}

export function getGasRegion(regionId) {
  if (regionId === NATIONWIDE_AVERAGE_REGION_ID) {
    return getNationwideAverageRegion()
  }

  return GAS_REGIONS[regionId] ?? null
}

export function getGasRegionOptions() {
  return [
    ...GAS_REGION_ORDER.map((id) => ({ id, name: GAS_REGIONS[id].name })),
    { id: NATIONWIDE_AVERAGE_REGION_ID, name: '기타 지역(전국 평균 근사치)' },
  ]
}
