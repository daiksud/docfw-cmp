# Nextra — docfw-cmp

This is the **Nextra** chapter of [`docfw-cmp`](https://github.com/daiksud/docfw-cmp),
a Document Framework Comparison project. It is a real, running Next.js +
Nextra site whose content evaluates Nextra against the project's comparison
criteria — see [`/en`](http://localhost:3000/en) after starting the dev
server, or the full criteria write-up at `/en/criteria` (`/ja/criteria` for
the Japanese mirror).

- **TypeScript** / **App Router** (Next.js 16)
- **Internationalization (i18n)** — English (default) / 日本語, full parity
  between locales (every page exists in both languages)
- **Full-text site search** — [Pagefind](https://pagefind.app/)
- Automatic sidebar and table of contents (TOC) generation, dark mode
- **Bun** as the package manager / task runner

## Requirements

- [Bun](https://bun.sh/)

## Setup

```sh
bun install
```

## Development

```sh
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to
your preferred locale (`/en` or `/ja`) automatically.

> [!NOTE]
> In development mode the Pagefind search index has not been generated yet, so
> search results won't appear. Search becomes available after a production
> build (`bun run start`).

## Build & start (production)

```sh
bun run build
bun run start
```

`bun run build` also runs the `postbuild` script, which generates the Pagefind
search index into `public/_pagefind`.

## Deployment (GitHub Pages)

This site's production build is published to **GitHub Pages** as a static
export, deployed by a GitHub Actions workflow:

- **https://daiksud.github.io/docfw-cmp/nextra/** — the deployed site
  (English, the default locale; also reachable at `/en/`)
- **https://daiksud.github.io/docfw-cmp/nextra/ja/** — Japanese

`https://daiksud.github.io/docfw-cmp/` (without `/nextra/`) is a separate,
plain static hub page for the whole `docfw-cmp` project that links out to
every framework's example — see [`frameworks/README.md`](../README.md).

- **Static export**: `next.config.mjs` sets `output: 'export'`, `basePath:
  '/docfw-cmp/nextra'`, and `images: { unoptimized: true }`, so `bun run
  build` (`next build`) produces a self-contained `out/` directory instead of
  a `.next` server build. These three options are applied **only when
  `NODE_ENV === 'production'`** (i.e. only for `next build`, not `next dev`),
  so local development keeps running at the plain `http://localhost:3000/`
  root — see the note below.
- **Locale-prefixed links**: static export disables Next.js middleware, so
  `proxy.ts` never runs on the deployed site, and Nextra would otherwise
  generate un-prefixed sidebar/nav links (e.g. `/criteria/mermaid` instead of
  `/en/criteria/mermaid`) that 404 once `basePath` is in play. Nextra's
  `unstable_shouldAddLocaleToLinks: true` option (set in `next.config.mjs`)
  makes Nextra prefix the locale onto generated links itself, independent of
  middleware.
- **Pagefind now indexes `out`**: the `postbuild` script still runs
  automatically as part of `bun run build` (see "Build & start" above), but
  now crawls `out` instead of `.next/server/app`, with `--output-subdir
  _pagefind` (pagefind's default output directory is `pagefind`, not
  `_pagefind`, so this flag is required to match what `proxy.ts`/the search
  UI expect). The generated index is served at
  `/docfw-cmp/nextra/_pagefind/...` on the deployed site.
- **Root redirect**: a static export has no server-side middleware, so
  `proxy.ts` (which handles the `/` → preferred-locale redirect locally, via
  `nextra/locales`'s `proxy`) cannot run once the site is hosted on GitHub
  Pages — there's no server to intercept the request. `public/index.html`,
  copied verbatim to `out/index.html` by Next.js, fills that role at the
  deployed root instead: client-side JS reads `navigator.language` and
  redirects to `./en/` or `./ja/` accordingly, with a `<meta
  http-equiv="refresh">` no-JS fallback to `./en/`.

> [!NOTE]
> Because `output`/`basePath`/`images.unoptimized` only apply when
> `NODE_ENV === 'production'`, a plain string image `src` (e.g.
> `src="/nextra-demo.png"`) would resolve correctly in dev but 404 once
> `basePath` kicks in for the production export (`next/image` never
> auto-prepends `basePath` to a string `src`, [per the Next.js
> docs](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath#images)).
> To avoid that dev/prod split, `content/<locale>/criteria/image-optimization.mdx`
> `import`s the `public/` image as a module instead of passing a string path
> — Next.js's build pipeline resolves and `basePath`-prefixes module-imported
> images automatically, in both dev and production. See
> `content/<locale>/criteria/asset-placement.mdx` for the full writeup.

> [!WARNING]
> `bun run start` (`next start`) is **not** how this site is deployed, and no
> longer works at all against a production (`NODE_ENV=production`) build now
> that `output: 'export'` is set for it — Next.js refuses to start a Node
> server against an export-only build (`"next start" does not work with
> "output: export" configuration`). The deployed site is static files only;
> there is no Node server behind it. To preview a production build locally
> instead, serve the `out/` directory with any static file server, e.g.
> `npx serve out`.

> [!NOTE]
> Nextra's `i18n` option in `next.config.mjs` is **kept** even though
> `output: 'export'` is set. Nextra's `withNextra()` wrapper reads
> `nextConfig.i18n` and then always unsets it (`i18n: void 0`) before handing
> the config to Next.js, injecting `NEXTRA_LOCALES` / `NEXTRA_DEFAULT_LOCALE`
> env vars instead. Next.js's own config validation therefore never sees an
> `i18n` key alongside `output: 'export'` (which it would otherwise reject),
> so the static export builds cleanly — verified with a real build producing
> 39 static pages.

## About the runtime (Bun)

This project uses **Bun as the package manager and task runner**
(`bun install` / `bun run ...`). Next.js itself, however, runs under **Node**
in the default scripts.

`bun --bun` variants that run Next.js under the Bun runtime are also provided:

```sh
bun run dev:bun     # bun --bun next dev
bun run build:bun   # bun --bun next build
bun run start:bun   # bun --bun next start
```

> [!WARNING]
> As of today (Bun 1.3.x / Next.js 16 / nextra-theme-docs 4.6), running under
> `bun --bun` fails to resolve `nextra-theme-docs`'s client components (such as
> the sidebar), resulting in 500 errors. Please verify behavior with the Node
> execution path (`bun run dev`, etc.). The `*:bun` scripts are expected to
> become usable once Bun / Next.js compatibility improves.

## Directory structure

```
.
├── next.config.mjs          # Nextra config + i18n(locales) + latex
├── mdx-components.ts         # useMDXComponents (re-exports the theme's)
├── proxy.ts                  # Locale detection / redirect (nextra/locales)
├── components/
│   └── counter.tsx           # Interactive component embedded in MDX (criteria demo)
├── app/
│   ├── globals.css           # CSS customization demo (CSS variables / custom class)
│   ├── _dictionaries/        # UI text dictionaries (en / ja)
│   └── [lang]/
│       ├── layout.tsx        # Root layout (Navbar / Footer / search / locale switch)
│       ├── not-found.tsx     # Locale-aware 404 page
│       ├── _components/
│       │   └── copy-page.tsx # Locale-aware Copy Page button (see notes below)
│       └── [[...mdxPath]]/
│           └── page.tsx      # Catch-all route that renders content
└── content/
    ├── en/                   # English content (default locale)
    │   ├── index.mdx          # Overview: docfw-cmp positioning, stack, links
    │   ├── running-locally.mdx
    │   └── criteria/          # One page per docfw-cmp comparison criterion
    └── ja/                   # Japanese content (full mirror of en/)
```

## Comparison criteria (`content/<locale>/criteria/`)

Each of `docfw-cmp`'s comparison criteria has its own page, with a working
demo where practical rather than just a description. Both locales contain the
identical set of pages:

| Page | Criterion |
| --- | --- |
| `gfm` | GFM compatibility (5 GitHub Alert types, tables, task lists, strikethrough, autolinks) |
| `markdown-extensions` | Syntax highlighting (lines/filename/diff), footnotes, **LaTeX (KaTeX)** |
| `mdx-mdc` | Embedding a React component (a clickable Counter) + an explicit note that **MDC is unsupported** |
| `mermaid` | Renders flowchart / sequence / gantt diagrams live via ```mermaid` |
| `sidebar-generation` | Sidebar auto-generated from `content/<locale>/` + `_meta.ts` |
| `search` | Pagefind local search (production-only) |
| `i18n` | Locale routing, `proxy.ts`, `<LocaleSwitch>`, and this project's own en/ja parity |
| `dark-mode` | `next-themes`-powered theme toggle |
| `image-optimization` | Markdown images + `next/image` optimization |
| `asset-placement` | `public/` vs. content-co-located assets |
| `ssg` | A server component that `fetch`es **at build time** (bakes the GitHub star count into static HTML) |
| `docs-directory` | `contentDirBasePath` placement freedom + the `README.md`-as-`index` finding |
| `repo-complexity` | The moving parts this project wires up, rated "moderate" |
| `customization` | CSS variable overrides and a custom class via `globals.css` |
| `documentation-richness` | Nextra's own official documentation |

Configuration enabled/added to support these demos:

- **LaTeX**: added `latex: true` to `next.config.mjs`, and load
  `katex/dist/katex.css` in `app/[lang]/layout.tsx` (rendered via KaTeX).
- **Mermaid**: no extra configuration needed. ```mermaid` code fences are
  automatically rendered as diagrams (`mermaid` / `@theguild/remark-mermaid`
  ship as Nextra dependencies).
- **Image optimization**: `staticImage` is enabled by default in Nextra.
  Markdown images are also optimized via `next/image`. Demo images are at
  `public/nextra-demo.png` and `content/<locale>/criteria/_assets/diagram.png`.
- **CSS customization**: `app/globals.css` is imported in `layout.tsx`.

> [!NOTE]
> **Can `README.md` replace `index`?** In Nextra, **no**. Routes are derived
> from the file's basename, and only `index` is treated as a folder's root.
> `README.md` becomes an ordinary `.../README` page, and the folder root
> returns a 404 (unlike Docusaurus, which can use README.md as an index
> page). See `content/en/criteria/docs-directory.mdx` for details.

## Notes

- **i18n parity**: `next.config.mjs`'s `i18n.locales` must correspond to
  `content/<locale>/`. Pages must exist for every locale (missing ones 404).
  This project keeps `content/en/` and `content/ja/` in exact 1:1 sync (same
  filenames, same `_meta.ts` keys) for this reason — an earlier version of
  this site had English-only criteria pages, which broke on locale switch;
  that gap is now closed. The locale switch lives in the navbar
  (`LocaleSwitch`).
- **A dev-only `script tag` console warning (harmless, does not occur in
  production)**: switching locales in the dev server can trigger a React 19
  console warning, `Encountered a script tag while rendering React
  component`. This comes from inline `<script>` tags used internally by
  `nextra-theme-docs`'s `<Layout>` — next-themes' theme-initialization script
  and `<Banner>`'s visibility-control script — being re-rendered on the
  client when the `[lang]` layout remounts on a locale switch. These scripts
  only matter during the initial SSR pass, so re-rendering them on the client
  (without executing them) is harmless. **It does not occur in a production
  build (`bun run build && bun run start`) — verified.** It is also unrelated
  to `reactStrictMode` (verified), and originates inside nextra / next-themes,
  so it cannot be removed without patching `node_modules` (not addressed here
  since it is harmless).
- **GitHub alerts**: an empty `>` line is required right after `> [!NOTE]`
  (to make the marker its own paragraph). See `content/*/criteria/gfm.mdx`.
- **Pinning zod**: `zod@4.4.x` has a regression where a missing key on a
  required `z.custom` field throws an `undefined` error, which breaks
  `nextra-theme-docs@4.6`'s `<Layout>` validation. `package.json`'s
  `overrides` therefore pins `zod@4.3.6`.
- **Localizing the Copy Page button**: `nextra-theme-docs`'s built-in Copy
  Page button (the button and dropdown at the top-right of the page) has
  hardcoded English text, so it is disabled via
  `<Layout copyPageButton={false}>`. A locale-aware replacement is
  implemented at `app/[lang]/_components/copy-page.tsx` and rendered from
  `page.tsx` instead. It renders inside `<main data-pagefind-body>`, so it
  carries a `data-pagefind-ignore` attribute to keep its UI text out of the
  search index.
- **The feedback link is hidden**: `<Layout feedback={{ content: null }}>`
  hides the default "Question? Give us feedback" link.
- **404 page**: because `not-found.js` never receives props (including
  `params`) per Next.js's design, `app/[lang]/not-found.tsx` determines the
  locale from the URL's first path segment via `usePathname()`.
  - ⚠️ Because this content resolves as a client component, tools that don't
    execute JS (like `curl`) won't show the body (only the Flight client
    reference is returned). It renders correctly in an actual browser
    (verified with Playwright).
- **Known i18n limitations (not addressed)**: the following are hardcoded
  strings inside `nextra` / `nextra-theme-docs` and cannot be changed via
  props (would require a `bun patch`, which would also make every locale
  show the same language, so this project leaves them as-is):
  - The `title` attribute (tooltip) on the theme/locale switch buttons
  - "Copy code" / "Toggle word wrap" on code blocks
  - "Collapse/Expand sidebar" / "Menu" in the sidebar
  - "Skip to Content" and various screen-reader `aria-label`s
