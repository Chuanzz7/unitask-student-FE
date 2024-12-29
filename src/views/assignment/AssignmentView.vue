<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import AssignmentForm from "@/components/assignment/AssignmentForm.vue";
import {apiClient, GET_ASSESSMENT, LIST_ASSESSMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import moment from "moment";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const id = ref(route.params.id);
const toast = useToast();
const state = reactive({
  search: "",
  isLoading: true,
  listData: {isLoading: true, content: []},
  formData: {isLoading: true, content: {isDisabled: true, subject: {}}},
});

const listingApi = async () => {
  // call listing api
  try {
    const response = await apiClient.get(LIST_ASSESSMENT, {
      params: {
        page: 1,
        pageSize: 999,
        search: state.search,
      },
    });
    state.listData.isLoading = false;
    state.listData.content = [];
    response.data.content.map((x) => {
      state.listData.content.push({
        id: x.id,
        title: x.name,
        description: x.subjectName,
        code: x.dueDate == null ? "" : moment(x.dueDate).format("DD/MM/yyyy"),
        color: x.color,
      });
    });
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

const assignmentApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(GET_ASSESSMENT(id));
      state.formData.isLoading = false;
      let data = response.data;
      let subject = data.subject;
      state.formData.content.id = data.id;
      state.formData.content.name = data.name;
      state.formData.content.weightage = data.weightage;
      state.formData.content.subject = subject;
      state.formData.content.assignmentMode = data.assignmentMode;
      state.formData.content.maxMember = data.maxMember;
      if (data.startDate != null) {
        state.formData.content.startDate = new Date(data.startDate);
      }
      if (data.dueDate != null) {
        state.formData.content.dueDate = new Date(data.dueDate);
      }
      state.formData.content.lecturerInstruction = data.lecturerInstruction;
      state.formData.content.assessmentMarkingRubrics = data.assessmentMarkingRubrics || [{}];
      state.formData.content.attachedDocument = data.attachedFile || [];
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
    }
  }
};

onMounted(() => {
  listingApi();
  assignmentApi(id.value);
});

watch(
    () => route.params.id,
    (newId) => {
      id.value = newId;
      assignmentApi(newId); // Fetch data when the ID changes
    },
    {immediate: true}, // Trigger on initial mount
);

</script>

<template>
  <div class="h-full flex flex-wrap max-w-full pb-4 ">
    <SmallLists class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]" title="Assignment"
                editable
                title-icon="text-orange-500 pi-pen-to-square"
                details-page="assignmentDetails"
                update-page="assignmentUpdate"
                v-model="state.search"
                :search="listingApi"
                :content="state.listData.content"></SmallLists>
    <AssignmentForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[60%]"
                    disabled
                    v-if="currentValue != null"
                    v-model="state.formData.content"
                    :loading="state.formData.isLoading"></AssignmentForm>
  </div>
</template>


<style scoped>

</style>