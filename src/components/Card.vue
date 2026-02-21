<script setup>
defineProps({
  word: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    default: '',
  },
})

defineEmits(['click'])
</script>

<template>
  <div
    class="p-4 border rounded-2xl hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    @click="$emit('click')"
  >
    <div class="text-lg font-bold">
      {{ word }}
    </div>
    <div class="text-sm text-gray-500  mt-1 line-clamp-2">
      {{ meaning }}
    </div>
  </div>
</template>
