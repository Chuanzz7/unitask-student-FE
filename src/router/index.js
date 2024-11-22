import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/AuthStore";

import pathnames from "./pathnames";

import Login from "@/views/Auth/LoginView.vue";
import SignUp from "@/views/Auth/SignUpView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import Dashboard from "@/components/Dashboard.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: pathnames.NotFoundView,
			name: "not-found",
			component: NotFoundView,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: pathnames.LoginView,
			name: "login",
			component: Login,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: pathnames.SignUpView,
			name: "sign-up",
			component: SignUp,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: pathnames.DefaultView,
			component: DefaultLayout,
			meta: {
				requiresAuth: true,
			},
			children: [
				{
					path: pathnames.DashboardView,
					name: "dashboard",
					component: Dashboard,
				},
				// Add more child routes as needed
			],
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();

	if (to.name === pathnames.LoginView) {
		//sign out
		authStore.logout();

		next();
	}
	if (to.meta.requiresAuth) {
		//token check
		if (authStore.isAuthenticated) {
			next();
		} else {
			//token check
			next({ name: "login" });
		}
	} else {
		next();
	}
});

export default router;
