<script setup>
import { onMounted, ref } from 'vue'

const words = ref([])

async function loadWords() {
  try {
    const response = await fetch('/data.json')
    words.value = await response.json()
  }
  catch (error) {
    console.error('Error loading data:', error)
  }
}

function goToPage(word) {
  const link = `https://translate.google.com/?sl=en&tl=zh-CN&text=${word}&op=translate`
  window.open(link, '_blank')
}

onMounted(loadWords)
</script>

<template>
  <div p4>
    <div
      v-for="item in words" :key="item.word"
      class="card"
      m-1
      mb-2 inline-block h-full w-auto gap-0 border rounded-xl p-1 dark:border-gray-7 bg-base
    >
      <div cursor-pointer @click="goToPage(item.word)">
        <a>{{ item.word }}</a><br>{{ item.meaning }}
      </div>
    </div>
  </div>
</template>
