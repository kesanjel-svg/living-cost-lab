import { prerender as reactPrerender } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { AppShell } from './app/App.jsx'
import { STATIC_PATHS } from './shared/seo/buildSeoAssets.js'
import supportPrograms from './data/support/index.js'
import { blogPosts } from './data/blogPosts.js'
import clusters from './data/topics/clusters.json'

/**
 * 프리렌더 대상 경로 목록 — sitemap(collectSitemapPaths)과 동일한 규칙이지만,
 * SSR 번들에서는 node:fs 상대경로가 어긋나므로 Vite 네이티브 임포트로 수집한다.
 */
export function getPrerenderPaths() {
  const paths = new Set(STATIC_PATHS)

  Object.keys(clusters).forEach((slug) => {
    paths.add(`/topics/${slug}`)
  })

  supportPrograms.forEach((program) => {
    paths.add(`/support/${program.slug}`)
  })

  blogPosts.forEach((post) => {
    paths.add(`/blog/${post.slug}`)
  })

  return [...paths]
}

/**
 * 한 경로를 정적 HTML로 렌더링한다.
 * react-dom/static의 prerender는 Suspense(lazy 라우트)가 모두 풀릴 때까지
 * 기다리므로 코드 스플리팅 구조를 그대로 유지한 채 완성된 HTML을 얻는다.
 *
 * React 19는 title/meta/link를 스트림 맨 앞으로 hoist하므로,
 * 반환된 html의 선두 메타 블록을 <head>로 옮기는 것은 prerender.mjs가 담당.
 */
export async function render(url) {
  const { prelude } = await reactPrerender(
    <HelmetProvider>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </HelmetProvider>,
  )

  const html = await new Response(prelude).text()

  return { html }
}
