//引入:引入文件 在input后调用
//参数:
//row:推荐昵称的显示条数 默认：2/number
//tip:提示文本的内容 默认:昵称已被占用，请修改或使用推荐昵称/string  
var fetch = require("io/fetch");
var url = require('io/url');
var moduleTrim = require("utils/trim");
var byteLen = require('utils/byteLen');
require('textchange');
var truncate = require('utils/truncate');
var inputTip = require("module/i18n");

var obj = function(params) {
    var defaultOptions = {
        row: 2,
        tip: '昵称已被占用，请修改或使用推荐昵称'
    }
    var options = $.extend({}, true, defaultOptions, params);
    var $node = $('[data-node=list-content]');
    this.row = options.row;
    this.tip = options.tip;
    this.$input = $node.find('[data-node=nickname_input]');
    this.$checkMark = $node.find('[data-node=nickname_allright]');
    this.$tip = $node.find('[data-node=nickname_span]');
    this.$list = $node.find('[data-node=nick-name-list]');
    this.$recommend = $node.find('[data-node=nick-name-recommend]');
    this.$pubErrBox = $node.find('[data-node=publicErrBox]');
}

$.fn.extend({
    hidden: function() {
        this.css('visibility', 'hidden');
        return this;
    },
    visible: function() {
        this.css('visibility', 'visible');
        return this;
    }
})

//验证
obj.prototype.validate = function() {
    return {
        //为空验证
        checkNull: function(val) {
            return moduleTrim(val) == "" ? true : false;
        }
    }
}

obj.prototype.focus = function(e) {
    this.$checkMark.hide();
    this.$tip.hidden();
    this.$pubErrBox.addClass('none');
}

obj.prototype.textchange = function(e) {
    var val = this.$input.val();
    // console.log(val)
    if (byteLen(val) > 20) {
        this.$input.val(truncate(val, 20));
    }
}
var flag = false;
obj.prototype.blur = function(callback) {
    callback = callback || function() {};
    var _this = this;
    if (_this.validate().checkNull(_this.$input.val())) {
        _this.$tip.html(inputTip.nickName.commonTip).visible();
        flag = false;
    } else {
        var val = _this.$input.val();
        fetch.post(url.get("checkNickname"), {
            data: {
                "nickname": val
            }
        }).done(function(data, textStatus, XHR) {
            // data = {
            //     "success": true,
            //     "code": 0,
            //     "message": "成功",
            //     "data": {
            //         "isAvailable": false,
            //         "isSensitiveWord": false,
            //         "recommendedNicknames": [
            //             "美美_good",
            //             "美美_nice"
            //         ]
            //     }
            // }
            if (data.success) {
                if (data.data.isSensitiveWord) {
                    _this.$checkMark.hide();
                    _this.$tip.html(inputTip.nickName.wrongName).visible();
                    flag = false;
                } else {
                    if (data.data.isAvailable) {
                        _this.$checkMark.show();
                        _this.$list.children().remove();
                        _this.$tip.hidden();
                        flag = true;
                    } else {
                        _this.$list.children().remove();
                        var recommend = data.data.recommendedNicknames;
                        var rowlength = recommend.length <= _this.row ? recommend.length : _this.row;
                        _this.$list.append('<p>' + _this.tip + '</p>');
                        for (var i = 0; i < rowlength; i++) {
                            _this.$list.append('<a href="javascript:;">' + recommend[i] + '</a>');
                        }
                        _this.$list.show();
                        flag = false;
                    }
                }
            } else {
                flag = false;
                if (data.message == '请输入4-20个字符') {
                    _this.$tip.html(inputTip.nickName.commonTip);
                } else {
                    _this.$tip.html(data.message);
                }
                _this.$tip.visible();
            }
            callback(flag);
        }).fail(function(XHR, textStatus, errorThrown) {
            alert("数据请求失败 请稍后尝试");
            flag = false;
            callback(flag);
        });
    }
    return flag;
}

$.fn.nickname = function(params) {
    var _this = $(this);
    var init = new obj(params);
    init.$list.on('click', 'a', function(e) {
        _this.val($(e.target).html());
        init.$list.hide()
        init.$checkMark.show();
        flag = true;
    })
    _this.on({
        blur: function() {
            init.blur.call(init);
        },
        focus: function() {
            init.focus.call(init);
        },
        textchange: function() {
            init.textchange.call(init);
        }
    })
}
module.exports = new obj();