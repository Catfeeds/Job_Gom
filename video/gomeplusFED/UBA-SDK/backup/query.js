
export function querySelectorAll(selector) {
	if (!document.querySelectorAll) {
		// 向该selector代表的元素添加css expression从而获取结果
		let head = document.documentElement.firstChild;
		let styleTag = document.createElement("STYLE");
		head.appendChild(styleTag);

		document.__qsResult = [];
		styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsResult.push(this))}";

		window.scrollBy(0, 0);
		head.removeChild(styleTag);

		let result = [];
		for (var i in document.__qsResult) {
			result.push(document.__qsResult[i]);
		}
		return result;
	} else {
		return document.querySelectorAll(selector);
	}
}

export function querySelector(selector) {
	if (!document.querySelector) {
		var head = document.documentElement.firstChild;
		var styleTag = document.createElement("STYLE");
		head.appendChild(styleTag);
		document.__qsResult = [];

		styleTag.styleSheet.cssText = selector + "{x:expression(document.__qsResult.push(this))}";
		window.scrollBy(0, 0);
		head.removeChild(styleTag);

		return document.__qsResult[0] || null;
	} else {
		return document.querySelector(selector);
	}
}
