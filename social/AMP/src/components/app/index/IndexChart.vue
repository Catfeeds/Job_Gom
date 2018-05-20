<template>
    <div class="chart"></div>
</template>
<script>
import Axios from 'utils/http';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
export default{
	name:'app-index-line-chart',
	props: ['lineChartOption'],
	data: function() {
		return {
			lineChartLoading: false,
			echart: null
		};
	},
	mounted: function() {
		let vm = this;
		if (vm.echart == null) {
			vm.echart = echarts.init(vm.$el);
		}
		vm.$watch('lineChartOption', function(lineChartOption){
			vm.echart.setOption(lineChartOption);
			console.log(lineChartOption.legend);
		}, {deep: true});
	}
};
</script>
<style>
    .chart {
        width: 1160px;
        height: 296px;
    }
</style>
