import Vue from 'vue';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line'; // 折线图
import 'echarts/lib/component/legend'; // 图例

Vue.directive('chart', {
	bind: function(el, binding) {
		let value = {
			...binding.value,
			set data(name) {}
		};
		el.style.width = binding.value.width + 'px';
		el.style.height = binding.value.height + 'px';
		setTimeout(() => {
			let Chart = echarts.init(el);
			Chart.setOption(binding.value.data);
		}, 0);
	},
	update: function(el, binding) {
		let Chart = echarts.init(el);
		Chart.setOption(binding.value.data);
	}
});
