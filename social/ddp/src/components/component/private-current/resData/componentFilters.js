/**
 * Created by liangxiao on 16/9/13.
 */
import {getRandomInt} from '../../../../util/index';

import bars from './bars';
import line from './line';
import map from './map';
import pie from './pie';
import scatter from './scatter';
import radar from './radar';

let echartConfig = { 
	bar: bars,
	line: line,
	pie: pie,
	map: map,
	scatter: scatter,
	radar: radar
}

let getBarALinePieC = (rec) => {
	let acq = JSON.parse(JSON.stringify(echartConfig[rec.type]));

		// 散点
	if (['scatter', 'radar'].includes(rec.type)) {
		acq.legend.data = rec.legend.data;
		acq.series = rec.series;
		acq.series.forEach(x => {
			if (['scatter'].includes(rec.type)) {
				x.itemStyle = {
					normal: {
						opacity: 0.8,
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				};
			} else if (['radar'].includes(rec.type)) {
				x.symbol = 'none';
				x.lineStyle = {
					normal: {
						width: 1,
						opacity: 0.5
					}
				};
				x.itemStyle = {
					normal: {
						color: ['#B3E4A1', '#F9713C', '#B3E4A1'][getRandomInt()]
					}
				};
				x.areaStyle = {
					normal: {
						opacity: 0.05
					}
				};
			}
			
			if (typeof x.data === 'string') {
				x.data = rec.data[x.data];
			}
		})
		
		if (['scatter'].includes(rec.type)) {	
			var schema = rec.schema;
			acq.xAxis.name = rec.xaxis.name;
			acq.yAxis.name = rec.yaxis.name;
			acq.tooltip.formatter= function (obj) {
				var value = obj.value;
				var result = '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
					+ obj.seriesName
					+ '</div>';
				let schemalText = ''
				schema.forEach((s, index) => {
					schemalText += (s.text || s.name) + '：' + value[index] + '<br>'
				});
				return result + schemalText;
			}
		} else if (['radar'].includes(rec.type)) {
			acq.title.text = rec.title.text;
			acq.radar.indicator = rec.radar.indicator;
		}
		return acq;
	}

	let x, xAxisLen;
	let series = [];
	let val = ['line', 'bar', 'map'].includes(rec.type);
	let seriesLen = rec.series.length;
	if (val) {
		xAxisLen = rec.xaxis.length;
	}
	acq.title.text = rec.title.text;
	acq.legend.data = rec.legend.data;
	if (seriesLen === 1) {
		let serie = {};
		serie.data = rec.series[0].data;
		serie.name = rec.series[0].name;
		serie.type = rec.series[0].type;
		series = [serie];
	} else if (seriesLen > 1) {
		rec.series.forEach(function (item) {
			let serie = {};
			serie.data = item.data;
			serie.name = item.name;
			serie.type = item.type;
			serie.barWidth = acq.series[0].barWidth;
			if (val) {
				serie.stack = item.stack;
			}
			series.push(serie);
		});
	}
	if (val && xAxisLen === 1) {
		let xq = acq.xAxis[0];
		xq.data = rec.xaxis[0].data;
		x = [xq];
	} else if (val && xAxisLen > 1) {
		let xVal = [];
		rec.xaxis.forEach(function (item) {
			let xq = acq.xAxis[0];
			xq.data = item.data;
			xVal.push(xq);
		});
		x = xVal;
	}
	// 地图
	if (rec.type === 'map') {
		series.map(x => {
			x.mapType = 'china',
				x.label = {
					normal: {
						show: true
					},
					emphasis: {
						show: true
					}
				}
		});
	}

	acq.xAxis = x;
	acq.series = series;
	return acq;
};
export default { getBarALinePieC };
