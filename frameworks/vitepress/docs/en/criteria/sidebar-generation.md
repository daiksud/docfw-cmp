---
title: Automatic Sidebar Generation
order: 50
description: Plugin-generated navigation compared with VitePress's native manual sidebar.
criteria: sidebar-generation
---

# Sidebar Generation

**Plugin support:** VitePress itself expects a manual
[default-theme sidebar configuration](https://vitepress.dev/reference/default-theme-sidebar).
It does **not** natively discover Markdown files and generate the sidebar.

This site adds `vitepress-sidebar` around the VitePress configuration. It scans
`docs/en/` and `docs/ja/`, uses the numeric `order` and `title` frontmatter on
these pages, and produces the sidebar now visible beside this page. Adding a
new eligible Markdown page is therefore enough for this project's navigation
at build time.

## The two approaches

| Approach | Where navigation is declared | Tradeoff |
| --- | --- | --- |
| Native VitePress | `themeConfig.sidebar` in config | Explicit labels, grouping, and links |
| This site | Filesystem plus `vitepress-sidebar` | Less repetition; plugin behavior and conventions |

```ts
// Native VitePress: a manual example
themeConfig: {
  sidebar: [
    { text: 'Criteria', items: [{ text: 'GFM', link: '/en/criteria/gfm' }] }
  ]
}
```

The plugin is a convenience layer, not evidence of native auto-generation.
