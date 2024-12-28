<script setup>
import SmallLists from "@/components/small-list/Small-lists.vue";
import { onMounted, reactive } from "vue";
import { apiClient, LIST_ANNOUNCEMENT } from "@/api/index.js";
import { POSITION, useToast } from "vue-toastification";
import moment from "moment/moment.js";

const toast = useToast();

const state = reactive({
	search: "",
	listData: { isLoading: true, content: [] },
});

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_ANNOUNCEMENT, {
			params: {
				page: 1,
				pageSize: 999,
				search: state.search,
			},
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push({
				id: x.id,
				title: x.title,
				code: x.postedDate == null ? "" : moment(x.postedDate).format("DD/MM/yyyy"),
				description: x.description,
				color: x.color,
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

onMounted(() => {
	listingApi();
});
</script>

<template>
	<div class="h-full flex flex-wrap max-w-full pb-4">
		<SmallLists
			class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]"
			title-icon="text-blue-500 pi-bell"
			title="Announcement"
			v-model="state.search"
			:search="listingApi"
			:content="state.listData.content"
			:loading="state.listData.isLoading"
		></SmallLists>
	</div>
</template>

<style scoped></style>
