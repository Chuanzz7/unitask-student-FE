<script setup>
import {RouterView} from "vue-router";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.js";
import axios from "axios";
import router from "@/router/index.js";

const authStore = useAuthStore();

onMounted(() => {
// Set the Authorization header if the token exists
  if (authStore.token) {
    axios.defaults.headers.common['Authorization'] = authStore.token;
  }

// Axios response interceptor to handle 401 errors
  axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          authStore.logout();
          router.push({ name: 'Login' });
        }
        return Promise.reject(error);
      }
  );
})

</script>

<template>
  <RouterView/>
</template>

<style>
</style>
