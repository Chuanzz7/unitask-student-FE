<script setup>

import { apiClient } from "@/api/index.js";
import { LIST_DOCUMENT } from "@/api/document.js";
import { POSITION } from "vue-toastification";
import { onMounted, reactive } from "vue";
import pathnames from "@/router/pathnames.js";
import DocumentList from "@/components/document/DocumentList.vue";
import TextInput from "@/components/form/TextInput.vue";

const tableHeaders = [{
	name: "Document Name",
	field: "name",
	width: 20,
}, {
	name: "Assessment Name",
	field: "assessmentName",
	width: 20,
}, {
	name: "Subject Name",
	field: "subjectName",
	width: 20,
},
];

const state = reactive({
	listData: { isLoading: true, content: [] },
	search: "",
	assessmentName: "",
	subjectName: "",
	beforeSubmissionDate: "",
	afterSubmissionDate: "",
	id: "",
});

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_DOCUMENT, {
			params: {
				page: 1,
				pageSize: 10,
				search: state.search,
				assessmentName: state.assessmentName,
				subjectName: state.subjectName,
				beforeSubmissionDate: state.beforeSubmissionDate ? new Date(state.beforeSubmissionDate).toISOString() : null,
				afterSubmissionDate: state.afterSubmissionDate ? new Date(state.afterSubmissionDate).toISOString() : null,
			},
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push({
				id: x.id,
				name: x.name,
				assessmentName: x.assessmentName,
				subjectName: x.subjectName,
				submissionDate: x.submissionDate,
				uuid: x.uuid,
				path: x.path,
				fileName: x.fileName,
			});
		});

	} catch (error) {
		console.log(error);
		toast.error("Something went wrong", { position: POSITION.TOP_CENTER });
	}
};

onMounted(() => {
	listingApi();
});

</script>

<template>
	<div
		class="relative flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent"><h5
			:class="`relative top-0.5 leading-normal pi pi-folder text-red-600 pr-2`"></h5> <h5
			class="mb-0 dark:text-white">Document</h5></div>
		<div class="mx-5 my-5 border-4 border-blue-500 rounded-xl py-6 px-6">
			<h6 class="mb-2 text-lg dark:text-white">Advanced Search</h6>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
				<TextInput label="Document Name" v-model="state.search"></TextInput>
				<TextInput label="Assignment Name" v-model="state.assessmentName"></TextInput>
				<TextInput label="Subject Name" v-model="state.subjectName"></TextInput>
			</div>
			<div class="mt-6 flex justify-center">
				<button @click="listingApi" class="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
			</div>
		</div>


		<DocumentList :route="pathnames.Document" :header="tableHeaders" :data="state.listData.content"
					  :editable="false" :downloadable="true">
		</DocumentList>
	</div>
</template>
