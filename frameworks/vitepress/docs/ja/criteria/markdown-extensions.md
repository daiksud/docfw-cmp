---
title: Markdown拡張
order: 20
description: Alert、Shiki、コードグループ、数式などの VitePress Markdown 拡張を示します。
criteria: markdown-extensions
---

# Markdown 拡張

**対応状況: 標準。** VitePress は Markdown を拡張し、情報の種類、コードの差分、タブ、数式を読みやすく表現できます。

> [!NOTE]
> VitePress の GitHub スタイル Alert は短い補足に使えます。

> [!TIP]
> 手順の要点には `TIP` を使います。

> [!IMPORTANT]
> base を含む URL でプレビューすることが重要です。

> [!WARNING]
> Markdown の脚注 `[^1]` は標準拡張としては保証されません。必要なら Markdown 設定にプラグインを追加します。

> [!CAUTION]
> 未検証の HTML や Vue テンプレートをそのまま入力しないでください。

## Shiki とコード注釈

```ts{2}
const locale = 'ja'
console.info(`現在のロケール: ${locale}`)
```

```ts
const oldPath = '/en/' // [!code --]
const currentPath = '/ja/' // [!code ++]
```

::: code-group

```ts [locale.ts]
export const locale = 'ja-JP'
```

```vue [LocaleLabel.vue]
<template><span>日本語</span></template>
```

:::

::: tip カスタムコンテナー
`tip`、`info`、`warning`、`danger`、`details` のコンテナーは、長めの補足を構造化する VitePress の記法です。
:::

## MathJax

インライン数式は $E = mc^2$、ブロック数式は次のように記述できます。

$$
\sum_{i=1}^{n} i = \frac{n(n + 1)}{2}
$$

脚注はこの構成では専用プラグインなしに有効化していません。数式は設定済みの MathJax によるものですが、脚注の要件とは別に判断してください。
