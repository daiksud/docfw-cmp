<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type Framework = 'nextra' | 'vitepress'

const currentFramework: Framework = 'vitepress'
const frameworkSegment = /\/vitepress\/(en|ja)(?=\/|$)/

const { lang } = useData()

const label = computed(() =>
  lang.value.toLowerCase().startsWith('ja')
    ? 'フレームワークを切り替え'
    : 'Switch framework'
)

function switchFramework(event: Event) {
  const select = event.currentTarget as HTMLSelectElement
  const framework = select.value as Framework

  if (framework === currentFramework) return

  const target = new URL(window.location.href)
  const nextPathname = target.pathname.replace(
    frameworkSegment,
    `/${framework}/$1`
  )

  // Only navigate when the expected framework/locale segment is present.
  // Resetting also keeps the control truthful on an unexpected preview URL.
  if (nextPathname === target.pathname) {
    select.value = currentFramework
    return
  }

  target.pathname = nextPathname
  window.location.assign(target.href)
}
</script>

<template>
  <label class="framework-switcher">
    <span class="framework-switcher__label">{{ label }}</span>
    <select
      class="framework-switcher__select"
      :aria-label="label"
      :title="label"
      :value="currentFramework"
      @change="switchFramework"
    >
      <option value="nextra">Nextra</option>
      <option value="vitepress">VitePress</option>
    </select>
  </label>
</template>
