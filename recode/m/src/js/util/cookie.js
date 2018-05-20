export function setCookie(name, value) {
	try {
		let Days = 7;
		let exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = window.btoa(name) + '=' + window.btoa(value) + ';expires=' + exp.toString();
	} catch (e) {
		alert(e.message);
	}
}

export function deleteCookie(name) {
	name = window.btoa(name);
	let expires = new Date(0);
	document.cookie = name + '=' + ';expires=' + expires.toUTCString();
}

export function getCookie(code) {
	let name = window.btoa(code);
	let allcookies = document.cookie;
	name += '=';
	let pos = allcookies.indexOf(name);
	if (pos !== -1) {
		let start = pos + name.length;
		let end = allcookies.indexOf(';', start);
		if (end === -1) end = allcookies.length;
		let value = window.atob(allcookies.substring(start, end));
		return (value);
	} else return '';
}
