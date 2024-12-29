<script setup>


import AppSelectInput from "@/components/form/AppSelectInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import {onMounted, reactive, watch} from "vue";
import {apiClient, LIST_ASSESSMENT} from "@/api/index.js";
import {POSITION, useToast} from "vue-toastification";
import {GET_MEMBER} from "@/api/group.js";
import {ADD_TASK} from "@/api/task.js";

const toast = useToast()
const props = defineProps({
  active: {default: false},
  group: {default: "INDIVIDUAL"}
})

const data = reactive({
  task: "",
  assignmentId: null,
  memberId: null,
  assignmentOption: [],
  memberOption: []
})

const model = defineModel()

const addTask = async () => {

  try {
    const payload = {
      name: data.task,
      assignmentId: data.assignmentId,
      assignedId: data.memberId,
    }
    const response = await apiClient.post(ADD_TASK, payload);
    model.value.push({
      id: response.data.id,
      task: response.data.name,
      assignmentName: response.data.assessmentName,
      assignedName: response.data.userName,
    });

  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }

  data.task = ""
  data.assignmentId = null
  data.memberId = null
}

const assignmentApi = async () => {
  // call listing api
  try {
    const response = await apiClient.get(LIST_ASSESSMENT, {
      params: {
        page: 1,
        pageSize: 999,
        search: ""
      },
    });
    data.assignmentOption = [];
    response.data.content.map((x) => {
      data.assignmentOption.push({
        value: x.id,
        label: x.name,
      });
    });
  } catch (error) {
    console.log(error);
    toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
  }
};

const memberApi = async (newId) => {
  data.memberOption = []
  if (newId != null && props.group === 'GROUP') {
    try {
      const response = await apiClient.get(GET_MEMBER(newId));
      response.data.map((x) => {
        data.memberOption.push({
          value: x.id,
          label: x.name,
        });
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong", {position: POSITION.TOP_CENTER});
    }
  }
}

onMounted(() => {
  assignmentApi();
})

watch(
    () => data.assignmentId,
    (newId) => {
      memberApi(newId);
    },
    {immediate: true}
);

</script>

<template>
  <div class="flex items-center  p-4 bg-gray-50 border border-gray-50 rounded-lg shadow-sm">
    <div v-if="!active" class="flex">
      <i class="flex pt-0.5 items-center justify-center text-xl leading-none pi pi-plus-circle mr-3 "></i>
      <!-- Text -->
      <div class="text-gray-600 text-sm">
        Add a task
      </div>
    </div>

    <div v-else-if="group === 'GROUP'" class="flex flex-row w-full">
      <i class="flex md:w-[2%] mt-10 pt-0.5 align-middle items-center justify-center text-xl leading-none pi pi-circle "></i>
      <TextArea v-model="data.task" class="md:w-[50%]" label="Task"></TextArea>
      <AppSelectInput v-model="data.assignmentId" :options="data.assignmentOption" class="md:w-[23%]"
                      label="Assignment"></AppSelectInput>
      <AppSelectInput v-model="data.memberId" class="md:w-[23%]" :options="data.memberOption"
                      label="Assigned"></AppSelectInput>
      <button class="flex md:w-[2%] mt-10 font-semibold text-blue-500" @click="addTask" @keyup.enter="addTask">
        <span>Add</span>
      </button>
    </div>

    <div v-else class="flex flex-row w-full">
      <i class="flex md:w-[2%] mt-10 pt-0.5 align-middle items-center justify-center text-xl leading-none pi pi-circle "></i>
      <TextArea v-model="data.task" class="md:w-[73%]" label="Task"></TextArea>
      <AppSelectInput class="md:w-[23%]" v-model="data.assignmentId" :options="data.assignmentOption"
                      label="Assignment (Optional)"></AppSelectInput>
      <button class="flex md:w-[2%] mt-10 font-semibold text-blue-500" @click="addTask" @keyup.enter="addTask">
        <span>Add</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>