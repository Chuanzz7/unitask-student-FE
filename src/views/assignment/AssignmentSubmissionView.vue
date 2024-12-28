<script setup>
import { onMounted, reactive } from "vue";
import { POSITION } from "vue-toastification";
import moment from "moment/moment.js";

import { apiClient, LIST_ASSESSMENT_SUBMISSION } from "@/api/index.js";

import pathnames from "@/router/pathnames.js";

import BigLists from "@/components/big-list/Big-lists.vue";

const state = reactive({
	listData: { isLoading: true, content: [] },
});

const tableHeader = [
	{ name: "Subject Code", field: "subjectCode", width: 20 },
	{ name: "Assignment", field: "assignmentName", width: 30 },
	{ name: "Group", field: "groupName", width: 30 },
	{ name: "Submission Date", field: "submissionDate", width: 15 },
];

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_ASSESSMENT_SUBMISSION, {
			params: {
				page: 1,
				pageSize: 999,
			}, // search: state.search,
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push({
				id: x.id,
				subjectCode: x.subjectCode,
				assignmentName: x.assignmentName,
				groupName: x.groupName == null ? "-" : x.groupName,
				submissionDate: moment(x?.submissionDate).format("DD/MM/yyyy HH:mmA"),
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

onMounted(() => {
	listingApi();
});
</script>

<template>
	<div class="relative w-full flex flex-col justify-items-center min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
			<h5 :class="`relative top-0.5 leading-normal pi pi-clone text-orange-500 pr-2`"></h5>
			<h5 class="mb-0 dark:text-white">Submissions</h5>
		</div>

		<BigLists :route="pathnames.AssignmentSubmissionView" :header="tableHeader" :data="state.listData.content"></BigLists>
	</div>
</template>

<style scoped></style>
