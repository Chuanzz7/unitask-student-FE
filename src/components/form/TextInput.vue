<script setup>
import {defineProps} from "vue";

const props = defineProps({
  label: String,
  name: String,
  modelValue: [String,Number],
  disabled: Boolean,
  type: "text",
})

const emit = defineEmits(['update:modelValue']);

function updateValue(value) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="w-full max-w-full px-3 shrink-0 md:flex-0 transition-all  ">
    <div class="mb-4">
      <label :for="label"
             class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700
             dark:text-white/80">{{ label }}</label>
      <input :disabled :type="type" :value="modelValue" @input="updateValue($event.target.value)"
             :class="[disabled? 'border-gray-50 bg-gray-50 '
             :'border-gray-300 bg-white '
             ,'focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none ' +
             'rounded-lg border border-solid  bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none ' +
             'transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none']"/>
    </div>
  </div>
</template>

<style scoped>

</style>