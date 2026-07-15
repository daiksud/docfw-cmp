# VitePress — docfw-cmp

This is the **VitePress** chapter of
[docfw-cmp](https://github.com/daiksud/docfw-cmp). It is a bilingual,
static documentation site used to evaluate VitePress against the project's
comparison criteria, rather than an application backed by a server. Read the
dated practical assessment at
[English](docs/en/assessment.md) / [日本語](docs/ja/assessment.md).

Deployed GitHub Pages URLs:

- **https://daiksud.github.io/docfw-cmp/vitepress/** — static locale-selection
  entry point
- **https://daiksud.github.io/docfw-cmp/vitepress/en/** — English
- **https://daiksud.github.io/docfw-cmp/vitepress/ja/** — 日本語

The root entry point selects Japanese only when the browser language begins
with `ja`; all other languages go to English. See [Static deployment](#static-deployment-github-pages)
for the limitation of that client-side redirect.

## Stack and dependency boundaries

This project uses **Bun** for dependency installation and scripts. Its direct
VitePress/Vue dependencies are `vitepress` `2.0.0-alpha.18` and `vue`
`^3.5.39`; TypeScript `^7.0.2` is a development dependency. The checked-in
Bun lockfile resolves those packages for reproducible installs. The Pages
workflow uses Bun 1.3.14 and Node.js 22.12.0. VitePress v2 officially requires
Node.js 22 or later; this project declares that requirement in `package.json`
and pins the minimum supported version in the repository `mise.toml`.

The following distinction matters when comparing framework features:

| Area | Choice in this site | Classification |
| --- | --- | --- |
| Site generator and UI runtime | VitePress 2.0.0-alpha.18 / Vue 3, with the VitePress default theme | VitePress core |
| Static build, locale configuration, dark appearance, default-theme styling, and CSS extension | VitePress configuration and theme extension | VitePress core/default theme |
| Local search | Default-theme `local` provider, backed by MiniSearch and emitted with the static site | VitePress default theme |
| Math | `markdown.math: true` plus direct `markdown-it-mathjax3` `^4.0.0` dependency | VitePress integration with an optional MathJax parser package |
| Footnotes | `markdown-it-footnote` `^4.0.0`, registered through `markdown.config` | Ecosystem Markdown-it plugin |
| Diagrams | `vitepress-plugin-mermaid` `^2.0.17` with `mermaid` `^11.16.0` | Ecosystem plugin; not a native VitePress renderer |
| Filesystem sidebar | `vitepress-sidebar` `^1.36.1` | Ecosystem plugin; core VitePress sidebars are manual |

`.vitepress/config.ts` wraps `defineConfig` with `withMermaid` and
`withSidebar`. It enables MathJax with `markdown.math: true` and installs the
footnote parser with `md.use(footnote)`. The default-theme local-search
provider is deliberately local: it does not need a hosted search service,
credentials, or a remote API.

This sample intentionally tracks the VitePress v2 prerelease. Its static build
currently succeeds with the configured plugins, but their upstream v2 support
is not declared: `vitepress-plugin-mermaid` declares only a VitePress 1 peer
range, so it is unsupported with VitePress 2, while `vitepress-sidebar` has no
VitePress peer dependency but develops against VitePress 1.6. Treat both as
project-level test coverage rather than upstream v2 support declarations.

## Requirements and local use

Run all commands from this directory. VitePress v2 requires Node.js 22 or
later, and this project also uses [Bun](https://bun.sh/). From the repository
root, `mise install` installs the pinned Node.js and Bun versions.

```sh
cd frameworks/vitepress
bun install
```

### Development

```sh
bun run dev
```

This runs `vitepress dev .`. Provided the default port is free, use these
base-aware URLs:

- http://localhost:5173/docfw-cmp/vitepress/ — browser-language entry point
- http://localhost:5173/docfw-cmp/vitepress/en/ — English
- http://localhost:5173/docfw-cmp/vitepress/ja/ — 日本語

The `/docfw-cmp/vitepress/` prefix is intentional: it is the configured
deployment `base`, not a development-only path.

### Production build and preview

```sh
bun run build
bun run preview
```

The scripts expand to `vitepress build .` and `vitepress preview .`.
The build writes the static site to `.vitepress/dist`; the preview server
normally exposes the same base-aware routes at
`http://localhost:4173/docfw-cmp/vitepress/`, including `/en/` and `/ja/`.

## Static deployment (GitHub Pages)

The site is designed as static files, with no VitePress server process in
production:

- `.vitepress/config.ts` sets `base:
  '/docfw-cmp/vitepress/'`, enables clean URLs, and rewrites every non-index
  Markdown page to a directory index route.
- `bun run build` emits `.vitepress/dist`, including the English and
  Japanese static routes.
- `docs/public/` is copied to the generated site root. In particular,
  `docs/public/index.html` becomes the deployed
  `/docfw-cmp/vitepress/` entry point.

The route rewrite maps a source such as `docs/en/criteria/gfm.md` to the
generated `en/criteria/gfm/index.html`. Its public URL is therefore
`/docfw-cmp/vitepress/en/criteria/gfm/`, the same directory-style shape used
by Nextra. For every overview, assessment, local-running, criteria-index, and
criterion page, changing only `nextra` to `vitepress` (or vice versa) in the
deployed URL opens the corresponding page.

That public `index.html` reads `navigator.language` in the browser and
redirects relatively to `./ja/` for Japanese (`ja` or `ja-*`) or `./en/`
otherwise. It deliberately uses relative URLs so it remains valid below the
configured base. With JavaScript disabled, it does **not** perform a
meta-refresh redirect; it displays a link to the English documentation.

This compromise is necessary on static hosting. GitHub Pages cannot inspect a
request's language or run middleware/server redirects, so a request for the
VitePress subdirectory is first served this static HTML document. It cannot
provide an HTTP language negotiation redirect, and the no-JavaScript fallback
cannot automatically select Japanese.

The repository workflow at
[`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml) builds
VitePress and Nextra in separate matrix entries. For VitePress, the matrix
declares `.vitepress/dist` as the output. Each build tags its artifact
with a `.docfw-framework` marker. The deploy job downloads all artifacts,
copies `landing/` into the root Pages site, discovers the markers, and copies
each framework's output under `_site/<framework>/`. Consequently this
chapter is published below `/docfw-cmp/vitepress/`, not at the Pages root.

## Locales, navigation, and search

`docs/en/` and `docs/ja/` are parallel content roots. They currently contain
the same path set: an overview, assessment, local-running guide, criteria
index, and the 15 individual criterion pages in each language. That
file-level parity is a project convention maintained by authors; VitePress
does not translate or create a counterpart page automatically. The default
theme's top-left brand is `docfw-cmp` and links to the parent project hub at
`/docfw-cmp/`, while language navigation remains within this chapter.

The `locales` configuration supplies locale-specific titles, outline labels,
edit links, last-updated text, pager text, dark-mode labels, and menu labels.
The built-in locale switch keeps the current relative page path, which is safe
because the English and Japanese trees have exact page parity. The
default-theme local search is also configured with English and Japanese UI
strings. Its index is built from the static documentation, so the displayed
locale's authored content determines what can be found.

## Comparison criteria

Each criterion has a live English and Japanese page under
`docs/<locale>/criteria/`. Results below distinguish VitePress capabilities
from additions made by this chapter.

| Criterion | Result | Evidence in this site |
| --- | --- | --- |
| GFM compatibility | **Partial, native** | Tables, strikethrough, autolinks, and GitHub-style alerts render; task markers remain plain text without another parser plugin. |
| Markdown extensions | **Native + plugin** | Native Shiki code features, code groups, and containers; configured MathJax; footnotes come from `markdown-it-footnote`. |
| MDX / MDC | **Unsupported; Vue alternative** | MDX and Nuxt MDC do not compile. Markdown can use Vue components, demonstrated by `<Counter>`. |
| Mermaid | **Plugin** | `vitepress-plugin-mermaid` renders flowchart, sequence, and Gantt fences using Mermaid. |
| Automatic sidebar generation | **Plugin** | Core VitePress expects manual `themeConfig.sidebar`; `vitepress-sidebar` scans the locale trees and uses frontmatter ordering. |
| Local search | **Native default theme** | The `local` provider builds a MiniSearch index shipped with the static output. |
| Internationalization | **Native configuration** | VitePress locales serve authored `/en/` and `/ja/` trees with localized UI. |
| Dark mode | **Native default theme** | `appearance: true` enables the saved/system-aware appearance control. |
| Automatic image optimization | **Partial** | Vite can hash or inline imported assets, but does not automatically resize, generate responsive variants, convert formats, or compress images. |
| Static site generation | **Native** | VitePress renders static HTML into `.vitepress/dist`; the local loader contributes build-time frontmatter data. |
| Docs-directory placement | **Native** | The project root command uses configured `docs` source content; `index.md` creates directory indexes, while `README.md` remains an ordinary route. |
| Asset placement | **Native** | `docs/public/` supplies stable copied files; relative assets beside Markdown go through Vite processing. |
| Repository / directory complexity | **Moderate** | The base site is small; bilingual content, plugins, theme code, and the loader add bounded configuration. |
| Customization flexibility | **Native extension points** | A theme extends the default theme and `custom.css` changes `--vp-*` variables and adds reusable classes. |
| Documentation richness | **Rich, qualitative** | Official VitePress guides and API/default-theme references cover the features exercised here. |

## Directory structure

```text
frameworks/vitepress/
├── package.json                    # Bun scripts and direct dependencies
├── bun.lock                         # Locked dependency graph
├── tsconfig.json
├── .vitepress/                      # VitePress configuration and build output
│   ├── config.ts                    # Base, locales, search, Markdown, plugins
│   ├── comparison.data.ts           # Typed, build-time local content loader
│   ├── theme/
│   │   ├── index.ts                 # Extends default theme; registers Counter
│   │   ├── components/
│   │   │   └── Counter.vue          # Global Vue-in-Markdown demo component
│   │   └── custom.css               # Theme variables and demo/component styles
│   └── dist/                        # Generated static site (not tracked)
└── docs/                            # Authored source content
    ├── en/
    │   ├── index.md
    │   ├── assessment.md
    │   ├── running-locally.md
    │   └── criteria/                # Criteria index + 15 English criterion pages
    │       └── demo-asset.svg       # Co-located Vite-processed asset fixture
    ├── ja/
    │   ├── index.md
    │   ├── assessment.md
    │   ├── running-locally.md
    │   └── criteria/                # Japanese mirror, including demo-asset.svg
    └── public/
        ├── index.html               # Static language-selection entry point
        └── assets/
            └── vitepress-demo.svg   # Public copied asset fixture
```

`comparison.data.ts` uses `createContentLoader` to read frontmatter from
`en/criteria/**/*.md` and `ja/criteria/**/*.md`. The SSG page imports its
typed result in Markdown `<script setup>` and displays the summary.

## Constraints and caveats

- **Use base-safe paths.** The configured base is applied during the VitePress
  build. The site uses VitePress links such as `/en/...` in Markdown and
  relative `./en/` / `./ja/` links in the public root redirect. Do not assume
  a production site is hosted at `/`.
- **The loader is local and build-time only.** `comparison.data.ts` reads
  local Markdown frontmatter while building. It makes no remote request and
  does not refresh data in a visitor's browser; rebuild after metadata
  changes.
- **Mermaid, sidebar generation, and footnotes are additions.** They depend
  on `vitepress-plugin-mermaid`, `vitepress-sidebar`, and
  `markdown-it-footnote` respectively. They should not be presented as
  unconfigured VitePress core behavior.
- **Public and Vite-processed assets behave differently.** Files in
  `docs/public/` are copied unchanged with stable names. Relative assets next
  to Markdown are processed by Vite and may be hashed or inlined. Neither
  behavior is image optimization.
- **This deployment is static-site scope.** It has no application API,
  authentication, server-side language detection, or per-request rendering.
  Features needing those capabilities require an external service or a
  different deployment architecture.
