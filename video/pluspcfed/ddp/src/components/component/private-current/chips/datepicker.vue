<template>
	起始日期：<datepicker format="YYYY-M-D" :value="range[0].val"></datepicker>
	结束日期：<datepicker format="YYYY-M-D" :value="range[1].val"></datepicker>
</template>
<style scoped>
	.datetime-picker div {
		position: relative;
		z-index: 1000;
		width: 238px;
		height: 280px;
		margin-top: 2px;
		background-color: #fff;
		box-shadow: 0 0 6px #ccc;
	}
</style>
<script>
//	import {datepicker} from 'vue-strap';
	import datepicker from '../../common/datepicker.vue';
	import $ from 'jquery';

	export default {
		data() {
			return {
				dateVal: '2016-9-5',
				format: 'MMMM/dd/yyyy'
			};
		},
		components: { datepicker },
		ready() {
			this.getDate();
			let tdf = $('.date-picker td');
			tdf.on('click', () => {
				this.componentreply.datePicker[0] = {
					val: $('.datetime-picker').eq(0).find('input').val(),
					name: $('.datetime-picker').eq(0).find('input').val()
				};
				this.componentreply.datePicker[1] = {
					val: $('.datetime-picker').eq(1).find('input').val(),
					name: $('.datetime-picker').eq(1).find('input').val()
				};
				this.$dispatch('componentreplyC', 'changed');
			});
		},
		props: [ 'range', 'componentreply' ],
		methods: {
			getDate() {
				const now = new Date();
				this.dateVal = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
			}
		}
	};
</script>
