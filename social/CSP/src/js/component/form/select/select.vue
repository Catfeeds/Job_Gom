<template>
	<div class="search-list v-select-con">
		<span class="selected" @click="showOption = !showOption">{{text}} <em class="icon-down"></em></span>
		<div class="list-s v-select" v-show="showOption">
			<slot>select</slot>
		</div>
	</div>
</template>
<style scoped>
.v-select-con {
	position: relative;
}

.v-select-con .selected {
	cursor: pointer;
}

.v-select-con .v-select {
	position: absolute;
	top: 0;
	left: 0;
}
</style>
<script>
import Vue from 'vue';

import Option from './option.vue';

import $ from 'jquery';

const Seletct = Vue.extend({
	name: 'v-select',
	data() {
		return {
			showOption: false,
			text: ''
		};
	},
	props: ['change', 'defaultValue'],
	ready() {
		this.$broadcast('currentSelectedTxt', this.defaultValue);
		$(document).on('click', (e) => {
			var _con = $('.search-list');
			if (!_con.is(e.target) && _con.has(e.target).length === 0) {
				this.showOption = false;
			}
		});
	},
	methods: {
		test() {
			console.log(1111);
		}
	},
	events: {
		hideOption() {
			this.showOption = false;
		},
		change(value) {
			this.change && this.change(value);
			this.defaultValue = value;
			this.$broadcast('currentSelectedTxt', this.defaultValue);
		},
		sendCurrendSelectedTxt(txt) {
			this.text = txt;
		}
	}
});

Vue.component('v-select', Seletct);

export default Seletct;
</script>
