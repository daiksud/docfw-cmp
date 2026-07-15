---
title: 比較の観点
order: 4
description: この VitePress 実装で検証する 15 の評価項目と対応状況です。
---

# 評価項目

状態は、このサイトの現在の設定に対するものです。`標準` は VitePress の機能、`プラグイン` は追加パッケージ、`代替` は同じ目的を別の設計で満たすこと、`部分対応` は制約付き、`非対応` はそのままでは使えないことを示します。

| 評価項目 | 状態 | このサイトで確認する内容 |
| --- | --- | --- |
| [GFM](/ja/criteria/gfm) | 部分対応 | Alerts、表、取り消し線、URL。タスクマーカーはプレーンテキスト |
| [Markdown 拡張](/ja/criteria/markdown-extensions) | 標準 + プラグイン | Shiki、コンテナー、MathJax、脚注 |
| [MDX / MDC](/ja/criteria/mdx-mdc) | 非対応 | Vue-in-Markdown との違い |
| [Mermaid](/ja/criteria/mermaid) | プラグイン | 図のレンダリング |
| [サイドバー生成](/ja/criteria/sidebar-generation) | プラグイン | frontmatter による並び替え |
| [検索](/ja/criteria/search) | 標準 | ローカル MiniSearch |
| [国際化](/ja/criteria/i18n) | 標準 | 日本語ロケールと導線 |
| [ダークモード](/ja/criteria/dark-mode) | 標準 | 外観の切替 |
| [画像最適化](/ja/criteria/image-optimization) | 部分対応 | Vite のハッシュ化とインライン化 |
| [アセット配置](/ja/criteria/asset-placement) | 標準 | public と同居ファイル |
| [静的サイト生成](/ja/criteria/ssg) | 標準 | 決定的なビルド時データ |
| [docs ディレクトリー](/ja/criteria/docs-directory) | 部分対応 | `index.md` と `README.md` のルーティング |
| [リポジトリー複雑性](/ja/criteria/repo-complexity) | 代替 | 分割構成を図で把握 |
| [カスタマイズ](/ja/criteria/customization) | 標準 | CSS 変数とクラス |
| [資料の充実度](/ja/criteria/documentation-richness) | 標準 | 公式資料への導線 |

各ページの frontmatter にある `criteria` は、ビルド時の比較用データローダーが読み取る機械可読な識別子です。
