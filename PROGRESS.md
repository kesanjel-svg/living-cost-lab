# Living Cost Lab — 진행 상황 (PROGRESS.md)

> 이 파일은 Claude Code가 세션 시작 시 CLAUDE.md의 `@PROGRESS.md` 참조를 통해 자동으로 읽습니다.
> 작업 완료 시 Claude Code가 이 파일을 직접 갱신합니다. Claude.ai에 별도로 복사/붙여넣기 할 필요 없음.
> 마지막 갱신: 2026-07-06

## 프로젝트 기본 정보
- 사이트: https://living-cost-lab.vercel.app/
- 스택: React 19 + Vite, react-router-dom v7, 순수 CSS(co-location), JS(TS 미사용), oxlint
- 배포: GitHub push → Vercel 자동배포
- Windows 환경, Claude Pro 구독

## Claude Code 자동화 세팅 (완료됨)
- `CLAUDE.md` — 프로젝트 규칙
- `.claude/agents/planner.md` — 기획
- `.claude/agents/frontend.md` — UI 구현
- `.claude/agents/logic-data.md` — 로직/데이터
- `.claude/agents/qa-reviewer.md` — 빌드/린트 검수 (일반 브라우저 UA 회귀 테스트 포함)
- `.claude/commands/continue.md` — `/continue`로 이 문서 기반 자율 진행 트리거

**작업 흐름**: `/continue` → PROGRESS.md 확인 → (범위 결정 필요 시 질문) → planner 계획 → frontend/logic-data 구현(auto 모드) → qa-reviewer 검증 → 커밋 → **push는 항상 확인받고 진행**

## Sprint 히스토리 (완료)
Sprint 6: SEO 강화 / 7: 통합검색 / 8: 카테고리 허브 / 9: AI 진단 2.0 / 10: 브랜딩·메타데이터 통합 / 11: 프로덕션 준비(스켈레톤 UI, 에러바운더리)

## Sprint 12 (Public Launch) — 진행 상황

### ✅ 완료
1. 헤더/푸터 태그라인 수정 (`src/constants/branding.js`)
2. robots.txt / sitemap.xml 검증, Search Console 제출
3. OG 이미지 SVG→PNG 변환 (sharp, 1200×630), `vercel.json` rewrite 예외 처리
4. **Sprint 12-A**: 봇 감지 미들웨어로 페이지별 OG 메타 주입 (`buildOgMetaManifest()`, `middleware.js`, 표준 Web API만 사용)
5. **Sprint 12-B**: GA4 exception 이벤트(ErrorBoundary), Vercel Analytics/Speed Insights 마운트
   - ⚠️ Vercel 대시보드 Analytics/Speed Insights "Enable" 토글 — 사용자 직접 확인 필요
   - ⚠️ `VITE_GA_MEASUREMENT_ID` 환경변수 Vercel 실제 설정 여부 — 최종 확인 필요
6. **Sprint 12-C 1단계**: AdSlot 배치, 전기요금 계산기(실제 한전 누진제 구조로 교체), 국민연금 계산기(9.5%) 구현
7. **전력산업기반기금 요율 확정 (2026-07-05)**: 3.7%→3.2%→**2.7%**(2025.7~) 확정 반영. 커밋 `65e9a55`. 전기요금 계산기 데이터 정확성 이슈 모두 해결됨
8. **Sprint 12-C 2단계 — 건강보험 계산기 (완료)**
   - 직장가입자: 보험료율 7.19% + 장기요양보험료율(건보료 대비 13.14%), 근로자/사업주 50%씩. 실측 검증 완료(보수월액 300만 → 122,021원)
   - 지역가입자: 소득·재산·자동차 점수제 원자료 재현 어려움 → "간이 추정치 + 면책 고지" 방식. 2026년 최저보험료(월 19,780원) 하한 정확 적용, 공식 모의계산 링크 안내
   - UI: 직장가입자/지역가입자 탭 전환, pension 폴더 구조 참고
   - 커밋 `dc66d96`(직장가입자) → `ae5b313`(지역가입자 탭) → `929b18c`(출처 주석 구체화)

