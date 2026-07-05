# 생활비연구소 (living-cost-lab) — 프로젝트 가이드

> 이 파일은 Claude Code가 세션을 시작할 때마다 자동으로 읽습니다.
> "이 프로젝트에서 지켜야 할 규칙"을 여기에 계속 누적해두면, 매번 설명하지 않아도 됩니다.

## 프로젝트 개요
- 서비스: 정부지원금 · 생활비 계산 플랫폼 (living-cost-lab.vercel.app)
- 배포: GitHub → Vercel 자동배포 (main 브랜치 push 시 프로덕션 반영)
- 스택 정보
  - 프레임워크: React 19 + Vite (Next.js 아님, App Router 아님) / SPA, `react-router-dom` v7으로 라우팅 (`BrowserRouter`, 페이지 단위 `lazy` + `Suspense`)
  - 언어: JavaScript (`.jsx`/`.js`) — TypeScript는 사용하지 않음 (`@types/react` 등은 에디터 타입힌트용으로만 존재)
  - 스타일링: 일반 CSS (Tailwind 아님, CSS Modules 아님) — 컴포넌트별로 동일 이름의 `.css`를 같은 폴더에 두고 import (`Header.jsx` + `Header.css`), BEM 느낌의 클래스명 사용 (`app__main`, `calculator__results` 등)
  - 라우팅/코드스플리팅: `src/app/App.jsx`에서 모든 라우트를 `lazy()`로 선언, 홈만 즉시 로드
  - SEO: `react-helmet-async` + `src/shared/seo/` (Seo, SeoHead, StructuredData, schemaBuilders), sitemap.xml/robots.txt/ads.txt/site.webmanifest는 `vite.config.js`의 커스텀 플러그인이 빌드 시 자동 생성
  - 분석/광고: Google Analytics4 (`VITE_GA_MEASUREMENT_ID`), Google AdSense (`VITE_ADSENSE_CLIENT`, `VITE_ADSENSE_PUBLISHER_ID`) — `.env.example` 참고, 실제 값은 `.env`에만
  - 배포: Vercel (`vercel.json`에서 SPA rewrite + sitemap/robots/ads.txt 응답 헤더 설정)
  - 패키지 매니저: npm (`package-lock.json` 존재)
  - 린트: `oxlint` (ESLint 아님) — `npm run lint`, 설정은 `.oxlintrc.json` (react/oxc 플러그인, `react/rules-of-hooks` error)
  - 빌드/개발: `npm run dev`, `npm run build`, `npm run preview`

## 작업 방식 (기존 ChatGPT+Cursor 워크플로우 대체)
1. 기능 요청이 들어오면 먼저 **planner 서브에이전트**에게 작업을 쪼개게 한다
2. 실제 구현은 **frontend** 또는 **logic-data** 서브에이전트가 담당
3. 커밋 전 반드시 **qa-reviewer** 서브에이전트가 빌드/린트 확인
4. 문제 없으면 의미 있는 단위로 커밋 → push (Vercel이 자동 배포)
5. 절대 `main`에 직접 큰 변경을 한번에 밀어넣지 않고, 기능 단위로 커밋을 쪼갠다

## 커밋 컨벤션
- `feat: ...`, `fix: ...`, `refactor: ...`, `content: ...` (블로그/콘텐츠성 변경), `chore: ...`
- 커밋 메시지는 한국어로, 무엇을 왜 바꿨는지 한 줄로

## 코드 스타일 규칙
- 폴더 구조는 **feature-based**: `src/features/<기능>/{components,pages,services,data,hooks}` 아래에 관련 파일을 모두 모아둠 (예: `features/calculators/electric/`, `features/cost-report/`, `features/support/`)
  - 여러 feature가 공유하는 것은 `src/shared/`(seo, analytics, ads, ui, error, storage, content), 앱 전체 상수는 `src/constants/`, 순수 계산/추천 로직은 `src/engines/`에 둔다
  - 페이지 전용이 아닌 재사용 컴포넌트는 `src/components/`, `src/components/ui/`에
- 컴포넌트 파일명은 PascalCase (`ElectricCalculator.jsx`), 서비스 파일은 camelCase + `Service` 접미사 (`electricService.js`, `profileService.js`), 폴더명은 kebab-case (`cost-report`)
- 컴포넌트 상태관리는 로컬 `useState` 중심 (전역 상태 라이브러리 없음) — 비즈니스 로직은 컴포넌트 밖 `services/`나 `engines/`의 순수 함수로 분리해서 호출
- 새 컴포넌트를 만들기 전에 기존 컴포넌트(`src/components/ui/`, `src/shared/ui/`) 재사용 가능한지 먼저 확인
- 하드코딩된 정부지원금 수치/링크는 코드에 넣지 않고 `src/data/support/<카테고리>/*.json`에 분리한다 (이미 이 구조로 되어 있음: `birth/`, `education/`, `energy/`, `income/`, `youth/` 등). 새 지원금 추가 시 기존 JSON 스키마(`id`, `slug`, `title`, `category`, `summary`, `target`, `benefit`, `applyPeriod`, `documents`, `tags`, `faq` 등)를 그대로 따른다
- 새 라우트를 추가할 때는 `src/app/App.jsx`에 `lazy()` import + `<Route>` 등록 (홈 페이지 제외 전부 lazy load 유지)

## 절대 하지 말아야 할 것
- API 키, 환경변수 값을 코드에 하드코딩하지 않는다 (`.env` 사용, `.env.example`에만 키 이름 기록)
- `main` 브랜치에 실패하는 빌드를 push하지 않는다 (qa-reviewer 통과 후에만 push)
- 사용자 확인 없이 package.json의 주요 의존성 버전을 임의로 올리지 않는다
- ESLint 설정을 새로 추가하지 않는다 — 이 프로젝트는 `oxlint`를 사용한다
- TypeScript로 전면 전환하지 않는다 (`.jsx`/`.js` 유지) — 타입 강화가 필요하면 별도로 논의 후 진행

## 배포 확인
- push 후 Vercel 배포 상태는 Vercel 대시보드 또는 `vercel ls` (Vercel CLI 연동 시)로 확인
- 배포 실패 시 qa-reviewer가 먼저 로컬 빌드(`npm run build`)로 재현해서 원인 파악

## 진행 상황 문서 (자동 참조)
@PROGRESS.md

세션 시작 시 위 파일을 항상 먼저 읽고, "다음 할 일" 섹션을 기준으로 현재 상태를 파악한다.
작업 완료 후에는 PROGRESS.md의 완료 항목 / 다음 할 일 섹션을 직접 갱신한다.

## 작업 자율성 규칙 (Auto 모드)
- 이 프로젝트는 기본적으로 auto 모드로 작업 진행한다.
- 파일 생성/수정, 코드 조사, WebSearch/WebFetch, git commit까지는 승인 없이 자동 진행한다.
- **git push는 예외다** — 항상 사용자에게 먼저 확인받고 진행한다.
- 대량 삭제, 설정파일(vercel.json, package.json 등) 구조 변경, 새 의존성 추가는 auto 모드여도 먼저 확인받는다.
- 범위가 정해지지 않은 결정(예: 신규 계산기의 지역 범위, 데이터 소스 선택)이 필요한 지점에서는 진행 전에 사용자에게 먼저 질문한다.
