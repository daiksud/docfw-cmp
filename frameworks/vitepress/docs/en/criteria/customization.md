---
title: CSS Customization
order: 140
description: Default-theme CSS variables and reusable classes customized by this VitePress site.
criteria: customization
---

# CSS Customization

**Built-in extension points:** the default theme exposes CSS custom properties,
and VitePress lets a custom theme extend it. This site imports
`.vitepress/theme/custom.css` from its theme entry instead of replacing
the default theme.

## Live custom class

<div class="feature-demo">
  <p class="feature-demo__title">Custom CSS extension</p>
  <div class="feature-demo__grid">
    <div class="feature-demo__item">This responsive card uses the project’s <code>.feature-demo__item</code> class.</div>
    <div class="feature-demo__item">Its colors follow VitePress <code>--vp-*</code> variables in light and dark mode.</div>
  </div>
</div>

The relevant project overrides include:

```css
:root {
  --vp-c-brand-1: #2563eb;
  --vp-c-brand-2: #3b82f6;
}

.dark {
  --vp-c-brand-1: #60a5fa;
}
```

Custom classes can style page-specific HTML or Vue components, while variables
retune the default theme consistently. See the official
[theming guide](https://vitepress.dev/guide/extending-default-theme#customizing-css)
and [dark-mode demonstration](/en/criteria/dark-mode).
