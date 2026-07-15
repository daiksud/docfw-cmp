---
title: アセット配置
order: 100
description: public アセットと Markdown に同居するアセットの URL とビルド時の扱いを比較します。
criteria: asset-placement
---

# アセット配置

**対応状況: 標準。** VitePress では用途に応じて `public` とソースに同居するアセットを選びます。

| 配置 | 参照 | ビルド後の性質 |
| --- | --- | --- |
| `docs/public/assets/` | `/assets/vitepress-demo.svg` | 名前を維持してコピーされる |
| `docs/ja/criteria/` | `./demo-asset.svg` | Vite のアセットとして処理される |

![public の安定した URL](/assets/vitepress-demo.svg)

![Markdown と同居するアセット](./demo-asset.svg)

公開ファイルは base を意識したサイト内 URL として `/assets/vitepress-demo.svg` を使います。VitePress は公開時にサイトの base を考慮します。対して相対参照 `./demo-asset.svg` は、その Markdown と同じディレクトリーにあるファイルを指します。

::: info 使い分け
固定名で外部からも参照したいファイルは `public` に置きます。ページに密接な画像でハッシュ化・インライン化の候補にしたい場合は Markdown と同居させます。
:::
