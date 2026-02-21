<script setup>
import { computed, onMounted, ref } from 'vue'

const words = ref([])
const currentLetter = ref('A')
const mainElement = ref(null)
const isShowToTop = ref(false)

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

// 滚动监听逻辑
function handleScroll(e) {
  isShowToTop.value = e.target.scrollTop > 300
}

// 回到顶部逻辑
function toTop() {
  mainElement.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 切换字母逻辑：更新字母并回顶
function selectLetter(letter) {
  currentLetter.value = letter
  toTop()
}

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
      class="w-16 flex flex-col items-center py-4 shrink-0 overflow-y-auto"
    >
      <button
        v-for="(list, letter) in groupedWords"
        :key="letter"
        class="w-10 h-10 mb-2 rounded-full transition-all text-sm font-bold flex items-center justify-center"
        :class="currentLetter === letter ? 'bg-blue-500 text-white shadow-lg' : ''"
        @click="selectLetter(letter)"
      >
        {{ letter }}
      </button>
    </aside>

    <main
      ref="mainElement"
      class="flex-1 overflow-y-auto p-4 relative"
      @scroll="handleScroll"
    >
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

      <button
        v-if="isShowToTop"
        fixed bottom-6 right-6 z-100 h-12 w-12 rounded-full
        bg-blue-500 text-white shadow-xl
        flex items-center justify-center
        transition duration-300 hover:scale-110
        @click="toTop"
      >
        <div i-ri-arrow-up-line />
      </button>
    </main>
  </div>
</template>
