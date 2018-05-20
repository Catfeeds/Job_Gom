<template>
	<a href="javascript:;" class="v-option" @click="hideOption(),change($event)">
		<slot>option</slot>
	</a>
</template>
<style>
.v-option {
	cursor: pointer;
}
</style>
<script>
import Vue from 'vue';

const Options = Vue.extend({
	name: 'v-options',
	created() {

	},
	methods: {
		hideOption() {
			this.$dispatch('hideOption');
		},
		change(e) {
			this.$dispatch('change', e.target.getAttribute('value'));
		}
	},
	events: {
		currentSelectedTxt(value) {
			if (value == this.$el.getAttribute('value')) {
				this.$dispatch('sendCurrendSelectedTxt', this.$el.innerHTML);
			}
		}
	}
});

Vue.component('v-option', Options);

export default Options;
</script>