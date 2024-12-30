<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { reactive } from "vue";
import { apiClient } from "@/api/index.js";
import { DOWNLOAD_DOCUMENT } from "@/api/document.js";
import { POSITION } from "vue-toastification";

const state = reactive({
	selected: {},
});

const props = defineProps({
	downloadable: { type: Boolean, default: false },
	route: String,
	data: Array,
	header: [{
		name: String,
		field: String,
		size: Number,
	}],
});

const rowClass = () => {
	return "hover:bg-gray-200";  // Tailwind hover effect
};

const download = async (id, name) => {
	try {
		const response = await apiClient.get(DOWNLOAD_DOCUMENT(id), { responseType: "blob" });
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", name);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} catch (error) {
		console.log(error);
		toast.error("Something went wrong", { position: POSITION.TOP_CENTER });
	}
};


const onButtonSelect = (row) => {
	console.log("Download clicked for row:", row);
	download(row.id, row.name);
};

</script>

<template>
	<div class="flex-none w-full max-w-full px-3">
		<div class="w-full flex-auto px-0 pt-0 pb-2">
			<DataTable v-model:selection="state.selected" :rowClass="rowClass" selectionMode="single" dataKey="id"
					   class="px-4 py-3" table-style="width:100%" :value="data">
				<Column v-for="item in header" :style="{ flexGrow: 1 }" :key="item.field"
						:field="item.field">
					<template #header>
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid font-bold text-left uppercase align-middle bg-transparent shadow-none dark:border-white/40 dark:text-white text-xxs tracking-none whitespace-nowrap text-slate-400 opacity-70">
							<span>{{ item.name }}</span></div>
					</template>
					<template #body="slotProps">
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid py-2 align-middle bg-transparent dark:border-white/40 whitespace-nowrap shadow-transparent">
							<h6>{{ slotProps.data[item.field] }}</h6></div>
					</template>
				</Column>
				<Column v-if="downloadable">
					<template #header>
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid font-bold text-left uppercase align-middle bg-transparent shadow-none dark:border-white/40 dark:text-white text-xxs tracking-none whitespace-nowrap text-slate-400 opacity-70">
							<span>Download</span></div>
					</template>
					<template #body="slotProps">
						<div
							class="-mx-0.5 border-b border-collapse border-b-solid py-2.8 align-middle bg-transparent dark:border-white/40 whitespace-nowrap shadow-transparent">
							<h6 class="pi pi-download cursor-pointer" @click="onButtonSelect(slotProps.data)"></h6>
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>
<style scoped> :deep(table) {
	border-collapse: collapse;
	border-spacing: 0;
	table-layout: auto; /* Let the browser decide the best layout */
	width: 100%;
} </style>