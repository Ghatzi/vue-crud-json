<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { Users } from '../types/index';
import UserRow from './UserRow.vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  getAllUsers();
});

const router = useRouter();

const users: Ref<Array<Users>> = ref([]);

const getAllUsers = async () => {
  try {
    const response = await fetch('http://localhost:5000/users');
    const data = await response.json();
    users.value = data;
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (id: number) => {
  try {
    await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
    getAllUsers();
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="flex justify-end mb-3">
    <button
      title="Add User"
      class="btn btn-blue"
      @click="() => router.push('users/add')"
    >
      Add User
    </button>
  </div>

  <table class="table-fixed border-x border-b w-full">
    <thead class="font-bold bg-indigo-700 text-white">
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
    <tbody class="text-center capitalize">
      <UserRow :users="users" @handle-delete="handleDelete"></UserRow>
    </tbody>
  </table>
</template>

<style scoped lang="postcss">
table th {
  padding: 1em 0;
}
</style>
