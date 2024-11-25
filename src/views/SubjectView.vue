<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive} from "vue";
import SubjectForm from "@/components/subject/SubjectForm.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const currentValue = computed(() => route.params.id);

const state = reactive({
  listData: [],
  selectedValue: 0,
})
const listingApi = () => {
  // if (error.response.status === 401) {
  //   toast.error("Bad Credential", {position: "top-center"});
  // } else {
  //   toast.error("Something Wrong", {position: "top-center"});
  // }

  let data = [{
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
    id: 3,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 4,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 5,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 6,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 7,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 8,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 9,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }, {
    id: 10,
    subjectName: "Software Testing",
    lecturerName: "Dr Lee Yun Li",
    subjectCode: "SWE3033",
  }]

  data.map((x) => {
    state.listData.push({id: x.id, title: x.subjectCode, description: x.lecturerName, code: x.subjectCode})
  });
}

onMounted(() => {
  listingApi()
})

</script>

<template>
  <div class="h-full flex flex-wrap max-w-full pb-4 transition-flex">
    <SmallLists class="h-full flex-grow mx-3 mb-3 animate- " title="Subjects" module="subjectDetails"
                :content="state.listData"></SmallLists>
    <SubjectForm class="h-full w-[65%] flex-grow mx-3 mb-3" v-if="currentValue != null" v-model="currentValue"
                 :content="state.formData"></SubjectForm>
  </div>
</template>


<style scoped>

</style>