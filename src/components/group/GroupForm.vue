<script setup>

import { useRouter } from "vue-router";
import TextInput from "@/components/form/TextInput.vue";
import pathnames from "@/router/pathnames.js";
import AppSelectInput from "@/components/form/AppSelectInput.vue";
import ToggleInput from "@/components/form/ToggleInput.vue";
import TextArea from "@/components/form/TextArea.vue";

const router = useRouter();
const props = defineProps({
	grade: Function,
	disabled: Boolean,
	loading: Boolean,
	create: Boolean,
});

const option = defineModel("option");
const data = defineModel("data");

const close = () => {
	router.push(pathnames.Group);
};

const addMember = () => {
	data.value.groupMembers.push({});
};

const removeMember = (index) => {
	data.value.groupMembers.splice(index, 1);
};

</script>
<template>
	<div
		class="relative w-full flex-wrap pb-5 overflow-y-auto break-words bg-white border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div>
			<div class="mb-4 border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
				<div class="flex items-center">
					<button type="button"
							@click="close"
							class="pr-2 leading-normal text-center align-middle">
						<i class="text-blue-500 pi pi-angle-left"></i>
					</button>
					<h5 class="mb-0 dark:text-white/80">{{ data.name }}</h5>
				</div>
			</div>

			<div class="flex-auto px-6">
				<p class="leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Group Information</p>
				<div class="flex flex-wrap -mx-3">
					<TextInput :disabled="disabled" class="md:w-6/12" label="Group Name"
							   v-model="data.name"></TextInput>
					<ToggleInput :disabled="disabled" class="md:w-6/12" label="Open For Public"
								 v-model="data.openForPublic"></ToggleInput>
					<TextArea :disabled="disabled" class="md:w-full" label="Description"
							  v-model="data.description"></TextArea>
					<TextInput disabled class="md:w-6/12" label="Assignment Name"
							   v-model="data.assessment.name"></TextInput>
					<TextInput disabled type="number" class="md:w-6/12" label="Max Members"
							   v-model="data.assessment.maxMember"></TextInput>
					<TextInput disabled class="md:w-6/12" label="Subject Name"
							   v-model="data.assessment.subject.code"></TextInput>
					<TextInput disabled class="md:w-6/12" label="Subject Code"
							   v-model="data.assessment.subject.name"></TextInput>
				</div>

				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

				<div>
					<div class="w-full flex flex-row justify-between">
						<p class="flex leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Group
							Member</p>
						<button v-if="!(disabled)" class="flex pr-14 font-semibold text-blue-500"
								@click="addMember() ">
							<i class=" text-lg pi pi-plus py-1 mr-1"></i>
							<span>Add</span>
						</button>
					</div>
					<div v-for="(x, index) in data.groupMembers" :key="index"
						 class="flex flex-wrap -mx-3 -mb-3 justify-between">
						<AppSelectInput :disabled="disabled" v-model="x.id" class="md:w-8/12"
										:options="option"
										:label="'Member ' + (index+1) "></AppSelectInput>
						<div class="flex justify-end md:w-2/12 py-10 mr-14 font-semibold text-blue-500 ">
							<button v-if="!(disabled)" @click="removeMember(index)">
								<i class="text-lg pi pi-trash my-1 mr-1"></i>
								<span>Delete</span>
							</button>
						</div>
					</div>
				</div>

				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
				<p class="flex leading-normal uppercase dark:text-white dark:opacity-60 text-sm">Group Lock ( By
					Lecturer )</p>

				<div class="flex flex-wrap -mx-3">
					<ToggleInput disabled class="md:w-6/12" label="Locked" v-model="data.locked"></ToggleInput>
				</div>

				<hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />

			</div>
		</div>
	</div>
</template>

<style scoped>
</style>