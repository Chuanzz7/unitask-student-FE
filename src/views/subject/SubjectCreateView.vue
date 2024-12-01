<script setup>

import SubjectForm from "@/components/subject/SubjectForm.vue";
import AppButton from "@/components/AppButton.vue";
import {reactive} from "vue";

const formData = reactive({
  disabled: false,
  course: "",
  subjectName: "",
  assessment:
      [{name: "", weightage: ""}],
})
</script>


<template>
  <div class="flex-col w-full justify-items-center">
    <SubjectForm v-model="formData"></SubjectForm>
    <AppButton class="mb-5">Create</AppButton>
  </div>
</template>

<style scoped>

</style>