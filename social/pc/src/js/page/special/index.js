var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

var $nav = $('[data-node=nav]');
var $sideNav = $('[data-node=sideNav]');
var $ticket = $('[data-action=ticket]');
var $top = $('[data-action=top]');
var $doc = $(document);

var active = 'active';

//控制样式
$('div[data-sort]').eq(0).css({
    padding: '10px 0 0 0'
});

$sideNav.css({
    'margin-bottom': -($sideNav.height() / 2)
});

//nav列表切换
var showNavList = function() {
    var $this = $(this);
    var parent = $this.parent();
    var arr = [];
    var name = $this.data('name');
    var num = $this.data('rand');
    if (!$this.hasClass(active + num)) {
        $.each(parent.find('a'), function(i, v) {
            arr.push($(v).data('rand'));
            parent.find('a').removeClass(active + arr[i]);
        });
        $this.addClass(active + num);
        parent.nextAll().hide();
        parent.nextAll('div[data-name=' + name + ']').show();
    } else {
        console.log(2);
        return false;
    }
};

//side-nav
var sideNav = function() {
    var index = $(this).data('modelindex');
    var $ele = $doc.find('div[data-sort=' + index + ']');
    var offsetT = $ele.offset().top;
    $doc.scrollTop(offsetT);
};

//领取优惠劵
var sendData = function(id) {
    fetch.post(url.get('cartGetRedPacket'), {
        validate: true,
        data: {
            batchSn: id
        },
        onLogin: function() {
            sendData(id);
        }
    }).done(function(data) {
        var surplus = data.data.userRemainingAvailableQuantity;
        var msg = '您还可以领取' + surplus + '次';
        if (surplus < 1) {
            msg = '领取次数已达上限';
        }
        if (data && data.success && data.code === 200) {
            alert('领取成功！优惠券已放入您的个人账户！<br>' + msg);
        } else {
            alert(data.message);
        }
    }).fail(function(data) {
        alert(data.message);
    });
};
var getTicket = function() {
    var $this = $(this);
    var id = $this.data('id');
    sendData(id);
};

//top置顶
var scrollT = function() {
    $doc.scrollTop(0);
};

$nav.on('click', 'a', showNavList);
$sideNav.on('click', 'a[data-modelindex]', sideNav);
$ticket.on('click', getTicket);
$top.on('click', scrollT);