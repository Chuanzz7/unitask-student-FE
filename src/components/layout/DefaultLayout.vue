<script setup xmlns="http://www.w3.org/1999/html">
import TopNavBar from "@/components/layout/TopNavBar.vue";
import SideNavBar from "@/components/layout/SideNavBar.vue";
</script>

<template>
	<body class="m-0 font-sans text-base antialiased font-normal dark:bg-slate-900 leading-default bg-gray-50 text-slate-500">
		<div class="absolute w-full bg-blue-500 dark:hidden min-h-75"></div>
		<TopNavBar />
		<div class="main-content">
			<SideNavBar />
			<router-view />
		</div>
	</body>
</template>
