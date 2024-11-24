<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import SmallForm from "@/components/form/SmallForm.vue";
</script>

<template>
  <div class="h-full flex flex-wrap flex-row max-w-full">
    <div class="h-full min-w-1/4 mx-3 flex-grow pb-4">
      <SmallLists title="Subjects"></SmallLists>
    </div>
    <div class="h-full min-w-3/4 mx-3 flex-grow pb-4">
      <SmallForm></SmallForm>
    </div>
  </div>
</template>


<style scoped>

</style>