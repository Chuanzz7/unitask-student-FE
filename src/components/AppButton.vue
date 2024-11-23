<script setup>
import { computed, defineProps } from "vue";
import { cva } from "class-variance-authority";

import buttonEnums from "@/enums/buttonEnums";

const props = defineProps({
	leftIcon: Object,
	rightIcon: Object,
	type: {
		type: String,
		default: buttonEnums.BUTTON,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	as: {
		type: [String, Object],
		default: "button",
	},
	intent: {
		type: String,
		validator: (val) => ["primary", "text", "outline"].includes(val),
		default: "primary",
	},
});

const buttonClass = computed(() => {
	return cva(
		"inline-block w-full px-10 py-3.5 mt-6 mb-0 font-bold leading-normal text-center  align-middle transition-all  border-0 rounded-lg cursor-pointer hover:-translate-y-px active:opacity-85 hover:shadow-xs text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25",
		{
			variants: {
				intent: {
					primary: "bg-blue-500 text-white",
					text: "text-blue-500",
					outline: "text-blue-500 border-2 border-solid border-blue-500",
				},
			},
		}
	)({
		intent: props.intent,
	});
});
</script>

<template>
	<component :is="props.as" :type="props.type" :class="buttonClass">
		<svg v-if="props.loading" class="animate-spin h-5 w-5 absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>

		<component :is="props.leftIcon" :class="['w-5 h-5 mr-2', props.loading && 'invisible']" />

		<span :class="[props.loading && 'invisible']">
			<slot></slot>
		</span>

		<component :is="props.right" :class="['w-5 h-5 ml-2', props.loading && 'invisible']" />
	</component>
</template>
