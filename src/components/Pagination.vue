<script setup lang="ts">
const props = defineProps({
  pageNumbers: {
    type: Array,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
});

const { pageNumbers } = props;

const emit = defineEmits(['prev-page', 'next-page', 'update-page']);

const getLastPage = pageNumbers.length;
</script>

<template>
  <nav>
    <ul class="flex pb-1 justify-end">
      <li v-if="currentPage !== 1" @click="emit('prev-page')">&lt; Previous</li>

      <div v-for="page in pageNumbers">
        <li
          key="page"
          @click="emit('update-page', page)"
          class="mx-1 hover:text-blue-600"
        >
          {{ page }}
        </li>
      </div>

      <li v-if="currentPage !== getLastPage" @click="emit('next-page')">
        Next &gt;
      </li>
    </ul>
  </nav>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
