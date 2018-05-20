/**
 * Created by liangxiao on 16/9/1.
 */
export default {
	'color': ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
	'title': {
		'text': '某站点用户访问来源',
		'subtext': '',
		'x': 'center'
	},
	'tooltip': {
		'trigger': 'item',
		'formatter': '{a} <br/>{b} : {c} ({d}%)',
		'axisPointer': {
			'type': 'shadow'
		}
	},
	'legend': {
		'orient': 'vertical',
		'left': 'left',
		'data': ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
	},
	'series': [
		{
			'name': '访问来源',
			'type': 'pie',
			'radius': '55%',
			'center': ['50%', '50%'],
			'data': [
				{'value': 335, 'name': '直接访问'},
				{'value': 310, 'name': '邮件营销'},
				{'value': 234, 'name': '联盟广告'},
				{'value': 135, 'name': '视频广告'},
				{'value': 1548, 'name': '搜索引擎'}
			],
			'itemStyle': {
				'emphasis': {
					'shadowBlur': 10,
					'shadowOffsetX': 0,
					'shadowColor': 'rgba(0, 0, 0, 0.5)'
				}
			}
		}
	]
};
