/**
 * [toast]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import 'css/components/toast.scss';

var $dom = null;
function toast(info,delay,cb) {
    var timer = null;
    var foo = function(){};
    var conf = {
        msg: '',
        delay: 2000,
        cb:foo
    };

    if (typeof info === 'string') {
        conf.msg = info;
        conf.delay = typeof delay === 'number' ? delay?delay:2000:2000;
        conf.cb = typeof cb === 'function' ? cb : foo;
    }else{
        $.extend(conf, info);
    }

    if (conf.msg.trim() === '') {
        return false;
    }

    if (!$dom) {
        $dom = $('<div/>').html(conf.msg).addClass('pub-toast');
        $('body').append($dom);
    }else{
        if (timer) {
            clearTimeout(timer);
            timer = null;
            $dom.hide();
        }
        $dom.html(conf.msg).show();
    }

    var w = $dom.width();
    var h = $dom.height();
    $dom.css({
        left:'50%',
        top:'50%',
        marginLeft: -w / 2,
        marginTop: -h / 2
    });
    clearTimeout(timer);
    timer = setTimeout(function() {
        $dom.hide().html('');
        conf.cb();
        timer = null;
    }, conf.delay);
}

module.exports = toast;