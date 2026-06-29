export const ageOptions = [
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50plus', label: '50대 이상' },
]

export const householdOptions = [
  { value: 'single', label: '1인 가구' },
  { value: 'newlywed', label: '신혼부부' },
  { value: 'withChildren', label: '자녀 있음' },
  { value: 'elderlyCare', label: '부모님 부양' },
]

export const incomeOptions = [
  { value: 'low', label: '소득 낮음' },
  { value: 'worker', label: '일반 근로자' },
  { value: 'unemployed', label: '무직/구직중' },
  { value: 'selfEmployed', label: '자영업자' },
]

const supportPrograms = [
  {
    id: 'energy',
    title: '에너지바우처',
    category: '에너지',
    summary: '전기·가스 등 에너지 비용을 지원하는 제도입니다.',
    description:
      '에너지 취약계층의 전기, 도시가스, 지역난방 등 에너지 비용 부담을 줄여주는 정부 지원 제도입니다.',
    target:
      '기초생활수급자 중 노인, 영유아, 장애인, 임산부, 중증질환자 등이 포함된 가구',
    income: '기초생활수급자 중심',
    benefit: '전기·가스·지역난방 등 에너지 비용 지원',
    period: '매년 신청 기간에 따라 상이',
    method: '주민센터 또는 복지로를 통해 신청',
    organization: '산업통상자원부 / 한국에너지공단',
    homepage: 'https://www.bokjiro.go.kr',
    tags: ['전기요금', '가스요금', '취약계층', '정부지원금'],
    age: 'all',
    family: 'all',
    incomeLevel: 'low',
    relatedCalculator: ['electric', 'gas'],
    relatedBlogs: ['electric-saving', 'gas-saving'],
    faq: [
      {
        question: '에너지바우처는 누구나 신청할 수 있나요?',
        answer: '아니요. 소득 기준과 세대원 특성 기준을 모두 충족해야 합니다.',
      },
      {
        question: '온라인 신청이 가능한가요?',
        answer: '복지로를 통해 온라인 신청이 가능한 경우가 있습니다.',
      },
    ],
  },
  {
    id: 'work',
    title: '근로장려금',
    category: '소득',
    summary: '열심히 일하는 저소득·중소득 근로 가구를 지원합니다.',
    description:
      '근로소득이 있는 가구의 소득을 보전해 주는 세금 환급형 지원으로, 일한 만큼 소득을 돌려받을 수 있습니다.',
    target: '근로소득이 있는 저소득·중소득 가구',
    income: '소득 기준 이하 근로 가구',
    benefit: '가구 소득 수준에 따른 현금 지급',
    period: '정기 신청(3~6월), 기한 후 신청(9~11월)',
    method: '국세청 홈택스에서 온라인 신청',
    organization: '국세청',
    homepage: 'https://www.hometax.go.kr',
    tags: ['근로소득', '세금환급', '저소득', '정부지원금'],
    age: 'all',
    family: 'all',
    incomeLevel: 'low',
    relatedCalculator: ['electric', 'health', 'pension'],
    relatedBlogs: ['earned-income-schedule'],
    faq: [
      {
        question: '무직 상태에서도 신청할 수 있나요?',
        answer: '근로소득이 있어야 신청할 수 있습니다.',
      },
      {
        question: '신청 후 언제 받을 수 있나요?',
        answer: '심사 후 지급 일정에 따라 통장으로 입금됩니다.',
      },
    ],
  },
  {
    id: 'youth-rent',
    title: '청년월세지원',
    category: '주거',
    summary: '청년 1인·신혼가구의 월세 부담을 덜어주는 주거 지원입니다.',
    description:
      '무주택 청년 세대주에게 월세 일부를 지원해 주거비 부담을 줄여주는 정부·지자체 연계 제도입니다.',
    target: '만 19~39세 청년, 무주택 세대주 등 요건 충족 시',
    income: '소득·자산 기준 충족 청년',
    benefit: '월세 일부 지원(지역·사업별 상이)',
    period: '사업별 신청 기간 공지',
    method: 'LH청약센터 또는 지자체 주거 포털 신청',
    organization: '국토교통부 / LH',
    homepage: 'https://www.myhome.go.kr',
    tags: ['월세', '청년', '주거비', '정부지원금'],
    age: '20',
    family: 'single',
    incomeLevel: 'middle',
    relatedCalculator: ['electric', 'gas'],
    relatedBlogs: ['electric-saving'],
    faq: [
      {
        question: '30대도 신청할 수 있나요?',
        answer: '만 39세 이하 청년이 대상입니다. 세부 요건은 공고를 확인하세요.',
      },
      {
        question: '전세도 지원되나요?',
        answer: '월세 중심 사업이며, 전세 지원은 별도 제도를 확인해야 합니다.',
      },
    ],
  },
  {
    id: 'child',
    title: '자녀장려금',
    category: '소득',
    summary: '자녀를 양육하는 가구의 소득을 보전해 줍니다.',
    description:
      '만 18세 미만 자녀가 있는 가구를 대상으로, 양육 부담을 줄이기 위한 세금 환급형 지원입니다.',
    target: '만 18세 미만 자녀가 있는 저소득·중소득 가구',
    income: '소득 기준 이하 가구',
    benefit: '자녀 수·소득 수준에 따른 현금 지급',
    period: '정기 신청(3~6월), 기한 후 신청(9~11월)',
    method: '국세청 홈택스에서 온라인 신청',
    organization: '국세청',
    homepage: 'https://www.hometax.go.kr',
    tags: ['자녀', '양육', '세금환급', '정부지원금'],
    age: 'all',
    family: 'child',
    incomeLevel: 'low',
    relatedCalculator: ['health', 'pension'],
    relatedBlogs: ['earned-income-schedule'],
    faq: [
      {
        question: '자녀가 1명이면 더 유리한가요?',
        answer: '자녀 수와 가구 소득에 따라 지급액이 달라집니다.',
      },
      {
        question: '근로장려금과 함께 받을 수 있나요?',
        answer: '요건을 충족하면 함께 신청·수령할 수 있습니다.',
      },
    ],
  },
  {
    id: 'training',
    title: '국민내일배움카드',
    category: '교육·취업',
    summary: '직업훈련 비용을 지원해 취업 역량을 키워줍니다.',
    description:
      '국민 누구나 직업능력 개발 훈련을 받을 수 있도록 훈련비를 지원하는 제도입니다.',
    target: '구직자, 재직자, 자영업자 등 훈련 수강 희망자',
    income: '소득 제한 없음(과정별 상이할 수 있음)',
    benefit: '직업훈련 수강비 지원',
    period: '연중 수시 신청',
    method: '고용24 또는 HRD-Net에서 카드 발급 후 수강',
    organization: '고용노동부 / 한국산업인력공단',
    homepage: 'https://www.work24.go.kr',
    tags: ['직업훈련', '취업', '내일배움카드', '정부지원금'],
    age: 'all',
    family: 'all',
    incomeLevel: 'all',
    relatedCalculator: [],
    relatedBlogs: [],
    faq: [
      {
        question: '재직 중에도 사용할 수 있나요?',
        answer: '재직자도 일부 과정은 수강할 수 있습니다.',
      },
      {
        question: '지원 한도가 있나요?',
        answer: '연간 지원 한도가 있으며, 과정별 지원 범위가 다릅니다.',
      },
    ],
  },
  {
    id: 'birth',
    title: '출산지원금',
    category: '출산·육아',
    summary: '출산·육아 가구의 경제적 부담을 줄여줍니다.',
    description:
      '출산을 앞두었거나 영유아 자녀가 있는 가구에 지자체·국가 출산 지원금을 제공합니다.',
    target: '출산 예정 또는 영유아 자녀가 있는 가구',
    income: '대부분 소득 무관(지자체별 상이)',
    benefit: '출산·육아 일시금 또는 바우처 지원',
    period: '출산 전후 또는 자녀 출생 후 일정 기간 내',
    method: '거주지 주민센터 또는 지자체 온라인 신청',
    organization: '보건복지부 / 지자체',
    homepage: 'https://www.bokjiro.go.kr',
    tags: ['출산', '육아', '영유아', '정부지원금'],
    age: 'all',
    family: 'child',
    incomeLevel: 'all',
    relatedCalculator: ['health'],
    relatedBlogs: [],
    faq: [
      {
        question: '지역마다 금액이 다른가요?',
        answer: '국가 지원과 지자체 추가 지원이 합쳐져 지역별 차이가 있습니다.',
      },
      {
        question: '둘째 아이도 지원되나요?',
        answer: '출산 순위에 따라 지원금이 달라질 수 있습니다.',
      },
    ],
  },
]

export default supportPrograms
