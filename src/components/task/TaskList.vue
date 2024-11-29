<script setup>
import { defineProps, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

import router from "@/router/index.js";

import SearchBar from "@/components/SearchBar.vue";
import TaskListItem from "@/components/task/TaskListItem.vue";

const props = defineProps({
	title: String,
	module: String,
	content: [
		{
			id: Number,
			subjectName: String,
			subjectCode: String,
			projectName: String,
			totalTask: String,
		},
	],
});

const state = reactive({
	isLoaded: false,
	isActiveId: Number,
	search: String,
});

const route = useRoute();

onMounted(() => {
	state.isActiveId = Number(route.params.id);
	state.isLoaded = true;
});

const getId = (id) => {
	router.push({ name: props.module, params: { id: id } });
	state.isActiveId = id;
};

const filter = (value) => {
	state.search = value;
};
</script>

<template>
	<div class="h-full overflow-y-hidden pb-14 px-1 bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl">
		<div class="p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
			<div class="flex flex-wrap -mx-3">
				<div class="flex items-center flex-none w-1/2 max-w-full px-3">
					<h5 class="mb-0 dark:text-white">{{ title }}</h5>
				</div>
				<div class="flex-none w-1/2 max-w-full px-3 text-right">
					<SearchBar @search-input="filter"></SearchBar>
				</div>
			</div>
		</div>
		<div v-if="state.isLoaded" class="max-h-full overflow-y-auto break-words bg-clip-border">
			<TaskListItem v-for="content in props.content" @click="getId(content.id)" :key="content.id" :data="content" :isActive="content.id === state.isActiveId"></TaskListItem>
		</div>
	</div>
</template>

<style scoped></style>
