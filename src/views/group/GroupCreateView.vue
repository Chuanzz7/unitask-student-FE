<script setup>

import { reactive, ref, watch } from "vue";
import { POSITION, useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import { apiClient, CREATE_CROUP, GET_STUDENT_ASSESSMENT } from "@/api/index.js";
import pathnames from "@/router/pathnames.js";
import AppButton from "@/components/AppButton.vue";
import GroupCreateForm from "@/components/group/GroupCreateForm.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const formData = reactive({
	option: [],
	data: {
		name: "",
		description: "",
		openForPublic: false,
		locked: false,
		assessmentId: null,
		groupMembers: [{}],
		maxMember: null,
		subjectName: null,
		subjectCode: null,
	},
});

const studentOption = async (id) => {
	if (id != null) {
		try {
			const response = await apiClient.get(`${GET_STUDENT_ASSESSMENT(id)}`);
			isLoading.value = false;
			formData.option = [];
			let data = response.data;
			data.forEach(x => formData.option.push({
				value: x.id,
				label: x.name,
			}));
		} catch (error) {
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	}
};

const create = async () => {
	try {
		let payload = {
			name: formData.data.name,
			description: formData.data.description,
			openForPublic: formData.data.openForPublic,
			assessmentId: formData.data.assessmentId,
			members: [],
		};
		formData.data.groupMembers.forEach(x => payload.members.push(x.id));
		console.log(payload);
		await apiClient.post(CREATE_CROUP, payload);
		router.push(pathnames.Group);
		toast.success("Created Successfully", { position: POSITION.TOP_CENTER });
	} catch (error) {
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

watch(
	() => formData.data.assessmentId,
	(newId) => {

		studentOption(newId);
	},
	{ immediate: true }, // Trigger on initial mount
);

</script>


<template>
	<div class="flex-col w-full justify-items-center">
		<GroupCreateForm
			:loading="isLoading"
			v-model:data="formData.data"
			v-model:option="formData.option"></GroupCreateForm>
		<AppButton @click="create" class="mb-5">Create</AppButton>

	</div>
</template>

<style scoped>

</style>