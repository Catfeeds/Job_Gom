/**
 *
 * 赞/取消赞
 */
var fetch = require('io/fetch');
var url = require('io/url');
var noop = function() {};

var setData = function($node, collect, count) {
    $node.data('collect', collect);
    $node.data('count', count);
};

var helper = {
    normal: {
        add: function($node, data, count) {
            $node.find('em').addClass('active');
            $node.find('span').text(count);
        },
        reduce: function($node, data, count) {
            $node.find('em').removeClass('active');
            $node.find('span').text(count);
        }
    },
    goodInfoCollect: {
        add: function($node) {
            $node.addClass('active');
        },
        reduce: function($node) {
            $node.removeClass('active');
        }
    }
};

var getCallback = function(mode) {
    return helper[mode];
}

var collect = function(container, selector, options) {
    var $container = $(container);
    var onCollect = options.onCollect || noop;
    var onUnCollect = options.onUnCollect || noop;
    var onFailed = options.onFailed || noop;
    var mode = options.mode || 'normal';

    $container.on('click', selector, function() {
        var $this = $(this);
        var firing = $this.data('firing');
        if (firing === 1) {
            return;
        }

        $this.data('firing', 1);

        var isCollect = $this.attr('data-isCollect');
        var count = $this.data('count');
        var urlAddress = ~~isCollect === 0 ? url.get('productUnCollect') : url.get('productCollect');

        var objs = {
            validate: true,
            data: {
                shopId: $_CONFIG.shopId,
                productId: $_CONFIG.productId
            },
            onLogin: noRefreshFetch,
            refresh: true
        }

        //无刷新登录
        function noRefreshFetch(o) {
            fetch.post(urlAddress, o)
                .done(function(data /*, textStatus, jqXHR*/ ) {
                    var callbacks = getCallback(mode);
                    if (data && data.code === 200 && data.success) {
                        if (~~isCollect === 1) {
                            $this.attr('data-isCollect', 0);
                            setData($this, 0, ++count);
                            callbacks.add($this, data, count);
                            onCollect.call($this, data, count);
                        } else if (~~isCollect === 0) {
                            $this.attr('data-isCollect', 1);
                            setData($this, 1, --count);
                            callbacks.reduce($this, data, count);
                            onUnCollect.call($this, data, count);
                        }
                    } else {
                        onFailed.call($this);
                    }
                }).fail(function() {
                    onFailed.call($this);
                }).always(function() {
                    $this.data('firing', 0);
                });
        }

        noRefreshFetch(objs);
        return false;
    });
};

module.exports = collect;