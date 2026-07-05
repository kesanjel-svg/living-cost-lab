# Living Cost Lab — 진행 상황 (PROGRESS.md)

> 이 파일은 Claude Code가 세션 시작 시 CLAUDE.md의 `@PROGRESS.md` 참조를 통해 자동으로 읽습니다.
> 작업 완료 시 Claude Code가 이 파일을 직접 갱신합니다. Claude.ai에 별도로 복사/붙여넣기 할 필요 없음.
> 마지막 갱신: 2026-07-05

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

### 🔜 다음 할 일 (계산기 4개 — 전기/국민연금/건강보험/도시가스 — 완료됨)
아래 중 우선순위는 사용자 확인 후 진행:
1. **AdSense 실제 신청** — 콘텐츠량 재확인 필요(직전 기준 25/30, 도시가스 추가로 소폭 증가했으나 정확한 현재 콘텐츠 수는 재집계 필요)
2. **Search Console 크롤링 최종 확인**
3. ~~국민연금 기준소득월액 상·하한 재검증~~ → **완료 (2026-07-05)**
4. **도시가스 계산기 지역 확장** (경기/강원/충청/전라/경상 소도시 등)
5. **AdSense 실제 신청** (콘텐츠량 재확인 필요)
6. **Search Console 크롤링 최종 확인**

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
