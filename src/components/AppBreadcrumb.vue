<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import breadcrumbsItem from "@/router/breadcrumbItems";

const route = useRoute();

const currentRouteName = computed(() => route.name || "announcement");

const items = computed(() => breadcrumbsItem[currentRouteName.value] || []);

const isLastItem = computed(() => (index) => {
	return index === items.value.length - 1;
});

const lastItem = computed(() => items?.value[items.value.length - 1]?.label || "");
</script>

<template>
	<nav>
		<ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
			<li v-for="(item, index) in items" :key="index" class="text-sm leading-normal">
				<RouterLink v-if="!isLastItem(index)" :to="item.to" class="text-white opacity-50">
					{{ item.label }}
				</RouterLink>

				<span v-else class="text-sm pl-2 capitalize leading-normal text-white before:float-left before:pl-2 before:text-white before:content-['/']" aria-current="page">
					{{ item.label }}
				</span>
			</li>
		</ol>

		<h6 class="mb-0 font-bold text-white capitalize">{{ lastItem }}</h6>
	</nav>
</template>
