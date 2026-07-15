# docfw-cmp

`docfw-cmp` is a hands-on comparison of documentation-site frameworks. Rather
than a feature checklist alone, it publishes working, bilingual sample sites
that apply the same criteria to each framework.

**Live site:** https://daiksud.github.io/docfw-cmp/

## Implemented samples

| Framework | Foundation | Live sample | Source |
| --- | --- | --- | --- |
| [Nextra](https://nextra.site/) | Next.js | [English](https://daiksud.github.io/docfw-cmp/nextra/en/) / [Japanese](https://daiksud.github.io/docfw-cmp/nextra/ja/) | [`frameworks/nextra`](./frameworks/nextra/) |
| [VitePress](https://vitepress.dev/) | Vue and Vite | [English](https://daiksud.github.io/docfw-cmp/vitepress/en/) / [Japanese](https://daiksud.github.io/docfw-cmp/vitepress/ja/) | [`frameworks/vitepress`](./frameworks/vitepress/) |

Future targets are Fumadocs, Docus, Nuxt UI, Starlight, and Docusaurus. Their
directories are added as their sample sites are implemented.

Every implemented sample uses `docfw-cmp` as its top-left brand and links that
brand to the project hub. Each also includes a practical assessment page that
separates hands-on observations from dated, externally verifiable facts.

Nextra and VitePress intentionally publish the same directory-style route
set. For example, the corresponding GFM pages are
`/docfw-cmp/nextra/en/criteria/gfm/` and
`/docfw-cmp/vitepress/en/criteria/gfm/`; changing only the framework segment
switches between implementations while keeping the language and item fixed.

## Comparison criteria

Each sample covers the same criteria:

1. GFM compatibility, including GitHub-style alerts
2. Markdown extensions
3. MDX and MDC support
4. Mermaid support
5. Automatic sidebar generation
6. Local site search
7. Internationalization
8. Dark mode
9. Automatic image optimization
10. Static site generation
11. `docs` directory placement
12. Asset placement
13. Repository and directory complexity
14. Customization flexibility
15. Documentation richness

See [frameworks/README.md](./frameworks/README.md) for the full target list,
deployment conventions, and framework-specific links.

## Local development

[mise](https://mise.jdx.dev/) manages the repository tools and task entry
points. Install the pinned tools first:

```sh
mise install
```

Register the repository-local [hk](https://github.com/jdx/hk) pre-commit hook:

```sh
mise exec -- hk install --mise
```

The hook runs `mise run build`; it only builds and verifies the static site,
and never starts a server.

| Command | Purpose |
| --- | --- |
| `mise run build` | Build Nextra and VitePress in parallel, then assemble a GitHub Pages-equivalent static tree. |
| `mise run serve` | Serve the existing static tree at `http://localhost:3000/`. |

Run `mise run build` before `mise run serve`, and rebuild after changing site
sources. Open either of these URLs after starting the server:

- http://localhost:3000/ - local redirect to the project
- http://localhost:3000/docfw-cmp/ - GitHub Pages-equivalent repository base

The preview output is generated under `.local/pages/` and is not tracked.

## Project layout

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages build and deployment
├── .mise/tasks/                  # mise build and serve file tasks
├── frameworks/
│   ├── nextra/                   # Nextra sample application
│   └── vitepress/                # VitePress sample application
├── hk.pkl                        # hk pre-commit configuration
├── landing/                      # Static project hub
└── mise.toml                     # Pinned development tools
```

## Deployment

Pushes to `main` run the GitHub Actions workflow in
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml). It builds
each implemented framework independently, combines their static output with
the `landing/` hub, and deploys the result to GitHub Pages under
`/docfw-cmp/`.
