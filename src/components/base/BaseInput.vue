<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const onInput = computed<string | number>({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value)
});

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  hasMargins: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div>
    <label v-if="label" class="block" :for="id">
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :role="role"
      v-model="onInput"
      :class="{ 'mt-1 mb-5': hasMargins }"
      autocomplete="off"
    />
  </div>
</template>

<style lang="postcss" scoped>
form {
  label {
    @apply flex flex-col;
  }

  input[type='text'],
  input[type='password'] {
    @apply w-full box-border rounded border border-gray-300 inline-block py-2 px-4 text-black;
  }
}
</style>
