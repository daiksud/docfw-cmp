---
title: ローカルでの実行
order: 3
description: Bun を使って VitePress サイトを開発、ビルド、プレビューする手順です。
---

# ローカルで実行する

`frameworks/vitepress` で以下を実行します。

```bash
bun install
bun run dev
bun run build
bun run preview
```

これらのスクリプトはそれぞれ `vitepress dev .`、`vitepress build .`、`vitepress preview .` を実行します。

`dev` は開発サーバーを起動します。サイトの `base` は `/docfw-cmp/vitepress/` なので、端末に表示される URL でもこのパスを含む `http://localhost:5173/docfw-cmp/vitepress/` を開きます。ポートが使用中なら表示されたポートを使ってください。

`build` の出力先は `.vitepress/dist/` です。生成物は追跡しません。`preview` でも base を含む `http://localhost:4173/docfw-cmp/vitepress/` のような URL を使い、ルート `/` だけで配信されている前提にしないでください。

日本語の起点は [`/ja/`](/ja/) です。開発中の内部リンクも、相対的な公開 URL ではなく `/ja/...` の形式で確認できます。
