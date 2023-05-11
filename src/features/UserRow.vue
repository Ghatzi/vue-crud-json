<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const props = defineProps({
  users: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['handle-delete']);
const router = useRouter();
</script>

<template>
  <tr v-for="user in props.users" class="hover:bg-sky-300" :key="user.id">
    <td>{{ user.username }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.isAdmin ? 'true' : 'false' }}</td>
    <td>{{ user.createdDate }}</td>
    <td>{{ user.updatedDate }}</td>
    <td class="cursor-pointer" @click="router.push(`/users/${user.id}`)">
      <font-awesome-icon :icon="faPenToSquare" />
    </td>
    <td class="cursor-pointer" @click="emit('handle-delete', user.id)">
      <font-awesome-icon :icon="faTimes" />
    </td>
  </tr>
</template>

<style lang="postcss" scoped>
table td {
  padding: 1em 0;
}
</style>
