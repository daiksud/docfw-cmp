---
title: Asset Placement
order: 100
description: Public and co-located static asset paths in a base-aware VitePress site.
criteria: asset-placement
---

# Asset Placement

VitePress supports both shared public files and assets beside the Markdown that
uses them. The two live SVGs below make the distinction visible.

## Public asset

Files under `docs/public/` are copied unchanged to the site root. This
Markdown reference targets the supplied public asset:

![Public VitePress demonstration graphic](/assets/vitepress-demo.svg)

The absolute source path is base-aware when VitePress renders Markdown, so the
published URL is `/docfw-cmp/vitepress/assets/vitepress-demo.svg`. Public
files retain their filename and are not content-hashed.

## Co-located asset

This file lives beside this page at `docs/en/criteria/demo-asset.svg`:

![Co-located comparison criteria graphic](./demo-asset.svg)

The relative Markdown reference is passed through Vite's asset pipeline. It
may receive a hash in the build output or, for a small file such as this SVG,
be inlined. Use public assets for stable shared URLs; co-locate an asset when
it belongs to one document. See [Image optimization](/en/criteria/image-optimization)
for the important processing limit.
