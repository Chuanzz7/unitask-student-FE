<script setup>

// Tabs array and active tab

const model = defineModel();
const props = defineProps({
	tabs: Array,
});
const onClick = (tab) => {
	model.value = tab;
};
</script>

<template>
	<div class="flex mx-auto w-full justify-center">
		<!-- Tabs Navigation -->
		<ul class="flex w-[50%] p-3 items-center justify-center bg-blue-500/13 rounded-xl">
			<li
				v-for="tab in tabs"
				:key="tab.value"
				:class="[
          model === tab.value ? 'bg-white shadow-3xl ' : '',
          'flex-1 text-center items-center justify-center  p-2 mb-0 transition-all ease-in-out border-0 rounded-lg text-slate-700'
        ]"
			>
				<button class="w-full" @click="onClick(tab.value)">
					<i class="ni ni-app"></i>
					<span class="ml-2">{{ tab.label }}</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>