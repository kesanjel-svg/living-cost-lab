import { Link } from 'react-router-dom'
import GasCalculator from './GasCalculator'
import CalculatorGuide from '../components/CalculatorGuide'
import { formatPageTitle } from '../../../constants/branding'
import Seo from '../../../shared/seo/Seo'
import '../../../pages/Page.css'

const BREADCRUMBS = [
  { name: '홈', path: '/' },
  { name: '계산기', path: '/calculators' },
  { name: '도시가스 계산기', path: '/calculators/gas' },
]

const GAS_CALCULATOR_SCHEMA = {
  name: '도시가스 계산기',
  description:
    '지역별 도시가스사 요금표 기준으로 월 사용량(㎥)으로 예상 도시가스요금을 계산하는 무료 계산기',
  path: '/calculators/gas',
}

const GUIDE = {
  sections: [
    {
      heading: '도시가스 요금은 왜 지역마다 다른가요?',
      paragraphs: [
        '도시가스는 한국가스공사가 전국에 공급하는 도매요금은 동일하지만, 각 지역 도시가스회사가 소비자에게 파는 소매요금에는 지역별 소매공급비용이 더해져 최종 요금이 달라집니다. 이 계산기는 서울·부산·대구·인천·경기 등 48개 지역의 실제 공급사 요금표를 반영합니다.',
        '요금은 사용한 부피(㎥)가 아니라 열량(MJ) 기준으로 부과됩니다. 사용량(㎥)에 온압보정계수(0.9944)와 평균열량(42.5MJ)을 곱해 환산한 열량에 지역별 단가를 곱하는 방식입니다.',
      ],
    },
    {
      heading: '청구액 구성과 절약 방법',
      paragraphs: [
        '최종 요금은 매달 고정으로 부과되는 기본요금과 사용한 열량에 비례하는 사용량요금을 더한 뒤, 부가가치세 10%를 붙여 계산합니다. 겨울철 요금이 크게 오르는 것은 난방으로 사용 열량 자체가 늘기 때문입니다.',
        '보일러 온도를 1~2도만 낮춰도 사용량이 눈에 띄게 줄고, 문풍지·단열 커튼으로 열 손실을 막으면 같은 난방으로도 사용량을 아낄 수 있습니다. 겨울철에 사용량을 줄인 가구는 도시가스 절약 캐시백으로 절감분을 돌려받을 수도 있습니다.',
      ],
    },
  ],
  faq: [
    {
      question: '내 지역이 목록에 없으면 어떻게 하나요?',
      answer: '지원하지 않는 지역을 선택하면 48개 지역의 요금을 단순평균한 전국 평균 근사치로 계산됩니다. 실제 거주 지역의 정확한 요금은 해당 지역 도시가스회사 홈페이지에서 확인하는 것이 정확합니다.',
    },
    {
      question: '취사용과 개별난방용은 어떻게 다른가요?',
      answer: '일부 지역은 취사(요리)와 난방(보일러)의 단가가 다르게 책정됩니다. 특히 서울·대전 등은 월 516MJ를 기준으로 그 이하와 초과분의 난방 단가가 달라지는 구간요금제를 씁니다.',
    },
    {
      question: '왜 계산 결과가 실제 고지서와 조금 다른가요?',
      answer: '도시가스 요금은 격월 또는 수시로 조정되고, 검침 주기·계절별 가중평균열량이 공급사·월별로 소폭 다를 수 있습니다. 이 계산기는 각 지역 공급사의 최신 공식 요금표를 기준으로 하되, 실제 청구서와는 소폭 차이가 날 수 있습니다.',
    },
    {
      question: '기본요금은 사용량과 관계없이 항상 부과되나요?',
      answer: '네, 기본요금은 실제 사용량이 0㎥라도 매달 고정으로 부과되는 요금입니다. 지역별로 750원~1,700원 수준으로 다양합니다.',
    },
  ],
}

export default function GasCalculatorPage() {
  return (
    <div className="page page--gas-calculator">
      <Seo
        title={formatPageTitle('도시가스 계산기')}
        description="서울·인천·인천(부평)·김포·부산·대구·경산·광주·대전·울산·경기·용인·화성·고양·안산·파주·시흥·성남·남양주·의정부·경남·진주·양산·세종·강원·강릉·속초·원주·횡성·평창·청주·충주·천안·아산·공주·보령·서산·전주·군산·익산·포항·구미·경주·안동·여수·순천·목포·제주 등 48개 지역 도시가스사 요금표 기준으로 예상 도시가스요금을 계산하세요. 무료 도시가스 계산기로 생활비를 점검해보세요."
        keywords="도시가스 계산기, 도시가스 요금, 가스비 계산기, 도시가스 요금표"
        canonical="/calculators/gas"
        breadcrumbs={BREADCRUMBS}
        calculators={[GAS_CALCULATOR_SCHEMA]}
        faq={GUIDE.faq}
      />
      <div className="page__content">
        <Link to="/calculators" className="page__back">
          ← 계산기 목록
        </Link>
        <GasCalculator />
        <CalculatorGuide guide={GUIDE} />
      </div>
    </div>
  )
}
