<script setup lang="ts">
import { computed, ref } from 'vue'

interface CounterProps {
  initial?: number
  label?: string
  incrementLabel?: string
  resetLabel?: string
}

const props = withDefaults(defineProps<CounterProps>(), {
  initial: 0,
  label: 'Counter value',
  incrementLabel: 'Increase count',
  resetLabel: 'Reset count'
})

const count = ref(props.initial)
const canReset = computed(() => count.value !== props.initial)

function increment() {
  count.value += 1
}

function reset() {
  count.value = props.initial
}
</script>

<template>
  <section class="counter-demo" :aria-label="label">
    <p class="counter-demo__status">
      <span>{{ label }}</span>
      <output class="counter-demo__value" :aria-label="label" aria-live="polite">
        {{ count }}
      </output>
    </p>
    <div class="counter-demo__controls" role="group" :aria-label="label">
      <button
        class="counter-demo__button"
        type="button"
        :aria-label="incrementLabel"
        @click="increment"
      >
        {{ incrementLabel }}
      </button>
      <button
        class="counter-demo__button"
        type="button"
        :aria-label="resetLabel"
        :disabled="!canReset"
        @click="reset"
      >
        {{ resetLabel }}
      </button>
    </div>
  </section>
</template>
