<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';

const BaseLayout = defineAsyncComponent(
  () => import('./layout/BaseLayout.vue')
);

const layout = computed(() => {
  return BaseLayout;
});
</script>

<template>
  <component :is="layout"></component>
</template>

<style scoped lang="postcss"></style>
