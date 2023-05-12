<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const onChange = computed<string | boolean>({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
});

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Boolean],
    default: ''
  }
});
</script>

<template>
  <div>
    <label :htmlFor="id">{{ label }}: </label>
    <select :id="id" v-model="onChange">
      <option value="false">false</option>
      <option value="true">true</option>
    </select>
  </div>
</template>

<style lang="postcss" scoped>
select {
  @apply w-full my-2 box-border rounded border border-gray-300 inline-block py-3 px-4 text-black;
}
</style>
