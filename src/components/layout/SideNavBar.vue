<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import pathnames from "@/router/pathnames.js";

const route = useRoute();

const isActiveLink = (routePath) => {
	if (!(route.path.indexOf(routePath) === -1)) {
		return true;
	} else return false;
};

const openAssignment = () => {
	assignment.value = !assignment.value;
};

const assignment = ref(false);
</script>

<template>
	<aside
		class="fixed inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200 -translate-x-full bg-white border-0 shadow-xl dark:shadow-none dark:bg-slate-850 max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 xl:translate-x-0"
		aria-expanded="false"
	>
		<div class="h-19">
			<RouterLink class="block px-9 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700" to="/" target="_blank">
				<img src="@/assets/img/graduate-cap.png" class="inline h-full max-w-full transition-all duration-200 dark:hidden ease-nav-brand max-h-8" alt="main_logo" />
				<img src="@/assets/img/graduate-cap.png" class="hidden h-full max-w-full transition-all duration-200 dark:inline ease-nav-brand max-h-8" alt="main_logo" />
				<span class="ml-1 font-semibold transition-all duration-200 ease-nav-brand px-3">UniTask</span>
			</RouterLink>
		</div>

		<hr class="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent" />

		<div class="items-center block w-auto max-h-screen overflow-auto grow basis-full">
			<ul class="flex flex-col pl-0 mb-0">
				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.AnnouncementView"
						:class="[
							isActiveLink(pathnames.AnnouncementView)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-blue-500 pi pi-bell"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Announcement</span>
					</RouterLink>
				</li>

				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.SubjectView"
						:class="[
							isActiveLink(pathnames.SubjectView)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-blue-500 pi pi-book"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Subject</span>
					</RouterLink>
				</li>

				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.AssignmentView"
						:class="[
							isActiveLink(pathnames.AssignmentView)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-orange-500 pi pi-pen-to-square"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Assignment</span>
					</RouterLink>
				</li>

				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.Group"
						:class="[
							isActiveLink(pathnames.Group)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center fill-current stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-emerald-500 pi pi-comments"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Group</span>
					</RouterLink>
				</li>

				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.Task"
						:class="[
							isActiveLink(pathnames.Task)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-cyan-500 pi pi-list-check"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Task</span>
					</RouterLink>
				</li>

				<li class="mt-0.5 w-full">
					<RouterLink
						:to="pathnames.Document"
						:class="[
							isActiveLink(pathnames.Document)
								? 'bg-blue-500/13 dark:text-white dark:opacity-80 text-sm ease-nav-brand rounded-lg font-semibold text-slate-700 '
								: 'dark:text-white dark:opacity-80 text-sm ease-nav-brand',
							'py-2.7 my-0 mx-2 flex items-center whitespace-nowrap px-4 transition-colors ',
						]"
					>
						<div class="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
							<i class="relative top-0 text-sm leading-normal text-red-600 pi pi-folder"></i>
						</div>
						<span class="ml-1 duration-300 opacity-100 pointer-events-none ease">Document</span>
					</RouterLink>
				</li>
			</ul>
		</div>
	</aside>
</template>
<style scoped></style>