9. **Sprint 12-C 3단계 — 도시가스 계산기 (완료, 커밋 `ae196eb`)**
   - 1차 구현 6개 지역: 서울(서울도시가스), 인천(삼천리), 부산(부산도시가스), 대구(대성에너지), 광주(해양에너지), 대전(씨엔씨티에너지)
   - `src/features/calculators/gas/` (GasCalculator, GasCalculatorPage) + `src/features/calculators/services/gasRegions.js`(지역별 요율 데이터), `gasService.js`(계산 로직)
   - 지역 선택 드롭다운 + 미지원 지역용 "전국 평균 근사치"(6개 지역 단순평균) 폴백 구현
   - 인천/부산/대구는 공식 페이지에 기본요금이 명시되지 않아 근사값 사용 + `note` 필드로 한계 고지, 각 지역 `source` URL·`effectiveDate` 주석 포함
   - 전기요금 계산기의 가스 추천 카드도 실제 계산기 링크로 연결
   - 라우트(`App.jsx`)/계산기 목록(`calculators.js`, `CalculatorsPage.jsx`) 등록 완료, 빌드/린트 통과 확인(2026-07-05)
   - 남은 지역(경기 일부/강원/충청/전라/경상 소도시 등) 확장은 추후 세션에서 순차 진행 — 우선순위는 다음 작업 결정 시 함께 논의

10. **도시가스 계산기 지역 1차 확장 — 울산/경기/경남 추가 (완료, 2026-07-05)**
   - 지원 지역 6개 → 9개로 확장: 서울/인천/부산/대구/광주/대전 + **울산(경동도시가스)/경기도(삼천리 외)/경남(경남에너지)**
   - 출처: 한국도시가스협회(citygas.or.kr) 공식 요금표(`http://www.citygas.or.kr/info/charge.jsp`, 2026-06-01 조정분, 원/MJ·부가세별도 기준) — 지역별 공급사가 신고한 소매요금을 협회가 취합한 공식 자료
   - 경남은 경남에너지 자체 홈페이지(knenergy.co.kr)로 기본요금(취사 1,700원/개별난방 850원)까지 교차 검증
   - `src/features/calculators/services/gasRegions.js`에 `ulsan`/`gyeonggi`/`gyeongnam` 항목 추가, `GAS_REGION_ORDER` 갱신, 전국평균 note 문구 6→9개 지역으로 갱신, `GasCalculatorPage.jsx` SEO description도 9개 지역으로 갱신
   - planner → logic-data(구현) → qa-reviewer(빌드/린트/계산 검증) 순서로 진행, 전원 통과
   - 남은 미지원 지역(경기 내 타 공급사 권역, 강원/충청/전라/경상 소도시, 세종 등)은 다음 라운드에서 우선순위 논의 후 진행

11. **도시가스 계산기 지역 2차 확장 — 세종/강원 추가 (완료, 2026-07-05)**
   - 지원 지역 9개 → 11개로 확장: 기존 9개 + **세종(중부도시가스)/강원(강원도시가스, 춘천 등)**
   - 강원은 강원도시가스 공식 홈페이지(`https://www.skens.com/gangwon/rate/guide.do`)에서 직접 확인(기본요금 1,150원, 24.1221원/MJ, 2026-07-01 적용) — 1차 공식 출처
   - 세종은 한국도시가스협회 공식 취합표(`http://www.citygas.or.kr/info/charge.jsp`, 2026-06-01 조정분) 기준, 기본요금은 개별·중앙난방 공용(820원) 근사치로 처리하고 취사전용(2,533원) 차이는 note로 고지
   - `gasRegions.js`에 `sejong`/`gangwon` 추가, `GAS_REGION_ORDER` 갱신, 전국평균 note 9→11개 지역, `GasCalculatorPage.jsx` SEO description도 11개 지역으로 갱신
   - planner → logic-data(구현) → qa-reviewer(빌드/린트/계산/평균 산출 검증) 순서로 진행, 전원 통과
   - 남은 미지원 지역(충청/전라/경상 소도시, 경기 내 타 공급사 권역, 강원 영동지역 등)은 다음 라운드에서 우선순위 논의 후 진행

