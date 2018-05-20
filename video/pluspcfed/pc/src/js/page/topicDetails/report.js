// 举报
var reportTpl = require('./report.tpl');
var fetch = require('io/fetch');
var url = require('io/url');
var confirm = require('module/popup/confirm');

var reportBtn = '[data-action=topic-report]';
var reportSpan = '[data-node=reportType] li';
var checked = 'menu-checkbox-checked';
var type;
var reportId;
var active = 'active';

//checkbox是否选中
var isChecked = function(){
	var $this = $(this);
	if(!$this.hasClass(checked)){
		$(reportSpan).find('span').removeClass(checked);
		$this.find('span').addClass(checked);
        $('.report-confirm-btn').addClass(active);
	}else {
		$this.find('span').removeClass(checked);
        $('.report-confirm-btn').removeClass(active);
	}
}
var reportTopic = function() {
    var $this = $(this);
    type = $this.attr('data-type');
    reportId = (type==1) ? $this.parents('dd').attr('data-ddlist') : $this.parents('[data-node=wrap-box]').attr('id-node');
    confirm('', {
        content: reportTpl(),
        title: '提示',
        okCls: 'report-confirm-btn pc-btnh36 pc-btnw80',
        cancelCls: 'pc-btnh36 pc-btnw80',
        ok: sendMsg,
        btnWrapCls: 'report-btn text-center',
        okValue: '提交'
    });
}
var sendMsg = function() {
    if($('.report-confirm-btn').hasClass(active)){
        var index = $(reportSpan+'.'+checked).parent().index();
        var idd = {
            type: type ? type : 0,
            reason: index,
            reportId: reportId
        };
        var $dialog = $(this.node);

        fetch.post(url.get('topicReport'), {
            data: idd
        }).then(function(data) {
            if (data.success === true) {
                showNotice( $dialog, '举报成功，小编将擦亮眼睛重新审核');
            } else {
                if(data.code === 409) {
                    showNotice( $dialog, data.message);
                }else {
                    showNotice( $dialog, '举报失败！');
                }
            }
        });
    }
    return false;

    
}
var showNotice = function(dialog, msg){
    dialog.find('[i="content"]').html('<p class="del-pop-p" style="width:450px;">'+ msg +'</p>');
    dialog.find('[i-id="ok"]').hide();
    dialog.find('[i-id="cancel"]').attr('class', 'pc-btn pc-btnh35 circle-pop-btn').text('关闭');

}
var init = function() {
	$('body').on('click', reportSpan, isChecked);
    $('body').on('click', reportBtn, reportTopic);
}
module.exports = {
    init: init
};
