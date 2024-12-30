<script setup>

import { onMounted, reactive, watch } from "vue";
import BigLists from "@/components/big-list/Big-lists.vue";
import { LIST_GROUP, LIST_PUBLIC_GROUP } from "@/api/group.js";
import { apiClient } from "@/api/index.js";
import { POSITION, useToast } from "vue-toastification";
import SmallHorizontalNav from "@/components/SmallHorizontalNav.vue";
import pathnames from "@/router/pathnames.js";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const tableHeader = [{ name: "Subject Code", field: "subjectCode", width: 20 },
	{ name: "Assignment", field: "assignmentName", width: 30 },
	{ name: "Group", field: "groupName", width: 30 },
	{ name: "Members Number", field: "memberCount", width: 15 },
];
const state = reactive({
	route: pathnames.Group,
	activeTab: "MY_GROUP",
	listData: { isLoading: true, content: [] },
	selectedValue: 0,
	search: "",
});
const tabs = [{ value: "MY_GROUP", label: "My Group" }, { value: "PUBLIC_GROUP", label: "Join Group" }];


const listingApi = async () => {
	const api = state.activeTab === "MY_GROUP" ? LIST_GROUP : LIST_PUBLIC_GROUP;
	state.route = state.activeTab === "MY_GROUP" ? pathnames.Group : pathnames.GroupPublicView;
	try {
		const response = await apiClient.get(api, {
			params: {
				page: 1,
				pageSize: 10,
				search: state.search,
			},
		});
		state.listData.isLoading = false;
		state.listData.content = [];
		response.data.content.map((x) => {
			state.listData.content.push({
				id: x.id,
				subjectCode: x.subjectCode,
				assignmentName: x.assignmentName,
				groupName: x.groupName,
				memberCount: x.memberCount,
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something went wrong", { position: POSITION.TOP_CENTER });
	}
};

const routeToCreate = () => {
	router.push(pathnames.Group + "/create");
};

onMounted(() => {
	listingApi();
});

watch(
	() => state.activeTab,
	(newId) => {
		listingApi(newId); // Fetch data when the ID changes
	},
	{ immediate: true }, // Trigger on initial mount
);
</script>


<template>
	<div
		class="relative w-full flex flex-col justify-items-center min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
		<div class="flex p-6 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
			<h5 :class="`relative top-0.5 leading-normal pi pi-comments text-emerald-500 pr-2`"></h5>
			<h5 class="mb-0 dark:text-white">Group</h5>
		</div>

		<SmallHorizontalNav :tabs="tabs" v-model="state.activeTab" class="my-5"></SmallHorizontalNav>

		<button @click="routeToCreate" class="flex justify-end py-2 px-10 font-semibold text-blue-500">
			<i class="text-lg pi pi-plus my-1 mr-1"></i>
			<span>Add
			</span>
		</button>

		<BigLists :route="state.route" :header="tableHeader"
				  :data="state.listData.content"></BigLists>
	</div>
</template>
