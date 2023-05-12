<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import UserRow from './UserRow.vue';
import { useRouter } from 'vue-router';
import { useUsers } from '../store/useUsers';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';

onMounted(() => {
  store.fetchUsers();
});

const router = useRouter();
const store = useUsers();

const searchQuery = ref<string>('');

const filteredUsers = computed(() => {
  const searchValue = searchQuery.value.toLowerCase();
  return store.getAllUsers?.filter(user =>
    user.username.toLowerCase().includes(searchValue)
  );
});

const loadingData = computed(() => {
  return store.isLoading;
});

const handleDelete = (id: number) => {
  store.deleteUser(id);
};
</script>

<template>
  <div class="flex justify-between mb-4">
    <form @submit.prevent>
      <BaseInput
        id="search"
        type="text"
        name="search"
        placeholder="Search User..."
        role="search"
        :hasMargins="false"
        v-model="searchQuery"
      />
    </form>

    <BaseButton
      title="Create New User"
      @click="() => router.push('users/create')"
    />
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
      <p v-if="loadingData">loading users...</p>
      <UserRow
        v-else
        :users="filteredUsers"
        @handle-delete="handleDelete"
      ></UserRow>
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
