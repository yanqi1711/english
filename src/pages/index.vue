<script setup>
import { onMounted, ref } from 'vue'

const words = ref([])

async function loadWords() {
  try {
    const response = await fetch('/data.json') // 直接加载 JSON
    words.value = await response.json()
  }
  catch (error) {
    console.error('Error loading data:', error)
  }
}

onMounted(loadWords)
</script>

<template>
  <div p4>
    <div
      v-for="item in words" :key="item.word"
      m-1 mb-2 inline-block h-full w-auto gap-0 border rounded-xl p-1 dark:border-gray-7 bg-base
    >
      <span block font-bold>{{ item.word }}</span> {{ item.meaning }}
    </div>
  </div>
</template>
