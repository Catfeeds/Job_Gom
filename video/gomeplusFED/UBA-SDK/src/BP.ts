/**
 * bp.js 代码目标要求：
 * 1，无依赖。
 * 2，不影响页面其他性能，有对外事件广播
 * 3，收集包括，客户端信息，用户信息，前端性能信息，行为统计信息
 *  版本控制使用php静态方法,模板页面也是[初订]
 *  4,active_no
 */
import { win, doc, scr, nav, ua, gifurl, mainhost, allowInitLog, tid, PAGE_ID } from './config';
import * as utils from './utils';

var ref = doc.referrer.toLowerCase();

const COOKIE_PHPSID = 'mx_wap_gomeplusid',
	COOKIE_PHPPCID = 'mx_pc_gomeplusid',
	COOKIE_NEW = 'isnew',
	COOKIE_SSID = 'ssid',
	COOKIE_LASTTIME = 'plasttime';

// 客户端信息
var CI = {
	// 取得屏幕尺寸
	screen_size: function() {
		return scr.width + "x" + scr.height;
	},
	// 取得屏幕色深
	color_depth: function() {
		return scr.colorDepth || '';
	},
	// 取得 appCode
	app_code: function() {
		return nav.appCodeName || '';
	},
	// 取得 appName
	app_name: function() {
		return (nav.appName.indexOf('Microsoft Internet Explorer') > -1) ? 'MSIE' : nav.appName;
	},
	// 取得 cpu
	cpu: function() {
		return nav['cpuClass'] || nav['oscpu'] || "";
	},
	// 取得 platform
	platform: function() {
		return nav.platform || '';
	},
	// 取得网络连接类型
	network: function() {
		var ct = "";
		// android 2.2 webkit 新 API
		ct = (nav['connection'] && nav['connection'].type) ? nav['connection'].type : ct;
		if (ct) {
			return ct;
		}
		try {
			doc.body['addBehavior']("#default#clientCaps");
			ct = doc.body['connectionType'];
		} catch (e) {
			ct = "-";
		}
		return ct;
	},
	// 取得系统语言
	language: function() {
		return nav['systemLanguage'] || nav.language || '';
	},
	// 取得时区
	timezone: function() {
		return new Date().getTimezoneOffset() / 60 || "";
	},
	// 取得 Flash 版本
	flash_ver: function() {
		var f = "-",
			n = navigator,
			ii;
		if (n.plugins && n.plugins.length) {
			for (ii = 0; ii < n.plugins.length; ii++) {
				if (n.plugins[ii].name.indexOf('Shockwave Flash') !== -1) {
					f = n.plugins[ii].description.split('Shockwave Flash ')[1];
					break;
				}
			}
		} else if (win['ActiveXObject']) {
			for (ii = 10; ii >= 2; ii--) {
				try {
					var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
					if (fl) {
						f = ii + '.0';
						break;
					}
				} catch (e) {
					// console.log(e);
				}
			}
		}
		return f;
	},
	ua: function() {
		return encodeURIComponent(ua);
	}
};

