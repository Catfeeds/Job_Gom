var confirm = require('module/popup/confirm');
var invoiceTpl = require('./invoice.tpl');
require('textchange');

var hideCls = 'hide';
var checkedCls = 'menu-radio-checked';
var invoiceInfoNode = '[data-node=invoiceInfo]';

var $invoice = $('[data-node=invoice]');

var hasEA = !!+$_CONFIG.show_eceipt

// 显示弹窗
var invoicePop = function(content) {
    confirm('', {
        fixed: true,
        modal: true,
        title: '修改发票',
        content: content,
        className: 'pop-box pop-pad-btm65',
        okCls: 'pc-btn pc-btnh40 pc-btnw120',
        cancelCls: 'queren-btn pc-btnh40 pc-btnw120',
        ok: saveInvoice,
        okValue: '确认修改',
        btnWrapCls: 'two-buttons'
    });
};

// 保存发票信息
var saveInvoice = function() {
    // var $invoice = $('[data-node=invoice]');
    var $type = $invoice.find('[data-node=invoiceType]');
    var $title = $invoice.find('[data-node=invoiceTitle]');
    var $details = $invoice.find('[data-node=invoiceDetail]');
    var $titleParent = $title.parent();
    var $detailsParent = $details.parent();

    var $info = $(invoiceInfoNode);
    var type = $info.data('type');
    var name = $.trim($info.val());
    var typeName = ['不开发票', '普通发票'];
    var detailsStr = '明细';

    // 如果为不开发票
    if (!type) {
        $invoice.data('t', type);
        $invoice.data('n', '');
        $type.text(typeName[0]);
        $titleParent.addClass(hideCls);
        $detailsParent.addClass(hideCls);
        return true;
    }

    // 开发票，判断抬头内容
    if (name === '') {
        $info.addClass('input-error').parent().addClass('show-error');
        return false;
    }

    $invoice.data('t', type);
    $invoice.data('n', name);
    $type.text(typeName[1]);
    $title.text(name);
    $details.text(detailsStr);

    $titleParent.removeClass(hideCls);
    $detailsParent.removeClass(hideCls);
};

// 绑定弹窗内部事件
var bindEvent = function() {
    var $noInvoice = $('[data-node=noInvoice]');
    var $openInvoice = $('[data-node=openInvoice]');
    var $openInvoiceBox = $('[data-node=openInvoiceBox]');
    var $clear = $('[data-action=clear]');
    var $info = $(invoiceInfoNode);

    // 不开发票
    $noInvoice.on('click', function() {
        if (hasEA) {
            return false;
        }
        $(this).find('span').addClass(checkedCls);
        $openInvoice.find('span').removeClass(checkedCls);
        $openInvoiceBox.addClass(hideCls);
        $info.data('type', 0);
    });

    // 普通发票
    $openInvoice.on('click', function() {
        var type;
        $(this).find('span').addClass(checkedCls);
        $noInvoice.find('span').removeClass(checkedCls);
        $openInvoiceBox.removeClass(hideCls);
        type = $openInvoiceBox.find('label > .menu-radio-checked').parent('label').data('type');
        $info.data('type', type);
    });

    // 选择个人或单位
    $openInvoiceBox.on('click', 'label', function() {
        $(this).find('span').addClass(checkedCls).end().parent().siblings().find('span').removeClass(checkedCls);
        $info.data('type', $(this).data('type'));
    });

    // 填写发票抬头
    $info.on('textchange', function() {
        var r = /[!@#$%^&*+~,.?:;"'！；：、，…。？￥]/g;
        var val = $.trim(this.value);
        var len = val.length;

        if (r.test(val)) {
            val = val.replace(r, function() {
                return '';
            });
            this.value = val;
        }

        if (len > 50) {
            val = val.substring(0, 50);
            this.value = val;
        }

        if (len > 0) {
            $clear.show();
        } else {
            $clear.hide();
        }
    });

    // 清空text内容
    $clear.on('click', function() {
        $clear.hide();
        $info.val('').focus();
    });

    $info.on('focus', function() {
        var thisVal = $.trim($(this).val());
        $(this).removeClass('input-error').parent().removeClass('show-error');
        if (thisVal !== '') {
            $clear.show();
        }
    });
};

var init = function() {
    // var $invoice = $('[data-node=invoice]');
    var $update = $invoice.find('[data-action=updateInvoice]');

    $update.on('click', function() {
        var t = $invoice.data('t'); // 0,不开发票, 1 个人, 2 公司
        var invoiceTitle = $invoice.data('n');
        if (hasEA) {
            if ($.trim(invoiceTitle) === '') {
                invoiceTitle = '个人';
            }
        }
        var content = invoiceTpl({
            type: t,
            title: invoiceTitle,
            hasEA: hasEA
        });

        invoicePop(content);
        bindEvent();
        return false;
    });
};

module.exports = {
    init: init
};