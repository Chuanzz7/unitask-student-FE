<script setup>

const props = defineProps({
  data: {},
  group: {default: "INDIVIDUAL"},
  check: {type: Boolean, default: false},
})

</script>

<template>
  <div class="flex items-center px-4 py-2 bg-gray-50 border border-gray-50 rounded-lg ">
    <div class="flex flex-row w-full">
      <div class="flex md:w-[2%] align-middle items-center justify-center text-xl leading-none mr-2">
        <i :class="[check? 'pi pi-check-circle' :'pi pi-circle']"></i>
      </div>

      <div class="w-[95%] flex justify-between">
        <div class="flex truncate flex-col">
          <h6 :class="[check? 'line-through text-gray-600' :'' , 'truncate mt-1 mb-1 text-sm font-semibold leading-normal ']">
            {{ data.task }}</h6>
          <span class="truncate text-xs leading-tight  dark:opacity-80"> {{ data.assignmentName }}</span>
        </div>

        <div v-if="group === 'GROUP'"
             class="flex text-center align-middle items-center text-sm leading-normal transition-all bg-transparent border-0 ease-in bg-150 rounded-lg  dark:text-white/80">
            <span
                :class="[check? 'line-through text-gray-600' :'text-slate-700'  ,'ml-3 font-bold uppercase text-sm active:opacity-85 tracking-tight-rem bg-x-25 ']">
              {{ data.assignedName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>