12. **도시가스 계산기 지역 3차 확장 — 청주/천안 추가 (완료, 2026-07-05)**
   - 지원 지역 11개 → 13개로 확장: 기존 11개 + **청주(충청에너지서비스)/천안(중부도시가스)**
   - 청주는 충청에너지서비스 공식 홈페이지(`https://www.skens.com/cheongju/rate/guide.do`)에서 직접 확인(기본요금 1,050원, 취사 23.4509원/MJ·난방 23.2208원/MJ, 2026-07-01 적용) — 1차 공식 출처
   - 천안은 한국도시가스협회 공식 취합표(`http://www.citygas.or.kr/info/charge.jsp`, 2026-06-01 조정분) 기준(기본요금 1,000원, 24.1111원/MJ), 중부도시가스 자체 홈페이지 접근 불가로 협회 자료 사용 + note로 고지(아산·공주·보령 등 동일 공급권역 타 지역은 별도 확인 필요)
   - `gasRegions.js`에 `cheongju`/`cheonan` 추가, `GAS_REGION_ORDER` 갱신(13개), 전국평균 note 11→13개 지역, `GasCalculatorPage.jsx` SEO description도 13개 지역으로 갱신
   - planner → logic-data(구현) → qa-reviewer(빌드/린트/계산/평균 산출 검증) 순서로 진행, 전원 통과
   - 남은 미지원 지역(전라/경상 소도시, 경기 내 타 공급사 권역, 강원 영동지역, 중부도시가스 권역 내 아산·공주·보령 등)은 다음 라운드에서 우선순위 논의 후 진행

13. **도시가스 계산기 지역 4차 확장 — 아산/공주/보령 추가 (완료, 2026-07-05)**
   - 지원 지역 13개 → 16개로 확장: 기존 13개 + **아산·공주·보령(모두 중부도시가스 공급권역)**
   - 중부도시가스 자체 페이지(skens.com 계열 URL 패턴 `asan`/`gongju`/`boryeong`/`jungbu` 등)를 먼저 시도했으나 모두 "Error" 응답만 반환 — 이전 세종/천안 조사 때와 동일하게 자체 홈페이지 요금표 접근 불가 확인
   - 대신 한국도시가스협회 공식 취합표(`http://www.citygas.or.kr/info/charge.jsp`, 2026-06-01 조정분, 이미지 형태 요금표) 확인 결과 "충남 천안시(JB)" 대표값 한 줄만 게시되어 있고 아산·공주·보령을 개별 항목으로 구분하지 않음을 확인
   - 뉴스 검색(가스신문 등)으로 중부도시가스가 보령·논산 등으로 공급권역을 확장해온 이력을 교차 확인, 아산도 중부도시가스 관련 사업자 정보로 교차 확인
   - 협회 자료가 개별 지역을 구분하지 않으므로 **3개 지역 모두 천안(JB)과 동일한 대표값(기본요금 1,000원, 24.1111원/MJ)을 근사치로 적용**, 각 항목의 `note`에 이 한계를 명시(개별 수치 미공시, 정확한 금액은 고객센터 1544-0041 재확인 권장)
   - `gasRegions.js`에 `asan`/`gongju`/`boryeong` 추가, `GAS_REGION_ORDER` 갱신(16개), 전국평균 note 13→16개 지역, `GasCalculatorPage.jsx` SEO description도 16개 지역으로 갱신
   - 빌드/평균 산출 로직 재검증 완료(logic-data 에이전트 단독 진행, 코드 변경 최소화 원칙에 따라 gasService.js/GasCalculator.jsx는 수정하지 않음)

