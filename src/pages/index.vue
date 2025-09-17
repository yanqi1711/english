<script setup>
const words = ref([])

async function loadWords() {
  words.value = await fetch('/data.json').then(res => res.json())
}

function onGoogle(word) {
  const link = `https://translate.google.com/details?sl=en&tl=zh-CN&text=${word}&op=translate`
  window.open(link, '_blank')
}

onMounted(loadWords)
</script>

<template>
  <div p4>
    <div
      v-for="item in words" :key="item.word"
      class="card"

      m-1 mb-2 inline-block h-full w-auto gap-0 border rounded-xl bg-base p-1 dark:border-gray-7
    >
      <div cursor-pointer @click="onGoogle(item.word)">
        <a>{{ item.word }}</a><br>{{ item.meaning }}
      </div>
    </div>
  </div>
</template>
