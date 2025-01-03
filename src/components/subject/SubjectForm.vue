<script setup>

import { useRouter } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import TextInput from "@/components/form/TextInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import pathnames from "@/router/pathnames.js";
import { apiClient, ENROLL_SUBJECT } from "@/api/index.js";
import { POSITION, useToast } from "vue-toastification";

const router = useRouter();
const toast = useToast();
const props = defineProps({
	disabled: Boolean,
	loading: Boolean,
});
const model = defineModel();

const addAssessment = () => {
	model.value.assessment.push({ name: "", weightage: "" });
};

const removeAssessment = (index) => {
	model.value.assessment.splice(index, 1);
};

const close = () => {
	router.push(pathnames.SubjectView);
};

const enroll = async () => {
	model.value.status = "ACTIVE";
	try {
		let response = await apiClient.post(`${ENROLL_SUBJECT}${model.value.id}`);
		if (response.status === 200) {
			toast.success("Successfully Enrolled", { position: POSITION.TOP_CENTER });
		}
	} catch (error) {
		console.log(error);
	}
};


</script>
<template>
	<div
		class="relative flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<PulseLoader class="h-full w-full flex justify-center items-center" v-if="props.loading"
					 color="#825ee4"></PulseLoader>
		<div v-else>
			<div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
				<div class="flex items-center">
					<button type="button"
							@click="close"
							class="pr-2 leading-normal text-center align-middle">
						<i class="text-blue-500 pi pi-angle-left"></i>
					</button>
					<h5 class="mb-0 dark:text-white/80">{{ model.name }}</h5>
					<button v-if="props.disabled" type="button"
							:disabled="(model.status === 'ACTIVE')"
							@click="enroll"
							:class="[(model.status === 'ACTIVE')
								? 'bg-gray-400 disabled'
								: 'bg-blue-500 shadow-md cursor-pointer hover:shadow-xs hover:-translate-y-px'
								, 'inline-block px-8 py-2 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in  border-0 rounded-lg  text-xs tracking-tight-rem  active:opacity-85']">
						Enroll
					</button>
				</div>
			</div>
			<div class="flex-auto px-6">
				<PulseLoader class="flex justify-center" v-if="props.loading" color="#825ee4"></PulseLoader>
				<p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Subject Information</p>
				<div class="flex flex-wrap -mx-3">
					<TextInput :disabled="props.disabled" class="md:w-6/12" label="Subject Code"
							   v-model="model.code"></TextInput>
					<TextInput :disabled="props.disabled" class="md:w-6/12" label="Subject Name"
							   v-model="model.name"></TextInput>
					<TextInput :disabled="props.disabled" class="md:w-6/12" label="Course"
							   v-model="model.course"></TextInput>
					<TextInput :disabled="props.disabled" type="number" class="md:w-6/12" label="No. of Credit Hour"
							   v-model.number="model.creditHour"></TextInput>
					<TextArea :disabled="props.disabled" class="md:w-full" label="Description"
							  v-model="model.description"></TextArea>
					<TextArea :disabled="props.disabled" class="md:w-full" label="Learning Outcome"
							  v-model="model.learningOutcome"></TextArea>
				</div>
				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
				<p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Lecturer Information</p>
				<div class="flex flex-wrap -mx-3">
					<TextInput :disabled="props.disabled" class="md:w-6/12" v-model="model.lecturerName"
							   label="Name"></TextInput>
					<TextInput :disabled="props.disabled" class="md:w-6/12" v-model="model.lecturerContact"
							   label="Contact"></TextInput>
					<TextInput :disabled="props.disabled" class="md:w-6/12" v-model="model.lecturerEmail"
							   label="Email"></TextInput>
					<TextInput :disabled="props.disabled" class="md:w-6/12" v-model="model.lecturerOffice"
							   label="Office"></TextInput>
				</div>
				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
				<div class="w-full flex flex-row justify-between">
					<p class="flex leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Assessment Mode</p>
					<button v-if="!(props.disabled)" class="flex pr-14 font-semibold text-blue-500"
							@click="addAssessment() ">
						<i class=" text-lg pi pi-plus py-1 mr-1"></i>
						<span>Add</span>
					</button>
				</div>
				<div v-for="(assessment, index) in model.assessment" :key="index" class="flex flex-wrap -mx-3 -mb-3">
					<TextInput :disabled="props.disabled" v-model="assessment.name" class="md:w-8/12"
							   :label="'Assessment ' + (index+1) "></TextInput>
					<TextInput :disabled="props.disabled" v-model="assessment.weightage" class="md:w-3/12"
							   :label="'Weightage ' + (index+1)"></TextInput>
					<div v-if="!(props.disabled)" class="md:w-1/12 py-10 font-semibold text-blue-500 ">
						<button @click="removeAssessment(index)">
							<i class="text-lg pi pi-trash my-1 mr-1"></i>
							<span>Delete</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>