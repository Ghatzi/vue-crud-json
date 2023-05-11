<script setup lang="ts">
import { onMounted, computed } from 'vue';
import UserRow from './UserRow.vue';
import { useRouter } from 'vue-router';
import { useUsers } from '../store/useUsers';

onMounted(() => {
  store.fetchUsers();
});

const router = useRouter();
const store = useUsers();

const getAllUser = computed(() => {
  return store.getAllUsers;
});

const loadingData = computed(() => {
  return store.isLoading;
});

const handleDelete = (id: number) => {
  store.deleteUser(id);
};
</script>

<template>
  <div class="flex justify-end mb-4">
    <button
      title="Create New User"
      class="btn btn-blue"
      @click="() => router.push('users/create')"
    >
      Create New User
    </button>
  </div>

  <table class="table-fixed border-x border-y w-full">
    <thead class="font-bold bg-indigo-700">
      <tr>
        <th>Username</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Admin</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <p>{{ loadingData ? 'loading users...' : '' }}</p>
      <UserRow :users="getAllUser" @handle-delete="handleDelete"></UserRow>
    </tbody>
  </table>
</template>

<style scoped lang="postcss">
table {
  th {
    @apply py-4;
  }
}
</style>
