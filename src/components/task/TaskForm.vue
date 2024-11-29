<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import pathnames from "@/router/pathnames.js";

import taskEnums from "@/enums/taskEnums";

import TaskFormCol from "@/components/task/TaskFormCol.vue";

const route = useRoute();
const router = useRouter();

const id = ref(route.params.id);

const form = reactive({
	isLoaded: false,
	id: 0,
	contents: [
		{
			name: taskEnums.BACKLOG,
			tickets: [
				{
					id: 1,
					title: "Model Answer",
					ticketNumber: "001",
					storyPoints: 3,
					assignee: "Assignee A, Assignee B",
				},
				{
					id: 2,
					title: "Create calendar, chat and email app pages",
					ticketNumber: "002",
					storyPoints: 1,
					assignee: "Assignee B",
				},
			],
		},
		{
			name: taskEnums.TO_DO,
			tickets: [
				{
					id: 3,
					title: "Model Answer",
					ticketNumber: "003",
					storyPoints: 1,
					assignee: "Assignee A, Assignee B",
				},
				{
					id: 4,
					title: "Add authentication pages",
					ticketNumber: "004",
					storyPoints: 1,
					assignee: "Assignee B",
				},
			],
		},
		{ name: taskEnums.IN_PROCESS, tickets: [] },
		{ name: taskEnums.DONE, tickets: [] },
	],
});

const handleClose = () => {
	router.push(pathnames.Task);
};

const getTaskDetails = async () => {};

onMounted(() => {
	getTaskDetails();
	form.isLoaded = true;
});
</script>

<template>
	<div class="relative h-full flex-wrap overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
			<div class="flex items-center">
				<button type="button" @click="handleClose" class="pr-2 leading-normal text-center align-middle">
					<i class="text-blue-500 pi pi-angle-left"></i>
				</button>
			</div>

			<div v-if="form.isLoaded" class="flex flex-wrap items-start justify-center gap-2 mt-10">
				<TaskFormCol v-for="content in form.contents" :key="content.id" :data="content"></TaskFormCol>
			</div>
		</div>
	</div>
</template>
