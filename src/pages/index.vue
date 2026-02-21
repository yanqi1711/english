<script setup>
import { computed, onMounted, ref } from 'vue'

const words = ref([])
const currentLetter = ref('A')

const groupedWords = computed(() => {
  const groups = {}

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i)
    groups[char] = []
  }

  if (words.value.length > 0) {
    words.value.forEach((item) => {
      if (item.word) {
        const firstLetter = item.word.charAt(0).toUpperCase()
        if (groups[firstLetter]) {
          groups[firstLetter].push(item)
        }
      }
    })
  }
  return groups
})

const displayWords = computed(() => {
  return groupedWords.value[currentLetter.value] || []
})

async function loadWords() {
  const data = await fetch('/data.json').then(res => res.json())
  words.value = data
}

function gotoGoogle(word) {
  const link = `https://translate.google.com/details?sl=en&tl=zh-CN&text=${word}&op=translate`
  window.open(link, '_blank')
}

onMounted(loadWords)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <aside
      class="w-16 flex flex-col items-center py-4 shrink-0 overflow-y-auto
             "
    >
      <button
        v-for="(list, letter) in groupedWords"
        :key="letter"
        class="w-10 h-10 mb-2 rounded-full transition-all text-sm font-bold flex items-center justify-center"

        @click="currentLetter = letter"
      >
        {{ letter }}
      </button>
    </aside>

    <main class="flex-1 overflow-y-auto p-4 ">
      <h2 class="text-3xl font-black mb-6 uppercase">
        {{ currentLetter }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card
          v-for="item in displayWords"
          :key="item.word"
          :word="item.word"
          :meaning="item.meaning"
          @click="gotoGoogle(item.word)"
        />
      </div>
    </main>
  </div>
</template>
