import { bind } from '../../src/event.js';
import { querySelector } from '../../polyfill/query.js';
import ajax from '../../polyfill/ajax/xget.js';


export default function(config) {
	let url = config.url;
	return {
		$bind(tasks, callback) {
			let success = [];
			let errors = [];
			let body = querySelector('body');
			// 默认为单击， http://10.69.205.26:9090/#!/main/api/detail/58170415881ccce602ab3d24未给出
			let event = 'click';
			for(let t of tasks) {
				let selector = t.selector;			
				bind(body, event, function(e) {
					let node = querySelector(selector);
					if (node) {
						if (e.target === node) {
							return callback(selector, event, node);
						}
					}
				});
			}
			return tasks;
		},
		$fetch(callback) {
			console.log('start fetch');
			let pageUrl = encodeURIComponent(window.location.href);
			let getAjax = new ajax(url.fetch, {pageUrl}, {
				callback(res) {
					console.log(res);
					// 注意第2个参数才是返回结果
					if(res.code === '200' && res.iserror === '0') {
						let data;
						if ((data = res.data) && (data = data.result)) {
							console.log(data);
							callback(data);
						} else {
							console.log('埋点数据为空');
						}
					} else {
						console.log('获取埋点数据失败');
					}
				}
			});
			getAjax.send();

		},
		$apply(cb = this.$report) {
			console.log('start apply');
			return this.$fetch((tasks) => {
				return this.$bind(tasks, cb);
			});
		},
		$report(selector, event, node) {
			let pageUrl = window.location.href;
			var script = document.createElement('img');
			script.src = `${url.report}?${param({pageUrl, selector, event})}`;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};


};
