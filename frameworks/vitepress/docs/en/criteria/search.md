---
title: Site Search (Local)
order: 60
description: Built-in local search powered by the default theme's MiniSearch index.
criteria: search
---

# Site Search

**Built-in:** VitePress's default theme includes
[local search](https://vitepress.dev/reference/default-theme-search), backed by
[MiniSearch](https://lucaong.github.io/minisearch/). It needs no hosted search
service, credentials, or remote API.

## Try the live index

Use the **Search** control in the navigation (or its displayed keyboard
shortcut) and query for:

- `Vue-in-Markdown` to find the interactive-component example.
- `build-time` to find the local loader on the [SSG page](/en/criteria/ssg).
- `Mermaid` to find the three diagram types.

VitePress creates the searchable content index as part of the site build and
ships it with the static files. Results are local to the built documentation;
they are not fetched from an external search provider.

::: tip Locale-aware content
The configured English and Japanese locales provide their own UI translations.
Search the language currently being viewed; content quality still depends on
each locale having its own authored pages.
:::
