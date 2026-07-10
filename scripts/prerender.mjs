// 빌드 후 정적 프리렌더링 스크립트.
// dist/index.html(SPA 셸)을 템플릿으로, dist-ssr/entry-server.js(SSR 번들)로
// sitemap의 모든 경로를 렌더링해 dist/<경로>/index.html로 저장한다.
// 실행 순서: vite build → vite build --ssr → node scripts/prerender.mjs
//
// React 19의 prerender는 페이지가 선언한 <title>/<meta>/<link>를 스트림 맨 앞에
// hoist해서 내보낸다 — 이 선두 메타 블록을 잘라 <head>로 옮기고, 템플릿의
// 기본 메타(타이틀·설명·canonical·og·twitter·홈 스키마)는 제거해 중복을 막는다.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = join(root, 'dist')
const ssrEntry = pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href

const { render, getPrerenderPaths } = await import(ssrEntry)

const template = readFileSync(join(distDir, 'index.html'), 'utf8')

// 렌더 결과 선두의 hoisted 메타 블록(<title>/<meta>/<link> 연속 구간)
const HOISTED_HEAD_RE =
  /^(?:<title>[\s\S]*?<\/title>|<meta [^>]*?\/?>|<link [^>]*?\/?>)+/

function splitHoistedHead(appHtml) {
  const match = appHtml.match(HOISTED_HEAD_RE)

  if (!match || !match[0].includes('<title>')) {
    return { headHtml: '', bodyHtml: appHtml }
  }

  return { headHtml: match[0], bodyHtml: appHtml.slice(match[0].length) }
}

/**
 * 템플릿의 기본 head 태그를 제거하고 페이지별 메타 블록으로 대체한다.
 * 페이지가 메타를 선언하지 않았으면 템플릿 기본값을 그대로 둔다.
 */
function applyHead(html, headHtml) {
  if (!headHtml) {
    return html
  }

  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*\/?>\s*/, '')
    .replace(/<meta name="keywords"[^>]*\/?>\s*/, '')
    .replace(/<link rel="canonical"[^>]*\/?>\s*/, '')
    .replace(/<meta (?:property="og:|name="twitter:)[^>]*\/?>\s*/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '')
    .replace('</head>', `  ${headHtml}\n  </head>`)
}

function outputPathFor(routePath) {
  if (routePath === '/') {
    return join(distDir, 'index.html')
  }
  return join(distDir, ...routePath.split('/').filter(Boolean), 'index.html')
}

const paths = getPrerenderPaths()
const failures = []
let rendered = 0

for (const routePath of paths) {
  try {
    const { html: appHtml } = await render(routePath)
    const { headHtml, bodyHtml } = splitHoistedHead(appHtml)

    let pageHtml = applyHead(template, headHtml)

    if (!pageHtml.includes('<div id="root"></div>')) {
      throw new Error('템플릿에서 <div id="root"></div>를 찾지 못했습니다')
    }
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${bodyHtml}</div>`,
    )

    const outPath = outputPathFor(routePath)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, pageHtml, 'utf8')
    rendered += 1
  } catch (error) {
    failures.push({ routePath, message: error?.message ?? String(error) })
  }
}

console.log(`[prerender] ${rendered}/${paths.length}개 경로 프리렌더 완료`)

if (failures.length > 0) {
  console.error(`[prerender] 실패 ${failures.length}건:`)
  for (const failure of failures) {
    console.error(`  - ${failure.routePath}: ${failure.message}`)
  }
  process.exit(1)
}
