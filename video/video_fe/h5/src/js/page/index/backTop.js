/**
 * [transform back top]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
function backTop(){
	var transformVal = '';
	var translateY_reg = /-\d+/;
	var translateY;
	var timer = null;

	var scrollerCls = '.scroller';
	var $videoList = $('#videoList');
	var $videoListScroller = $videoList.find(scrollerCls);
	var oneScrollHeight = 50 - $videoList.height();

	var $gotoTopDom = $('<div class="back-top" id="back-top"><em class="icon-2"></em></div>');
	$("body").append($gotoTopDom);
	$gotoTopDom.on("click",function(){
		$videoListScroller.css('transform','translateY(-40px)');
	});

	$videoList[0].addEventListener('touchstart',function(){
		clearTimeout(timer);
	});

	$videoList[0].addEventListener('transitionend',function(e){
		clearTimeout(timer);
		timer = setTimeout(function(){
			transformVal = $videoListScroller.css('transform');
			translateY = transformVal.match(translateY_reg)[0]/1;
			if (translateY < oneScrollHeight) {
				$gotoTopDom.show();
			}else{
				$gotoTopDom.hide();
			}
		},500);
	});

}

export default backTop;