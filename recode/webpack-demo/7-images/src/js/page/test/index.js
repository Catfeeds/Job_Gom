require('scss/module/test4.scss');
console.log('src/js/page/test/index.js!!');
var tpl = require('./1.tpl');

var dom = tpl({
	num:2
})

console.log(dom)