<script setup>
import { defineProps, ref } from "vue";
import { OnClickOutside } from "@vueuse/components";

const props = defineProps({
	label: String,
	name: String,
	modelValue: [String, Number],
	disabled: Boolean,
	type: "text",
});
const model = defineModel();
const isOpen = ref(false);
const open = () => {
	isOpen.value = true;
};

const close = () => {
	isOpen.value = false;
};
</script>

<template>
	<div class="w-full max-w-full px-3 shrink-0 md:flex-0 transition-all  ">
		<div class="mb-4">
			<label :for="label"
				   class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700
             dark:text-white/80">{{ label }}</label>
			<OnClickOutside
				@trigger="close"
				@click="open"
				:class="[disabled? 'border-gray-50 bg-gray-50 '
             :'border-gray-300 bg-white '
             ,'truncate focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full appearance-none ' +
             'rounded-lg border border-solid bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none ' +
             'transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none']">{{ model }}abc
				<ul
					class="z-10 text-sm lg:shadow-3xl duration-250 before:duration-350 before:font-awesome before:ease min-w-44 before:text-5.5 transform-dropdown pointer-events-none absolute left-auto top-1/2 m-0 -mr-4 mt-2 list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-0 py-2 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-7 before:left-auto before:top-0 before:z-40 before:text-white before:transition-all before:content-['\f0d8']">
					<li>
						<a class="py-1.2 lg:ease clear-both block w-full whitespace-nowrap border-0 bg-transparent px-4 text-left font-normal text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:transition-colors lg:duration-300">Action</a>
					</li>
					<li>
						<a class="py-1.2 lg:ease clear-both block w-full whitespace-nowrap border-0 bg-transparent px-4 text-left font-normal text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:transition-colors lg:duration-300">Another action</a>
					</li>
					<li>
						<a class="py-1.2 lg:ease clear-both block w-full whitespace-nowrap border-0 bg-transparent px-4 text-left font-normal text-slate-500 hover:bg-gray-200 hover:text-slate-700 dark:text-white dark:hover:bg-gray-200/80 dark:hover:text-slate-700 lg:transition-colors lg:duration-300">Something else here</a>
					</li>
				</ul>
			</OnClickOutside>
		</div>
	</div>
</template>

<style scoped>

</style>