<script setup>
import {defineProps} from "vue";

const props = defineProps({
  label: String,
  name: String,
  modelValue: [String, Number],
  disabled: Boolean,
  type: "text",
})

const toggle = defineModel()
</script>

<template>
  <div class="w-full max-w-full px-3 shrink-0 md:flex-0 transition-all  ">
    <div class="mb-4">
      <label :for="label"
             class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700
             dark:text-white/80">{{ label }}</label>
      <div class="w-full flex flex-row px-3 py-2">
        <span class="text-sm text-gray-700  flex pr-2">No</span>
        <input :disabled="disabled" type="checkbox"
               v-model="toggle"
               :class="[disabled
               ? 'after:bg-gray-500'
               : 'cursor-pointer after:bg-white'
               , 'rounded-10 mt-0.5 duration-250 ease-in-out after:rounded-circle after:shadow-2xl after:duration-250 ' +
                'checked:after:translate-x-5.3 h-5 relative float-left w-10 appearance-none border border-solid ' +
                 'border-gray-200 bg-zinc-700/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all ' +
                  'after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px   after:content-[\'\'] ' +
                   'checked:border-blue-500/95 checked:bg-blue-500/95 checked:bg-none checked:bg-right']"/>
        <span class="text-sm text-gray-700  flex pl-2">Yes</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>