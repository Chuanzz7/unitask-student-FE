<script setup>
const props = defineProps({
	data: {
		id: Number,
		subjectName: String,
		subjectCode: String,
		projectName: String,
		totalTask: String,
	},
	isActive: Boolean,
});
</script>

<template>
	<div :class="[isActive ? 'bg-gray-200' : '', 'flex-auto m-3 py-1 px-4 hover:bg-gray-200 rounded-lg']">
		<ul class="flex flex-col pl-0 mb-0 rounded-lg">
			<li class="relative flex justify-between px-4 py-2 pl-0 mb-2 border-0 rounded-t-inherit text-inherit rounded-xl">
				<div class="flex flex-col">
					<h5 class="mb-1 text-sm font-semibold leading-normal dark:text-white text-slate-700">
						{{ data.subjectName }}
					</h5>
					<h6 class="mb-1 text-sm leading-normal dark:text-white text-slate-500">
						{{ data.projectName }}
					</h6>
					<span class="text-xs leading-tight dark:text-white dark:opacity-80">Total Task: {{ data.totalTask }}</span>
				</div>
				<div class="flex items-center text-sm leading-normal dark:text-white/80">
					<button
						class="dark:text-white inline-block px-0 py-2.5 mb-0 ml-6 font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-in bg-150 text-sm active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25 text-slate-700"
					>
						{{ data.subjectCode }}
					</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
