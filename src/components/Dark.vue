<script setup lang="ts">
import { useAppDark } from '~/composables/dark'

const route = useRoute()
const { toggleDark } = useAppDark()
</script>

<template>
  <nav class="fixed right-4 top-4 z-panel-nav flex items-center gap-0 rounded-full border border-base bg-glass shadow">
    <router-link
      :to="route.path === '/' ? '/notes' : '/'"
      class="flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
      :aria-label="route.path === '/' ? 'Go to notes' : 'Go to home'"
    >
      <div v-if="route.path === '/notes'" i-carbon-home text-xl />
      <div v-else i-carbon-notebook text-xl />
    </router-link>

    <a
      class="flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
      href="https://github.com/yanqi1711/english"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub repository"
    >
      <div i-ri-github-fill text-xl />
    </a>

    <button
      class="flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
      title="Toggle Dark Mode"
      aria-label="Toggle dark mode"
      @click="toggleDark()"
    >
      <div i-ph-sun-duotone dark:i-ph-moon-duotone text-xl />
    </button>
  </nav>
</template>
