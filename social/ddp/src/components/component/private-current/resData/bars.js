/**
 * Created by liangxiao on 16/9/1.
 */
export default {
	'tooltip': {
		'trigger': 'item',
		'axisPointer': {
			'type': 'shadow'
		}
	},
	'title': {
		'text': '堆叠区域图'
	},
	'legend': {
		'data': ['直接访问']
	},
	'grid': {
		'left': '3%',
		'right': '4%',
		'bottom': '3%',
		'containLabel': true
	},
	'xAxis': [
		{
			'type': 'category',
			'data': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			'axisTick': {
				'alignWithLabel': true
			}
		}
	],
	'yAxis': [
		{
			'type': 'value'
		}
	],
	'series': [
		{
			'name': '直接访问',
			'type': 'bar',
			'stack': '总量',
			'data': [10, 52, 200, 334, 390, 330, 220]
		}
	]
};
