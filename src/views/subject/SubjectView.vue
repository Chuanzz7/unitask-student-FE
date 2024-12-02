<script setup>

import SmallLists from "@/components/small-list/Small-lists.vue";
import {computed, onMounted, reactive, ref, watch} from "vue";
import SubjectForm from "@/components/subject/SubjectForm.vue";
import {useAuthStore} from "@/stores/AuthStore.js";
import {apiClient, GET_SUBJECT, LIST_SUBJECT} from "@/api/index.js";
import {useRoute} from "vue-router";
import {useToast} from "vue-toastification";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const auth = useAuthStore();
const toast = useToast();

const id = ref(route.params.id);
const model = defineModel({
  search: String
})
const state = reactive({
  listData: {isLoading: true, content: []},
  formData: {isLoading: true, content: {}},
})

const listingApi = async () => {
  try {
    const response = await apiClient.get(LIST_SUBJECT);
    state.listData.isLoading = false;
    state.listData.content = [];
    response.data.map((x) => {
      state.listData.content.push({id: x.id, title: x.subjectName, description: x.lecturerName, code: x.subjectCode})
    });
  } catch (error) {
    toast.error("Something Wrong", {position: "top-center"});
  }
}

const subjectApi = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_SUBJECT}${id}`);
      state.formData.isLoading = false;
      let x = response.data;
      state.formData.content.subjectName = x.subjectName;
      state.formData.content.subjectCode = x.subjectCode;
      state.formData.content.course = x.course;
      state.formData.content.creditHour = x.creditHour;
      state.formData.content.description = x.description;
      state.formData.content.learningOutcome = x.learningOutcome;
      state.formData.content.lecturerName = x.lecturerName;
      state.formData.content.lecturerContact = x.lecturerContact;
      state.formData.content.lecturerEmail = x.lecturerEmail;
      state.formData.content.lecturerOffice = x.lecturerName;
      state.formData.content.assessment = []
      x.assessment.map((x) => {
        state.formData.content.assessment.push({name: x.assessmentName, weightage: x.assessmentWeightage});
      })
    } catch (error) {
      toast.error("Something Wrong", {position: "top-center"});
    }
  }
}

onMounted(() => {
  listingApi()
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
                update-page="subjectUpdate"
                :editable="auth.isLecturer"
                :content="state.listData.content"
                :loading="state.listData.isLoading"></SmallLists>
    <SubjectForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[60%]"
                 disabled
                 :is-lecturer="auth.isLecturer"
                 v-if="currentValue != null"
                 v-model="state.formData.content"
                 :loading="state.formData.isLoading"></SubjectForm>
  </div>
</template>


<style scoped>

</style>