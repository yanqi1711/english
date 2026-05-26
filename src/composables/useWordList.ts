import type { WordItem } from '~/types'

export function useWordList() {
  const currentLetter = shallowRef('A')
  const words = shallowRef<WordItem[]>([])
  const isLoading = shallowRef(false)
  const letterCounts = shallowRef<Record<string, number>>({})
  const loadedLetterWords = new Map<string, WordItem[]>()

  const groupedWords = computed(() => {
    const result: Record<string, number> = {}
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i)
      result[letter] = letterCounts.value[letter] || 0
    }
    return result
  })

  async function loadWordsByLetter(letter: string) {
    if (loadedLetterWords.has(letter)) {
      words.value = loadedLetterWords.get(letter)!
      return
    }

    isLoading.value = true
    try {
      const data = await fetch(`/data/${letter}.json`).then(res => res.json())
      loadedLetterWords.set(letter, data)
      words.value = data
    }
    finally {
      isLoading.value = false
    }
  }

  async function loadLetterIndex() {
    const index = await fetch('/data/index.json').then(res => res.json())
    letterCounts.value = index
  }

  async function init() {
    await loadLetterIndex()
    await loadWordsByLetter(currentLetter.value)
  }

  function selectLetter(letter: string) {
    currentLetter.value = letter
    loadWordsByLetter(letter)
  }

  return {
    currentLetter: readonly(currentLetter),
    words: readonly(words),
    isLoading: readonly(isLoading),
    letterCounts: readonly(letterCounts),
    groupedWords,
    selectLetter,
    loadWordsByLetter,
    loadLetterIndex,
    init,
  }
}
