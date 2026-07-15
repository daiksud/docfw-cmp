---
title: GFM互換性（Alerts）
order: 10
description: VitePress で利用できる GitHub Flavored Markdown の基本要素を確認します。
criteria: gfm
---

# GitHub Flavored Markdown

**対応状況: 部分対応。** VitePress の Markdown では表、取り消し線、オートリンクをそのまま使えます。この設定ではタスクリストのマーカーは通常のリスト本文として残り、追加のパーサープラグインなしにチェックボックスにはなりません。

| 機能 | 記法 | 結果 |
| --- | --- | --- |
| 表 | パイプ | 列を比較できる |
| タスクリスト | `- [x]` | 追加プラグインなしではプレーンなマーカー |
| 取り消し線 | `~~旧仕様~~` | ~~旧仕様~~ |
| オートリンク | `<https://vitepress.dev/>` | <https://vitepress.dev/> |

- [x] GFM のレンダリングを確認する
- [x] VitePress のルートを確認する
- [ ] 実プロジェクト用の内容を追加する

URL と `~~取り消し線~~` は通常の Markdown 本文内で解釈されます。タスクマーカーは記述できますが、この設定ではプレーンなテキストのままです。

::: info VitePress 固有の範囲
GFM は本文の表現です。サイドバー、検索、図表の機能は別途 [評価項目](/ja/criteria/) で確認します。
:::
