var init = function($els) {
/**
 * 滚动条
 */
    var $cont = $els.find(`[data-node="popup-cont"]`);
    var $wrap = $els.find(`[data-node="popup-box"]`);
    var $scrollBar = $els.find(`[data-node="bar"]`);
    var $wrapScrollBar = $els.find(`[data-node="scroll_bar"]`);
    console.log($cont, $wrap, $scrollBar, $wrapScrollBar)
    var $ch = $cont.height();
    var $wh = $wrap.height();
    //设置滚动按钮宽度
    $scrollBar.height($wh * $wh / $ch);

    var $sh = $scrollBar.height();
    var disY = 0;
    //滚动条拖动事件
    $scrollBar.mousedown(function(event) {
        disY = event.pageY - $(this).position().top;
        if (this.setCapture) {
            $(this).mousemove(function(event) {
                fnChangePos(event.pageY - disY);
            });
            this.setCapture(); //设置捕获范围
            $scrollBar.mouseup(function() {
                $(this).unbind('mousemove mouseup');
                this.releaseCapture(); //取消捕获范围
            });
        } else {
            $(document).mousemove(function(event) {
                fnChangePos(event.pageY - disY);
            });
            $(document).mouseup(function() {
                $(document).unbind('mousemove mouseup');
            });
        }
        return false;
    });
    function fnChangePos(data) {
        if (data < 0) data = 0;
        else if (data > ($wh - $sh)) data = $wh - $sh;
        $scrollBar.css('top', data);
        $cont.css('top', -($ch - $wh) * data / ($wh - $sh));
    }

    //鼠标在滚动条上点击或滚动滚轮单次移动的距离
    var cMoveDis = 160;
    //滚动条单击事件注册
    $wrapScrollBar.click(function(event) {
        var relDisY = event.pageY - $(this).offset().top;
        if (relDisY > ($scrollBar.position().top + $sh)) {
            fnChangePos($scrollBar.position().top + cMoveDis)
        } else if (relDisY < $scrollBar.position().top) {
            fnChangePos(($scrollBar.position().top - cMoveDis))
        };
    });
    //阻止事件冒泡
    $scrollBar.click(function(event) {
        event.stopPropagation();
    });

    //滚动条鼠标滚轮事件注册
    if ($wrap[0].addEventListener) {  //for firefox
        $wrap[0].addEventListener("DOMMouseScroll", fnMouseWheel);
    }
    $wrap[0].onmousewheel = fnMouseWheel; // for other browser

	//鼠标在滚动条上点击或滚动滚轮单次移动的距离
    var sMoveDis = 30;
    //鼠标滚轮事件处理函数
    function fnMouseWheel(e) {
        var evt = e || window.event;
        var wheelDelta = evt.wheelDelta || evt.detail; //鼠标滚动值，可由此判断鼠标滚动方向
        if (wheelDelta == -120 || wheelDelta == 3) fnChangePos($scrollBar.position().top + sMoveDis);
        else if (wheelDelta == 120 || wheelDelta == -3) fnChangePos($scrollBar.position().top - sMoveDis);
        return false;
    }
}

module.exports = {
	init : init
}
