<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUsers } from '../store/useUsers';
import { useRouter } from 'vue-router';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';

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
        id="firstName"
        type="text"
        name="firstName"
        label="First Name:"
        v-model="firstName"
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

      <div class="flex justify-end mt-2">
        <BaseButton title="Create User" :isDisabled="isDisabled" />
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
