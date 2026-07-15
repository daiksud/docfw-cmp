---
title: Static Site Generation
order: 110
description: ローカルの型付きデータローダーを使い、ネットワークに依存しない静的生成を確認します。
criteria: ssg
---

<script setup lang="ts">
import { data } from '../../../.vitepress/comparison.data'

const japaneseSummary = data.locales.ja
</script>

# 静的サイト生成

**対応状況: 標準。** VitePress は `bun run build` で Markdown を静的 HTML に生成します。このページはローカルの型付き `comparison.data.ts` ローダーを読み、ビルド時に検出した日本語評価ページの情報を描画します。

## HTML を先に配信し、必要なら対話性を加える

VitePress は初回訪問時に事前レンダリング済みの静的 HTML を配信し、その後 Vue SPA として hydration します。基本本文は JavaScript なしでも読めますが、ローカル検索、テーマ操作、Vue の `Counter`、Mermaid、クライアント側ナビゲーションには JavaScript が必要です。公式ドキュメントで [`mpa: true`](https://vitepress.dev/reference/site-config#mpa) は明示的に experimental です。既定では 0kb JavaScript を配信しますが、明示的にクライアントスクリプトを有効化しない限り SPA ナビゲーションと Vue のイベントハンドラーを失います。このサンプルではコンポーネントとプラグインによる対話性を示すため、有効にしていません。

<div class="custom-block info">
  <p class="custom-block-title">ビルド時に得たデータ</p>
  <p>日本語の評価ページ数: {{ japaneseSummary.pageCount }}</p>
  <ul>
    <li v-for="criterion in japaneseSummary.criteria" :key="criterion">{{ criterion }}</li>
  </ul>
</div>

このデータは `.vitepress/comparison.data.ts` がローカル Markdown の frontmatter を走査して作ります。外部 API、時刻、乱数、ネットワーク要求を使わないため、同じ入力から決定的に再生成できます。

::: tip 静的と動的の境界
上の Vue テンプレートはビルド時データをもとに HTML を生成します。Counter のような対話的コンポーネントは、配信後にクライアント側の Vue で動作します。
:::

`bun run build` の出力は `.vitepress/dist/` であり、リポジトリーには追跡しません。
