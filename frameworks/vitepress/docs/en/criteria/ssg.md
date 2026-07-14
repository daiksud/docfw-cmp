---
title: Static Site Generation
order: 110
description: Static HTML output and a typed local content loader evaluated at build time.
criteria: ssg
---

<script setup lang="ts">
import { data as comparison, type ComparisonData } from '../../../.vitepress/comparison.data'

const buildSummary: ComparisonData = comparison
</script>

# Static Site Generation

**Built-in:** `bun run build` statically renders these Markdown pages to HTML
in `.vitepress/dist`, ready for CDN or GitHub Pages hosting. VitePress
also supports an [SSG and SSR workflow](https://vitepress.dev/guide/ssr), but
this site is deployed as static output.

## HTML first, then optional interactivity

VitePress serves prerendered static HTML on the initial visit, then hydrates
the site to a Vue SPA. Basic document text is available without JavaScript;
local search, theme controls, the Vue `Counter`, Mermaid, and client-side
navigation need JavaScript. The documented
[`mpa: true`](https://vitepress.dev/reference/site-config#mpa) mode is
explicitly experimental. It ships 0kb JavaScript by default, but gives up SPA
navigation and Vue event handlers unless client scripts are explicitly
enabled. This sample leaves it off because its components and plugins
intentionally demonstrate interactivity.

## Build-time local data demonstration

The values below come from the typed `.vitepress/comparison.data.ts` local
content loader:

<div class="feature-demo">
  <p class="feature-demo__title">Comparison content compiled for this build</p>
  <div class="feature-demo__grid">
    <div class="feature-demo__item">
      <strong>{{ buildSummary.pageCount }}</strong> criterion pages across locales
    </div>
    <div class="feature-demo__item">
      <strong>{{ buildSummary.locales.en.pageCount }}</strong> English criterion pages
    </div>
    <div class="feature-demo__item">
      <strong>{{ buildSummary.criteria.length }}</strong> distinct criterion keys
    </div>
  </div>
</div>

The Markdown `<script setup>` imports `data` from the loader and preserves its
`ComparisonData` type. `createContentLoader` reads local frontmatter during
the VitePress build; it makes **no remote API request** and does not fetch data
in a visitor's browser. Rebuild after changing criterion frontmatter to update
the static values.
