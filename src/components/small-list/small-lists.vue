<script setup>
import SmallList from "@/components/small-list/small-list.vue";
import {defineProps, onMounted, reactive} from "vue";
import SearchBar from "@/components/SearchBar.vue";
import {useRoute} from 'vue-router'
import router from "@/router/index.js";

const props = defineProps({
  title: String
})

const state = reactive({
  isLoaded: false,
  isActiveId: Number,
  search: String,
  contents: [{
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 2,
    subjectName: "Test2",
    lecturerName: "Name2",
    subjectCode: "456",
  }]
})

const route = useRoute()

onMounted(() => {
  state.isActiveId = Number(route.params.id);
  state.isLoaded = true;
  console.log(state.isActiveId);
})

const getId = (id) => {
  router.push({name: 'subjectDetails', params: {id: id}})
  state.isActiveId = id
}

const filter = (value) => {
  state.search = value;
  console.log(value);
}

//todo call list api
</script>

<template>
  <div class=" max-w-full px-3 lg:w-1/3 lg:flex-none">
    <div
        class="fixed flex-wrap inset-y-0 mt-20 mb-4 w-1/4 overflow-y-auto break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
      <div class="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
        <div class="flex flex-wrap -mx-3">
          <div class="flex items-center flex-none w-1/2 max-w-full px-3">
            <h6 class="mb-0 dark:text-white">{{ title }}</h6>
          </div>
          <div class="flex-none w-1/2 max-w-full px-3 text-right">
            <SearchBar @search-input="filter"></SearchBar>
          </div>
        </div>
      </div>
      <SmallList v-if="state.isLoaded" v-for="content in state.contents" @click="getId(content.id)" :data="content"
                 :isActive="content.id === state.isActiveId"></SmallList>
    </div>
  </div>
</template>

<style scoped>

</style>