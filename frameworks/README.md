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

Only **[Nextra](./nextra/)** is built and deployed so far — see its
[README](./nextra/README.md#deployment-github-pages) for the details of its
static export setup. The other targets above are still placeholder
directories; each will get its own
`https://daiksud.github.io/docfw-cmp/<name>/` entry through the same pipeline
once built.
