<script setup>

import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
	editable: Boolean,
	data: {
		id: Number,
		title: String,
		description: String,
		code: String,
		status: String,
	},
	isActive: Boolean,
	updatePage: String,
	detailsPage: String,
});

const routeToDetails = () => {
	router.push({ name: props.detailsPage, params: { id: props.data.id } });
};

</script>

<template>
	<div :class="[isActive
  ? 'bg-gray-200'
  : ''
  ,'flex-auto m-3 px-4 hover:bg-gray-200 rounded-lg']">
		<ul class="flex flex-col pl-0 mb-0 rounded-lg">
			<li class="relative flex justify-between px-2 py-2 pl-0  border-0 rounded-t-inherit text-inherit rounded-xl">
				<div class="w-full flex justify-between" @click="routeToDetails">
					<div class="w-[90%] truncate flex flex-col">
						<h6 class="truncate mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
							{{ data.title }}
						</h6>
						<span class="truncate text-xs leading-tight dark:text-white dark:opacity-80">
							{{ data.description }}
						</span>
					</div>
					<div
						class="flex text-center align-middle items-center text-sm leading-normal  transition-all bg-transparent border-0 ease-in bg-150 rounded-lg shadow-none dark:text-white/80">
					  	<span class="dark:text-white  ml-6 font-bold  uppercase
						  text-sm active:opacity-85 tracking-tight-rem bg-x-25 text-slate-700">
							{{ data.code }}
					 	 </span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>

</style>