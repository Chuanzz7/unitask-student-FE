<script setup>
import {onMounted} from "vue";
import {RouterView} from "vue-router";

import {useAuthStore} from "@/stores/AuthStore";
import {apiClient} from "@/api/index.js";
import router from "@/router/index.js";

const authStore = useAuthStore();

onMounted(() => {
  // Set the Authorization header if the token exists
  if (authStore.token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${authStore.token}`;
  }

  // Axios response interceptor to handle 401 errors
  apiClient.interceptors.response.use(
  	(response) => response,
  	(error) => {
  		if (error.response.status === 401) {
  			authStore.logout();
  			router.push({ name: "login" });
  		}
  		return Promise.reject(error);
  	}
  );
});
</script>

<template>
  <RouterView/>
</template>
