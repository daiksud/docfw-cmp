---
title: カスタマイズの柔軟性
order: 140
description: VitePress のテーマ CSS 変数と独自クラスで見た目を調整する方法を示します。
criteria: customization
---

# カスタマイズ

**対応状況: 標準。** VitePress のテーマは CSS 変数で拡張でき、Markdown の HTML 要素に独自クラスを付けられます。このサイトはテーマエントリーから `.vitepress/theme/custom.css` を読み込み、既定テーマを置き換えずに実際のテーマ変更をテーマ側の CSS に置きます。本文は意味のあるクラス名にとどめます。

```css
:root {
  --vp-c-brand-1: #2563eb;
  --vp-c-brand-2: #60a5fa;
}

:root.dark {
  --vp-c-brand-1: #93c5fd;
}

.comparison-emphasis {
  border-inline-start: 4px solid var(--vp-c-brand-1);
  padding-inline-start: 1rem;
}
```

<p class="comparison-emphasis">この段落は <code>comparison-emphasis</code> という意味的なクラスを使う例です。</p>

::: warning CSS の配置
上のコードは例であり、このページがスタイルを注入するものではありません。テーマの CSS、レイアウト、Vue コンポーネントを変更する場合は、ライト／ダーク両方の表示とアップグレード時の影響を確認します。
:::

[ダークモード](/ja/criteria/dark-mode) と組み合わせる場合は、固定色より `--vp-*` 変数を優先します。
