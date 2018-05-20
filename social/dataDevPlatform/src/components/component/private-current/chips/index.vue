<template>
<div :style="{'overflow-x': `${['form', 'formContent'].includes(type)?'auto':'visible'}`}">
	<radio :config="config" v-if="type === 'radio'" :componentreply.sync="componentreply"></radio>
	<chart v-show="['line', 'bar', 'pie', 'map', 'sankey', 'scatter', 'radar'].includes(type)"
	:option="option"
	:index="index" :width="width"
	:height="height">
	</chart>
	<!--<data-picker :range="config" v-if="type === 'datePicker'" :componentreply.sync="componentreply"></data-picker>-->
	<check-box v-if="type === 'checkBox'" :configc="config" :componentreply.sync="componentreply"></check-box>
	<drop-down v-if="type === 'drop'" :configc="config" :componentreply.sync="componentreply"></drop-down>
	<form-component v-if="type === 'form' && form && form.length > 0" :form="form" :paconfig.sync="pconfig" :index="index"></form-component>
	<form-content v-if="type === 'formContent' && form" :form="form" :paconfig.sync="pconfig" :index="index" :formcontentprop="formcontentprops"></form-content>
	<data-picker-range :range="config" :index="index" v-if="type === 'datePicker'" :componentreply.sync="componentreply"></data-picker-range>
	<data-picker-single :range="config" :index="index" v-if="type === 'datePickerSingle'" :componentreply.sync="componentreply"></data-picker-single>
	<search :range="config" :index="index" v-if="type === 'search'" :componentreply.sync="componentreply"></search>
</div>
</template>
<style scoped>
</style>
<script>
	import radio from './radio.vue';
	import dropDown from './dropdown.vue';
	import dataPickerSingle from './datepicker-single.vue';
	import dataPickerRange from './datepicker-range.vue';
	import checkBox from './checkbox.vue';
	import formComponent from './from.vue';
	import formContent from './newForm.vue';
	import chart from './chart.vue';
	import search from './search.vue';

	export default {
		name: 'chip',
		props: ['type', 'config', 'form', 'option', 'index', 'componentreply', 'pconfig', 'height', 'width', 'formcontentprops'],
		components: {
			checkBox,
			formComponent,
			formContent,
			dataPickerSingle,
			dataPickerRange,
			radio,
			chart,
			dropDown,
			search
		},
		ready() {}
	};
</script>
