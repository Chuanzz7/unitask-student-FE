<script setup>

import AppButton from "@/components/AppButton.vue";
import {reactive, watch} from "vue";
import {apiClient, GET_SUBJECT, PUT_SUBJECT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";
import pathnames from "@/router/pathnames.js";
import {useAuthStore} from "@/stores/AuthStore.js";
import AssignmentForm from "@/components/assignment/AssignmentForm.vue";

const toast = useToast();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore()

const formData = reactive({
  id: Number,
  attachedDocument: [{fileName: "ABC"}],
  uploadedDocument: [{fileName: "123"}]
})

const update = async () => {
  try {
    const payload = {}
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
    <AssignmentForm :is-lecturer="auth.isLecturer" v-model="formData"></AssignmentForm>
    <AppButton @click="update" class="mb-5">Update</AppButton>
  </div>
</template>

<style scoped>
</style>