14. **지원금 콘텐츠(income 카테고리) 3종 추가 — 아동수당/국민취업지원제도/생계급여 (완료, 2026-07-05)**
   - `src/data/support/income/childcareAllowance.json`(id `childcare-allowance`): 아동수당 — 소득·재산 무관 만 9세 미만(만 8세 이하) 모든 아동에게 월 10만원(비수도권 10.5만원, 인구감소지역 우대 11만원, 특별지역 12만원(지역화폐 포함)) 지급. 출처: 보건복지부 공식 페이지(`www.mohw.go.kr/menu.es?mid=a10711030100`, 2026-07-05 확인) — 2026-04-24부로 지급대상이 기존 만 7세 이하에서 만 8세 이하로 확대된 최신 상태 반영
   - `src/data/support/income/jobSeekerSupport.json`(id `job-seeker-support`): 국민취업지원제도 — Ⅰ유형 구직촉진수당 2026년 월 60만원(2025년 50만원에서 인상, `'26.1.1.~` 적용)×최대 6개월 + 부양가족 가산(1인당 월 10만원, 최대 40만원) + 취업성공수당 최대 150만원, Ⅱ유형 취업활동비용 지원. 출처: 고용노동부 국정성과 페이지(`www.moel.go.kr/news/achievements/view.do?bbs_seq=20260201211`) + 고용24 공식 제도안내 페이지(`www.work24.go.kr`, systId=SI00000316), 2026-07-05 확인
   - `src/data/support/income/livelihoodBenefit.json`(id `livelihood-benefit`): 생계급여 — 선정기준 기준 중위소득 32% 이하, 2026년 선정기준액(=최대 지급액) 1인가구 82만 556원 / 2인 134만 3,773원 / 3인 171만 4,892원 / 4인 207만 8,316원 / 5인 241만 8,150원 / 6인 273만 7,905원. 출처: 보건복지부 보도자료 "2026년도 기준 중위소득 6.51% 역대 최대로 인상"(작성일 2025-07-31, 제77차 중앙생활보장위원회 의결, `www.mohw.go.kr/board.es?mid=a10503010100&bid=0027&list_no=1487098`), 2026-07-05 확인
   - 3개 파일 모두 `src/data/support/index.js`의 `import.meta.glob` 자동 로드 구조를 그대로 활용 — 라우팅/등록 코드 수정 없음
   - id/slug 중복 없음 확인(기존 `child`/`work`/`youth-rent`/`energy`/`birth`/`training`과 겹치지 않음), `filters.json` 기반 enum(`age`: all, `family`: child/all/all, `incomeLevel`: all/all/low) 준수, `relatedCalculators`/`relatedPosts`는 실제 존재하는 계산기 id와 blogPosts.js slug 중 직접 관련된 항목만 사용(대부분 빈 배열, 생계급여만 `electric`/`gas` 연결)
   - 빌드(`npm run build`) 및 린트(`npm run lint`) 통과 확인, JSON 유효성 검증 완료

15. **지원금 콘텐츠 12종 대량 확충 — 출산·육아교육·에너지·청년 (완료, 2026-07-05, 9개→21개)**
   - **출산(birth) 3종**: 첫만남이용권(`first-meeting-voucher`, 출생아당 200만원/300만원 국민행복카드 포인트, 소득무관), 부모급여(`parental-allowance`, 만0세 월100만원·만1세 월50만원 현금, 소득무관), 산모·신생아 건강관리 지원(`postpartum-care`, 중위소득 150% 이하 가정 방문서비스 바우처)
   - **육아·교육(education) 3종**: 영유아보육료(`childcare-fee`, 어린이집 이용 만0~5세, 연령별 월 28만~58.4만원), 유아학비/누리과정(`kindergarten-tuition`, 유치원 만3~5세, 국공립 월10만원/사립 월28만원), 국가장학금(`national-scholarship`, 학자금 지원구간별 차등, 9구간까지 지원)
   - **에너지(energy) 3종**: 연탄쿠폰(`coal-briquette-coupon`, 연탄사용 저소득가구 연 47.2만원 상당), 전기요금 복지할인(`electric-welfare-discount`, 수급자·장애인·다자녀가구 월 상시 자동할인, 기존 계절형 에너지바우처와 메커니즘 상이함을 검토·확인), 고효율 가전 구매비 지원(`high-efficiency-appliance-rebate`, 1등급 가전 구매비 15%/30% 환급, 가구당 누적 한도 30만원)
   - **청년(youth) 3종**: 청년도약계좌(`youth-leap-account`, 5년 만기 정부기여금 매칭 적금), 청년내일저축계좌(`youth-tomorrow-savings`, 3년 만기 저소득 근로청년 정액 매칭), 청년전세자금대출/버팀목전세자금 청년가구(`youth-jeonse-loan`, 무주택 청년세대주 대상 전세대출, 기본금리 연 2.5~3.5%) — 원래 검토되던 "청년일자리도약장려금"은 실제 수혜자가 사업주(고용주)라 개인 신청 지원금 취지에 맞지 않아 드롭하고, 청년 개인이 직접 신청하는 이 대출로 교체
   - qa-reviewer 검증: 빌드/린트 통과, 21개 데이터셋 전체 id/slug 중복 없음, enum(`age`: all/20, `family`: all/child/single, `incomeLevel`: all/low/middle) 전수 매칭 확인(`supportService.js`의 mapAge/mapFamily/mapIncomeLevel 허용 범위 내), `relatedCalculators`는 `electric`/`health`만 사용(유효한 4개 계산기 id 내), `relatedPosts` 참조 슬러그(child-benefit-guide, electric-saving-tips 등) 모두 `blogPosts.js`에 실존 확인, 빌드 산출물(dist)에 신규 항목 문자열 정상 포함 확인
   - 에너지 3종의 "에너지바우처와 중복 아님" 판단 근거: 에너지바우처=계절형(하절기/동절기) 전기·가스·난방 통합 바우처(기초수급자 중 특정 취약계층), 연탄쿠폰=연탄 사용가구 전용 현물지원, 전기요금 복지할인=매월 요금고지서 자동차감형 상시할인(별도 계좌 지급 없음), 고효율가전 리베이트=1회성 구매비 환급(자본적 지출 보조) — 네 제도 모두 지급 방식·주기·재원이 달라 실질적 중복이 아님을 확인, 각 파일 FAQ에도 중복수령 가능 여부를 명시해 사용자 혼란 방지
   - 국가장학금 9구간 신설, 청년전세자금대출 금리(2026.2.27 고시 기준)는 logic-data가 작성 시점에 WebSearch로 확인한 값 — qa-reviewer 세션에는 웹 접근 도구가 없어 재검증은 못했으므로, 다음 세션에서 시간 날 때 한 번 더 공식 출처 재확인 권장
   - `git add` + 커밋 완료 (`content: 지원금 콘텐츠 12종 추가 — 출산·육아교육·에너지·청년 (9개→21개)`), push는 사용자 확인 후 별도 진행

