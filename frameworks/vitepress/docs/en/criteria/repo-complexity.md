---
title: Repository Complexity
order: 130
description: The small set of source, configuration, theme, plugin, and build pieces in this site.
criteria: repo-complexity
---

# Repository Complexity

This bilingual VitePress setup is **moderate** in complexity, but that is not
VitePress's baseline. The official wizard can add VitePress to an existing
product repository with a nested `docs/` directory, one `.vitepress/config`,
and `docs:dev`, `docs:build`, and `docs:preview` scripts; no separate
documentation repository is required. Locales, theme code, the auto-sidebar
plugin, Mermaid plugin, and local data loader are deliberate additions in this
sample.

```mermaid
flowchart TD
  Content["docs/en and docs/ja Markdown"] --> Sidebar["vitepress-sidebar"]
  Content --> Loader["comparison.data.ts loader"]
  Config[".vitepress/config.ts"] --> Site["VitePress static build"]
  Sidebar --> Site
  Loader --> Site
  Theme["theme/, Counter, custom.css"] --> Site
  Mermaid["Mermaid plugin"] --> Site
  Site --> Pages["GitHub Pages static files"]
```

| Area | Responsibility |
| --- | --- |
| `docs/en/`, `docs/ja/` | Locale-specific authored content |
| `.vitepress/config.ts` | Base path, locale UI, search, Markdown, and plugins |
| `.vitepress/theme/` | Default-theme extension, global `Counter`, CSS |
| `.vitepress/comparison.data.ts` | Typed build-time frontmatter summary |

There is no custom application router or server API. Keeping integrations in
the VitePress configuration makes the extra complexity explicit and bounded.
See the dated [assessment](/en/assessment) for the baseline-versus-sample and
plugin-maintenance trade-offs.
