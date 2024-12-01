<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import SubjectForm from "@/components/subject/SubjectForm.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const id = ref(route.params.id);

const state = reactive({
  isLoading: true,
  listData: {isLoading: true, content: []},
  formData: {isLoading: true, content: { isDisabled:true}},
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

  state.listData.content = [];
  data.map((x) => {
    state.listData.content.push({id: x.id, title: x.subjectCode, description: x.lecturerName, code: x.subjectCode})
  });
}

const subjectApi = async (id) => {
  //call api

  state.formData.formLoading = false;
  state.formData.content.isDisabled = true
  state.formData.content.id = id;
  state.formData.content.course = "Test";
  state.formData.content.subjectName = "Code Camp";
  state.formData.content.assessment = [{name: "Mid term", weightage: "50%"}]
}

onMounted(() => {
  listingApi()
  subjectApi(id.value);
})

watch(
    () => route.params.id,
    (newId) => {
      id.value = newId;
      subjectApi(newId); // Fetch data when the ID changes
    },
    {immediate: true} // Trigger on initial mount
);

</script>

<template>
  <div class="h-full flex flex-wrap max-w-full pb-4 ">
    <SmallLists class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Subjects"
                details-page="subjectDetails"
                new-page="subjectCreate"
                :content="state.listData.content"></SmallLists>
    <SubjectForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[50%]"
                 v-if="currentValue != null"
                 v-model="state.formData.content"
                 :loading="state.isLoading"></SubjectForm>
  </div>
</template>


<style scoped>

</style>