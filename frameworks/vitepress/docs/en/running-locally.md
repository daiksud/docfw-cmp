---
title: Running Locally
order: 3
description: Install, develop, build, and preview this VitePress site with Bun.
---

# Running Locally

Run these commands from `frameworks/vitepress`. The only prerequisite is
[Bun](https://bun.sh/).

## Install dependencies

```

This script runs `vitepress dev .`.sh
bun install
```

## Develop

```sh
bun run dev
```

The development server normally listens on
`http://localhost:5173/docfw-cmp/vitepress/en/`.
The `/docfw-cmp/vitepress/` prefix is intentional: it is this site's GitHub
Pages `base`, so keep it in local links when checking deployed behavior.

## Build and preview

```sh
bun run build
bun run preview
```

These scripts run `vitepress build .` and `vitepress preview .`.
`bun run build` writes static files to `.vitepress/dist`. Preview normally
serves the English site at
`http://localhost:4173/docfw-cmp/vitepress/en/`.
The corresponding GitHub Pages route is
`https://daiksud.github.io/docfw-cmp/vitepress/en/`.
