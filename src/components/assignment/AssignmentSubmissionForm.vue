<script setup>
import { useRouter } from "vue-router";

import pathnames from "@/router/pathnames.js";

import TextInput from "@/components/form/TextInput.vue";
import TextArea from "@/components/form/TextArea.vue";
import FileInput from "@/components/form/FileInput.vue";
import DateInput from "@/components/form/DateInput.vue";

const router = useRouter();
const props = defineProps({
	grade: Function,
	disabled: Boolean,
	loading: Boolean,
});

const model = defineModel();
const close = () => {
	router.push(pathnames.AssignmentSubmissionView);
};
</script>

<template>
	<div class="relative w-full flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div>
			<div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
				<div class="flex items-center">
					<button type="button" @click="close" class="pr-2 leading-normal text-center align-middle">
						<i class="text-blue-500 pi pi-angle-left"></i>
					</button>
					<h5 class="mb-0 dark:text-white/80">{{ model.name }}</h5>
				</div>
			</div>

			<div class="flex-auto px-6">
				<p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Submission Information</p>
				<div class="flex flex-wrap -mx-3">
					<TextInput disabled class="md:w-6/12" label="Group Name / Student Name" v-model="model.name"></TextInput>
					<DateInput disabled time class="md:w-6/12" label="Submission Date" v-model="model.submissionDate"></DateInput>
				</div>

				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

				<div class="w-full flex flex-row justify-between">
					<p class="flex leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Group Information</p>
				</div>
				<div v-for="(x, index) in model.groupMember" :key="index" class="flex flex-wrap -mx-3 -mb-3">
					<TextArea disabled v-model="x.name" class="md:w-8/12" :label="'Member Name ' + (index + 1)"></TextArea>
					<TextInput :disabled="props.disabled" v-model="x.score" class="md:w-3/12 h-full" :label="'Member score ' + (index + 1)"></TextInput>
					<Button v-if="!props.disabled" class="md:w-1/12 font-semibold text-blue-500" @click="grade(x)">
						<span class="w-full">Grade</span>
						<i class="pi pi-check px-2"></i>
					</Button>
				</div>

				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

				<p class="w-full leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Documents</p>
				<div class="flex flex-wrap justify-between">
					<div class="flex flex-col md:w-6/12">
						<FileInput :caseId="model.id" :upload-api="PUT_ASSESSMENT_FILE" :delete-api="DELETE_ASSESSMENT_FILE" disabled label="Submitted Document" v-model="model.attachedDocument"></FileInput>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
