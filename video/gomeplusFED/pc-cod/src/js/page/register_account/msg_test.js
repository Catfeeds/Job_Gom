//验证码按钮
var aCodes = $("[data-node = 'msg_test'] a[class = 'lg-codes']");
var spanCodes = $("[data-node = 'msg_test'] span[class = 'lg-warm']");
var fetch = require("io/fetch");
var url = require('io/url');
var getCode = function (fn){
	$("[data-node='tip_msg_test']").html("验证码已发送您的手机，请查收，请勿泄漏");
	if( $("[data-node='phone_number']").attr("data-verification") == "0" ){
		var option = {"mobile": $("[data-node='phone_number'] input[type = 'text']").val()};
		$.post(url.get("getVerificationCode"),option).done(function (data,textStatus,XHR){
			if(	data.code == "200" ){
				var _this = $(this);
				var i = 60;
				_this.off().css("background","#DDD").html("60秒后重发");
				var token = data.data.token;
				// localStorage.setItem("token",escape(token));
				spanCodes.css({"visibility":"visible","color":"#F95353"})
				var s = setInterval(function (){
					if( i == 1 ){
						clearInterval(s);
						spanCodes.css("visibility","hidden");
						_this.html("重新获取").on("click",getCode);
					}else{
						i--;
						_this.html(i+"秒后重发");
					}
				},1000);
			}else{
				//请求返回错误 - 提示信息
				// module.exports = token;
				if( data.message == '该手机号已被注册' ){
					$("[data-node='tip_phone_number']").html("该手机号已被注册").css({"visibility":"visible","color":"#F95353"});
				}else{
					$("[data-node='tip_msg_test']").html(data.message).css({"visibility":"visible","color":"#F95353"});
				}
			}
			fn();
		}).fail(function (XHR,textStatus,errorThrown){
			alert("数据请求失败 请稍后尝试");
		})
	}else{
		if( $("[data-node='phone_number']").val() == "" ){
			$("[data-node='phone_number']").addClass("lg-form-error");
			$("[data-node='tip_phone_number']").html("请填写手机号").css("visibility","visible");
		}else{
			$("[data-node='phone_number']").addClass("lg-form-error");
			$("[data-node='tip_phone_number']").html("手机号格式错误").css("visibility","visible");
		}
	}
}
$("[data-node='input_msg_test']").on("input",function (){
	$("[data-node='tip_msg_test']").css("visibility","hidden");
})
module.exports = getCode;