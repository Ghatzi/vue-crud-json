<script setup lang="ts">
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <TheHeader />
    </header>
    <main class="mx-12 my-8">
      <router-view></router-view>
    </main>
    <footer>
      <TheFooter />
    </footer>
  </div>
</template>

<style lang="postcss" scoped></style>
