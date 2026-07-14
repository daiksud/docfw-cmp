---
title: docs ディレクトリの配置自由度
order: 120
description: VitePress の docs ソース、index.md、README.md のルート規則を明確にします。
criteria: docs-directory
---

# docs ディレクトリーとルーティング

**対応状況: 部分対応。** このサイトの VitePress コマンドは `vitepress build .` で、プロジェクトルートは `frameworks/vitepress` です。設定でソースコンテンツを `docs` に指定しています。VitePress は Markdown のパスから URL を作り、ディレクトリーの `index.md` をそのディレクトリーの起点として扱います。

| ファイル | ルートの例 |
| --- | --- |
| `docs/ja/index.md` | `/ja/` |
| `docs/ja/criteria/index.md` | `/ja/criteria/` |
| `docs/ja/criteria/gfm.md` | `/ja/criteria/gfm/` |
| `docs/ja/README.md` | `/ja/README/` |

`README.md` は VitePress ではディレクトリー index の別名ではありません。起点ページには `index.md` を置く必要があります。このサイトでは README を自動サイドバーの対象からも除外しています。

::: info URL の末尾
このサイトは `cleanUrls` を有効にし、VitePress の `rewrites` で index 以外の
Markdown を仮想的な `.../index.md` へ対応付けます。たとえば
`docs/ja/criteria/gfm.md` は `ja/criteria/gfm/index.html` として生成され、
`/docfw-cmp/vitepress/ja/criteria/gfm/` で配信されます。これは Nextra の
静的出力と同じ URL 形状なので、対応ページ間ではパス中のフレームワーク名
だけを差し替えられます。
:::
