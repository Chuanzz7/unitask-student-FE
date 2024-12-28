<script setup>
const props = defineProps({
	label: String,
	disabled: Boolean,
	time: { type: Boolean, default: false },
});
const modal = defineModel();

const format = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	let n = date.toLocaleString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	if (props.time) {
		return `${day}/${month}/${year} ${n}`;
	} else {
		return `${day}/${month}/${year} `;
	}
};
</script>

<template>
	<div class="w-full max-w-full px-3 shrink-0 md:flex-0 transition-all">
		<div class="mb-4">
			<label :for="label" class="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 dark:text-white/80">{{ label }}</label>
			<VueDatePicker
				:disabled="disabled"
				:enable-time-picker="false"
				:format="format"
				v-model="modal"
				:class="[
					disabled ? 'border-gray-50 bg-gray-50 ' : ' border-gray-300 bg-white ',
					'focus:shadow-primary-outline dark:bg-slate-850 dark:text-white text-sm leading-5.6 ease block appearance-none ' +
						'rounded-lg border border-solid bg-clip-padding font-normal text-gray-700 outline-none ' +
						'transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none',
				]"
			/>
		</div>
	</div>
</template>

<style scoped>
>>> .dp__input {
	padding: 0.45rem 0.75rem 0.45rem 2rem;
	background-clip: padding-box;
	border: 0 !important;
	border-radius: 0.5rem /* 8px */;
	background-color: transparent;
	font-family: inherit;
	line-height: inherit;
}
</style>
