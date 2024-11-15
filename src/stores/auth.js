import { defineStore } from 'pinia';
import axios from 'axios';
import {LOGIN} from "@/api/auth.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post(LOGIN, credentials);
                this.token = response.data

                // Optionally, save the token to localStorage or cookies
                localStorage.setItem('token', this.token);

                // Set the default Authorization header for future requests
                axios.defaults.headers.common['Authorization'] = this.token;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        logout() {
            this.token = null;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});

