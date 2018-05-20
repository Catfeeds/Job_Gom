/**
 * [购物车领取优惠券]
 * @Author: Fu Xiaochun
 * @Email:     fuzhengchun@gomeplus.com
 */

var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var redPackListTpl = require('./tickets.tpl');
var dateFormat = require('module/dateFormat');

var tipsMsg = {
    success: '领取成功',
    fail: '领取失败，请稍后重试',
    loginLose: '登录失效，请重新登录',
    loadFail: '加载失败。。。'
};

// 节点变量
var ticketsNode = '[data-node=tickets]';
var showTicketsNode = '[data-action=showTickets]';
var redPackListNode = '[data-node=redPackList]';

// load tickets list
function loadTicketsList() {
    $(showTicketsNode).on('click', function(e) {
        e.stopPropagation();
        var $position = $(this).position();
        var left = $position.left - 80;
        var $thisTicketsBox = $(this).parents('td').find(ticketsNode);
        var $thisTicketsList = $thisTicketsBox.find(redPackListNode);
        $thisTicketsList.html('<li>加载中。。。</li>');
        $thisTicketsBox.css({
            left: left
        }).show();

        $(this).parents('table').siblings('table').find(ticketsNode).hide();

        var shopId = $(this).data('shopid');
        var failTipsHtml = '<li>' + tipsMsg.loadFail + '</li>';

        // 渲染店铺券列表
        fetch.get(url.get('cartGetRedPacketList'), {
            data: {
                shopId: shopId
            }
        }).done(function(data) {
            if (data.success === true) {
                var redPackList = data.data.batches;
                var list = [];
                $.each(redPackList, function(k, v) {
                    var rpList = {};
                    rpList.id = v.batchSn;
                    rpList.timeType = v.timeType;
                    rpList.quantities = v.quantities[0];
                    rpList.timeLimit = Math.ceil(v.timeLimit / 86400);
                    rpList.money = Math.floor(v.money / 100);
                    rpList.baseMoney = v.usageRule.minAmount / 100;
                    rpList.bTime = dateFormat(v.useStartTime, 'Y.M.D');
                    rpList.eTime = dateFormat(v.useEndTime, 'Y.M.D');
                    list.push(rpList);
                });
                var html = redPackListTpl({
                    redPackList: list
                });
                $thisTicketsList.html(html);
            } else {
                if (data.code == 881011) {
                    $thisTicketsBox.hide();
                    alert(tipsMsg.loginLose);
                } else {
                    $thisTicketsList.html(failTipsHtml);
                }
            }
        }).fail(function() {
            $thisTicketsList.html(failTipsHtml);
        });
    });
}

// getTickets
function getTickets() {
    var gotTicket = true;
    $(ticketsNode).on('click', '[data-action=getTicket]', function(e) {
        e.preventDefault();
        var ticketSn = $(this).data('ticketid');
        var $this = $(this);

        if (gotTicket) {
            gotTicket = false;
            fetch.post(url.get('cartGetRedPacket'), {
                data: {
                    batchSn: ticketSn
                }
            }).done(function(data) {

                var surplus = 0;
                var msg = '';

                if (data.success === true) {
                    surplus = data.data.userRemainingAvailableQuantity;
                    msg = '还可以领取' + surplus + '张';

                    if (surplus < 1) {
                        msg = '领取次数已达上限';
                        $this.removeAttr('data-action').addClass('disabled').html('已领取');
                    }

                    alert(tipsMsg.success + '，' + msg);

                } else {
                    if (data.code == 881011) {
                        alert(data.message);
                    } else {
                        if (data.code == 422) {
                            $this.removeAttr('data-action').addClass('disabled').html('已领取');
                        }
                        alert(data.message);
                    }
                }
            }).fail(function() {
                alert(tipsMsg.fail);
            }).always(function() {
                gotTicket = true;
            });
        }

    });
}

function init() {

    // 显示领券
    $(ticketsNode).on('click', function(e) {
        e.stopPropagation();
    });

    loadTicketsList();

    // 隐藏领券
    $('[data-action=close]').on('click', function() {
        $(this).parents(ticketsNode).hide();
    });

    // 点击领券
    getTickets();
}

module.exports = {
    init: init
};