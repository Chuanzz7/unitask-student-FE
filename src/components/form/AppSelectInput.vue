<script setup>
import Dropdown from "primevue/dropdown";

const props = defineProps({
	label: String,
	options: Array,
	disabled: Boolean,
});

const model = defineModel();
</script>

<template>
	<div class="w-full max-w-full px-3 shrink-0 md:flex-0 transition-all">
		<label :for="label" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">{{ label }}</label>

		<Dropdown
			v-model="model"
			:options="options"
			optionLabel="label"
			optionValue="value"
			filter
			:class="[
				disabled ? 'border-gray-50 bg-gray-50 ' : 'border-gray-300 bg-white focus:border-blue-500 focus:outline-none cursor-pointer ',
				'inline-flex relative truncate dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease w-full appearance-none ' +
					'rounded-lg border border-solid bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none ',
			]"
			:disabled="disabled"
		>
		</Dropdown>
	</div>
</template>

<style scoped>
>>> span.p-dropdown-label.p-inputtext {
	display: block;
	padding: 0;
	height: 23px;
	background: inherit;
	white-space: nowrap;
	overflow: hidden;
	flex: 1 1 auto;
	width: 1%;
	text-overflow: ellipsis;
	border: none;
}

>>> span.p-dropdown-label.p-inputtext:focus-visible {
	outline: none;
}

>>> div.p-dropdown-trigger {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
</style>
