<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { RouterView, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/AuthStore";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
	// Set the Authorization header if the token exists
	if (authStore.token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.token}`;
	}

	// // Axios response interceptor to handle 401 errors
	// axios.interceptors.response.use(
	// 	(response) => response,
	// 	(error) => {
	// 		if (error.response.status === 401) {
	// 			authStore.logout();
	// 			router.push({ name: "login" });
	// 		}
	// 		return Promise.reject(error);
	// 	}
	// );
});
</script>

<template>
	<RouterView />
</template>
