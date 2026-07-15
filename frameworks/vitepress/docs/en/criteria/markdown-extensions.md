---
title: Markdown Extensions
order: 20
description: Shiki code features, containers, footnotes, and MathJax in VitePress Markdown.
criteria: markdown-extensions
---

# Markdown Extensions

VitePress adds documentation-oriented Markdown features around its
[Shiki-powered code blocks](https://vitepress.dev/guide/markdown#syntax-highlighting)
and MathJax support. This site also enables the lightweight
`markdown-it-footnote` plugin; footnotes are not part of VitePress's default
Markdown feature set.

## Shiki line highlights and diffs

```ts {2,4} [profile.ts]
export function displayName(name?: string) {
  const fallback = 'Anonymous'
  // [!code --]
  return name || 'Guest'
  // [!code ++]
  return name ?? fallback
}
```

## Code groups

::: code-group

```ts [config.ts]
export default {
  title: 'DocFW Comparison'
}
```

```sh [terminal]
bun run build
```

:::

## Custom containers

::: info A VitePress container
Containers accept a type and optional title, so documentation can group a
short aside without writing raw HTML.
:::

Footnotes keep a detail near its claim without breaking the paragraph flow.[^parser]

## MathJax

Inline math uses MathJax: $E = mc^2$.

$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$

[^parser]: The configured `markdown-it-footnote` plugin turns this reference
    and definition into linked footnote markup during the documentation build.
