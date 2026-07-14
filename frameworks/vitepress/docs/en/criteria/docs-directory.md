---
title: Docs Directory Placement
order: 120
description: The VitePress source root, route file conventions, and README versus index behavior.
criteria: docs-directory
---

# Docs Directory Placement

The VitePress command in this project is `vitepress build .`, making
`frameworks/vitepress` its project root. Its configuration selects `docs` as
the source-content directory. Markdown files beneath that directory become
routes: `docs/en/criteria/gfm.md` is served as `/en/criteria/gfm/` in this
project.

## Static URL behavior

This site enables `cleanUrls` and uses VitePress's `rewrites` option to map
every non-index Markdown source to a virtual `.../index.md` destination.
Consequently, `docs/en/criteria/gfm.md` builds as
`en/criteria/gfm/index.html` and is linked as
`/docfw-cmp/vitepress/en/criteria/gfm/`. GitHub Pages can serve that directory
URL directly. This deliberately matches Nextra's static-export route shape,
so only the framework segment changes between corresponding deployed pages.

## Source content and URL shape

This project's configuration keeps source content in `docs/` while the
command runs from the project root. That content directory can be organized
or changed to fit a repository. It is separate from the deployment
[`base`](https://vitepress.dev/reference/site-config#base), which is
`/docfw-cmp/vitepress/` here. The `en/` and `ja/` folders supply the locale
route prefixes; they are not imposed by the physical project directory name.

## `index.md` versus `README.md`

VitePress treats `index.md` as a directory's index route. For example,
`docs/en/index.md` supplies `/en/`, while this folder's `index.md` supplies
`/en/criteria/`. A file named `README.md` is an ordinary Markdown file, so it
would create its own `/README/` route under this project's directory rewrite
rather than replacing that directory index. Use `index.md` when a folder needs
a landing page.

See [VitePress routing](https://vitepress.dev/guide/routing) for the file-based
rules.
