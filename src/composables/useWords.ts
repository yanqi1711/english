import type { UserWord } from '~/types'

export function useWords() {
  const words = ref<UserWord[]>([])
  const newWords = ref('')
  const showTranslation = shallowRef(false)

  function loadWords() {
    const saved = localStorage.getItem('words')
    if (saved) {
      words.value = JSON.parse(saved)
    }
  }

  function saveWords() {
    localStorage.setItem('words', JSON.stringify(words.value))
  }

  function addWord() {
    const trimmedWords = newWords.value
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0)

    trimmedWords.forEach((word) => {
      if (!words.value.some(item => item.word === word)) {
        // eslint-disable-next-line regexp/no-super-linear-backtracking
        const match = word.match(/^([a-z]+(?:\s+[a-z]+)*)\s+(.+)$/i)
        if (match) {
          words.value.push({
            word: match[1].trim(),
            translation: match[2].trim(),
          })
        }
      }
    })

    newWords.value = ''
    saveWords()
  }

  function deleteWord(word: string) {
    words.value = words.value.filter(item => item.word !== word)
    saveWords()
  }

  function clearList() {
    // eslint-disable-next-line no-alert
    if (confirm('确定要清空所有单词吗？')) {
      words.value = []
      localStorage.removeItem('words')
    }
  }

  function toggleTranslation() {
    showTranslation.value = !showTranslation.value
  }

  return {
    words,
    newWords,
    showTranslation: readonly(showTranslation),
    loadWords,
    saveWords,
    addWord,
    deleteWord,
    clearList,
    toggleTranslation,
  }
}
