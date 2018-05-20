var Dialog = require('dialog');
var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var tpl = require('./content.tpl');
var alert = require('module/popup/alert');
var truncate = require('utils/truncate');
var byteLen = require('utils/byteLen');

require('module/tmodHelper/randomShowPic')();

//  TODO: (待完成事项)
//  圈子名称截断
//  圈子加载失败(超时)时是否重新加载

var $selected; // 已选中的圈子
var activeCls = 'active';
var selectedGroup = {}; // 选中的圈子信息
var loading = '<div data-node="loading" class="loading"><img src="' + $_CONFIG.imgpath + '/images/public/loading.gif"></div>';
var reload = '<p data-node="reload" class="failed-txt">数据获取失败，点击<a data-node="btn_reload" href="javascript:;" style="color:#f95353">重新加载</a>！</p>';


var getGroups = function() {
    return fetch.get(url.get('selectGroup'));
};

var select = function(e) {
    var $current = $(this);
    var id = $current.data('id');
    // if (selectedGroup && selectedGroup.id !== id && selectedGroup.id) {
    if ($selected) {
        $selected.removeClass(activeCls);
    }
    $current.addClass(activeCls);
    // } else {
    //     $current.addClass(activeCls);
    // }
    $selected = $current;
    selectedGroup = {
        id: id,
        name: $selected.data('name')
    };
    return false;
};

var unselect = function() {
    return false;
};

var bindHandler = function(bool) {
    var $content = this._$('content');
    $content[bool ? 'off' : 'on']('click', 'dl', select);
};


var create = function(options) {
    options = options || {};
    var defaults = {
        title: '选择圈子',
        modal: true,
        fixed: true,
        content: loading,
        className: 'pop-box',
        okValue: '确定',
        okCls: 'pc-btn pc-btnh35 circle-pop-btn',
        btnWrapCls: 'insert-cancel',
        ok: function() {
            if (!selectedGroup.id) {
                alert('请选择一个圈子');
                return false;
            }
            Pubsub(channel.postTopic.selectCircle).pub(selectedGroup);
            //selectedGroup就是抛出来的数据
            //将需要的数据拼好
        },
        cancel: function() {
            bindHandler.call(this, true);
        },
        onshow: function() {
            var self = this;
            var groupid;
            if ($('[data-action=selectGroup]').attr('data-groupid')) {
                groupid = $('[data-action=selectGroup]').attr('data-groupid');
            }
            getGroups().done(function(json) {
                // TODO: 隐藏loading
                if (json && json.code === 200) {
                    // 处理数据
                    var data = json.data || {};
                    var relatedGroups = data.myRelatedGroups || {};
                    var created = relatedGroups.imaster || [];
                    var joined = relatedGroups.imember || [];

                    var recommendGroups = data.recommendGroups || {};
                    var recommend = recommendGroups.peas || [];
                    //添加推荐圈子数量限制和查重
                    var usedObj = created.concat(joined);
                    //数组去重
                    function dupRemove(useObj, contrastObj) {
                        var arr = [];
                        var dup = 0;
                        for (var i = 0; i < useObj.length; i++) {
                            for (var j = 0; j < contrastObj.length; j++) {
                                if (contrastObj[j].id == useObj[i].id) {
                                    dup = 1;
                                    break;
                                } else {
                                    dup = 0;
                                }
                            }
                            if (arr.length < 12) {
                                if (dup == 0) {
                                    arr.push(useObj[i]);
                                }
                            } else {
                                return arr;
                            }
                        }
                        return arr;
                    }
                    var newObj = dupRemove(recommend, usedObj)
                    var data = {
                        created: created,
                        joined: joined,
                        recommend: newObj
                    };
                    // 生成字符串
                    var html = tpl(data);
                    // 设置内容
                    self.content(html);
                    // 绑定事件
                    if (groupid && $('[data-id=' + groupid + ']')) {
                        $('[data-id=' + groupid + ']').addClass('active');
                        $selected = $('[data-id=' + groupid + ']');
                    }
                    bindHandler.call(self);
                } else {
                    self.content(reload);
                    $('[data-node=btn_reload]').on('click', function() {
                        create();
                    })
                }
            }).fail(function() {
                self.content(reload);
            }).always(function() {

            });
        },
        onclose: function() {
            bindHandler.call(this, true);
        }
    };

    $.extend(true, defaults, options);
    var d = Dialog(defaults);
    d.show();
    return d;
};

//测试数据
Pubsub(channel.postTopic.selectCircle).sub(function(group) {
    console.log(group);
})

module.exports = create;