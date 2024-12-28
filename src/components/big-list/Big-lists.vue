<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
	selected: {},
});

const props = defineProps({
	editable: { type: Boolean, default: true },
	route: String,
	data: Array,
	header: [
		{
			name: String,
			field: String,
			size: Number,
		},
	],
});

const rowClass = () => {
	return "hover:bg-gray-200"; // Tailwind hover effect
};

const onRowSelect = (row) => {
	console.log(row);
	router.push(props.route + "/" + row.data.id);
};
</script>

<template>
	<div class="flex-none w-full max-w-full px-3">
		<div class="w-full flex-auto px-0 pt-0 pb-2">
			<DataTable v-model:selection="state.selected" @rowSelect="onRowSelect" :rowClass="rowClass" selectionMode="single" dataKey="id" class="px-4 py-3" table-style="width:100%" :value="data">
				<Column v-for="item in header" :style="{ width: `${item.width}%` }" :key="item.field" :field="item.field">
					<template #header>
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid font-bold text-left uppercase align-middle bg-transparent shadow-none dark:border-white/40 dark:text-white text-xxs tracking-none whitespace-nowrap text-slate-400 opacity-70"
						>
							<span>{{ item.name }}</span>
						</div>
					</template>

					<template #body="slotProps">
						<div class="-mx-0.5 border-b border-collapse border-b-solid py-2 align-middle bg-transparent dark:border-white/40 whitespace-nowrap shadow-transparent">
							<h6>{{ slotProps.data[item.field] }}</h6>
						</div>
					</template>
				</Column>

				<Column v-if="editable">
					<template #header>
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid font-bold text-left uppercase align-middle bg-transparent shadow-none dark:border-white/40 dark:text-white text-xxs tracking-none whitespace-nowrap text-slate-400 opacity-70"
						>
							<span>Action</span>
						</div>
					</template>

					<template #body>
						<div class="-mx-0.5 border-b border-collapse border-b-solid py-2.8 align-middle bg-transparent dark:border-white/40 whitespace-nowrap shadow-transparent">
							<h6 class="pi pi-search"></h6>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<style scoped>
:deep(table) {
	border-collapse: collapse;
	border-spacing: 0;
}
</style>
