<script setup lang="ts">
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '../../data/db.json';
import Pagination from '../components/Pagination.vue';
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
const getUsers = ref(users);

// pagination
const currentPage = ref(1);
const recordsPerPage = ref(10);
const indexOfLastRecord = ref(currentPage.value * recordsPerPage.value);
const indexOfFirstRecord = ref(indexOfLastRecord.value - recordsPerPage.value);
const numberOfPages = ref(
  Math.ceil(getUsers.value.length / recordsPerPage.value)
);
const pageNumbers = [...Array(numberOfPages.value + 1).keys()].slice(1);

// sorting
const sortColumn = ref<string>('');
const sortDirection = ref<number>(1);
const arrowIconName = ref<string>('');

const filteredUsers = computed(() => {
  const searchValue = searchQuery.value.toLowerCase();
  return getUsers.value
    .slice(indexOfFirstRecord.value, indexOfLastRecord.value)
    .filter(
      user =>
        user.username.toLowerCase().includes(searchValue) ||
        user.firstName.toLowerCase().includes(searchValue) ||
        user.lastName.toLowerCase().includes(searchValue) ||
        user.isAdmin.toString().includes(searchValue) ||
        user.createdDate.includes(searchValue) ||
        user.updatedDate.includes(searchValue)
    );
});

const sortByColumn = (column: string, columnType: string) => {
  sortColumn.value = column;
  sortDirection.value = -1 * sortDirection.value;

  if (sortDirection.value === 1) {
    arrowIconName.value = 'faSortUp';

    getUsers.value.sort((a: any, b: any) => {
      if (columnType === 'date') {
        return new Date(a[column]) > new Date(b[column]) ? 1 : -1;
      } else {
        return a[column] > b[column] ? 1 : -1;
      }
    });
  } else {
    arrowIconName.value = 'faSortDown';
    getUsers.value.sort((a: any, b: any) => {
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

const goToRoute = (url: string) => router.push(url);

const updatePage = (page: number) => {
  currentPage.value = page;
  indexOfLastRecord.value = page * recordsPerPage.value;
  indexOfFirstRecord.value = indexOfLastRecord.value - recordsPerPage.value;
};

const prevPage = () => {
  if (currentPage.value !== 1) {
    currentPage.value = currentPage.value - 1;
    indexOfLastRecord.value = currentPage.value * recordsPerPage.value;
    indexOfFirstRecord.value = indexOfLastRecord.value - recordsPerPage.value;
  }
};

const nextPage = () => {
  if (currentPage.value !== numberOfPages.value) {
    currentPage.value = currentPage.value + 1;
    indexOfLastRecord.value = currentPage.value * recordsPerPage.value;
    indexOfFirstRecord.value = indexOfLastRecord.value - recordsPerPage.value;
  }
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

    <BaseButton title="Create New User" @click="goToRoute('users/create')" />
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

  <Pagination
    :pageNumbers="pageNumbers"
    @prev-page="prevPage"
    @next-page="nextPage"
    @update-page="updatePage"
    :currentPage="currentPage"
  />
</template>

<style scoped lang="postcss">
table {
  th {
    @apply p-3 capitalize;
  }
}
</style>
