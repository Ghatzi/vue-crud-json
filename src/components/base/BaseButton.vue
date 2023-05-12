<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const { title } = props;
</script>

<template>
  <button
    :title="title"
    class="btn btn-blue"
    :class="[isDisabled ? 'btn-gray' : 'btn-blue']"
  >
    {{ title }}
  </button>
</template>

<style scoped lang="postcss">
.btn {
  @apply font-bold py-2 px-4 rounded text-white;
}

.btn-blue {
  @apply bg-blue-500;

  &:hover {
    @apply bg-blue-900;
  }
}

.btn-gray {
  @apply bg-gray-500 opacity-30;
}
</style>
