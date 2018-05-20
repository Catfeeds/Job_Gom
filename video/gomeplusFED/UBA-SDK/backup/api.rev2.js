import { bind } from './event.js';
import { querySelector } from '../polyfill/query.js';
import { getUrl } from './utils.js';
// import ajax from 'qwest';
import ajax from '../polyfill/ajax/index.js';

export default function(config) {
	let url = config.url;
	return {
		$bind(tasks, callback) {
			if (tasks.length > 0) {
				let success = [];
				let errors = [];
				let body = querySelector('body');
				// 默认为单击， http://10.69.205.26:9090/#!/main/api/detail/58170415881ccce602ab3d24未给出
				let event = 'click';
				bind(body, event, function(e) {
					let target = e.target;
					let len = tasks.length;
					// babel编译for of 会造成不兼容
					for (let i = 0; i < len; i++) {
						let t = tasks[i];
						let node = querySelector(t.selector);
						if (node) {
							if (target === node) {
								console.log('target clicked');
								return callback(t);
							}
						}
					}
				});
			}
			return tasks;
		},
		$fetch() {
			let pageUrl = getUrl();
			return ajax.get(url.fetch, { pageUrl }, { headers: { 'Cache-Control': '' } })
				.then(function(xhr, res) {
					if (typeof res === 'string') {
						res = JSON.parse(res);
					}
					// 注意第2个参数才是返回结果
					if (res.code === '200' && res.iserror === '0') {
						let data;
						if ((data = res.data) && (data = data.result)) {
							console.log(data);
							return data;
						} else {
							throw new Error('埋点数据为空');
						}
					} else {
						throw new Error('获取埋点数据失败');
					}
				});
		},
		$apply(cb = this.$report) {
			let _this = this;
			return this.$fetch()
				.then(function(res) {
					return _this.$bind(res, cb);
					// 这里catch写法为了兼容IE8
				})['catch'](function(err) {
					console.log(err);
					// TODO 上报失败的错误
				});
		},
		$report({ selector, privateParam }) {
			// privateParam
			let UBA = privateParam.replace(/=/g, ':').replace(/&/g, '|');
			var script = document.createElement('img');
			script.src = `${url.report}?PI=env:dev&UBA=${UBA}`;
			document.getElementsByTagName('head')[0].appendChild(script);
			return 'success';
		}
	};
};
