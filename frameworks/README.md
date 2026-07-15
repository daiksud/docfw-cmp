# Document Framework Comparison

## Targets

- [Nextra](https://nextra.site/) (Next.js)
- [Fumadocs](https://www.fumadocs.dev/) (Next.js)
- [Docus](https://docus.dev/) (Nuxt)
- [Nuxt UI](https://docs-template.nuxt.dev/) (Nuxt)
- [Starlight](https://starlight.astro.build/) (Astro)
- [Docusaurus](https://docusaurus.io/) (React)
- [VitePress](https://vitepress.dev/) (Vue)

## Criteria

- GFM compatibility (especially [Alerts](https://github.com/orgs/community/discussions/16925))
- Markdown extensions
- [MDX](https://mdxjs.com/), [MDC](https://content.nuxt.com/docs/files/markdown)
- [Mermaid](https://mermaid.js.org/) support
- Automatic sidebar generation
- Site search (local search)
- Internationalization (i18n)
- Dark mode support
- Automatic image optimization
- Static Site Generation
- Freedom in `docs` directory placement
- Asset placement
- Repository / directory complexity
- Customization flexibility (especially styling / CSS)
- Documentation richness

## Site conventions

Every framework example uses **`docfw-cmp`** as the top-left site brand. The
brand links back to the project hub at
**https://daiksud.github.io/docfw-cmp/** rather than to that framework's
locale home.

Each implemented example also includes a bilingual practical-assessment page.
It separates hands-on impressions from dated, externally verifiable facts.
Findings shared by multiple frameworks are repeated on each affected sample
site so that an individual example remains understandable on its own.

Implemented examples mirror the same locale and page suffixes using
directory-style URLs. A corresponding page can therefore be opened in another
framework by replacing only `<framework>` in
`/docfw-cmp/<framework>/<locale>/<page>/`.

## Deployment

Everything under `frameworks/` (plus the `landing/` hub page at the repo
root) is published to **GitHub Pages**:

- **https://daiksud.github.io/docfw-cmp/** — the project hub: a plain static
  landing page describing the comparison project and linking out to each
  framework's example.
- **`https://daiksud.github.io/docfw-cmp/<framework>/`** — that framework's
  example site, e.g. https://daiksud.github.io/docfw-cmp/nextra/.

Publishing is handled by a GitHub Actions workflow that builds each framework
in a matrix (one job per framework), then assembles every framework's static
output together with the `landing/` hub page into a single site before
publishing it to GitHub Pages.

Both **[Nextra](./nextra/)** and **[VitePress](./vitepress/)** are built and
deployed:

- **Nextra** — https://daiksud.github.io/docfw-cmp/nextra/ (English at
  [`/en/`](https://daiksud.github.io/docfw-cmp/nextra/en/), Japanese at
  [`/ja/`](https://daiksud.github.io/docfw-cmp/nextra/ja/)); see its
  [static-export deployment details](./nextra/README.md#deployment-github-pages).
- **VitePress** — https://daiksud.github.io/docfw-cmp/vitepress/ (English at
  [`/en/`](https://daiksud.github.io/docfw-cmp/vitepress/en/), Japanese at
  [`/ja/`](https://daiksud.github.io/docfw-cmp/vitepress/ja/)); see its
  [static-site deployment details](./vitepress/README.md#static-deployment-github-pages).

The other targets above are still placeholder directories; each will get its
own `https://daiksud.github.io/docfw-cmp/<name>/` entry through the same
pipeline once built.

## Local Pages-equivalent preview

The repository-root `mise.toml` pins Bun, Node.js, Python, and hk;
`.mise/tasks/` contains the executable `build` and `serve` file tasks. Install
the tools and register the repository's hk hook once:

```sh
mise install
mise exec -- hk install --mise
```

`hk` runs `mise run build` as a read-only pre-commit check; it never starts a
server. Build the complete static site explicitly with:

```sh
mise run build
```

Start the Pages-equivalent static server with:

```sh
mise run serve
```

Run `mise run build` first, and rerun it after changing site sources.

Open **http://localhost:3000/** for a local redirect, or
**http://localhost:3000/docfw-cmp/** for the same repository-base path used
by GitHub Pages. The generated preview remains in `.local/pages/` and is not
tracked.
