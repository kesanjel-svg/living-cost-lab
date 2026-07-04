const CRAWLER_UA_PATTERN =
  /facebookexternalhit|Twitterbot|Slackbot|LinkedInBot|Discordbot|TelegramBot|WhatsApp|KakaoTalk|Pinterest|redditbot/i

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function injectMeta(html, meta) {
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const image = escapeHtml(meta.image)
  const url = escapeHtml(meta.url)
  const type = escapeHtml(meta.type)

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${type}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
}

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    return null
  }
  return response.json()
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) {
    return null
  }
  return response.text()
}

export default async function middleware(request) {
  const userAgent = request.headers.get('user-agent') ?? ''

  if (!CRAWLER_UA_PATTERN.test(userAgent)) {
    return
  }

  const url = new URL(request.url)

  const manifest = await fetchJson(new URL('/og-meta.json', url)).catch(() => null)
  const meta = manifest?.[url.pathname]

  if (!meta) {
    return
  }

  const html = await fetchText(new URL('/index.html', url)).catch(() => null)

  if (!html) {
    return
  }

  const finalMeta = { ...meta, url: `${url.origin}${url.pathname}` }
  const body = injectMeta(html, finalMeta)

  return new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=3600',
    },
  })
}

export const config = {
  matcher: '/((?!.*\\..*).*)',
}
