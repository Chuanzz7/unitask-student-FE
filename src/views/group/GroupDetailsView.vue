<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { POSITION, useToast } from "vue-toastification";

import { apiClient, GET_GROUP } from "@/api/index.js";

import GroupForm from "@/components/group/GroupForm.vue";

const toast = useToast();
const route = useRoute();
const isLoading = ref(true);

const formData = reactive({
	option: [],
	data: {
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
			isLoading.value = false;
			formData.data = response.data;
		} catch (error) {
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	}
};

const studentOption = async (id) => {
	try {
	} catch (error) {}
};

onMounted(() => {
	readApi(route.params.id);
});
</script>

<template>
	<div class="h-screen_content px-6">
		<!-- <GroupForm disabled="" class="my-5" :loading="isLoading" v-model="formData.data"></GroupForm> -->
	</div>
</template>

<style scoped></style>
