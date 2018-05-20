//判断是否窄屏
require('./screenLit').init();
//获取首页动态数据
require('./getData').init();
//轮播
var slider = require('./slider');
slider.bannerSlider();
slider.ggSlider();
//图片懒加载
require('./imgLazyload');
//热门内容tab切换
require('./hotConTab');
//初始化楼层tab切换
require('./tabChange').init();
//初始化加入圈子
require('./joinCircle').init();
//不断寻觅滚动加载
require('./goon/index').init();
