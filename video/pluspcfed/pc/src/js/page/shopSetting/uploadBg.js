/*
*@des:自定义上传背景图片
*/

var webUploader = require('../../plugin/webuploader/webuploader');
var toast = require('module/hint').init;

var $upImg = $('[data-node="upImg"]');//上传成功预览按钮
var $uploadTxt = $('[data-node=uploadTxt]');
var options = {
	accept: {
        title: 'Images',
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method: 'post',
    auto:true,
    // swf文件路径
    swf: $_CONFIG.imgpath + '/images/swf/Uploader.swf',
    fileVal: 'avatar_file',
    resize:false,
    pick:'[data-action=uploadBtn]',
    server: '/ajax/crop/crop_img',
    fileSingleSizeLimit: 2 * 1024 * 1024
}
var $webUpLoader = null;
function init(){
	$webUpLoader = webUploader.create(options);
	//上传成功
	$webUpLoader.on('uploadSuccess', function(file, response) {
		if(response.success){
			$upImg.attr('src',response.data[0]).attr('data-src',response.data[0]).removeClass('none');
	    	$uploadTxt.css('width','35px').text('重新上传');
	    	$webUpLoader.destroy();
	    	init();
		}else{
			toast(response.message);
		}
	});
	//上传失败
	$webUpLoader.on('uploadError', function(file, reason) {
	   toast('上传失败，请重新上传！')
	});
	$webUpLoader.on('error', function(type) {
		if(type == 'F_EXCEED_SIZE'){
			toast('请压缩图片，最大支持2M图片上传');
		}else{
			toast('抱歉，请检查并上传合法图像');
		}
	})
	return $webUpLoader;
};
function destroy(){
	$webUpLoader && $webUpLoader.destroy();
};
module.exports = {
	init:init,
	destroy:destroy
};
