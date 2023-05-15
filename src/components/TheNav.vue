<script setup lang="ts">
import { useRouter } from 'vue-router';
import { routes } from '../composables/data';

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
});

const router = useRouter();

const goToRoute = (url: string) => router.push(url);
</script>

<template>
  <nav>
    <h4 @click="goToRoute('/')">
      {{ props.title }}
    </h4>

    <ul>
      <li v-for="route in routes" :key="route.text">
        <router-link :to="route.to">
          {{ route.text }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  @apply flex justify-between items-center w-full;

  ul {
    @apply flex;

    li {
      @apply ml-2;

      &:hover {
        @apply text-slate-500;
      }

      &:not(:first-child) {
        @apply before:content-['|'] before:mr-2;
      }
    }
  }
}
</style>
