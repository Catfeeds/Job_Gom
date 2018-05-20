var Dialog = require('dialog');
var tpl = require('./content.tpl');
var login = require('./login');

var passDomain = $_CONFIG.passport_domain;
var currentUrl = $_CONFIG.current_url;

function pop(opts) {
    var tplContent = {
        forget: passDomain,
        regist: passDomain,
        qq: passDomain + 'login/connect_qq?redirect=' + currentUrl,
        wx: passDomain + 'login/connect_wechat?redirect=' + currentUrl,
        wb: passDomain + 'login/connect_wb?redirect=' + currentUrl,
        gm: passDomain + 'login/connect_gm?redirect=' + currentUrl,
        jx: passDomain + 'login/connect_jx?redirect=' + currentUrl
    };
    var d = Dialog({
        fixed: true,
        title: '',
        modal: true,
        autofocus: false,
        content: tpl(tplContent),
        className: 'pop-box',
        onshow: function() {
            //var o = $(this._$('content'));
            login.init(this, opts);
        },
        onclose: function() {
            //var o = $(this._$('content'));
            login.destroy(this);
        }
    })
    d.show();
}

module.exports = pop;