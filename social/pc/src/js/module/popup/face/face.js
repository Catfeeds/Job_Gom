var emojis = require('./emoji');
var backward = require('./backward');
var faceTpl = require('./face.tpl');

var faceReg,
    faceUrl,
    defaultIndex = 0;

// 将表情转换成map
var emojiMap = {};

// 数据适配转换
var makeData = function(data) {
    var total = data.length;
    var offset = 24;
    var page = Math.ceil(total / offset);
    var list = [];

    for (var i = 0; i < page; i++) {
        list[i] = [];
        var end = offset * (i + 1);
        end = end > total ? total : end;
        for (var j = i * offset; j < end; j++) {
            var emoji = data[j];
            list[i].push(emoji);
            emojiMap[emoji.name] = emoji.url;
        }
    }
    return {
        page: new Array(page),
        list: list
    };
};
// 表情层显示
var show = function(x, y) {
    setShowIndex(0);
    $('[data-node=faceBox]').css({
        left: x + 'px',
        top: y + 'px'
    }).show();
};
// 表情层隐藏
var hide = function() {
    $('[data-node=faceBox]').hide();
};
// tab方式显示所选页
var setShowIndex = function(index) {
    index = index || defaultIndex;

    $('[data-action=facePage] > li').eq(index).addClass('active').siblings('li').removeClass('active');
    $('[data-node=faceList] > div').eq(index).removeClass('hide').siblings('div').addClass('hide');
};

/**
 * 插入表情，回调数据
 * @param  {Function} fn     回调函数
 * @param  {Boolean}  isHide 点击表情后是否隐藏表情浮层，默认隐藏
 * @return {[type]}          null
 */
var insertFace = function(fn, isHide) {
    $('body').on('click', '[data-face]', function(e) {
        e.preventDefault();
        e.stopPropagation();
        faceReg = $(this).data('face');
        faceUrl = $(this).attr('src');
        fn({
            reg: faceReg,
            url: faceUrl
        });
        isHide !== false && $('[data-node=faceBox]').hide();
    });
};
// 初始化表情弹层
var initHTML = function(fn) {
    var data = makeData(emojis);
    var faceHTML = faceTpl(data);
    $('body').append(faceHTML);
    fn();
};
// 初始化事件
var initEvent = function() {
    $('body').on('click', '[data-node=faceBox]', function(e) {
        e.stopPropagation();
    });
    $(document).on('click', function() {
        $('[data-node=faceBox]').hide();
    });
    // 分页切换显示
    $('[data-node=faceBox]').on('mouseenter', '[data-action=facePage] > li', function() {
        var index = $(this).index();
        setShowIndex(index);
    });
};

var isEmpty = function(obj) {
    var ret = true;
    for (var key in obj) {
        ret = false;
        break;
    }
    return ret;
};

// 把表情占位符替换成img
var parseEmoji = function(str) {
    var r = /(\[([\s\S]+?)\])/g;
    if (isEmpty(emojiMap)) {
        makeData(emojis);
    }

    return str.replace(r, function(s, $1, name) {
        var img = emojiMap[name];
        if (img) {
            return '<img width="22" height="22" src="' + img + '" />';
        } else {
            // 兼容旧版表情
            var old = backward[name];
            if (old) {
                return '<img width="22" height="22" src="' + old.url + '" />';
            }
            return s;
        }
    });
};

var init = function() {
    initHTML(initEvent);
};

module.exports = {
    init: init,
    insert: insertFace,
    show: show,
    hide: hide,
    parseEmoji: parseEmoji
};