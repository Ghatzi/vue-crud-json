<script setup lang="ts">
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/base/BaseButton.vue';
import BaseInput from '../components/base/BaseInput.vue';
import { columns } from '../composables/data';
import { useUsers } from '../store/useUsers';
import UserRow from './UserRow.vue';

onMounted(() => {
  store.fetchUsers();
});

const router = useRouter();
const store = useUsers();

const searchQuery = ref<string>('');
const sortColumn = ref<string>('');
const sortDirection = ref<number>(1);
const arrowIconName = ref<string>('');

const filteredUsers = computed(() => {
  const searchValue = searchQuery.value.toLowerCase();
  return store.getAllUsers
    .filter(
      user =>
        user.username.toLowerCase().includes(searchValue) ||
        user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue) ||
        user.isAdmin.toString().includes(searchValue) ||
        user.createdDate.toLowerCase().includes(searchValue) ||
        user.updatedDate.toLowerCase().includes(searchValue)
    )
    .slice(0, 10);
});

const sortByColumn = (column: string, columnType: string) => {
  sortColumn.value = column;
  sortDirection.value = -1 * sortDirection.value;

  if (sortDirection.value === 1) {
    arrowIconName.value = 'faSortUp';

    store.getAllUsers.sort((a: any, b: any) => {
      if (columnType === 'date') {
        return new Date(a[column]) > new Date(b[column]) ? 1 : -1;
      } else {
        return a[column] > b[column] ? 1 : -1;
      }
    });
  } else {
    arrowIconName.value = 'faSortDown';
    store.getAllUsers.sort((a: any, b: any) => {
      if (columnType === 'date') {
        return new Date(a[column]) < new Date(b[column]) ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });
  }
};

const loadingData = computed(() => {
  return store.isLoading;
});

const handleDelete = (id: number) => {
  store.deleteUser(id);
};

const pushRoute = (url: string) => {
  router.push(url);
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

    <BaseButton title="Create New User" @click="pushRoute('users/create')" />
  </div>

  <table class="table-fixed border-x border-y w-full">
    <thead class="font-bold bg-indigo-700">
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          @click="sortByColumn(column.id, column.sortType)"
        >
          <div class="flex justify-evenly">
            {{ column.friendlyName }}
            <span v-if="sortColumn === column.id" class="cursor-pointer">
              <span v-if="arrowIconName === 'faSortUp'">
                <font-awesome-icon :icon="faSortUp" />
              </span>
              <span v-else>
                <font-awesome-icon :icon="faSortDown" />
              </span>
            </span>
            <span v-else class="cursor-pointer">
              <font-awesome-icon :icon="faSort" />
            </span>
          </div>
        </th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <p class="p-2" v-if="loadingData">loading users...</p>
      <UserRow v-else :users="filteredUsers" @handle-delete="handleDelete" />
    </tbody>
    <p class="p-2" v-if="filteredUsers.length === 0">no records found</p>
  </table>
</template>

<style scoped lang="postcss">
table {
  th {
    @apply p-3 capitalize;
  }
}
</style>
