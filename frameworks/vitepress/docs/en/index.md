---
title: Overview
order: 1
description: A live VitePress comparison site for documentation-framework criteria.
---

# VitePress

This is the VitePress chapter of DocFW Comparison. It uses VitePress's default
theme, Vue-powered Markdown, and a static build to evaluate practical
documentation features rather than just list them.

VitePress combines [Vite](https://vite.dev/) with Vue and Markdown. This
instance has locale-prefixed content, local search, MathJax, Mermaid, and a
sidebar plugin; the individual pages distinguish framework features from
project-added plugins.

## Criteria at a glance

| Criterion | Classification | Demonstration |
| --- | --- | --- |
| [GFM](/en/criteria/gfm) | Partial | Alerts, tables, strikethrough, and autolinks; task markers are plain text |
| [Markdown extensions](/en/criteria/markdown-extensions) | Built-in + Plugin | Shiki, containers, MathJax, and footnotes |
| [MDX and MDC](/en/criteria/mdx-mdc) | Unsupported / Alternative | Vue components in Markdown |
| [Mermaid](/en/criteria/mermaid) | Plugin | Flowchart, sequence, and Gantt diagrams |
| [Sidebar generation](/en/criteria/sidebar-generation) | Plugin | `vitepress-sidebar` over native manual navigation |
| [Search](/en/criteria/search) | Built-in | Local MiniSearch index |
| [i18n](/en/criteria/i18n) | Built-in | `/en/` and `/ja/` locales |
| [Dark mode](/en/criteria/dark-mode) | Built-in | Default-theme appearance control |
| [Image optimization](/en/criteria/image-optimization) | Partial | Hashing/inlining, not image transformation |
| [Asset placement](/en/criteria/asset-placement) | Built-in | Public and co-located SVGs |
| [Static site generation](/en/criteria/ssg) | Built-in | Static HTML and local build-time data |
| [Docs directory](/en/criteria/docs-directory) | Built-in | Configurable source root and routes |
| [Repository complexity](/en/criteria/repo-complexity) | Moderate | A diagram of this site's moving parts |
| [Customization](/en/criteria/customization) | Built-in | CSS variables and custom classes |
| [Documentation richness](/en/criteria/documentation-richness) | Built-in | Official guides and reference material |

## Start here

- Read the practical [assessment](/en/assessment).
- Read the complete [criteria index](/en/criteria/).
- Follow [Running locally](/en/running-locally) to serve this exact site.
- Consult the [official VitePress documentation](https://vitepress.dev/) for
  installation, configuration, and theme reference.
