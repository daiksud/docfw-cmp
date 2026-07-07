import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
  defaultShowCopyCode: true,
  latex: true,
  search: {
    codeblocks: false
  },
  // Static export (`output: 'export'`) disables Next.js middleware, so the
  // `proxy.ts` (`nextra/locales`) middleware that would otherwise prefix the
  // locale onto un-prefixed links never runs on the deployed site. Without
  // this flag, every generated sidebar/nav link omits the locale segment
  // (e.g. `/docfw-cmp/nextra/criteria/mermaid` instead of
  // `/docfw-cmp/nextra/en/criteria/mermaid`) and 404s on GitHub Pages.
  unstable_shouldAddLocaleToLinks: true
})

// `next build` always runs with `NODE_ENV=production`, while `next dev` runs
// with `NODE_ENV=development`. Static export + basePath only apply to the
// production build (what CI deploys to GitHub Pages); local development
// keeps running at the plain `http://localhost:3000/` root so the README's
// documented dev workflow (and the `/` -> locale auto-redirect via
// `proxy.ts`, which only runs outside static export) keeps working as-is.
const isProd = process.env.NODE_ENV === 'production'

export default withNextra({
  reactStrictMode: true,
  ...(isProd && {
    output: 'export',
    basePath: '/docfw-cmp/nextra',
    images: { unoptimized: true }
  }),
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en'
  }
})
