/*
 *@author:dongyukuan
 *@desc:加载更多
 *@date:2017/6/12
 */
var getList = require('./getList');

var $getMore = $('[data-action=getMore]');
var $loading = $('[data-node=loading]');
var clickFlag = 1; //点击开关
$getMore.on('click', function() {
    var pageNum = $getMore.attr('data-pageNum');
    var nextNum = +pageNum + 1;
    if (!clickFlag) return;
    clickFlag = 0;
    $getMore.addClass('none');
    $loading.removeClass('none');
    getList.init(nextNum, function(result) {
        clickFlag = 1;
        if (result.code == 200) {
            $getMore.attr('data-pageNum', nextNum);
            $loading.addClass('none');
        }else{
            $getMore.removeClass('none');
            $loading.addClass('none');
        }
    });
})
