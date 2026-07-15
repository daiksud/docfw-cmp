---
title: 評価
order: 2
description: バイリンガルなプロダクトドキュメントに対する VitePress の日付付き実践評価です。
---

# VitePress の評価

このページでは、このサンプルを触った印象と調査済みの事実を分けます。保守性のスナップショットとリンク先は **2026-07-11** に確認しました。

## 結論

### 実際に触った印象

この小規模サイトでは、VitePress は開発サーバーでも画面遷移でも高速に感じます。プロダクトと同じリポジトリーにドキュメントを置く場合の基本構成は特に手軽です。このバイリンガル・プラグイン入りサンプルは意図的にそれより豊富ですが、責務はなお追いやすい構成です。

### 調査済みの事実

VitePress には GitHub 形式の [Alerts](https://vitepress.dev/guide/markdown#github-style-alerts) が組み込まれています。公式の[導入ウィザード](https://vitepress.dev/guide/getting-started)は、既存プロジェクトへの導入、入れ子の `docs/` ディレクトリーの選択、基本となる一つの `.vitepress/config`、`docs:dev`・`docs:build`・`docs:preview` スクリプトの追加に対応します。別のドキュメント用リポジトリーは不要であり、標準テーマには文書化された[カスタマイズ](https://vitepress.dev/guide/extending-default-theme)の方法があります。

## 強み

### 実際に触った印象

標準テーマはデザイン作業なしでも整って見え、CSS 変数とテーマ拡張ポイントによりプロダクトに合わせられます。Markdown 中心の執筆、高速なフィードバック、静的デプロイは、通常のドキュメント作成を快適にします。

### 調査済みの事実

静的生成、ロケール設定、ローカル検索、Alerts、標準テーマ設定は VitePress またはその標準テーマの機能です。このサンプルはその基本構成より豊富です。バイリンガル本文、Mermaid レンダラー、ファイルシステム・サイドバー、MathJax、脚注、Vue デモコンポーネントは、意図して追加した本文またはプラグインです。

## 懸念点とトレードオフ

### 実際に触った印象

豊富なサンプルには明確なコストがあります。執筆者は二つのロケールツリーをそろえ、各プラグインの境界を保守します。この規模では扱えますが、ウィザードによる最小構成以上の負担です。

### 調査済みの事実

初回訪問では事前レンダリング済みの静的 HTML が配信され、その後 VitePress は Vue SPA として hydration します。そのため基本本文には JavaScript は不要ですが、検索、テーマ操作、Vue の `Counter`、Mermaid、クライアント側ナビゲーションには必要です。公式ドキュメントで [`mpa: true`](https://vitepress.dev/reference/site-config#mpa) は明示的に experimental です。既定では 0kb JavaScript を配信しますが、明示的にクライアントスクリプトを有効化しない限り、SPA ナビゲーションと Vue のイベントハンドラーを失います。このサンプルは対話性とプラグインを示すため、これを有効にしていません。

## Nextra との共通所見

**共通するハンズオンでの印象（主観）:** どちらのデフォルトテーマも洗練されていると感じられ、カスタマイズ手段も用意されています。

**両サンプルで確認した根拠:** 両フレームワークは事前レンダリングしてから hydration します。基本本文は HTML にあり、拡張機能は JavaScript を使い、英語・日本語の対応関係は手作業で保ちます。エコシステム上のトレードオフは異なります。VitePress の Mermaid などの統合はサードパーティープラグインであり、Nextra には Next/React と静的エクスポートの制約があります。

## 保守性のスナップショット — 2026-07-11

### VitePress

調査結果は、放棄ではなく活発な開発を示します。npm の安定版は [1.6.4](https://www.npmjs.com/package/vitepress/v/1.6.4)（2025-08-05 公開）、[2.0.0-alpha.1](https://www.npmjs.com/package/vitepress/v/2.0.0-alpha.1) は 2025-01-22 公開、最新 prerelease の [alpha.18](https://www.npmjs.com/package/vitepress/v/2.0.0-alpha.18) は 2026-07-06 公開です。[リポジトリー履歴](https://github.com/vuejs/vitepress/commits/main/)には 2026-07-10 までのコミットと 2026 年の alpha リリースがあります。およそ 1.5 年続く v2 prerelease と遅い安定版の更新頻度はリリース計画上の懸念ですが、放棄の根拠ではありません。このサンプルは `2.0.0-alpha.18` を意図して固定しており、このスナップショットでは静的ビルドが成功していますが、安定版ではなく prerelease です。VitePress v2 は公式に Node.js 22 以上を要求するため、リポジトリーのビルド環境では Node.js 22.12.0 を固定しています。

### Mermaid 統合

[`vitepress-plugin-mermaid`](https://emersonbottero.github.io/vitepress-plugin-mermaid/) は VitePress 本体ではないサードパーティープラグインです。最新の [npm パッケージ](https://www.npmjs.com/package/vitepress-plugin-mermaid)は 2.0.17（2024-09-24 公開）ですが、最新の GitHub [Release/tag](https://github.com/emersonbottero/vitepress-plugin-mermaid/releases) は V2.0.8（2022-09-24）、[リポジトリー](https://github.com/emersonbottero/vitepress-plugin-mermaid)の最新コミットは 2025-04-16 です。この npm と Release 履歴の乖離は確認が必要です。プラグインの peer range は VitePress 1 を宣言しており v2 ではないため、VitePress 2 ではサポートされません。このサンプルの alpha.18 静的ビルドはプロジェクト内でのテスト結果であり、upstream による互換性宣言ではありません。アップグレード時はロック、監査、テストを行います。古い Release メタデータだけで脆弱性は確定しません。

**保守性に関する判断（主観）:** npm と Release 履歴の乖離は、適切なリリース管理が行われていないことを示すマイナスのシグナルと評価します。継続的な保守が優先されているかに確信を持ちにくく、明確な告知がないまま実質的にメンテナンスされなくなるリスクも現実的です。この不確実性は、メンテナーの意図やパッケージの安全性を事実として断定するものではない一方、選定上のマイナスポイントです。

### ドキュメント

VitePress の公式ガイドとリファレンスは広く、これは強みです。現在の v2 prerelease への移行期には、インストール済みのバージョンに対応する資料を選び、重要な設定変更はビルドで確認します。

## 選定の指針

プロダクトリポジトリーで高速・静的・整ったドキュメントサイトを小さな基本構成から始め、Vue 向けの拡張ポイントも必要なら VitePress を選びます。可能な限り基本構成を保ちます。バイリンガルの所有責任とプラグイン更新テストに予算を割ける場合にだけ、この豊富な構成を採用します。そうでなければ、利用可能という理由だけで統合を増やしません。
