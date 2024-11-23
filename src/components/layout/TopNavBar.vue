<script setup>
import { reactive } from "vue";

import { useAuthStore } from "@/stores/AuthStore.js";

import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const auth = useAuthStore();

const state = reactive({
	isLogin: Boolean(auth.token),
});

const signOut = () => {
	auth.logout();
};
</script>

<template>
	<main class="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl">
		<nav class="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start" navbar-main navbar-scroll="false">
			<div class="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
				<AppBreadcrumb />

				<div class="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
					<div class="flex items-center md:ml-auto md:pr-4"></div>
					<ul class="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
						<li class="flex items-center">
							<button class="block px-0 py-2 text-sm font-semibold text-white transition-all ease-nav-brand" @click="signOut">
								<i class="fa fa-user sm:mr-1"></i>
								<span class="hidden sm:inline">Sign Out</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</main>
</template>
