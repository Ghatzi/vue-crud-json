<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUsers } from '../store/useUsers';
import { BASEURL } from '../config/baseUrl';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseSelect from '../components/base/BaseSelect.vue';

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
      <BaseInput
        id="username"
        type="text"
        name="username"
        label="Username:"
        v-model="username"
        @input="checkIsValidated"
      />

      <BaseInput
        id="password"
        type="password"
        name="password"
        label="Password:"
        v-model="password"
        @input="checkIsValidated"
      />

      <BaseInput
        id="lastName"
        type="text"
        name="lastName"
        label="Last Name:"
        v-model="lastName"
        @input="checkIsValidated"
      />

      <BaseSelect
        id="isAdmin"
        label="Admin"
        v-model="isAdmin"
        @input="checkIsValidated"
      ></BaseSelect>

      <div class="flex justify-end mt-2">
        <BaseButton title="Update User" :isDisabled="isDisabled" />
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
