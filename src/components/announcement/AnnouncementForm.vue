<script setup>

import {useRouter} from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import TextInput from "@/components/form/TextInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import pathnames from "@/router/pathnames.js";
import AppSelectInput from "@/components/form/AppSelectInput.vue";
import {computed, onMounted, reactive} from "vue";
import {apiClient, LIST_SUBJECT} from "@/api/index.js";
import {POSITION} from "vue-toastification";
import moment from "moment";

const router = useRouter();
const state = reactive({
  search: "",
  options: []
});

const props = defineProps({
  disabled: Boolean,
  loading: Boolean,
});

const model = defineModel({});

const close = () => {
  router.push(pathnames.AnnouncementView);
};

const subjectListing = async () => {
  try {
    const response = await apiClient.get(LIST_SUBJECT, {
      params: {
        page: 1,
        pageSize: 999,
        search: state.search,
        subjectId: model.value.subjectId
      },
    });
    state.options.content = [];
    response.data.content.map((x) => {
      state.options.push({
        label: `${x.code} ${x.name}`,
        value: x.id,
      });
    });
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

const date = computed(() => model.value.postedDate == null ? moment().format("DD/MM/yyyy") : moment(model.value.postedDate).format("DD/MM/yyyy"));
const user = computed(() => model.value.lecturerName == null ? "-" : model.value.lecturerName);

onMounted(() => {
  console.log(model.value.subjectId)
  subjectListing();
})

</script>
<template>
  <div
      class="w-full relative flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
    <PulseLoader class="m-5 flex justify-center items-center" v-if="props.loading"
                 color="#825ee4"></PulseLoader>
    <div v-else>
      <div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
        <div class="flex items-center">

          <button type="button"
                  @click="close"
                  class="pr-2 leading-normal text-center align-middle">
            <i class="text-blue-500 pi pi-angle-left"></i>
          </button>

          <h5 class="mb-0 dark:text-white/80">{{ model.title }}</h5>
        </div>

      </div>
      <div class="flex-auto px-6">
        <PulseLoader class="flex justify-center" v-if="props.loading" color="#825ee4"></PulseLoader>

        <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Announcement Information</p>

        <div class="flex flex-wrap -mx-3">
          <TextInput :disabled="props.disabled" label="Title"
                     v-model="model.title"></TextInput>
          <TextArea :disabled="props.disabled" class="md:w-full" label="Description"
                    v-model="model.description"></TextArea>
          <TextInput
              class="md:w-6/12"
              disabled label="Posted Date"
              v-model="date"></TextInput>

          <TextInput
              class="md:w-6/12"
              disabled label="Posted By"
              v-model="user"></TextInput>
        </div>

        <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

        <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Subject Information</p>
        <div class="flex flex-wrap -mx-3">
          <AppSelectInput
              label="Subject"
              :disabled="disabled"
              v-model="model.subjectId"
              :options="state.options">
          </AppSelectInput>
        </div>
        <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>