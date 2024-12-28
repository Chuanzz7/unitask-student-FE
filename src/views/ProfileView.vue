<script setup>

import TextInput from "@/components/form/TextInput.vue";
import AppButton from "@/components/AppButton.vue";
import {onMounted, reactive, ref} from "vue";
import {apiClient, PROFILE, RESET_PASSWORD, UPDATE_PROFILE} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import pathnames from "@/router/pathnames.js";

const editable = ref(false)
const toast = useToast()
const state = reactive({
  username: "",
  email: "",
  oldPassword: "",
  newPassword: "",
})

const getProfile = async () => {
  // call listing api
  try {
    const response = await apiClient.get(PROFILE);
    let data = response.data;
    state.username = data.name;
    state.email = data.email;
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
}

const update = async () => {
  try {
    const payload = {
      name: state.username,
    };
    const response = await apiClient.put(UPDATE_PROFILE, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
      editable.value = false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.AssignmentView);
  }
};

const resetPassword = async () => {
  try {
    const payload = {
      oldPassword: state.oldPassword,
      newPassword: state.newPassword
    };
    const response = await apiClient.put(RESET_PASSWORD, payload);
    if (response.status === 200) {
      toast.success("Successfully Updated!", {position: POSITION.TOP_CENTER});
      editable.value = false;
    }
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  } finally {
    router.push(pathnames.AssignmentView);
  }
};

onMounted(() => getProfile())

</script>

<template>

    <div class="w-full max-w-full px-3 shrink-0  md:flex-0">
      <div
          class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
        <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
          <div class="flex items-center">
            <h5 :class="`relative top-0.5 leading-normal pi pi-user pr-2`"></h5>
            <h5 class="mb-0 dark:text-white/80">My Profile</h5>
            <button type="button"
                    @click="editable = !editable"
                    class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
              Settings
            </button>
          </div>
        </div>
  
        <div class="flex-auto p-6">
          <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">User Information</p>
          <div class="flex flex-wrap -mx-3">
            <TextInput v-model="state.username" :disabled="!editable" label="Username"
                       class="w-full max-w-full px-3 shrink-0  md:w-5/12  md:flex-0"></TextInput>
            <TextInput disabled v-model="state.email" label="Email Address"
                       class="w-full max-w-full px-3 shrink-0 md:w-5/12  md:flex-0"></TextInput>
            <div v-if="editable" class="px-8 md:w-2/12">
              <AppButton @click="update">Save</AppButton>
            </div>
          </div>
  
  
          <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
  
          <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Reset Password</p>
          <div class="flex flex-wrap -mx-3">
            <TextInput :disabled="!editable" type="password" v-model="state.oldPassword" label="Old Password"
                       class="w-full max-w-full px-3 shrink-0 md:w-5/12 md:flex-0"></TextInput>
            <TextInput :disabled="!editable" label="New Password" type="password" v-model="state.newPassword"
                       class="w-full max-w-full px-3 shrink-0 md:w-5/12 md:flex-0"></TextInput>
            <div v-if="editable" class="px-8 md:w-2/12">
              <AppButton @click="resetPassword">Reset</AppButton>
            </div>
          </div>
          <div class="w-full flex flex-col items-center ">
          </div>
          <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  
  </style>