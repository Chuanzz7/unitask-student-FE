<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/AuthStore.js";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const id = ref(route.params.id);
const auth = useAuthStore();

const state = reactive({
  isLoading: true,
  listData: {isLoading: true, content: []},
  formData: {isLoading: true, content: {isDisabled: true}},
})

const listingApi = () => {
  // call listing api
  let data = [{
    id: 1,
    assignmentName: "ST Assignment One",
    subjectName: "Software Testing",
    dueDate: "29/10/24",
  }]

  state.listData.content = [];
  data.map((x) => {
    state.listData.content.push({id: x.id, title: x.assignmentName, description: x.subjectName, code: x.dueDate})
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
    <SmallLists class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Assignment"
                details-page="assignmentDetails"
                new-page="assignmentCreate"
                :add-permission="auth.isLecturer"
                :content="state.listData.content"></SmallLists>
  </div>
</template>


<style scoped>

</style>