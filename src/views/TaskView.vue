<script setup>
import { reactive, ref, watch } from "vue";
import { OnClickOutside } from "@vueuse/components";
import SmallHorizontalNav from "@/components/SmallHorizontalNav.vue";
import AddTask from "@/components/task/AddTask.vue";
import Task from "@/components/task/Task.vue";
import { apiClient } from "@/api/index.js";
import { CHECK_TASK, LIST_GROUP_TASK, LIST_TASK, UNCHECK_TASK } from "@/api/task.js";

const active = ref(false);
const state = reactive({
	activeTab: "INDIVIDUAL",
	todoTask: [],
	completedTask: [],
});
const tabs = [{ value: "INDIVIDUAL", label: "My Tasks" }, { value: "GROUP", label: "Group Tasks" }];

const checkTask = async (index, id) => {
	const response = await apiClient.post(CHECK_TASK(id));
	state.completedTask.push(state.todoTask[index]);
	state.todoTask.splice(index, 1);
};

const uncheckTask = async (index, id) => {
	const response = await apiClient.post(UNCHECK_TASK(id));
	state.todoTask.push(state.completedTask[index]);
	state.completedTask.splice(index, 1);
};

const listing = async (check) => {
	const api = state.activeTab === "GROUP" ? LIST_GROUP_TASK : LIST_TASK;
	const response = await apiClient.get(api, {
		params: { checked: false },
	});
	state.todoTask = [];
	response.data.map((x) => {
		state.todoTask.push(
			{
				id: x.id,
				task: x.name,
				assignmentName: x.assessmentName,
				assignedName: x.userName,
			});
	});

	const response2 = await apiClient.get(api, {
		params: { checked: true },
	});
	state.completedTask = [];
	response2.data.map((x) => {
		state.completedTask.push(
			{
				id: x.id,
				task: x.name,
				assignmentName: x.assessmentName,
				assignedName: x.userName,
			});
	});
};

watch(
	() => state.activeTab,
	(newId) => {
		listing();
	},
	{ immediate: true },
);

</script>

<template>

	<div class="flex-col w-full justify-items-center">
		<div
			class="relative w-full flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
			<div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
				<h5 :class="`relative top-0.5 leading-normal pi pi-list-check text-cyan-500 pr-2`"></h5>
				<h5 class="mb-0 dark:text-white">Tasks</h5>
			</div>
			<SmallHorizontalNav :tabs="tabs" v-model="state.activeTab" class="my-5"></SmallHorizontalNav>

			<h6 class="mx-5 mb-1">To Do</h6>
			<OnClickOutside
				:options="{ignore:['.p-dropdown-panel']}"
				@click="active=true"
				@trigger="active=false">
				<AddTask v-model="state.todoTask" :group="state.activeTab" :active="active" class="mx-5 mb-5"></AddTask>
			</OnClickOutside>
			<Task v-for="(task,index) in state.todoTask"
				  @click="checkTask(index,task.id)"
				  :data="task"
				  :group="state.activeTab"
				  class="mx-5 mb-1"></Task>

			<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

			<h6 class="mx-5">Completed</h6>
			<Task v-for="(task,index) in state.completedTask"
				  @click="uncheckTask(index,task.id)"
				  check
				  :data="task"
				  :group="state.activeTab" class="mx-5 mb-1"></Task>

		</div>
	</div>
</template>
