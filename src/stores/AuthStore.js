import { computed, ref } from "vue";
import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

import pathnames from "@/router/pathnames";

import { LOGIN, SIGNUP } from "@/api";

export const useAuthStore = defineStore("authStore", () => {
	const router = useRouter();

	const token = ref(localStorage.getItem("token") || null);

	const isAuthenticated = computed(() => Boolean(token.value));

	const login = async (credentials) => {
		try {
			const response = await axios.post(LOGIN, credentials);

			token.value = response.data;

			// Optionally, save the token to localStorage or cookies
			localStorage.setItem("token", token.value);

			// Set the default Authorization header for future requests
			axios.defaults.headers.common["Authorization"] = token.value;
		} catch (error) {
			console.error("Login failed:", error);

			throw error;
		}
	};

	const signUp = async (credentials) => {
		try {
			await axios.post(SIGNUP, credentials);

			router.push(pathnames.LoginView);
		} catch (error) {
			console.error("Sign up failed:", error);

			throw error;
		}
	};

	const logout = () => {
		token.value = null;

		localStorage.removeItem("token");

		delete axios.defaults.headers.common["Authorization"];

		router.push(pathnames.LoginView);
	};

	return { token, isAuthenticated, login, signUp, logout };
});
