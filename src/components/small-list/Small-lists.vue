<script setup>
import SmallList from "@/components/small-list/Small-list.vue";
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
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 1,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  },]
})

const route = useRoute()

onMounted(() => {
  state.isActiveId = Number(route.params.id);
  state.isLoaded = true;
})

const getId = (id) => {
  router.push({name: 'subjectDetails', params: {id: id}})
  state.isActiveId = id
}

const filter = (value) => {
  state.search = value;
}

//todo call list api
</script>

<template>
  <div class="h-full overflow-y-hidden pb-14 px-1 bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl ">
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
    <div class="max-h-full overflow-y-auto break-words bg-clip-border" >
    <SmallList v-if="state.isLoaded" v-for="content in state.contents" @click="getId(content.id)" :data="content"
               :isActive="content.id === state.isActiveId"></SmallList>
    </div>
  </div>
</template>

<style scoped>

</style>