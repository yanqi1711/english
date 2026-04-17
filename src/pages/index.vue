<script setup>
import { computed, onMounted, ref } from 'vue'

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

const wordsByLetter = ref({})
const loadingLetters = ref(new Set())
const loadedLetters = ref(new Set())
const currentLetter = ref('A')
const mainElement = ref(null)
const isShowToTop = ref(false)

const displayWords = computed(() => wordsByLetter.value[currentLetter.value] || [])

const groupedWords = computed(() => {
  const groups = {}
  LETTERS.forEach((letter) => {
    groups[letter] = wordsByLetter.value[letter] || []
  })
  return groups
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

async function loadWordsByLetter(letter) {
  if (loadedLetters.value.has(letter) || loadingLetters.value.has(letter))
    return

  loadingLetters.value.add(letter)
  try {
    const data = await fetch(`/words/${letter}.json`).then(res => res.json())
    wordsByLetter.value = {
      ...wordsByLetter.value,
      [letter]: data,
    }
    loadedLetters.value.add(letter)
  }
  catch (error) {
    console.error(`Failed to load words for letter ${letter}`, error)
  }
  finally {
    loadingLetters.value.delete(letter)
  }
}

function prefetchRemainingWords() {
  const queue = LETTERS.filter(letter => !loadedLetters.value.has(letter))
  if (queue.length === 0)
    return

  const prefetchNext = () => {
    const nextLetter = queue.shift()
    if (!nextLetter)
      return

    loadWordsByLetter(nextLetter).finally(() => {
      if (queue.length)
        setTimeout(prefetchNext, 120)
    })
  }

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchNext)
  }
  else {
    setTimeout(prefetchNext, 200)
  }
}

// 切换字母逻辑：更新字母并回顶
function selectLetter(letter) {
  currentLetter.value = letter
  loadWordsByLetter(letter)
  toTop()
}

function gotoGoogle(word) {
  const link = `https://translate.google.com/details?sl=en&tl=zh-CN&text=${word}&op=translate`
  window.open(link, '_blank')
}

onMounted(async () => {
  await loadWordsByLetter(currentLetter.value)
  prefetchRemainingWords()
})
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
