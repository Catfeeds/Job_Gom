require('lazyload');
$("img").lazyload({ effect : "fadeIn"});
var pageBreak = require('./pageBreak');
var showBrand = require('./showBrand');
var price = require('./price');
var rebate = require('./rebate');
var chooseAddress = require('./chooseAddress');

//展示品牌、切换品牌
showBrand.init();
//设置价格
price.init();
//返利、直降
rebate.init();
//选择配送地址
chooseAddress.init();
//翻页
pageBreak.init();




