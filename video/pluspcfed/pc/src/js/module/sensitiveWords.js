var init = function(stringArray) {
	stringArray = stringArray.join("|");
	var reg = new RegExp(`(${stringArray})`,'gm');
	var ele = "<span style=\"color:#f00\">$1</span>";
	document.body.innerHTML = document.body.innerHTML.replace(reg, ele);
}

init(["我","百","度","taobao","keaidi"]);
