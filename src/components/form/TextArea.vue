<script setup>
import { defineProps, onMounted, useTemplateRef } from "vue";

const props = defineProps({
	label: String,
	name: String,
	modelValue: String,
	disabled: Boolean,
	autoFocus: Boolean,
	blurEvent: Function,
});
const textarea = useTemplateRef("textarea");
const model = defineModel();

const adjustHeight = () => {
	const el = textarea.value;
	if (el) {
		el.style.height = "auto";
		el.style.height = `${el.scrollHeight}px`;
	}
};

onMounted(() => {
	adjustHeight();
	if (props.autoFocus) textarea.value.focus();
});
</script>

<template>
	<div class="w-full max-w-full px-3 shrink-0 md:flex-0">
		<div class="mb-4">
			<label v-if="label" :for="label"
				   class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80"> {{ label
				}}</label>
			<textarea
				:disabled
				type="text"
				v-model="model"
				@input="adjustHeight"
				id="textarea-input"
				ref="textarea"
				@blur="props.blurEvent"
				:class="[
					disabled ? 'border-gray-50 bg-gray-50 ' : 'border-gray-300 bg-white ',
					'resize-none overflow-hidden focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block w-full ' +
						'appearance-none rounded-lg border border-solid bg-clip-padding px-3 py-2 ' +
						'font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 ' +
						'focus:outline-none',
				]"
			/>
		</div>
	</div>
</template>

<style scoped></style>
