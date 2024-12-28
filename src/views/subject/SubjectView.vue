<script setup>
import SmallLists from "@/components/small-list/Small-lists.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import SubjectForm from "@/components/subject/SubjectForm.vue";
import { apiClient, GET_SUBJECT, LIST_SUBJECT } from "@/api/index.js";
import { useRoute } from "vue-router";
import { POSITION, useToast } from "vue-toastification";

const route = useRoute();
const currentValue = computed(() => route.params.id);
const toast = useToast();

const id = ref(route.params.id);
const state = reactive({
	search: "",
	listData: { isLoading: true, content: [] },
	formData: { isLoading: true, content: {} },
});

const listingApi = async () => {
	try {
		const response = await apiClient.get(LIST_SUBJECT, {
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
				title: x.name,
				description: x.lecturerName,
				code: x.code,
				color: x.color,
			});
		});
	} catch (error) {
		console.log(error);
		toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
	}
};

const subjectApi = async (id) => {
	if (id != null) {
		try {
			const response = await apiClient.get(`${GET_SUBJECT}${id}`);
			state.formData.isLoading = false;

			let subject = response.data.subject;
			state.formData.content.status = response.data.status;
			state.formData.content.id = subject.id;
			state.formData.content.name = subject.name;
			state.formData.content.code = subject.code;
			state.formData.content.course = subject.course;
			state.formData.content.creditHour = subject.creditHour;
			state.formData.content.description = subject.description;
			state.formData.content.learningOutcome = subject.learningOutcome;
			state.formData.content.lecturerName = subject.lecturerName;
			state.formData.content.lecturerContact = subject.lecturerContact;
			state.formData.content.lecturerEmail = subject.lecturerEmail;
			state.formData.content.lecturerOffice = subject.lecturerName;
			state.formData.content.color = subject.color;
			state.formData.content.assessment = [];
			subject.assessment.map((x) => {
				state.formData.content.assessment.push({ name: x.name, assignmentMode: x.assignmentMode, weightage: x.weightage });
			});
		} catch (error) {
			toast.error("Something Wrong", { position: POSITION.TOP_CENTER });
		}
	}
};

onMounted(() => {
	listingApi();
});

watch(
	() => route.params.id,
	(newId) => {
		id.value = newId;
		subjectApi(newId); // Fetch data when the ID changes
	},
	{ immediate: true } // Trigger on initial mount
);
</script>

<template>
	<div class="h-full flex flex-wrap max-w-full pb-4">
		<SmallLists
			class="h-full flex-row flex-grow mx-3 mb-3 min-w-[30%] basis-[30%]"
			title="Subjects"
			details-page="subjectDetails"
			title-icon="text-blue-500 pi-book"
			v-model="state.search"
			:search="listingApi"
			:content="state.listData.content"
			:loading="state.listData.isLoading"
		></SmallLists>
		<SubjectForm class="h-full flex-row flex-grow mx-3 mb-3 basis-[60%]" disabled v-if="currentValue != null" v-model="state.formData.content" :loading="state.formData.isLoading"></SubjectForm>
	</div>
</template>

<style scoped></style>
