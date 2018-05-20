var dialog = require('dialog');
var trim = require('utils/trim');
var Pubsub = require('io/pubsub');
var channel = require('io/channel');
var tpl = require('./invoice.tpl');
require('textchange');

var $content;
// 选中的发票数据
var checkedData = {
    type: 'personal', // company
    value: '个人'
};

var toggle = function(e) {
    var checkedCls = 'menu-radio-checked';
    var $radios = $content.find('span');
    var $checked = $content.find('.menu-radio-checked');

    $radios.each(function(i, radio) {
        var current = $radios.eq(i);
        var $input = current.parent().next();
        if (!current.is($checked)) {
            $checked.removeClass(checkedCls);
            $input.removeClass('disabled').attr('readonly', false);
            current.addClass(checkedCls);
            // 设置数据
            checkedData['type'] = current.data('type');
            checkedData['value'] = $input.val();
        } else {
            $input.addClass('disabled').attr('readonly', true);
        }
    });
    return false;
};

var validate = function() {
    var ret = true;
    var val;
    if (checkedData['type'] === 'company') {
        var company = $content.find('[data-node=comVal]');
        val = trim(company.val());
        if (!val) {
            $content.find('[data-node=tipCom]').text('请输入发票抬头').removeClass('hide');
            ret = false;
        } else {
            $content.find('[data-node=tipCom]').addClass('hide');
        }
    } else {
        var person = $content.find('[data-node=personalVal]');
        val = trim(person.val());
    }
    checkedData['value'] = val;
    return ret;
};

var invoice = function(options) {
    var data = options.data || {
        isPersonal: true,
        personal: '',
        isCompany: false,
        company: ''
    };
    checkedData['type'] = data.isPersonal ? 'personal' : 'company';
    checkedData['value'] = data.isPersonal ? data.personal : data.company;
    var content = tpl(data);
    var defaults = {
        width: 500,
        content: content,
        modal: true,
        fixed: true,
        className: 'pop-box',
        okCls: 'pc-btn coupon-btn',
        title: '修改发票',
        ok: function() {
            if (validate()) {
                Pubsub(channel.confirmOrder.invoice).pub(checkedData);
            } else {
                return false;
            }
        }
    };
    var opts = $.extend(true, {}, defaults, options);
    var d = dialog(opts);

    var $company;
    var $personal;

    var r = /[!@#$%^&*+~,.?:;"'！；：、，…。？￥]/g;
    var textchange = function(e) {
        var val = $.trim(this.value);
        // 字母,数字,中文
        // var w = /[A-Za-z0-9]/;
        // var chinese = /[^\x00-\xff]/;
        if (r.test(val)) {
            val = val.replace(r, function(c) {
                return '';
            });
            this.value = val;
        }
        if (val.length > 50) {
            val = val.substring(0, 50);
            this.value = val;
        }
        /*if(replaced){
            this.value = val;
        }*/
    }

    d.addEventListener('show', function() {
        $content = this._$('content');
        $content.on('click', 'label', toggle);
        $company = $content.find('[data-node=comVal]');
        $personal = $content.find('[data-node=personalVal]');
        $company.on('textchange', textchange);
        $personal.on('textchange', textchange);
    });
    d.addEventListener('close', function() {
        $content.off();
        $company.off();
        $personal.off();
    });

    d.show();
    return d;
}

module.exports = invoice;