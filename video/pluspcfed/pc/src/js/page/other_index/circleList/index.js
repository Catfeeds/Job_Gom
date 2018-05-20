/**
 * Ta的主页 右侧列表
 * @author QiaoLi
 */

require('module/tmodHelper/showPic')();
var fetch = require('io/fetch');
var url = require('io/url');
var circle = require('module/joinCircle');
var alert = require('module/popup/alert');
var $circleList = $('[data-node=circleList]');
var $page = $('[data-node=page]');
var $pre = $('[data-action=pre]');
var $next = $('[data-action=next]');

var hide = 'hide';
var disabled = 'disabled';

var index = 1;
var total = $_CONFIG.qzsl;
var maxLength = $circleList.length;
var getIndex = function(index) {
    if (total < 9) {
        $page.addClass(hide);
    } else {
        if (index === 1) {
            $pre.addClass(disabled);
            $next.removeClass(disabled);
        } else if (index === maxLength) {
            $pre.removeClass(disabled);
            $next.addClass(disabled);
        } else {
            $pre.removeClass(disabled);
            $next.removeClass(disabled);
        }
    }
};

// 切换圈子列表 翻页
var changeContent = function(t, num) {
    var $this = $(t);
    if ($this.hasClass(disabled)) {
        return false;
    } else {
        index = index + num;
        $circleList.hide();
        $circleList.eq(index - 1).show();
        getIndex(index);
    }
    return false;
};

var init = function() {
    getIndex(1);

    //圈子列表按钮 上一页
    $pre.on('click', function() {
        changeContent(this, -1);
    });
    //圈子列表按钮 下一页
    $next.on('click', function() {
        changeContent(this, 1);
    });
    
    // 点击加入圈子
    $('[data-action="joinCircle"]').on('click',{
        done:function(str, $els){
            var $this = $(this);
            if( str == 'join' ){
                $els.attr('data-membertype', 0);
                $els.removeAttr('data-action');
                $els.off('click');
                $els.addClass('joined');
                $els.attr('href', $els.attr('data-href'));
            }else if( str == 'joined' ){
                $els.addClass('joined');
                $els.attr('href', $els.attr('data-href'));
                $els.attr('target', '_blank');
                $els.off('click');
            }else if( str == 'joining' ){
                $els.addClass('joined');
                $els.html('审核中');
            }else if( str == 'exit' ){
                $els.attr('data-membertype', 1);
                $els.removeClass('joined');
            }
        },
        word: { join : '+ 加入圈子', focus : '<i></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已加入' }
    }, circle);

    // 判断宽窄屏
    /*screenChange();
    window.onresize = function (){
        screenChange();
    };*/
};
// 判断宽窄屏
/*var screenChange = function(){
    $(window).width() > 1000 ? $('.wrap-box').removeClass('wrap-boxS') : $('.wrap-box').addClass('wrap-boxS');
};
*/
module.exports = {
    init: init
};
