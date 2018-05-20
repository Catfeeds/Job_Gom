/**
 * 抢红包活动
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var prizesList = require('./prizesList.tpl');

var $total = $('[data-node=total]');
var $prizesList = $('[data-node=prizesList]');
var timerForStatus = null;

//获取中奖总金额
var getTotal = function() {
    fetch.get(url.get('getTotalAmount')).done(function(data) {
        if (data.success === true) {
            $total.text(data.data.total_amount);
            timer(getTotal);
        } else {
            timer(getTotal);
        }
    }).fail(function() {
        timer(getTotal);
    });
};

//获取单次中奖金额大于20元的记录
var getPrizesList = function() {
    fetch.get(url.get('getPrizesList')).done(function(data) {
        if (data.success === true) {
            $prizesList.html(prizesList({
                prizes: data.data
            }));
            listScroll();
            timer(getPrizesList);
        } else {
            timer(getPrizesList);
        }
    }).fail(function() {
        timer(getPrizesList);
    });
};

var timer = function(fn) {
    fn.timer = null;
    clearTimeout(fn.timer);
    fn.timer = setTimeout(fn, 180000);
};

var listTimer = null;
var listScroll = function() {
    var listHTML = $prizesList.html();
    var listHeight = $prizesList.height();
    var listWrapHeight = 141;
    var offset = 1;
    var top = 0;
    var speed = 30;

    if (listHeight > listWrapHeight) {
        listHTML += listHTML;
        $prizesList.html(listHTML);

        function scroll() {
            top = top - offset;
            if (top <= -listHeight) {
                top = 0;
            }
            $prizesList.css('top', top);
            clearTimeout(listTimer);
            listTimer = setTimeout(scroll, speed);
        }
        scroll();
    }
};

var init = function() {
    timer(getTotal);
    timer(getPrizesList);
    listScroll();

};
init();