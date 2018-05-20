var tabWidget = require('./tabWidget/index');

var $circleFloor = $('[data-node = circleFloor]');
var $circleTabBox = $circleFloor.find('[data-node=travelTags]');
var $moneyFloor = $('[data-node = moneyFloor]');
var $moneyTabBox = $moneyFloor.find('[data-node=moneyTags]');
window._$ = $;
var clickFn = function(){
	var $this = $(this);
	$this.siblings().removeClass('hoverCls');
	$this.addClass('hoverCls');
	var floorName = $this.parents('[floor-node]').attr('floor-node');
	var tagName = $this.text();
	tabWidget(floorName,tagName,$this);
};
var initEvent = function(){
	$circleTabBox.on('click','a',clickFn);
	$moneyTabBox.on('click','a',clickFn);
};
module.exports.init = initEvent;