16. **애드센스 퍼블리셔 ID 반영 + SDK 실제 로드 구현 (완료, 2026-07-05)**
   - 사용자가 이미 구글 애드센스 가입 완료, 퍼블리셔 ID 발급받음 — Vercel 환경변수에 `VITE_ADSENSE_CLIENT=ca-pub-1859885343476436`, `VITE_ADSENSE_PUBLISHER_ID=pub-1859885343476436` 반영 완료(사용자 직접 설정)
   - 코드 점검 중 **`<ins class="adsbygoogle">` 요소만 렌더링될 뿐 실제 애드센스 SDK 스크립트 로드도, `adsbygoogle.push({})` 슬롯 초기화도 없어서 환경변수를 넣어도 광고가 실제로 표시되지 않는 문제**를 발견 — 이번에 같이 구현
   - `src/shared/ads/adsConfig.js`에 `initAdSense()` 추가: `isAdSenseEnabled()`(프로덕션 + 클라이언트ID 존재) 조건일 때만 `<head>`에 SDK 스크립트(`pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=...`) 동적 삽입, 중복 삽입 방지(`sdkInjected` 플래그 + `querySelector` 이중 체크), `async`/`crossOrigin="anonymous"` 적용
   - `src/main.jsx`에서 `initAnalytics()` 패턴 그대로 따라 앱 진입 시 `initAdSense()` 1회 호출 추가
   - `src/shared/ads/AdSlot.jsx`에 `useEffect` 추가: 마운트/`slotId` 변경 시 `(window.adsbygoogle = window.adsbygoogle || []).push({})` 호출(개발 모드·slotId 없음이면 미호출), try/catch로 감싸 광고차단 확장 등으로 인한 예외가 앱을 깨뜨리지 않도록 처리, `react/rules-of-hooks` 준수(훅이 조건부 return보다 먼저 선언)
   - 새 의존성 추가 없음, 로컬 dev 환경(`.env` 없음)에서는 기존과 동일하게 광고 비활성 상태 유지 확인(회귀 없음)
   - qa-reviewer 검증: 빌드/린트 통과, DEV 모드 비활성/중복삽입 방지/Hooks 규칙 준수 확인, `BlogPage`/`BlogDetailPage`/`SupportDetailPage` 3곳 AdSlot 사용처 회귀 없음 확인
   - 커밋 `14b9629` (`feat: 애드센스 SDK 스크립트 로드 및 광고 슬롯 초기화 구현`), push 완료
   - **주의**: Windows 로컬 PC의 `COMPUTERNAME`이 한글이라 Node의 `os.hostname()`이 비ASCII 값을 반환 → `npx vercel login` 등 Vercel CLI 사용 시 `ByteString` 변환 오류로 로그인 불가(환경변수 override로도 우회 안 됨, Node가 Windows API 직접 호출). CLI 대신 Vercel 대시보드(웹)로 환경변수 확인/설정 필요 — 컴퓨터 이름을 영문으로 바꾸면 해결 가능하나 재시작 필요한 시스템 변경이라 보류 중