// 页面信息
export var PI = {
	pagename: function() {
		return encodeURIComponent(document.title || '-');
	},
	// 获取页面 document.referer
	referrer: function() {
		var re = /^[^?&#]*.swf([?#])?/;
		// 如果页面 Referer 为空，从 URL 中获取
		if ((ref === "") || (ref.match(re))) {
			ref = utils.stringSplice(win.location.href, "ref", "&", "");
			if (ref !== "") {
				return encodeURIComponent(ref);
			}
		}
		return encodeURIComponent(ref);
	},
	// 获取当前页是否为浏览器默认首页
	is_homepage: function() {
		var isHome = "";
		try {
			doc.body['addBehavior']("#default#homePage");
			isHome = doc.body['isHomePage'](win.location.href) ? "Y" : "N";
		} catch (e) {
			isHome = "unkown";
		}
		return isHome;
	},
	// 获取页面 DOM 数
	dom_count: function() {
		return doc.getElementsByTagName("*").length || "";
	},
	// 获取页面 iframe 数
	iframe_count: function() {
		return doc.getElementsByTagName("iframe").length;
	},
	url: function() {
		return encodeURIComponent(win.location.href.replace(/(intcmp|cmpid)=[^&]+&?/g, '').replace(/[?&]*(#.*)?$/, ''));
	},
	tid() {
		return tid || '';
	}
};

// 用户信息
var UI = {
	phpsid: function() {
		var phpsid = utils.getCookie(COOKIE_PHPSID) || utils.getCookie(COOKIE_PHPPCID);
		return phpsid;
	},
	ssid: function() {
		// // 清除上个版本保存一年的ssid cookie
		// // 注意delCookie仅删除domain为location.host的ssid，若后续该方法修改，务必核查此处
		// utils.delCookie(COOKIE_SSID);

		var sid = utils.getCookie(COOKIE_SSID);

		if (sid === "") {
			// 长期保存，默认为1年（365天）
			sid = utils.getRandom();
			utils.setCookie(COOKIE_SSID, sid, 365 * 5, mainhost);
		}

		return sid;
	},
	is_new: function() {
		// 7天是否访问过此页面
		var nid = utils.getCookie(COOKIE_NEW);
		if (nid === "") {
			nid = utils.getRandom();
			utils.setCookie(COOKIE_NEW, nid, 7);
			return 1;
		} else {
			return 0;
		}
	},
	// 用户信息
	uid: function() {
		return window['userId'] || '';
	},
	shop_id: function() {
		var shopid = win.BPConfig.shop_id;
		return shopid || '';
	},
	produce_id: function() {
		var produceid = win.BPConfig.produce_id;
		return produceid || '';
	},
	group_id: function() {
		return win.groupId ? win.groupId : '';
	},
	topic_id: function() {
		return win.topicId ? win.topicId : '';
	},
	channel: function() {
		var channel = win.BPConfig.channel;
		return channel || '';
	}
};

// 特别信息
export var SI = {
	last_time: function() {
		var ret = utils.getCookie(COOKIE_LASTTIME);
		if (win.BPConfig.serverTime) {
			if (!ret) {
				ret = win.BPConfig.serverTime;
			}
			utils.setCookie(COOKIE_LASTTIME, win.BPConfig.serverTime, 365);
		} else {
			var time = Math.round(new Date().getTime() / 1000);
			if (!ret) {
				ret = time;
			}
			utils.setCookie(COOKIE_LASTTIME, time, 365);
		}
		return ret;
	},
	active_no: function() {
		return win.active_no ? win.active_no : '-';
	},
	page_id: function() {
		return win[PAGE_ID] ? win[PAGE_ID] : '-';
	},
	page_name: function() {
		return win._page_name_ ? win._page_name_ : '-';
	}
};

// 性能信息 -> 需要页面header部署startTime,headEndTime
// 如果没有则不统计
var startTime = win.BPConfig.startTime,
	headEndTime = win.BPConfig.headEndTime,
	loadTime,
	readyTime;

var P = {
	sdate: function() {
		if (win.BPConfig.serverTime) {
			return win.BPConfig.serverTime;
		}
		return '-';
	},
	load_time: function() {
		if (startTime && loadTime) {
			return loadTime - startTime;
		}
		return '-';
	},
	ready_time: function() {
		if (startTime && readyTime) {
			return readyTime - startTime;
		}
		return '-';
	},
	first_screen_time: function() {
		if (headEndTime && startTime) {
			return headEndTime - startTime;
		}
		return '-';
	},
	dict_v: function() {
		return '2017030301';
	}
};

export var BP = {
	getPvData: function() {
		// 页面进入的全局统计->算一次pv
		var CIDATA = utils.collects(CI, 'CI=');
		var PIDATA = utils.collects(PI, 'PI=');
		var UIDATA = utils.collects(UI, 'UI=');
		var PDATA = utils.collects(P, 'P=');
		var SDATA = utils.collects(SI, 'SI=');
		var urlDATA = [CIDATA, PIDATA, UIDATA, PDATA, SDATA].join('&') + '&' + utils.getSource();
		return urlDATA;
	},
	pvLog: function() {
		var url = gifurl + utils.getWm() + '&' + this.getPvData();
		utils.sendRequest(url);
	},
	getExt: function() {
		var ext = [utils.collects(PI, 'PI='), utils.collects(P, 'P='), utils.getWm(), utils.collects(UI, 'UI=')].join('&');
		return ext;
	},
	send: function(data) {
		var urlDATA = utils.jsonToQuery(data);
		if (urlDATA) {
			var url = gifurl + this.getExt() + '&' + urlDATA;
			/* dev-only start */
			if (win.testinfo) {
				url = url + '&testinfo=' + JSON.stringify(win.testinfo);
			}
			/* dev-only end */
			utils.sendRequest(url);
		}
	}
};

// 处理超时和ios9下href改变不触发window.load的问题
var bpOnce = false;

export function init() {
	function setPV() {
		if (!bpOnce && allowInitLog) {
			BP.pvLog();
			bpOnce = true;
			/* dev-only start */
			// let testelm;
			// document.body.setAttribute('modelid', 'test0000');
			// (testelm = document.body.children[0]) && testelm.setAttribute('modelid', 'test0001');
			// (testelm = document.body.children[0].children[0]) && testelm.setAttribute('modelid', 'test0002');
			/* dev-only end */
		}
	}
	utils.domReady(function() {
		readyTime = new Date().valueOf();
		// 3秒不触发onload，主动触发onload
		setTimeout(function() {
			setPV();
		},         3000);
	});

	utils.addEvent(window, 'load', function() {
		loadTime = new Date().valueOf();
		if (!readyTime) {
			readyTime = loadTime;
		}
		setPV();
	});
}
