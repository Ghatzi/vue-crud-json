<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '../store/useUsers';
import { BASEURL } from '../config/baseUrl';

onMounted(() => {
  getUserById();
});

const route = useRoute();
const router = useRouter();
const store = useUsers();
const { id } = route.params;

const username = ref<string>('');
const password = ref<string>('');
const lastName = ref<string>('');
const isAdmin = ref<string>('');
const originalUsername = ref<string>('');
const isDisabled = ref<boolean>(true);

const getUserById = async () => {
  try {
    const response = await fetch(`${BASEURL}/users/${id}`);
    const data = await response.json();
    username.value = data.username;
    password.value = data.password;
    lastName.value = data.lastName;
    isAdmin.value = data.isAdmin;
    originalUsername.value = data.username;
  } catch (err) {
    console.log(err);
  }
};

const handleSubmit = () => {
  const updateUser = {
    username: username.value,
    password: password.value,
    lastName: lastName.value,
    isAdmin: isAdmin.value === 'true' ? true : false,
    updatedDate: new Date().toLocaleString()
  };

  store.updateUser(Number(id), updateUser);
  setTimeout(() => {
    router.push('/users');
  }, 500);
};

const checkIsValidated = () => {
  if (
    !username.value ||
    !password.value ||
    !lastName.value ||
    Boolean(isAdmin.value) !== Boolean(isAdmin.value)
  ) {
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
};
</script>

<template>
  <div class="wrapper">
    <h3>Edit {{ originalUsername }}</h3>

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

      <label htmlFor="lastName">Last Name: </label>
      <input
        type="text"
        id="lastName"
        v-model="lastName"
        @input="checkIsValidated"
      />

      <label htmlFor="isAdmin">Admin: </label>
      <select id="isAdmin" v-model="isAdmin" @change="checkIsValidated">
        <option value="false">false</option>
        <option value="true">true</option>
      </select>

      <div class="flex justify-end mt-2">
        <button
          title="Update User"
          class="btn"
          :class="isDisabled ? 'btn-gray' : 'btn-blue'"
          :disabled="isDisabled"
        >
          Update User
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
