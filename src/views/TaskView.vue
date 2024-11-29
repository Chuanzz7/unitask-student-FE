<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import TaskList from "@/components/task/TaskList.vue";
import TaskForm from "@/components/task/TaskForm.vue";

const route = useRoute();
const currentValue = computed(() => route.params.id);

const state = reactive({
	listData: [],
	selectedValue: 0,
});

const listingApi = () => {
	// if (error.response.status === 401) {
	//   toast.error("Bad Credential", {position: "top-center"});
	// } else {
	//   toast.error("Something Wrong", {position: "top-center"});
	// }

	let data = [
		{
			id: 1,
			subjectName: "Software Testing",
			subjectCode: "SWE3033",
			projectName: "Assignment 1",
			totalTask: 4,
		},
		{
			id: 2,
			subjectName: "Test2",
			subjectCode: "456",
			projectName: "Assignment 2",
			totalTask: 5,
		},
	];

	data.map((x) => {
		state.listData.push(x);
	});
};

onMounted(() => {
	listingApi();
});
</script>

<template>
	<div class="h-full flex flex-wrap max-w-full pb-4 transition-flex">
		<TaskList class="h-full flex-grow mx-3 mb-3 min-w-[20%] basis-[20%]" title="Task" module="taskDetails" :content="state.listData"></TaskList>
		<TaskForm class="h-full flex-grow mx-3 mb-3 basis-[70%]" v-if="currentValue != null" v-model="currentValue"></TaskForm>
	</div>
</template>
