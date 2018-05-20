var byteLen = require('utils/byteLen');
var textchange = require('textchange');
var truncate = require('utils/truncate');
var moduleTrim = require('utils/trim');
var regExp = require('../regExp');
var fn_checkId = require('../checkIdCard'); 
var errorMsg = require("module/i18n").masterApply;
module.exports = {
	checkName:function (node){
		var val = $(node).val();
		if( byteLen(val)<2 || byteLen(val)>20 ) return {
			success:false,
			msg:errorMsg.nameLength
		};
		if( !regExp.checkName.test(val) ) return {
			success:false,
			msg:errorMsg.nameType
		}
		return {
			success:true
		}
	},
	checkIdCard:function (node){
		var val = $(node).val();
		if( moduleTrim(val) === "") return false;
		return fn_checkId(val);
	},
	checkSummary:function (node){
		var val = $(node).val();
		if( val.length < 2||val.length > 100 ) return {
			success:false,
			msg:errorMsg.summary
		};
		return {
			success:true
		};
	},
	checkupload:function (){
		var upload = $('[data-node=uploader]');
		var pass = 0;
		upload.each(function (){
			var $this = $(this);
			var webPick = $this.find('.webuploader-pick');
			if( webPick.find('img').attr('src') === undefined ){
				$this.parent().addClass('dr-form-error');
				$this.parent().find('.error-txt').html(errorMsg.noUpload);
				pass++;
			}
		});
		return pass>0?false:true;
	}
}