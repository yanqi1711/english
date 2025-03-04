<script setup lang="ts">
import { toggleDark } from '~/composables/dark'
</script>

<template>
  <div
    flex="~ items-center"
    fixed right-4 top-4 z-panel-nav border border-base rounded-full shadow bg-glass
  >
    <a
      h-10 w-10 rounded-full hover:bg-active op50 hover:op100
      flex="~ items-center justify-center"
      href="https://github.com/yanqi1711/english" target="_blank"
    >
      <div i-ri-github-fill text-xl />
    </a>
    <button
      h-10 w-10 rounded-full hover:bg-active op50 hover:op100
      flex="~ items-center justify-center"
      title="Toggle Dark Mode"
      @click="toggleDark()"
    >
      <div i-ph-sun-duotone dark:i-ph-moon-duotone text-xl />
    </button>
  </div>
</template>
