var Dialog = require('dialog');
var crypto = require('utils/crypto');
var trim = require('utils/trim');
var fetch = require('io/fetch');
var url = require('io/url');
var tpl = require('./content.tpl');
var dom = require('./login');

function popInit(){
	var d = Dialog({
		fixed: true,
		title: '请登录',
		modal: true,
		autofocus: false,
		content: tpl(),
		className: 'pop-box',
		onshow: function () {
			var o = $(this._$('content'));	
			dom.init(o);		
		},
		onclose:function() {
			var o = $(this._$('content'));	
			dom.des(o);
		}
	})
	d.show();
}

module.exports = {init:popInit}


