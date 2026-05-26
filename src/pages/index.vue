<script setup lang="ts">
import { useWordList } from '~/composables/useWordList'

const {
  currentLetter,
  words,
  isLoading,
  groupedWords,
  selectLetter,
  init,
} = useWordList()

const mainRef = useTemplateRef<HTMLElement>('main')
const isShowToTop = shallowRef(false)

function handleScroll(e: Event) {
  const target = e.target as HTMLElement
  isShowToTop.value = target.scrollTop > 300
}

function toTop() {
  mainRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
}

function onSelectLetter(letter: string) {
  selectLetter(letter)
  toTop()
}

function gotoGoogle(word: string) {
  const link = `https://translate.google.com/details?sl=en&tl=zh-CN&text=${word}&op=translate`
  window.open(link, '_blank')
}

onMounted(init)
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <aside class="flex w-16 shrink-0 flex-col items-center gap-1 overflow-y-auto py-4">
      <button
        v-for="(_count, letter) in groupedWords"
        :key="letter"
        class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all"
        :class="currentLetter === letter ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-active'"
        @click="onSelectLetter(letter)"
      >
        {{ letter }}
      </button>
    </aside>

    <main
      ref="main"
      class="relative flex-1 overflow-y-auto p-4"
      @scroll="handleScroll"
    >
      <h2 class="mb-6 text-3xl font-black uppercase">
        {{ currentLetter }}
      </h2>
      <p class="mb-4 text-sm op50">
        {{ groupedWords[currentLetter] }} words
      </p>

      <div
        v-if="!isLoading"
        class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card
          v-for="item in words"
          :key="item.word"
          :word="item.word"
          :meaning="item.meaning"
          @click="gotoGoogle(item.word)"
        />
      </div>
      <div v-else class="op50">
        Loading words...
      </div>

      <button
        v-show="isShowToTop"
        class="fixed bottom-6 right-6 z-100 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl transition duration-300 hover:scale-110"
        @click="toTop"
      >
        <div i-ri-arrow-up-line />
      </button>
    </main>
  </div>
</template>
