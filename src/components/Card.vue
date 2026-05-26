<script setup lang="ts">
interface Props {
  word: string
  meaning: string
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="group cursor-pointer rounded-2xl border border-base p-4 shadow-sm transition-all hover:border-blue-400 hover:shadow-md"
    @click="emit('click')"
  >
    <div class="text-lg font-bold">
      {{ word }}
    </div>
    <div class="mt-1 line-clamp-2 text-sm color-base op50">
      {{ meaning }}
    </div>
  </div>
</template>
