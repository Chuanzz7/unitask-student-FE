<script setup>

import {useRouter} from "vue-router";
import TextInput from "@/components/form/TextInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import pathnames from "@/router/pathnames.js";
import FileInput from "@/components/form/FileInput.vue";

const router = useRouter();
const props = defineProps({
  disabled: Boolean,
  isLecturer: Boolean,
  loading: Boolean,
})
const model = defineModel({})

const addCriteria = () => {
  if( model.value.markingRubric == null){
    model.value.markingRubric = []
  }
  model.value.markingRubric.push({criteriaName: "", criteriaWeightage: ""})
}

const removeCriteria = (index) => {
  model.value.markingRubric.splice(index, 1);
}

const close = () => {
  router.push(pathnames.AssignmentView);
}

</script>
<template>
  <div
      class="relative flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
    <!--    <PulseLoader class="h-full w-full flex justify-center items-center" v-if="props.loading" color="#825ee4"></PulseLoader>-->
    <div>
      <div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
        <div class="flex items-center">
          <button type="button"
                  @click="close"
                  class="pr-2 leading-normal text-center align-middle">
            <i class="text-blue-500 pi pi-angle-left"></i>
          </button>
          <h5 class="mb-0 dark:text-white/80">{{ model.assessmentName }}</h5>
          <button v-if="!isLecturer" type="button"
                  class="inline-block px-8 py-2  ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">
            Submit
          </button>
        </div>
      </div>

      <div class="flex-auto px-6">
        <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Assignment Information</p>
        <div class="flex flex-wrap -mx-3">
          <TextInput :disabled="props.disabled" class="md:w-6/12" label="Assignment Name"
                     v-model="model.assessmentName"></TextInput>
          <TextInput :disabled="props.disabled" class="md:w-6/12" label="Weightage"
                     v-model="model.assessmentWeightage"></TextInput>
          <TextInput disabled class="md:w-6/12" label="Subject Name"
                     v-model="model.subjectName"></TextInput>
          <TextInput disabled class="md:w-6/12" label="Subject Code"
                     v-model="model.subjectCode"></TextInput>
          <TextInput :disabled="props.disabled" class="md:w-6/12" label="Assignment Mode"
                     v-model="model.assessmentMode"></TextInput>
          <TextInput :disabled="props.disabled" class="md:w-6/12" label="Due Date"
                     v-model="model.dueDate"></TextInput>
          <TextArea :disabled="props.disabled" class="md:w-full" label="Lecturer Instruction"
                    v-model="model.lecturerInstruction"></TextArea>
        </div>

        <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>

        <div>
          <div class="w-full flex flex-row justify-between">
            <p class="flex leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Marking Rubric</p>
            <button v-if="!(props.disabled)" class="flex pr-14 font-semibold text-blue-500" @click="addCriteria() ">
              <i class=" text-lg pi pi-plus py-1 mr-1"></i>
              <span>Add</span>
            </button>
          </div>
          <div v-for="(x, index) in model.markingRubric" :key="index" class="flex flex-wrap -mx-3 -mb-3">
            <TextArea :disabled="props.disabled" v-model="x.criteriaName" class="md:w-8/12"
                      :label="'Criteria ' + (index+1) "></TextArea>
            <TextInput :disabled="props.disabled" v-model="x.criteriaWeightage" class="md:w-3/12 h-full"
                      :label="'Weightage ' + (index+1)"></TextInput>
            <div v-if="!(props.disabled)" class="md:w-1/12 py-10 font-semibold text-blue-500 ">
              <button @click="removeCriteria(index)">
                <i class="text-lg pi pi-trash my-1 mr-1"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent "/>
        <p class="w-full leading-normal uppercase dark:text-white dark:opacity-60 text-sm ">Documents</p>
        <div class="flex flex-wrap justify-between">
          <div class="flex flex-col md:w-6/12">
            <FileInput :is-lecturer="props.isLecturer" :disabled="disabled"
                       label="Attached Document" v-model="model.attachedDocument"></FileInput>
          </div>
          <div v-if="!props.isLecturer" class="flex flex-col md:w-6/12">
            <FileInput :is-lecturer="props.isLecturer" :disabled="props.isLecturer"
                       label="Uploaded Document" v-model="model.uploadedDocument" ></FileInput>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>