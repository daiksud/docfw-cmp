import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Counter from './components/Counter.vue'
import FrameworkSwitcher from './components/FrameworkSwitcher.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // This slot is outside the brand anchor, so the native select never
      // creates invalid nested interactive content inside the home link.
      'nav-bar-content-before': () => h(FrameworkSwitcher)
    }),
  enhanceApp({ app }) {
    app.component('Counter', Counter)
  }
} satisfies Theme
