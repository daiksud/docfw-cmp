---
title: MDX と MDC
order: 30
description: VitePress では MDX/MDC ではなく Vue コンポーネントを Markdown から利用します。
criteria: mdx-mdc
---

# MDX と MDC

**対応状況: 非対応。** この VitePress 構成は MDX も MDC もコンパイルしません。React の JSX や MDC の独自構文を `.md` に書くと、VitePress の Markdown としては動作しません。

代わりに、登録済みの Vue コンポーネントを Markdown 内から使えます。

<Counter initial="3" label="現在の数" increment-label="増やす" reset-label="リセット" />

上のカウンターは Vue-in-Markdown の実例です。`initial`、`label`、`increment-label`、`reset-label` は通常の Vue props として渡しています。

```vue
<Counter
  initial="3"
  label="現在の数"
  increment-label="増やす"
  reset-label="リセット"
/>
```

::: warning 構文を混在させない
MDX の `export`、React の JSX、MDC のスロット記法を導入するには別の変換パイプラインが必要です。このサイトの対応範囲は Vue コンポーネントを含む VitePress Markdown です。
:::
