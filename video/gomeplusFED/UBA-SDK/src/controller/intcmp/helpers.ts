
import { MOD_META } from '../constants';

import { querySelector } from '../../utils';
const INTCMP_REGEX = /([?&])intcmp=(.+?)(&(.+))?(#.*)?$/;
let rcb = function(s, g1, g2, g3, g4, g5) {
	if (g4) {
		return g1 + g4 + (g5 || '');
	} else {
		return (g5 || '');
	}
};
export function cleanIntcmp(str) {
	return str.replace(INTCMP_REGEX, rcb);
}
export function getIntcmp(href) {
	let matched = href.match(INTCMP_REGEX);
	return (matched && matched[2]);
}
// 计算元素下, target是第几个a标签
export function calcTagNum(node, target) {
	let count = 0;
	let found = false;
	let list = node.children;
	for (let i = 0, l = list.length; i < l; i++) {
		let child = list[i];
		if (child.tagName.toLowerCase() === 'a') {
			if (child === target) {
				found = true;
				break;
			}
			count++;
			// 跳过有modelid的属性
		} else if (!child.hasAttribute(MOD_META)) {
			let res = calcTagNum(child, target);
			count += res.count;
			if (res.found) {
				return { count, found: true };
			}
		}
	}
	return { count, found };
}
export function findTagByIntcmp(datacode) {
	// 直接查找intcmp
	let gomeintcmp = querySelector(`a[href*="intcmp=${datacode}"]`);
	if (gomeintcmp) {
		return gomeintcmp;
	}
	let _tmp = datacode.split('-');
	let modelid = _tmp[1];
	let sn = _tmp[2];
	let modeldiv;
	if (modelid && /^\d+$/.test(sn) && (modeldiv = querySelector(`*[${MOD_META}=${modelid}]`))) {
		var _ret = function() {
			sn = parseInt(sn);
			let _findTag = function(node, remain) {
				let list = node.children;
				for (let i = 0, l = list.length; i < l; i++) {
					let child = list[i];
					if (child.tagName.toLowerCase() === 'a') {
						if (remain === 0) {
							return { target: child, remain };
						}
						remain--;
						// 跳过有modelid的属性
					} else if (!child.hasAttribute(MOD_META)) {
						let res = _findTag(child, remain);
						if (res.target) {
							return res;
						} else {
							remain = res.remain;
						}
					}
				}
				return { remain };
			};
			let result = _findTag(modeldiv, sn);
			return (result && result.target);
		}();
		return _ret;
	} else {
		return null;
	}
}
