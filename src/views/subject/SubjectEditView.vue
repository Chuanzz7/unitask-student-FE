<script setup>

import SubjectForm from "@/components/subject/SubjectForm.vue";
import AppButton from "@/components/AppButton.vue";
import {reactive, watch} from "vue";
import {apiClient, GET_SUBJECT, PUT_SUBJECT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";
import {useAuthStore} from "@/stores/AuthStore.js";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore()

const formData = reactive({
  id: Number,
  isDisabled: false,
  subjectName: String,
  subjectCode: String,
  course: String,
  creditHour: Number,
  description: String,
  learningOutcome: String,
  lecturerName: String,
  lecturerContact: String,
  lecturerEmail: String,
  lecturerOffice: String,
  assessment:
      [{name: String, weightage: String}],
})

const update = async () => {
  try {
    const payload = {
      subjectCode: formData.subjectCode,
      subjectName: formData.subjectName,
      course: formData.course,
      creditHour: formData.creditHour,
      description: formData.description,
      learningOutcome: formData.learningOutcome,
      lecturerName: formData.lecturerName,
      lecturerContact: formData.lecturerContact,
      lecturerEmail: formData.lecturerEmail,
      lecturerOffice: formData.lecturerOffice,
      assessment: [],
      status: "ACTIVE"
    }

    formData.assessment.map((x) => {
      payload.assessment.push({assessmentName: x.name, assessmentWeightage: x.weightage});
    })

    const response = await apiClient.put(`${PUT_SUBJECT}${formData.id}`, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
    }
  } catch (error) {
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.SubjectView);
  }
}

const read = async (id) => {
  if (id != null) {
    try {
      const response = await apiClient.get(`${GET_SUBJECT}${id}`);
      formData.isLoading = false;
      let x = response.data;
      formData.subjectName = x.subjectName;
      formData.subjectCode = x.subjectCode;
      formData.course = x.course;
      formData.creditHour = x.creditHour;
      formData.description = x.description;
      formData.learningOutcome = x.learningOutcome;
      formData.lecturerName = x.lecturerName;
      formData.lecturerContact = x.lecturerContact;
      formData.lecturerEmail = x.lecturerEmail;
      formData.lecturerOffice = x.lecturerName;
      formData.assessment = []
      x.assessment.map((x) => {
        formData.assessment.push({name: x.assessmentName, weightage: x.assessmentWeightage});
      })
    } catch (error) {
      toast.error("Something Wrong", {position: "top-center"});
    }
  }
}

watch(
    () => route.params.id,
    (newId) => {
      formData.id = newId;
      read(newId); // Fetch data when the ID changes
    },
    {immediate: true} // Trigger on initial mount
);

</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <SubjectForm v-model="formData"></SubjectForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>
  </div>
</template>

<style scoped>

</style>