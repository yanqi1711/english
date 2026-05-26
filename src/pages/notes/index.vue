<script setup lang="ts">
import { useWords } from '~/composables/useWords'

useTitle('单词背诵')

const {
  words,
  newWords,
  showTranslation,
  addWord,
  deleteWord,
  clearList,
  toggleTranslation,
} = useWords()

const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')

function autoResize() {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
}

function onSubmit() {
  addWord()
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}

onMounted(() => {
  nextTick(() => autoResize())
})
</script>

<template>
  <div class="fixed right-36 top-4 z-panel-nav flex items-center rounded-full border border-base bg-glass shadow">
    <button
      class="flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
      aria-label="Toggle translation visibility"
      @click="toggleTranslation"
    >
      <div v-if="showTranslation" i-carbon-view-filled text-xl />
      <div v-else i-carbon-view-off-filled text-xl />
    </button>

    <button
      class="flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
      aria-label="Clear all words"
      @click="clearList"
    >
      <div i-carbon-close-outline text-xl />
    </button>
  </div>

  <div class="mt-2 p-2">
    <div class="mb-4 flex items-center justify-center">
      <textarea
        ref="textarea"
        v-model="newWords"
        placeholder="示例: bully 欺负, 恃强凌弱"
        rows="1"
        class="mr-4 w-screen-md resize-none overflow-hidden border-b border-b-[#888] bg-transparent p-2 outline-transparent"
        @input="autoResize"
      />
      <button
        class="rounded-md border border-[#9ca3af33] px-5 py-2 hover:border-[#0a9cae] hover:text-[#0a9cae]"
        @click="onSubmit"
      >
        保存
      </button>
    </div>

    <TransitionGroup name="list" tag="div">
      <div
        v-for="item in words"
        :key="item.word"
        class="mb-2 flex items-center justify-center"
      >
        <div class="flex w-2xl items-center justify-between rounded-xl border bg-base p-2 dark:border-gray-7">
          <div>
            <span class="mr-2 text-6 font-bold">{{ item.word }}</span>
            <span
              class="text-6 font-bold transition-all duration-300 ease-in-out"
              :class="showTranslation ? 'bg-transparent' : 'bg-[#888] text-[#888] hover:bg-transparent'"
            >{{ item.translation }}</span>
          </div>
          <button
            class="ml-2 flex h-10 w-10 items-center justify-center rounded-full op50 hover:bg-active hover:op100"
            aria-label="Delete word"
            @click="deleteWord(item.word)"
          >
            <div i-carbon-close-outline text-xl />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
