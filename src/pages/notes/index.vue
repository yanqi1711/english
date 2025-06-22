<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// 响应式数据
const showTextArea = ref(false)
const newWords = ref('')
const words = ref<{ word: string }[]>([])

// 从sessionStorage加载数据
function loadWords() {
  const savedWords = sessionStorage.getItem('words')
  if (savedWords) {
    words.value = JSON.parse(savedWords)
  }
}

// 保存数据到sessionStorage
function saveWords() {
  sessionStorage.setItem('words', JSON.stringify(words.value))
}

// 添加单词 回车或空行区分不同单词 空格不管
function addWord() {
  const trimmedWords = newWords.value
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0)

  trimmedWords.forEach((word) => {
    if (!words.value.some(item => item.word === word)) {
      words.value.push({ word })
    }
  })

  newWords.value = '' // 清空输入框
  saveWords() // 保存到sessionStorage
}

// 删除sessionStorage中的所有单词
function clearList() {
  // eslint-disable-next-line no-alert
  if (confirm('确定要清空所有单词吗？')) {
    words.value = []
    sessionStorage.removeItem('words')
  }
}

// 删除单条单词
function deleteWord(word: string) {
  words.value = words.value.filter(item => item.word !== word)
  saveWords()
}

// 切换显示文本区域
function toggleTextArea() {
  showTextArea.value = !showTextArea.value
}

// 组件挂载时加载数据
onMounted(() => {
  loadWords()
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
      @click="toggleTextArea"
    >
      <div v-if="showTextArea" i-carbon-view-filled text-xl />
      <div v-else i-carbon-view-off-filled text-xl />
    </div><div
      h-10
      w-10
      rounded-full hover:bg-active op50 hover:op100 flex="~ items-center justify-center" @click="clearList"
    >
      <div i-carbon-close-outline text-xl />
    </div>
  </div>
  <div mt-2 p-2>
    <div
      v-if="showTextArea"
      class="mb-4 flex items-center justify-center"
    >
      <textarea
        v-model="newWords"
        placeholder="添加单词"
        class="h-screen-sm w-screen-md border-2 rounded-xl outline-transparent outline dark:border-gray-7 bg-base"
      />
      <button
        class="ml-2 rounded-xl bg-#42B883 px-4 py-2 text-white hover:bg-#345B4C"
        @click="addWord"
      >
        提交
      </button>
    </div>
    <div
      v-for="item in words" :key="item.word"
      class="flex items-center justify-center"
    >
      <div mb-2 w-2xl flex justify-between border rounded-xl p-2 dark:border-gray-7 bg-base>
        <span block font-size-6 font-bold>{{ item.word }}</span>
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
