import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/AuthStore";

import pathnames from "./pathnames";

import Login from "@/views/Auth/LoginView.vue";
import SignUp from "@/views/Auth/SignUpView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import Dashboard from "@/views/Dashboard.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

import AnnouncementView from "@/views/announcement/AnnouncementView.vue";

import SubjectView from "@/views/subject/SubjectView.vue";

import GroupView from "@/views/group/GroupView.vue";
import GroupDetailsView from "@/views/group/GroupDetailsView.vue";

import TaskView from "@/views/TaskView.vue";
import DocumentView from "@/views/DocumentView.vue";

import ProfileView from "@/views/ProfileView.vue";
import AssignmentView from "@/views/assignment/AssignmentView.vue";

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
				{
					path: pathnames.AnnouncementView,
					name: "announcement",
					component: AnnouncementView,
				},
				{
					path: pathnames.SubjectView,
					name: "subject",
					component: SubjectView,
				},
				{
					path: pathnames.SubjectView + "/:id",
					name: "subjectDetails",
					component: SubjectView,
				},
				{
					path: pathnames.AssignmentView,
					name: "assignment",
					component: AssignmentView,
				},
				{
					path: pathnames.AssignmentView + "/:id",
					name: "assignmentDetails",
					component: AssignmentView,
				},
				{
					path: pathnames.Task,
					name: "task",
					component: TaskView,
				},
				{
					path: pathnames.Task + "/:id",
					name: "taskDetails",
					component: TaskView,
				},
				{
					path: pathnames.Profile,
					name: "profile",
					component: ProfileView,
				},
				{
					path: pathnames.Group,
					name: "group",
					component: GroupView,
				},
				{
					path: pathnames.Group + "/:id",
					name: "groupDetails",
					component: GroupDetailsView,
				},
				{
					path: pathnames.Task,
					name: "task",
					component: TaskView,
				},
				{
					path: pathnames.Task + "/:id",
					name: "taskDetails",
					component: TaskView,
				},
				{
					path: pathnames.Document,
					name: "document",
					component: DocumentView,
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
