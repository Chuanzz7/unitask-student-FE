<script setup>

import { onMounted, reactive, ref } from "vue";
import { POSITION, useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import GroupForm from "@/components/group/GroupForm.vue";
import { apiClient, JOIN_GROUP } from "@/api/index.js";
import { GET_GROUP, GET_STUDENT_ASSESSMENT } from "@/api/group.js";
import AppButton from "@/components/AppButton.vue";
import pathnames from "@/router/pathnames.js";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const formData = reactive({
	option: [],
	data: {
		id: 0,
		name: "",
		description: "",
		openForPublic: false,
		locked: false,
		assessment: {
			subject: {},
		},
		groupMembers: [{}],
	},
});

const readApi = async (id) => {
	if (id != null) {
		try {
			const response = await apiClient.get(`${GET_GROUP(id)}`);
			console.log(response);
			if (response.status === 200) {
				formData.data = response.data;
				await studentOption(formData.data.assessment.id);
			}
		} catch (error) {
			console.log(error)
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	}
};

const studentOption = async (id) => {
	try {
		const response = await apiClient.get(`${GET_STUDENT_ASSESSMENT(id)}`);
		isLoading.value = false;
		let data = response.data;
		data.forEach(x => formData.option.push({
			value: x.id,
			label: x.name,
		}));
	} catch (error) {
		console.log(error)
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

const join = async () => {
	try {
		const response = await apiClient.post(`${JOIN_GROUP(formData.data.id)}`);
		if (response.status === 200) {
			toast.success("Successfully joined", { position: POSITION.TOP_CENTER });
			router.push(pathnames.Group);
		}
	} catch (error) {
		console.error(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};


onMounted(() => {
	readApi(route.params.id);
});

</script>


<template>
	<div class="flex-col w-full justify-items-center">
		<GroupForm disabled
				   :loading="isLoading"
				   v-model:data="formData.data"
				   v-model:option="formData.option"></GroupForm>
		<AppButton @click="join" class="mb-5">Join</AppButton>

	</div>
</template>

<style scoped>

</style>