<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import TextInput from "@/components/form/TextInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import pathnames from "@/router/pathnames.js";

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);

const form = reactive({
  loading: true,
  id: 0,
  course: "",
  subjectName: "",
  subjectCode: "",
  lecturerName: "",
  assessment: [],
})

const subjectApi = async (id) => {
  //call api
  form.disabled = true
  form.id = id;
  form.course = "Test";
  form.loading = false;
  form.subjectName = "Code Camp";
  form.assessment = [{name: "Mid term", weightage: "50%"}]
}

watch(
    () => route.params.id,
    (newId) => {
      id.value = newId;
      subjectApi(newId); // Fetch data when the ID changes
    },
    {immediate: true} // Trigger on initial mount
);

onMounted(() => {
  subjectApi(id.value);
  console.log(form)
});

function close() {
  console.log("working?")
  router.push(pathnames.SubjectView);
}

</script>
<template>
  <div
      class="relative h-full flex-wrap overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
    <div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
      <div class="flex items-center">
        <button type="button"
                @click="close"
                class="pr-2 leading-normal text-center align-middle">
          <i class="text-blue-500 pi pi-angle-left"></i>
        </button>
        <h5 class="mb-0 dark:text-white/80">{{ form.subjectName }}</h5>
        <button type="button"
                class="inline-block px-8 py-2  ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
          Edit
        </button>
      </div>
    </div>
    <div class="flex-auto px-6">
      <PulseLoader class="flex justify-center" v-if="form.loading" color="#825ee4"></PulseLoader>
      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Subject Information</p>
      <div class="flex flex-wrap -mx-3">
        <TextInput :disabled="form.disabled" class="md:w-6/12" label="Subject Code"
                   v-model="form.subjectCode"></TextInput>
        <TextInput class="md:w-6/12" label="Subject Name" v-model="form.subjectName"></TextInput>
        <TextInput class="md:w-6/12" label="Course" v-model="form.course"></TextInput>
        <TextInput class="md:w-6/12" label="No. of Credit Hour" v-model="form.creditHour"></TextInput>
        <TextArea class="md:w-full" label="Description"></TextArea>
        <TextArea class="md:w-full" label="Learning Outcome"></TextArea>
      </div>
      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Lecturer Information</p>
      <div class="flex flex-wrap -mx-3">
        <TextInput class="md:w-6/12" label="Name"></TextInput>
        <TextInput class="md:w-6/12" label="Contact"></TextInput>
        <TextInput class="md:w-6/12" label="Email"></TextInput>
        <TextInput class="md:w-6/12" label="Office"></TextInput>
      </div>
      <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
      <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Assessment Mode</p>
      <div v-for="(assessment, index) in form.assessment" class="flex flex-wrap -mx-3">
        <TextInput class="md:w-8/12" :label="'Assessment ' + (index+1)"></TextInput>
        <TextInput class="md:w-4/12" :label="'Weightage ' + (index+1)"></TextInput>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>