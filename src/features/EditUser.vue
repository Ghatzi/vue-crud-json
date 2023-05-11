<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

onMounted(() => {
  getUserById();
});

const route = useRoute();
const { id } = route.params;

// const user: Ref<Users | null> = ref(null);
const username = ref<string>('');
const password = ref<string>('');
const lastName = ref<string>('');
const isAdmin = ref<string>('');
const originalUsername = ref<string>('');
const isDisabled = ref<boolean>(true);

const getUserById = async () => {
  try {
    const response = await fetch(`http://localhost:5000/users/${id}`);
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

const handleSubmit = async () => {
  const updateUser = {
    username: username.value,
    password: password.value,
    lastName: lastName.value,
    isAdmin: isAdmin.value === 'true' ? true : false,
    updatedDate: new Date().toLocaleString()
  };

  const updateOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateUser)
  };

  try {
    await fetch(`http://localhost:5000/users/${id}`, updateOptions);
  } catch (err) {
    console.log(err);
  }
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
    <h2>Edit {{ originalUsername }}</h2>

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

  h2 {
    @apply mb-8 font-bold;
  }
}
</style>
