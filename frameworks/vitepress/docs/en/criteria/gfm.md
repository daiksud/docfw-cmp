---
title: GFM Compatibility (Alerts)
order: 10
description: GitHub Flavored Markdown alerts and common inline and block syntax.
criteria: gfm
---

# GFM Compatibility

**Partial:** VitePress's Markdown parser renders tables, strikethrough,
autolinks, and its documented
[GitHub-style alerts](https://vitepress.dev/guide/markdown#github-flavored-alerts).
Task-list markers are preserved as plain list text in this configuration; they
do not become interactive or disabled checkboxes without an added parser
plugin. The five alerts below are rendered by VitePress, not images.

> [!NOTE]
> Notes add context without interrupting the main path.

> [!TIP]
> Tips can point readers to a faster route.

> [!IMPORTANT]
> Important information deserves attention before continuing.

> [!WARNING]
> Warnings call out a risky or surprising situation.

> [!CAUTION]
> Cautions mark actions that require extra care.

## Everyday GFM

| Syntax | Live example | Result |
| --- | --- | --- |
| Table | This row | Structured content |
| Task list | `- [x]` | Plain marker without an added plugin |
| Strikethrough | `~~old~~` | ~~old~~ text |
| Autolink | `https://vitepress.dev` | https://vitepress.dev |

- [x] This checked task marker remains visible as plain text.
- [ ] This unchecked task marker also remains plain text.

Bare URLs such as https://vitepress.dev are autolinked. VitePress supports the
other rendered syntax shown here. Add a task-list Markdown-it plugin when
checkbox rendering is a requirement, and check the
[Markdown reference](https://vitepress.dev/guide/markdown) for VitePress's
documented extensions.