17. **국가장학금 9구간 / 청년전세자금대출 금리 재검증 (완료, 2026-07-06)**
   - **국가장학금**: 한국장학재단 공식 페이지(`kosaf.go.kr`, 지원금액표) 재확인 결과 기존 데이터(1~3구간 연600만/학기300만, 4~6구간 연440만/학기220만, 7~8구간 연360만/학기180만, 9구간 연100만/학기50만) **정확함 — 수정 없음**
   - **청년전세자금대출(버팀목전세자금 청년가구)**: 국토교통부 주택도시기금 공식 포털(`nhuf.molit.go.kr`, 청년전용 버팀목전세자금 상품 페이지)에서 직접 확인한 결과, 기존 데이터의 "기본금리 2.5%~3.5%"는 **일반(비청년) 버팀목 상품 금리와 혼동된 오류**였음 — 청년전용 버팀목의 실제 기본금리는 **연 2.2%~3.3%**(지방 소재 주택은 0.2%p 추가 인하)로 확인, `src/data/support/youth/youthJeonseLoan.json`의 `benefit` 필드 수정 완료
   - 대출한도(최고 1억5천만원, 만25세 미만 1억2천만원), 임차보증금 한도(3억원 이하)는 기존 데이터와 공식 포털 수치가 일치 — 변경 없음
   - 빌드(`npm run build`)/린트(`npm run lint`) 통과 확인(기존 무관 warning 1건 `recommendationEngine.js` 미사용 함수만 존재)
   - 커밋 예정: `content: 청년전세자금대출 기본금리 수정 — 일반 버팀목과 혼동된 2.5~3.5%를 청년전용 정확값 2.2~3.3%로 정정`

