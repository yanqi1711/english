<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const showTranslation = ref(false)
const newWords = ref('')
const words = ref<{ word: string, translation: string }[]>([])
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const color = ref('bg-[#888]')

function autoResize() {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
}

function getBgColor() {
  if (showTranslation.value) {
    return 'bg-transparent'
  }
  return color.value
}

function toggleTranslation() {
  showTranslation.value = !showTranslation.value
}

// 从localStorage加载数据
function loadWords() {
  const savedWords = localStorage.getItem('words')
  if (savedWords) {
    words.value = JSON.parse(savedWords)
  }
}

// 保存数据到localStorage
function saveWords() {
  localStorage.setItem('words', JSON.stringify(words.value))
}

// 添加单词
// 匹配并保存对应单词和意思到浏览器中
function addWord() {
  const el = textareaRef.value
  let fore = ''
  let rear = ''
  const trimmedWords = newWords.value
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0)

  trimmedWords.forEach((word) => {
    if (!words.value.some(item => item.word === word)) {
      // eslint-disable-next-line regexp/no-super-linear-backtracking
      const match = word.match(/^([a-z\s;,]+)([^a-z].*)$/i)
      if (match) {
        fore = match[1].trim()
        rear = match[2].trim()
      }

      words.value.push({ word: fore, translation: rear })
    }
  })

  newWords.value = ''
  saveWords()
  if (el) {
    el.style.height = 'auto'
  }
}

// 删除localStorage中的所有单词
function clearList() {
  // eslint-disable-next-line no-alert
  if (confirm('确定要清空所有单词吗？')) {
    words.value = []
    localStorage.removeItem('words')
  }
}

// 删除单条单词
function deleteWord(word: string) {
  words.value = words.value.filter(item => item.word !== word)
  saveWords()
}

// 组件挂载时加载数据
onMounted(() => {
  loadWords()
  nextTick(() => autoResize())
})
</script>

<template>
  <div
    flex="~ items-center"
    fixed right-36 top-4 z-panel-nav border border-base rounded-full shadow bg-glass
  >
    <div
      h-10
      w-10 rounded-full hover:bg-active op50 hover:op100 flex="~ items-center justify-center"
      @click="toggleTranslation"
    >
      <div v-if="showTranslation" i-carbon-view-filled text-xl />
      <div v-else i-carbon-view-off-filled text-xl />
    </div>

    <div
      h-10
      w-10
      rounded-full hover:bg-active op50 hover:op100 flex="~ items-center justify-center"
      @click="clearList"
    >
      <div i-carbon-close-outline text-xl />
    </div>
  </div>
  <div mt-2 p-2>
    <div
      class="mb-4 flex items-center justify-center"
    >
      <textarea
        ref="textareaRef"
        v-model="newWords"
        placeholder="示例: bully 欺负, 恃强凌弱"
        rows="1"
        class="mr-4 w-screen-md resize-none overflow-hidden border-b-1 border-b-[#888] bg-transparent p-2 outline-transparent outline"
        @input="autoResize"
      />
      <button
        class="border-1 border-[#9ca3af33] rounded-md p-2 px-5 hover:border-[#0a9cae] hover:text-[#0a9cae]"
        @click="addWord"
      >
        保存
      </button>
    </div>
    <div
      v-for="item in words" :key="item.word"
      class="flex items-center justify-center"
    >
      <div mb-2 w-2xl flex justify-between border rounded-xl p-2 dark:border-gray-7 bg-base>
        <div>
          <span mr-2 font-size-6 font-bold>{{ item.word }}</span>
          <span
            :class="getBgColor()"
            font-size-6 font-bold
            class="getBgColor() text-[#888] transition-all duration-300 ease-in-out hover:bg-transparent"
          >{{ item.translation }}</span>
        </div>
        <div
          ml-2 h-10 w-10 rounded-full hover:bg-active op50 hover:op100 flex="~ items-center justify-center"
          @click="deleteWord(item.word)"
        >
          <div i-carbon-close-outline text-xl />
        </div>
      </div>
    </div>
  </div>
</template>
