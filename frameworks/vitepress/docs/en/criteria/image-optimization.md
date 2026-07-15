---
title: Image Optimization
order: 90
description: "Vite asset processing boundaries: hashed or inlined assets are not image optimization."
criteria: image-optimization
---

# Image Optimization

**Partial:** VitePress uses Vite's asset pipeline for assets imported from
Markdown or Vue. It can emit a content-hashed asset URL and can inline small
assets as data URLs, according to Vite's asset threshold. That improves
deployment and caching behavior; it is **not** automatic image resize,
responsive-image generation, format conversion, or compression.

The small SVG below is a co-located Markdown asset. Its relative URL lets
VitePress process it during the build:

![A small blue landscape graphic used to demonstrate a co-located asset](./demo-asset.svg)

For a stable, unhashed public filename, compare the public fixture on
[Asset placement](/en/criteria/asset-placement). Its filename remains
`assets/vitepress-demo.svg` in the built site.

## Practical implication

Choose optimized source files and generate image variants before adding them
to a VitePress project when those transformations matter. VitePress's
[asset-handling guide](https://vitepress.dev/guide/asset-handling) describes
references and deployment paths, not an image-processing service.