18. **도시가스 계산기 지역 5차 확장 — 강원 영동/경기 타 공급사/전라·경상 소도시 (완료, 2026-07-06, 27개 지역)**
   - 지원 지역 16개 → 27개로 확장, 3단계로 진행. `http://www.citygas.or.kr/info/charge.jsp`의 2026-06-01 조정분 요금표 이미지에서 이번에 처음으로 전국 시·도별 개별 수치 전체가 확인되어(과거엔 도매값만 이미지로 볼 수 있었음), 여러 지역을 한 번에 정확히 확인할 수 있었음. 한국가스공사(KOGAS) 공식 지역별 도시가스회사 공급구역 안내(`https://www.kogas.or.kr/site/koGas/1020408040000`)도 함께 확인해 회사명·공급구역을 교차 검증
   - **1단계 — 강원 영동지역(2개)**: 강릉(참빛영동도시가스, 강릉·동해·삼척)·속초(참빛도시가스, 속초·고성·양양) 추가. KOGAS 공급구역 안내로 정확한 회사명을 확인했고(둘은 법인이 다름), 실제 소매요금은 협회 요금표에 "강원 영동지역(참빛영동,속초)"로 합산 표기되어 있어 동일 수치(기본요금 1,150원, 25.0337원/MJ) 사용. 기존 "강원(춘천)" 항목의 note도 정확한 공급사명으로 갱신
   - **2단계 — 경기 내 타 공급사 권역(2개, 계획 대비 실제 공급사 전면 정정)**: 계획 단계에서 추정했던 고양=예스코/부천=코원에너지서비스/평택=대륙에너지는 KOGAS 공식 자료로 재확인한 결과 **모두 틀림** — 실제로는 고양·파주=서울도시가스, 부천·평택=삼천리로, 이미 기존 "서울"·"경기도" 항목과 같은 공급사였음. 대신 진짜 타 공급사 권역인 **성남(코원에너지서비스)**·**남양주(예스코)**를 추가. 두 회사의 자체 요금조회(코원 `skens.com/koone/rate/guide.do`, 예스코는 화면이 JS로 렌더링되어 페이지 내부 API `/Common/connApiServer.do`를 직접 조회)로 확인한 결과 모두 기존 "경기도"(삼천리) 항목과 완전히 동일한 수치(기본요금 1,250원, 22.6226원/MJ)임을 확인 — **경기도는 공급사와 무관하게 도 전체 동일 소매요금이 적용됨**을 3개 회사(삼천리·코원·예스코) 공식 자료로 교차 확인한 것이 이번 라운드의 핵심 발견. "경기도" 항목 note도 이 내용으로 갱신. 의정부(대륜이엔에스)는 자체 홈페이지 요금 페이지가 로그인 필요로 막혀 있어 직접 확인은 못했으나, 같은 패턴(도 전체 동일 요금)이 적용될 가능성이 높음 — 이번 라운드에는 미포함
   - **3단계 — 전라·경상 소도시(7개)**: 전주(전북도시가스)·포항(영남에너지서비스)·진주(지에스이)·여수(대화도시가스)·순천(전남도시가스)·목포(MC에너지)·양산(경동도시가스) 추가. 모두 협회 공식 요금표 이미지에서 개별 시 단위 수치를 직접 확인(근사치 아님). 진주는 지에스이 자체 홈페이지(`yesgse.com`, 2026-07-01 기준)에서 기본요금(취사전용·개별난방 1,100원/지역난방 1,700원)까지 추가로 교차 검증. 양산은 울산과 같은 경동도시가스 소속이지만 요금이 달라(23.9659원/MJ vs 울산 22.818원/MJ) 별도 항목으로 분리
   - **제외된 지역과 이유**: 구미·경주·안동(경북), 군산·익산(전북)은 협회 요금표에 개별 수치가 이미 있으나 이번 라운드 계획 범위 밖이라 제외(다음 라운드 후보). 의정부(대륜이엔에스)는 자체 사이트 로그인 장벽으로 이번엔 제외
   - `GAS_REGION_ORDER` 16→27개 갱신, `getNationwideAverageRegion()`의 전국평균 note 27개 지역으로 갱신, `GasCalculatorPage.jsx` SEO description도 27개 지역으로 갱신. `GasCalculator.jsx`/`gasService.js`는 지역 목록을 동적 렌더링하므로 수정 불필요(과거 확장 라운드와 동일)
   - 단계별 3회 커밋 완료(`b658ad3` 1단계, `07100aa` 2단계, `a297aab` 3단계), 각 단계마다 `npm run build`/`npm run lint` 통과 확인. **push는 아직 하지 않음 — 사용자 확인 후 진행**

19. **Search Console 크롤링 확인 시도 — sitemap.xml 누락 버그 발견 및 수정 (완료, 2026-07-06)**
   - Claude 브라우저 확장이 연결되어 있지 않아 Google Search Console 대시보드 자체(크롤링 상태·색인 현황)는 직접 확인 불가 — **사용자가 Search Console에서 직접 확인 필요** (연결 시 다음 세션에서 재시도 가능)
   - 대신 프로덕션 `robots.txt`/`sitemap.xml`을 WebFetch로 점검하다가 **`/calculators/gas`(도시가스 계산기) 페이지가 sitemap.xml에서 누락**되어 있는 것을 발견 — `src/shared/seo/buildSeoAssets.js`의 `STATIC_PATHS` 배열에 가스 계산기 라우트가 애초에 추가되지 않았던 것이 원인(계산기 자체는 정상 배포·서빙 중이었으나 sitemap에서만 빠져 있어 Search Console이 자동 발견하기 어려운 상태였음)
   - `STATIC_PATHS`에 `/calculators/gas` 추가, 빌드 후 `dist/sitemap.xml`에 정상 포함됨을 직접 확인, 린트도 통과(기존 무관 warning만 존재)
   - `robots.txt`는 정상(Sitemap 위치 명시, `/dashboard`·`/profile`·`/cost-report/share/`만 Disallow, 나머지 전체 허용) — 문제 없음
   - 커밋 `fb2fecf`(`fix: sitemap.xml에 도시가스 계산기 페이지 누락 추가`)

