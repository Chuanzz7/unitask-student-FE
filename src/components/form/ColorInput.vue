<script setup xmlns="">

import { ColorPicker } from "vue3-colorpicker";
import { ref } from "vue";
import { OnClickOutside } from "@vueuse/components";

const model = defineModel();

const props = defineProps({
	disabled: Boolean,
});

const open = ref(null);
const openColor = () => {
	if (!props.disabled) {
		open.value = true;
	}
};

const closeColor = () => {
	open.value = false;
};

</script>

<template>
	<OnClickOutside
		@trigger="closeColor"
		@click="openColor"
		:style="{backgroundColor: model}"
		:class="[open
				? 'absolute top-0 right-0 bottom-auto left-auto m-5 '
				: 'inline-block px-5 py-2 ml-auto text-xs tracking-tight-rem  text-sm ease-in bg-150 bg-x-25 ',
				 disabled
				 ?''
				 :'shadow-md  hover:shadow-xs  hover:-translate-y-px active:opacity-85'
				 ,'text-center text-white rounded-lg font-bold leading-normal align-middle border-0 '
				 ]">
		<i class="pi pi-bookmark"></i>
		<span v-if="!props.disabled" class="ml-1">Color</span>
		<ColorPicker
			v-if="open"
			format="hex"
			is-widget
			v-model:pure-color="model"
			picker-type="chrome"
			use-type="pure"
			disable-history
			disable-alpha
		/>
	</OnClickOutside>
</template>
<style scoped>

</style>