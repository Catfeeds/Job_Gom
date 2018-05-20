var textchange = require('textchange');
var check = require("utils/check");
var inputTip = require("module/i18n");
var inputPassword = $("[data-node='input_password_confirm']");
var tip = $("[data-node='tip_password_confirm']");
var pwdAllright = $('[data-node=password_allright]');
var standardVal = $("[data-node='input_password']").val();
var passConfirm = $("[data-node='password_confirm']");
var passAllright = $('[data-node=password_confirm_allright]');

var inputEvent = {
	onfocus:function (){
		if( passConfirm.attr("data-passConfirm") == 1 && inputPassword.val() == "" ){
			tip.html(inputTip.pwdV.ept).css({'color':'#F95353','visibility':'visible'})
			passAllright.css('visibility','hidden');
		}
	},
	onblur:function (){
		var val = this.value;
		 standardVal = $("[data-node='input_password']").val();
		if( val == "" ){
			tip.css('visibility','hidden');
			passConfirm.attr("data-passConfirm","1");
			passAllright.css('visibility','hidden');
		}else{
			if( standardVal == val ){
				if( pwdAllright.css('visibility') == 'visible' ){
					tip.css('visibility','hidden');
					passConfirm.attr("data-passConfirm","0");
					passAllright.css('visibility','visible');
				}else{
					tip.hidden();
				}
			}else{
				tip.html(inputTip.pwdV.err).css('visibility','visible');
				passConfirm.attr("data-passConfirm","1");
				passAllright.css('visibility','hidden');
			}
		}
	},
	oninput:function (){
		var val = this.value;
		var standardVal = $("[data-node='input_password']").val();
		if( val == "" ){
			tip.html(inputTip.pwdV.ept);
			passConfirm.attr("data-passConfirm","1");
			passConfirm.attr("data-passConfirm","1");
		}else{
			if( standardVal == val ){
				if( pwdAllright.css('visibility') == 'visible' ){
					tip.css('visibility','hidden');
					passConfirm.attr("data-passConfirm","0");
					passAllright.css('visibility','visible');
				}else{
					tip.hidden();
				}
			}else{
				if( val == "" ){
					tip.html(inputTip.pwdV.ept);
					tip.css('visibility','visible');
				}else{
					if( !check.checkSpace(standardVal) ){
						tip.html(inputTip.pwdV.err);
						tip.css('visibility','visible');
					}
				}
				passAllright.css('visibility','hidden');
				passConfirm.attr("data-passConfirm","1");
			}
		}
	}
};
inputPassword.on({
	focus:inputEvent.onfocus,
	blur:inputEvent.onblur,
	textchange:inputEvent.oninput
});