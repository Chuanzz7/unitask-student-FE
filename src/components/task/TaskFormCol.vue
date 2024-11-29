<script setup>
import { defineProps } from "vue";

import taskEnums from "@/enums/taskEnums";

import TaskFormItem from "@/components/task/TaskFormItem.vue";

const props = defineProps({
	data: {
		name: String,
		tickets: [
			{
				id: Number,
				title: String,
				ticketNumber: String,
				storyPoints: Number,
				assignee: String,
			},
		],
	},
});

const renderStatusName = (status) => {
	switch (status) {
		case taskEnums.BACKLOG:
			return "Backlog Tasks";

		case taskEnums.IN_PROCESS:
			return "In Progress";

		case taskEnums.DONE:
			return "Done";

		default:
			return "To Do Tasks";
	}
};

const addTask = (status) => {
	console.log("add", status);
};

const startDrag = (event, item) => {
	console.log(item);
	event.dataTransfer.dropEffect = "move";
	event.dataTransfer.effectAllowed = "move";
	event.dataTransfer.setData("itemID", item.id);
};

const onDrop = (event, status) => {
	const itemID = event.dataTransfer.getData("itemID");
	console.log(itemID, status, "Item");
	// TODO: Call update api
};
</script>

<template>
	<div class="flex flex-col basis-[24%]" @drop="onDrop($event, props.data.name)" @dragenter.prevent @dragover.prevent>
		<div class="flex items-center mb-5">
			<h5 class="mr-3 my-0">{{ renderStatusName(props.data.name) }}</h5>

			<span class="flex w-[32px] h-[32px] items-center justify-center bg-yellow-200 rounded-2xl text-yellow-600">{{ props.data.tickets.length }}</span>
		</div>

		<div class="flex flex-col gap-5">
			<div v-if="props.data.tickets.length > 0" class="flex flex-col gap-5">
				<TaskFormItem v-for="ticket in props.data.tickets" :key="ticket.id" :data="ticket" draggable="true" @dragstart="startDrag($event, ticket)"></TaskFormItem>
			</div>

			<div @click="addTask(props.data.name)" class="flex items-center justify-center h-[30px] w-[90%] cursor-pointer rounded-2 shadow-slate-200 border border-solid border-gray-100">
				<img src="@/assets/img/add-icon.svg" alt="add" />
			</div>
		</div>
	</div>
</template>
