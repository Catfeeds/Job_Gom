<template>
	<div class="mainContent"></div>
</template>
<style scoped>
	table{
		border: 1px solid #ddd;
	}
</style>
<script>
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/bar';
	import 'echarts/lib/chart/pie';
	import 'echarts/lib/chart/line';
	import $ from 'jquery';
	export default {
		name: 'chart',
		props: ['option', 'index', 'height', 'width'],
		data() {
			return {

			};
		},
		ready() {
			if (this.option && this.index !== undefined) {
				this.createItem(this.option);
			}
		},
		methods: {
			createItem(option) {
				this.index = this.index || 0;
				let id = `echartMain${this.index}`;
				$(`#${id}`).remove();
				$('.mainContent').eq(this.index).append(`<div  style="width: ${this.width || 1100}px;height: ${this.height || 450}px;" id="${id}"></div>`);
				var myChart = echarts.init(document.getElementById(id));
				myChart.setOption(option, false, true);
			}
		},
		watch: {
			option(val) {
				this.createItem(val);
			}
		}
	};
</script>
