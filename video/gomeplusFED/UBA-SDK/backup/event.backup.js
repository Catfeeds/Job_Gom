import { bps, bplength, setData } from './bpdata.js';
import { BP } from './BP.js';
import { getSubDomain, querySelector, isMobile, addEvent, JSONParse, insertQuery } from './utils';
import { calcTagNum, cleanIntcmp, getIntcmp } from './lib/intcmp.js';
import { getCmpid } from './lib/cmpid.js';
import { win, doc, pageHost, PAGE_ID, MOD_META, SUDA_META, SN_TAG, BP_BLOCK, BP_POINT, PLUS_REGEX } from './config';
const DOMAIN_REGEX = /^(https?:)?\/\//;
export function bindClickEvent() {
	var eventType = isMobile ? 'touchstart' : 'click';
	addEvent(doc, eventType, function(e) {
		/* dev-only start */
		let start = win.performance && win.performance.now();
		/* dev-only end */
		var target = e.srcElement || e.target;
		let sudaMetaData;
		// 拷贝筛选bps
		let _filterd = [];
		let _blocks = [];
		let _points = [];
		// 找到了精确埋点
		let ptfound = false;
		// 当前埋点是精确埋点
		let ptfoundCurr = false;
		// 找到了区块埋点
		let blockfound = false;
		// modelid
		let modelid;
		// a标签
		let atarget;
		// modelid所在标签
		let modeltarget;
		let _ptparam = [];
		let haserr = false;
		for (let i = 0; i < bplength; i++) {
			let t = bps[i];
			let s = t.selector;
			let node;
			try {
				node = querySelector(s);
				_filterd.push(t);
			} catch (e) {
				// 选择器获取失败
				/* dev-only start */
				console.log(e);
				/* dev-only end */
				haserr = true;
			}
			if (node) {
				// block
				if (t.type === BP_BLOCK) {
					_blocks.push({
						node,
						data: t
					});
				} else if (!ptfound && (t.type === BP_POINT)) {
					// 很大概率 直接找到
					if (target === node) {
						ptfound = true;
						_ptparam.push(t);
					} else {
						_points.push({
							node,
							data: t
						});
					}
				}
			}
		}
		// 去除非法的选择器
		if (haserr) {
			setData(bps);
		}
		while (target && target.parentNode) {
			if (!modelid) {
				if (target.hasAttribute(MOD_META)) {
					modelid = target.getAttribute(MOD_META);
					modeltarget = target;
				} else {
					if (!atarget && (target.tagName.toLowerCase() === SN_TAG) && (target.href.indexOf('javascript') === -1)) {
						atarget = target;
					}
				}
			}
			if (!sudaMetaData && target.hasAttribute(SUDA_META)) {
				var metaData = target.getAttribute(SUDA_META); // json格式
				var data = {};
				try {
					data = JSONParse(metaData);
				} catch (err) {
					data.error = `JSON parse error, please check ${SUDA_META}`;
				}
				if (!data.name) {
					data.name = "-";
				}
				sudaMetaData = data;
			}
			// 查找精确埋点
			// 标识当前target是否为精确埋点
			let ptfoundCurr = false;
			if (!ptfound && !blockfound) {
				for (let i = 0, l = _points.length; i < l; i++) {
					if (_points[i].node === target) {
						// 找到了精确埋点
						_ptparam.push(_points[i].data);
						ptfound = true;
						ptfoundCurr = true;
						break;
					}
				}
			}
			// 向上查找区块
			if (!ptfoundCurr) {
				let blockfoundIndex;
				for (let i = 0, l = _blocks.length; i < l; i++) {
					if (_blocks[i].node === target) {
						// 找到了区块埋点
						_ptparam.push(_blocks[i].data);
						blockfound = true;
						blockfoundIndex = i;
						break;
					}
				}
				// 去除已找到的区块
				if (blockfoundIndex != null) {
					_blocks.splice(blockfoundIndex, 1);
				}
			}
			target = target.parentNode;
		}
		// 应该已循环到最顶层
		/* dev-only start */
		let end = win.performance && win.performance.now();
		(function injectTimeSpend() {
			if (start && end) {
				let spend = (end - start).toFixed(3);
				if (sudaMetaData) {
					sudaMetaData.spend = spend;
				} else if (_ptparam || atarget) {
					sudaMetaData = {
						spend
					};
				}
			}
		})();
		/* dev-only end */
		// 重新构建url
		if (atarget) {
			let href = atarget.href;
			let intcmp;
			// pageid在其他js中赋值， 所以不能提前取得
			let pageid = win[PAGE_ID] || getSubDomain(pageHost) || 'null';
			let insertJson = {};
			// 判断链接是否为美信域
			if (DOMAIN_REGEX.test(href) && !PLUS_REGEX.test(href)) {
				let cmpid = getCmpid();
				cmpid && (insertJson = { cmpid });
			}
			if (modelid) {
				href = cleanIntcmp(href);
				let {
					count
				} = calcTagNum(modeltarget, atarget);
				intcmp = `${pageid}-${modelid}-${count}`;
				sudaMetaData = sudaMetaData || {};
				sudaMetaData.intcmp = intcmp;
				insertJson.intcmp = intcmp;
			} else {
				intcmp = getIntcmp(href);
				if (intcmp) {
					sudaMetaData = sudaMetaData || {};
					sudaMetaData.intcmp = intcmp;
				}
			}
			sudaMetaData && (sudaMetaData.href = encodeURIComponent(href));
			href = insertQuery(href, insertJson);
			href && (atarget.href = href);
		}
		sendData(sudaMetaData, _ptparam);
	});
}

function sendData(data, bpdata) {
	if (bpdata && bpdata.length) {
		let UBAid = bpdata[0]._point_id;
		let UBA = '';
		for (let i = 0, l = bpdata.length; i < l; i++) {
			UBA += bpdata[i].pointParam + '|';
		}
		UBA = UBA.slice(0, -1).replace(/=/g, ':').replace(/&/g, '|');
		if (data) {
			data.UBA = UBA;
			data.UBAid = UBAid;
		} else {
			data = {
				UBA,
				UBAid
			};
		}
		BP.send(data);
	} else if (data) {
		BP.send(data);
	}
}
