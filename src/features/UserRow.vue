<script setup lang="ts">
import { faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
  <tr
    v-for="user in props.users"
    class="hover:bg-sky-100 hover:text-black"
    :key="user.id"
  >
    <td>{{ user.username }}</td>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>{{ user.isAdmin ? 'true' : 'false' }}</td>
    <td>{{ new Date(user.createdDate).toLocaleString() }}</td>
    <td>{{ new Date(user.updatedDate).toLocaleString() }}</td>
    <td class="cursor-pointer" @click="router.push(`/users/${user.id}`)">
      <font-awesome-icon :icon="faPenToSquare" />
    </td>
    <td class="cursor-pointer" @click="emit('handle-delete', user.id)">
      <font-awesome-icon :icon="faTimes" />
    </td>
  </tr>
</template>

<style lang="postcss" scoped>
table {
  td {
    @apply p-3 text-center;
  }

  td:not(:first-child) {
    @apply capitalize;
  }
}
</style>
