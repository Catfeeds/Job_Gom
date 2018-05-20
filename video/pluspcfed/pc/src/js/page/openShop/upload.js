/*
*@des:上传头像弹框
*/
var upload = require('module/popup/uploadAvatar');

var $uploadAvatar = $('[data-node=uploadAvatar]');
var $avatar = $('[data-node="avatar"]');

function init(){
	$uploadAvatar.on('click',function(){
		upload.init({
			imgSrc:$avatar.attr('src')
		})
	});
}
module.exports.init = init;