/**
 *
 * 赞/取消赞
 */
var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var checkLoginStatus = require('module/checkLoginStatus');

var isLogin = checkLoginStatus();   //页面初始化是否登录判断   

var noop = function() {};
var setData = function($node, praise, count) {
    $node.data('praise', praise);
    $node.data('count', count);
};

var helper = {
    normal: {
        add: function($node, data, count) {
            $node.find('em').addClass('active');
            if (!count) {
                count = "取消点赞";
            }
            $node.find('span').text(count);

        },
        reduce: function($node, data, count) {
            $node.find('em').removeClass('active');
            if (!count) {
                count = "点赞";
            }
            $node.find('span').text(count);
        }
    }
};

var getCallback = function(mode) {
    return helper[mode];
}

var praise = function(container, selector, options) {
    var $container = $(container);
    var onPraise = options.onPraise || noop;
    var onUnPraise = options.onUnPraise || noop;
    var onPraised = options.onPraised || noop;
    var mode = options.mode || 'normal';

    $container.on('click', selector, function() {
        var $this = $(this);
        var firing = $this.data('firing');
        if (firing === 1) {
            return;
        }

        $this.data('firing', 1);
        var t = $this.data('type');
        var isPraise = $this.data('praise');
        var id = $this.data('id');
        var count = $this.data('count');

        var objs = {
                validate: true,
                data: {
                    id: id,
                    type: t, // 0 店铺,  1 话题
                    isPraise: isPraise // 0 取消点赞, 1 点赞
                },
                onLogin: noRefreshFetch,
                refresh:true
            }

        //无刷新登录
        function noRefreshFetch (o) { 
            fetch.post(url.get('praise'), o)
            .done(function(data, textStatus, jqXHR) {
                var callbacks = getCallback(mode);
                //推送 评论区状态
                Pubsub(channel.comment.enableEditor).pub({
                    pid: "enable"
                });

                if (data && data.code === 200 && data.success) {
                    if (isPraise === 1) {
                        setData($this, 0, ++count);
                        callbacks.add($this, data, count);
                        onPraise.call($this, data, count);
                    } else if (isPraise === 0) {
                        setData($this, 1, --count);
                        callbacks.reduce($this, data, count);
                        onUnPraise.call($this, data, count);
                    }
                } else if (data && data.code === 422) {
                    // window.location.href = $_CONFIG.passport_domain + 'login/index';
                } else if (data && data.code === 403) {
                    alert('抱歉！该话题审核未通过', {
                        ok: function() {
                            window.location.href = $_CONFIG.group_domain + 'index/error?code=topic';
                        }
                    });
                } else {
                    var message = data.message;
                    //409点过赞  已经登录 把点赞状态回带，不刷新
                    if (data.code === 409) {

                        onPraised.call($this, data, count);

                        if(isLogin) {
                            alert(message);
                        }
                        
                        return false;
                    }
                    if (t === 0) {
                        if (data.code === 404) {
                            alert(message, {
                                ok: function() {
                                    window.location.reload();
                                }
                            });
                        } else {
                            alert(message);
                        }
                    } else {
                        alert(message);
                    }
                }
                
            }).fail(function(jqXHR, textStatus, errorThrown) {
                // 点赞失败时,如何处理
            }).always(function() {
                $this.data('firing', 0);
            });
        }

        noRefreshFetch(objs);
        return false;
    });
};

module.exports = praise;