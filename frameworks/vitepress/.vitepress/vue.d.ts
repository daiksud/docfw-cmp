declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}

declare module 'markdown-it-footnote' {
  const footnote: (markdown: unknown) => void
  export default footnote
}