### 🔜 다음 할 일
아래 중 우선순위는 사용자 확인 후 진행:
1. **애드센스 실제 심사 결과 대기/확인** — SDK 로드 구현 완료, 배포 반영됨. 사이트에서 실제 광고가 노출되는지 프로덕션에서 육안 확인 필요. 콘텐츠량은 계산기 4 + 지원금 21 = 25개로 크게 증가했으나 여전히 통상 권장(20~30+)의 하한 근처라 심사 통과 여부는 지켜봐야 함
2. **Search Console 대시보드 직접 확인** — sitemap 누락 버그는 수정 완료(19번 항목), 이제 재제출 후 실제 색인 상태는 사용자가 Search Console에서 직접 확인하거나 브라우저 확장 연결 후 재시도
3. **도시가스 계산기 지역 6차 확장 후보**: 구미·경주·안동(경북), 군산·익산(전북) — 협회 요금표에 이미 개별 수치가 있어 데이터 추가 조사 없이 바로 반영 가능. 의정부(대륜이엔에스)는 공식 사이트 로그인 장벽 재시도 또는 대체 출처 필요

### ✅ 국민연금 기준소득월액 재검증 결과 (2026-07-05)
- 결론: **기존 구현값(하한 41만원 / 상한 659만원, 2026.7.1~2027.6.30 적용)이 정확함 — 수정 불필요**
- 이전 세션에서 발견했던 "하한 40만원 / 상한 637만원"은 **직전 적용기간(2025.7.1~2026.6.30)의 값**이었을 뿐, 서로 충돌하는 자료가 아니었음(국민연금 기준소득월액은 매년 7월 1일 갱신)
- 국민연금공단 공식 페이지(nps.or.kr)로 확인, `pensionService.js` 주석에 확인 날짜 및 혼동 방지 설명 추가
- 출처: https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do , https://www.mohw.go.kr/board.es?mid=a10409020000&bid=0026&list_no=1484511&act=view (직전 기간 고시)

### 별도 트랙 (나중 스프린트)
페이지별 OG 메타는 blog/support/topics만 1차 구현. about/contact 등은 홈과 동일한 기본 메타 — 하드코딩된 title/description을 데이터로 빼내는 선행 작업 후 2차 확장 가능

## 중요 결정/제약 사항
- 새 의존성 추가는 신중하게 — 현재까지 @vercel/analytics, @vercel/speed-insights, sharp만 추가
- `import.meta.glob`은 Vercel Edge Middleware에서 사용 불가 (Vite 전용) — 빌드 타임 매니페스트(JSON) 생성으로 우회
- 정부/공단 공식 수치는 학습 지식만으로 하드코딩 금지, 매번 WebSearch/WebFetch로 최신 공식 발표 재확인 후 출처+기준일 주석 필수
- 공식 수치는 1차 공식 출처(보건복지부·국민건강보험공단·국민연금공단·산업통상자원부 등) 우선, 3자 블로그·요약 사이트는 교차 확인용으로만 사용
- **블로그 포스팅(네이버/구글 블로그, 유튜브 채널 등)은 사용자가 별도 관리 — 이 코딩 트랙과 완전히 분리**. "다음" 같은 모호한 입력을 블로그 트리거로 오인하지 말 것

## 작업 자율성 규칙 (Auto 모드)
- 이 프로젝트는 기본적으로 auto 모드로 작업 진행
- 파일 생성/수정, 코드 조사, WebSearch/WebFetch, git commit까지는 승인 없이 자동 진행
- **git push는 예외** — 항상 사용자에게 먼저 확인받고 진행
- 대량 삭제, 설정파일(vercel.json, package.json 등) 구조 변경, 의존성 추가는 auto 모드여도 먼저 확인
- 범위가 정해지지 않은 결정(예: 신규 계산기 지역 범위, 데이터 소스 선택)이 필요한 지점에서는 진행 전 사용자에게 먼저 질문
