/*
*@author:dongyukuan
*@des:上传头像的弹框插件
	  需引入public下的uploadAvatar.scss样式文件
 @使用方法：require('module/popup/uploadAvatar').init();
*/
var Dialog = require('dialog');
var cropper = require('module/cropper');
var $avatar = $('[data-node="avatar"]');//隐藏弹框后展示图片的img标签
var $uploadAvatar = $('[data-node="uploadAvatar"]');//页面上上传按钮



function uploadAvatar(opts){
	function noop(){
		if(cropper.getData()&&$avatar.length){
			$avatar.attr('src',cropper.getData());
			$uploadAvatar.text('重新上传');
			$('.ui-dialog-close').trigger('click');
		}
	};
	var defaults = {
	    fixed: true,
	    modal: true,
	    title:'<span class="title-main">上传美店LOGO</span><span class="type-txt">请上传JPG/PNG/JPEG格式的图片（选填）</span>',
	    autofocus: false,
	    content: `<div class="circle-head" data-node="uploadBox">
	            <div class="error" data-node="error"><span>＊请上传小于4M的图片，支持格式jpg、jpeg、png！</span></div>
	            <div class="upload-head-bx">
	             
	              <div class="picture-bj-img ">
	                <!-- 提示类 -->
	                <div class="position-abso" data-node="noticeBox">

	                    <div class="picture-bx"></div>
	                    <div class="load-failed-bx">
	                      <span class="opacity-all"></span>
	                      <span class="top-left"></span>
	                      <span class="top-right"></span>
	                      <span class="bottom-left"></span>
	                      <span class="bottom-right"></span>
	                    </div>
	                    <div class="load-failed-txt failure"><span data-node="noticeInfo">图片上传失败！<span><em class="icon iconn-24"></em><a href="javascript:;" data-action="retry">重新上传</a></span></span></div>
	                    <div class="load-failed-txt image-load">
	                      <p data-node="loadNotice">图片加载中</p>
	                      <div class="progress-bar-bx"><span data-node="uploadProgress"></span></div>
	                      <!--img.img250(src="../../images/public/circle-default-head.jpg")-->
	                    </div>
	                </div>
	                <!-- 默认 -->
	                <div class="circle-default-head" data-node="cropWrap">
	                    <div data-defaultaddfile="picker" class="webuploader-container"><div class="webuploader-pick webuploader-pick-hover"><span>+</span>上传头像</div><div id="rt_rt_1btbkd9nd1csg1eur1edu1e1q11pl1" style="position: absolute; top: 0px; left: 0px; width: 250px; height: 250px; overflow: hidden; bottom: auto; right: auto;"><input type="file" name="file" class="webuploader-element-invisible" accept="image/jpg,image/jpeg,image/png,image/gif"><label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);"></label></div></div>
	                    <img src="${opts.imgSrc}" alt="" data-default="${opts.imgSrc}" data-edit="btn">
	                </div>	
	              </div>
	                <div class="pc-btn-box">
	                    <a class="pc-btn pc-bj-fc8753 btn-size" href="javascript:" data-action="upload-edit">点击上传</a>
	                   
	                </div>
	            </div>
	            <div class="head-preview-bx">
	              <p class="head-title">效果预览</p>
	              <p class="head-size">你上传的图片会自动生成3种尺寸，请注意小尺寸的头像是否清晰</p>
	              <div class="picture2-bx clearfix">
	                <div class="picture-bx2">
	                  <div class="default-img1" data-node="avatrSelector"><img src="https://js.meixincdn.com/m/pc/dist/images/public/default-img1.jpg"></div>
	                  <p class="p-size">160*160px</p>
	                </div>
	                <div class="picture-bx3">
	                  <div class="picture-bx4">
	                    <div class="default-img2" data-node="avatrSelector"><img src="https://js.meixincdn.com/m/pc/dist/images/public/default-img2.jpg"></div>
	                    <p class="p-size">60*60px</p>
	                  </div>
	                  <div class="picture-bx5">
	                    <div class="default-img3" data-node="avatrSelector"><img src="https://js.meixincdn.com/m/pc/dist/images/public/default-img3.jpg"></div>
	                    <p class="p-size">30*30px</p>
	                  </div>
	                </div>
	              </div>
	            </div>
	        </div>
	        <div class="sub-btn">
            	<a href="javascript:void(0);" data-action="avatarSave">提交审核</a>
            </div>`,
	    className: 'pop-box'
	};
	var d = Dialog(defaults);
	var header = d._$('header');
	var title = d._$('title');
	header.show();
	d.show();

	var c = cropper.init(noop,{
		errTip:'请上传小于2M的图片，支持格式jpg、jpeg、png！',
		accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        fileSingleSizeLimit: 2 * 1024 * 1024,
        uptxtBtn:'重新上传'
	});
	//如果用户先前有传头像，并且不是默认头像，则在上传弹框中展示上传的头像
	if(opts.imgSrc && !/(circle-default-head\.jpg)|(T1YvKTBsDv1RCvBVdK)|(T1o4KTBTWQ1RCvBVdK)/.test(opts.imgSrc)){
		$('[data-node=uploadBox]').find('img').attr('src',opts.imgSrc);
		$('[data-defaultAddFile=picker]').hide();
		c.webUpLoader.addButton({
            id: '[data-action="upload-edit"]',
            innerHTML: '重新上传'
        });
	}else{
		$('[data-node=uploadBox]').find('img').attr('src',opts.imgSrc);
		$('[data-defaultAddFile=picker]').hide();
		c.webUpLoader.addButton({
            id: '[data-action="upload-edit"]',
            innerHTML: '点击上传'
        });
	}
	return cropper.getData()
}
module.exports.init = uploadAvatar;