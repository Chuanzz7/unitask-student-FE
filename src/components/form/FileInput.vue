<script setup>
import { ref } from "vue";

const props = defineProps({
	uploadApi: String,
	label: String,
	disabled: Boolean,
});
const model = defineModel();
const selectedFile = ref(null);

const handleFileChange = (event) => {
	const file = event.target.files[0];
	if (file) {
		console.log(model.value);
		selectedFile.value = file;
		model.value.push({ fileName: file.name });

		//TODO upload api the file
	}
};

const openNewTab = (url) => {
	if (!url.includes("https://")) {
		url = `https://${url}`;
	}
	window.open(url, "_blank");
};


const deleteFile = (index) => {
	let deleteValue = model.value[index].id;
	model.value.splice(index, 1);
	//TODO delete api the file
};

</script>

<template>
	<div>
		<div class="w-full">
			<label class="w-full ml-1 text-left font-bold text-xs text-slate-700 dark:text-white/80">{{ props.label
				}}</label>
			<label v-if="!props.disabled"
				   class="font-semibold text-blue-500 px-3 py-3  border-0 rounded-lg transition-all ease-in cursor-pointer hover:shadow-xs hover:-translate-y-px active:opacity-85">
				<i class="text-lg pi pi-upload py-1 mr-3"></i>
				<span>Upload</span>
				<input class="hidden" type="file" @change="handleFileChange" />
			</label>
			<label class="w-full ml-1 my-2 text-left text-slate-700 dark:text-white/80">File Name</label>

			<div v-for="(file, index) in modelValue" :key="index"
				 class="flex flex-wrap px-1 mb-3 justify-between ">
				<button class="underline font-semibold text-blue-500" @click="openNewTab(file.url)">
					{{ file.fileName }}
				</button>
				<div v-if="!props.disabled">
					<button @click="deleteFile(index)">
						<i class="text-lg pi pi-trash mr-8"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>