---
title: MDX & MDC
order: 30
description: MDX and MDC support boundaries, with Vue components embedded in Markdown.
criteria: mdx-mdc
---

# MDX and MDC

**Unsupported:** VitePress does not compile MDX or Nuxt Content's MDC syntax.
In particular, React/MDX imports and MDC blocks such as `::alert` are not
VitePress Markdown features.

## VitePress alternative: Vue in Markdown

VitePress compiles Markdown as Vue. Components registered by the theme can be
used directly in a page, as this interactive counter demonstrates:

<Counter
  :initial="2"
  label="Vue-in-Markdown count"
  increment-label="Add one"
  reset-label="Reset to two"
/>

The counter is globally registered in the VitePress theme and uses Vue state
after hydration. This is Vue template syntax in Markdown, **not** MDX or MDC.
For page-local components and imports, see VitePress's
[Using Vue in Markdown](https://vitepress.dev/guide/using-vue) guide.

::: warning Syntax boundary
Do not add JSX, React hooks, or MDC component delimiters to a `.md` page.
Use Vue components, Vue directives, and VitePress custom containers instead.
:::
