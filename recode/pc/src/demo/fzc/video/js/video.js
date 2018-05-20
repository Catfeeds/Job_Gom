(function() {

    var shareWX = function() {
        var $wx;
        var initNode = function() {
            if (!$wx) {
                var wxBox =
                    '<div class="share-weixin">' +
                    '<div class="wx-mask"></div>' +
                    '<div class="wx-main">' +
                    '<div class="wx-code"><span></span>' +
                    '<img data-node="qrcode" alt="分享到微信" />' +
                    '</div>' +
                    '<p>打开微信扫一扫，即可分享</p>' +
                    '<a href="#" title="点击关闭" class="wx-close" data-action="close">×</a>' +
                    '</div>' +
                    '</div>';
                $wx = $(wxBox);
                $('body').append($wx);
            }
            return $wx;
        };

        var init = false;
        var share = function(link) {
            var $node = initNode();
            if (!init) {
                var qrcode = $node.find('[data-node=qrcode]');
                qrcode[0].src = link;

                $wx.on('click', '[data-action=close]', function() {
                    $wx.hide();
                    return false;
                });
                init = true;
            }
            $node.show();
        };

        // 微信分享
        var weixinCode = 'https://www.gomeplus.com/ajax/qrcode/urlcode';
        $('[data-action=shareWX]').on('click', function() {
            var link = weixinCode + '?url=' + window.location.href;
            share(link);
        });
    };

    shareWX();

    // 社交按钮覆盖变化
    $('[data-node=shareBar]').on('mouseenter', 'a > em', function() {
        var $this = $(this);
        $this.html($this.data('active'));
        return false;
    }).on('mouseleave', 'a', function() {
        var $this = $(this);
        $this.html($this.data('init'));
        return false;
    });

    // 弹层分享链接地址
    $('[data-node=sharemore]').on('click', 'em', function() {
        $(this).hide().siblings('em').show();
        $('[data-node=shareLink]').toggle();
    });

    // 内容展开收起
    $('[data-node=videoText]').on('click', 'a', function() {
        $(this).parent('div').hide().siblings('div.text').show();
    });

    // 分享链接复制到剪切板
    $('[data-node=copyBtn]').each(function(client, ele) {
        client = new ZeroClipboard(ele);
        client.on("ready", function(readyEvent) {
            client.on("copy", function(event) {
                var clipboard = event.clipboardData;
                var copyText = $(ele).siblings('[data-node=copyVal]').val();
                clipboard.setData("text/plain", copyText); // 将内容添加到剪切板
            });
        });
    });

})();