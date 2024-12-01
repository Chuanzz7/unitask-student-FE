import {computed, ref} from "vue";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";

import pathnames from "@/router/pathnames";

import {apiClient, LOGIN, SIGNUP} from "@/api";

export const useAuthStore = defineStore("authStore", () => {
    const router = useRouter();

    const token = ref(localStorage.getItem("token") || null);
    const role = ref("")

    const isAuthenticated = computed(() => Boolean(token.value));
    const isLecturer = computed(() => role.value === "LECTURER");

    const login = async (credentials) => {
        try {
            const response = await apiClient.post(LOGIN, credentials);
            token.value = response.data.jwt;
            role.value = response.data.userRole;
            // Optionally, save the token to localStorage or cookies
            localStorage.setItem("token", token.value);

            // Set the default Authorization header for future requests
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const signUp = async (credentials) => {
        try {
            await apiClient.post(SIGNUP, credentials);

            router.push(pathnames.LoginView);
        } catch (error) {
            console.error("Sign up failed:", error);

            throw error;
        }
    };

    const logout = () => {
        token.value = null;

        localStorage.removeItem("token");

        delete apiClient.defaults.headers.common["Authorization"];

        router.push(pathnames.LoginView);
    };

    return {token, isAuthenticated, isLecturer, login, signUp, logout};
})
