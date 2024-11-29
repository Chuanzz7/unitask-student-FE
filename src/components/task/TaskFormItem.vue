<script setup>
import { defineProps } from "vue";

const props = defineProps({
	data: {
		id: Number,
		title: String,
		ticketNumber: String,
		storyPoints: Number,
		assignee: String,
	},
});

const assigneeArr = props.data.assignee?.split(", ");

const formatName = (name) => {
	const splitName = name?.split(" ");

	if (splitName.length === 1) {
		return splitName[0].charAt(0).toUpperCase();
	} else {
		return `${splitName[0].charAt(0).toUpperCase()}${splitName[splitName.length - 1].charAt(0).toUpperCase()}`;
	}
};
</script>

<template>
	<div class="flex flex-col p-5 w-[90%] gap-3 cursor-pointer rounded-2 shadow-slate-200 border border-solid border-gray-100">
		<div class="flex justify-between">
			<h6 class="font-semibold m-0">{{ props.data.title }}</h6>

			<span class="text-blue-600 font-extrabold ml-5">{{ props.data.storyPoints }}</span>
		</div>

		<div class="flex">
			<span class="px-4 py-1 bg-blue-100 text-blue-600 font-extrabold rounded-6">{{ props.data.ticketNumber }}</span>
		</div>

		<div class="flex" v-if="props.data.assignee">
			<span
				class="flex items-center justify-center px-2.2 py-1.5 mr-2 rounded-6 bg-slate-100 font-extrabold text-slate-600 [&:not(:first-child)]:ml-[-18px] border-2 border-white"
				v-for="(assignee, index) in assigneeArr"
				:key="index"
				>{{ formatName(assignee) }}</span
			>
		</div>
	</div>
</template>
