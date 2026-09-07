import { readFile } from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { populatedProfile } from '../tests/fixtures.mjs'

// Local-only QA server: synthetic entries never enter dist or the deployed site.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
let populatedMarkup
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  populatedMarkup = renderToString(createElement(App, { data: populatedProfile }))
} finally {
  await vite.close()
}
const built = await readFile('dist/index.html', 'utf8')
const noJs = built.replace(/<script type="module"[^>]*><\/script>/g, '').replace('index, follow', 'noindex, nofollow')
const populated = noJs.replace(/<div id="root">[\s\S]*<\/div>\s*<\/body>/, () => `<div id="root">${populatedMarkup}</div></body>`)
const server = createHttpServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, 'http://localhost')
    response.setHeader('X-Robots-Tag', 'noindex, nofollow')
    if (pathname === '/no-js' || pathname === '/populated') {
      response.setHeader('Content-Type', 'text/html; charset=utf-8')
      response.end(pathname === '/no-js' ? noJs : populated)
    } else if (/^\/assets\/[\w-]+\.(css|js)$/.test(pathname) || pathname === '/favicon.svg') {
      response.setHeader('Content-Type', pathname.endsWith('.css') ? 'text/css' : pathname.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript')
      response.end(await readFile(`dist${pathname}`))
    } else {
      response.writeHead(404).end('Not found')
    }
  } catch {
    response.writeHead(404).end('Not found')
  }
})
server.listen(4174, '127.0.0.1', () => {
  console.log('QA only: http://127.0.0.1:4174/no-js and http://127.0.0.1:4174/populated')
})
