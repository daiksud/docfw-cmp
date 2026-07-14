---
title: 概要
order: 1
description: VitePress で構築する日本語ドキュメントサイトの評価項目一覧です。
---

# VitePress の比較

このサイトは、VitePress の標準機能と、明示的に追加したプラグインの境界を日本語で確認するための実装です。各評価は設定済みのサイトで再現できる最小の例に絞っています。

![公開ディレクトリーの VitePress デモ画像](/assets/vitepress-demo.svg)

## 読み始める

- 実運用を想定した[評価](/ja/assessment)を読む
- [ローカルで実行する](/ja/running-locally)
- [評価項目と対応表](/ja/criteria/)
- [Markdown と GFM](/ja/criteria/gfm)
- [静的サイト生成](/ja/criteria/ssg)

## この実装の前提

VitePress は Vite を基盤に、Markdown を Vue コンポーネントとして扱います。ここでの Mermaid と自動サイドバーは標準機能ではなく、設定済みプラグインによる追加機能です。一方、ローカル検索、国際化、外観切替、静的生成は VitePress の設定で提供されます。

::: tip 次に確認すること
まず [評価項目の対応表](/ja/criteria/) を開き、`標準`、`プラグイン`、`代替`、`部分対応`、`非対応` の意味を各ページで確認してください。
:::
