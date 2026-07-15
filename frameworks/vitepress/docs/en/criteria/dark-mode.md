---
title: Dark Mode
order: 80
description: The default VitePress theme's built-in appearance switch and CSS variables.
criteria: dark-mode
---

# Dark Mode

**Built-in:** this site's `appearance: true` setting enables the default
theme's appearance control. Use the sun/moon control in the navigation to
switch the live page between light and dark appearance; the theme also honors
the system preference and remembers a visitor's choice.

## Theme-aware demonstration

::: tip Inspect the color change
The card, code blocks, alerts, and Mermaid container on this page use
VitePress theme variables, so their foregrounds and backgrounds adapt when the
appearance changes.
:::

The project overrides brand variables in `.vitepress/theme/custom.css`
for both `:root` and `.dark`, while the default theme supplies the mode
switching and base palette. See the official
[site configuration reference](https://vitepress.dev/reference/site-config#appearance)
and the [customization page](/en/criteria/customization).
