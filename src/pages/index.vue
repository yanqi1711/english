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
  <div mt-10>
    <ul m-20>
      <li v-for="item in words" :key="item.word" dark:bg-gray-800>
        <strong>{{ item.word }}</strong><br> {{ item.meaning }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  background: #f0f0f0;
}
</style>
