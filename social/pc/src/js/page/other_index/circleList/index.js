/**
 * 他人主页圈子列表
 * @author QiaoLi
 */

var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var circle = require('./circleList.tpl');
var noCircle = require('./no_circle.tpl');

require('module/tmodHelper/showPic')();

var $circleList = $('[data-node=circleList]');
var $page = $('[data-node=page]');
var $pre = $('[data-action=pre]');
var $next = $('[data-action=next]');

var hide = 'hide';
var disabled = 'disabled';

var index = 0;
var circleData = "";

var getIndex = function(index, maxLength) {
    if (index === 0) {
        if (maxLength > 1) {
            $pre.addClass(disabled);
            $next.removeClass(disabled);
        } else {
            $page.addClass(hide);
        }
    } else if (index > 0 && index < maxLength - 1) {
        $pre.removeClass(disabled);
        $next.removeClass(disabled);
    } else {
        $next.addClass(disabled);
        $pre.removeClass(disabled);
    }
};

var getCircleList = function() {
    fetch.get(url.get('othersCircle'), {
        data: {
            ownerUserId: $_CONFIG.ownerUserId,
            pageNum: 1
        }
    }).done(function(data) {
        if (data.success === true) {
            circleData = data.data;
            var groups = circleData.groups;
            if (groups.length === 0) {
                $circleList.html(noCircle());
                $page.addClass(hide);
            } else {
                var list = [];
                for (var i = 0; i < groups.length; i += 9) {
                    list.push(groups.slice(i, i + 9));
                }
                circleData.list = list;
                fillContent(index);
                getIndex(index, circleData.list.length);
            }
        } else {
            alert(data.message);
        }
    }).fail(function(data) {
        alert(data.message);
    });
};

var fillContent = function(index) {
    circleData.list[index].groupDomain = $_CONFIG.group_domain;
    var html = circle({
        list: circleData.list[index]
    });
    $circleList.append(html);
};

var changeContent = function(t, num) {
    var $this = $(t);
    if ($this.hasClass(disabled)) {
        return false;
    } else {
        index = index + num;
        $('[data-node=circleList] li').remove();
        fillContent(index);
        getIndex(index, circleData.list.length);
    }
    return false;
};

var init = function() {
    getCircleList();
    $pre.on('click', function() {
        changeContent(this, -1);
    });
    $next.on('click', function() {
        changeContent(this, 1);
    });
};
module.exports = {
    init: init
};