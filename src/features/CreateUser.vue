<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUsers } from '../store/useUsers';
import { useRouter } from 'vue-router';

onMounted(() => {
  store.fetchUsers();
});

const router = useRouter();
const store = useUsers();

const username = ref<string>('');
const password = ref<string>('');
const firstName = ref<string>('');
const lastName = ref<string>('');
const isDisabled = ref<boolean>(true);

const getNextId = computed(() => {
  return store.getNextId;
});

const handleSubmit = () => {
  const date = new Date().toLocaleString();

  const addUser = {
    id: getNextId.value,
    username: username.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    isAdmin: false,
    createdDate: date,
    updatedDate: date
  };

  store.createUser(addUser);
  setTimeout(() => {
    router.push('/users');
  }, 500);
};

const checkIsValidated = () => {
  if (
    !username.value ||
    !password.value ||
    !firstName.value ||
    !lastName.value
  ) {
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <h3>Create New User</h3>

    <form @submit.prevent="handleSubmit">
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        v-model="username"
        @input="checkIsValidated"
      />

      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        v-model="password"
        @input="checkIsValidated"
      />

      <label htmlFor="firstName">First Name: </label>
      <input
        type="text"
        id="firstName"
        v-model="firstName"
        @input="checkIsValidated"
      />

      <label htmlFor="lastName">Last Name: </label>
      <input
        type="text"
        id="lastName"
        v-model="lastName"
        @input="checkIsValidated"
      />

      <div class="flex justify-end mt-2">
        <button
          title="Create User"
          class="btn"
          :class="isDisabled ? 'btn-gray' : 'btn-blue'"
          :disabled="isDisabled"
        >
          Create User
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  @apply w-6/12 m-auto;

  h3 {
    @apply mb-8 font-bold;
  }
}
</style>
