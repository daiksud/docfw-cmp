---
title: サイドバー自動生成
order: 50
description: frontmatter を基にしたプラグインの自動サイドバーと、標準の手動設定を比較します。
criteria: sidebar-generation
---

# サイドバー生成

**対応状況: プラグイン。** このサイトのサイドバー生成は `vitepress-sidebar` が担当します。各ページの `title`、`order`、ディレクトリー構造を読み、`/ja/` 配下のメニューを作ります。

VitePress 標準のサイドバーは、サイト設定に項目を明示する手動方式です。たとえば次の設定は標準機能ですが、このサイトの自動生成そのものではありません。

```ts
export default {
  themeConfig: {
    sidebar: [
      { text: '評価項目', link: '/ja/criteria/' },
      { text: 'GFM', link: '/ja/criteria/gfm' }
    ]
  }
}
```

::: info 並び順
このページの `order: 14` のような数値は、プラグインが安定した順序を決めるためのメタデータです。VitePress 本体に「ディレクトリーを走査してサイドバーを生成する」標準機能はありません。
:::
