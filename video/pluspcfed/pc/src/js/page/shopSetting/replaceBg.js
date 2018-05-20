var fetch = require('io/fetch');
var url = require('io/url');
var upload = require('./uploadBg');
var alert = require('module/popup/alert');

var $bgBtn = $('[data-node="bgBtn"]');
var $changeBg = $('[data-node="changeBg"]');
var $bigBg = $('[data-node="bigBg"]');
var $showPop = $('[data-node="bgBtn"],[data-node="changeBg"]');

var $upImg = $('[data-node="upImg"]');//自定义上传预览图片
var $uploadTxt = $('[data-node=uploadTxt]');

var $defaultBgBox = $changeBg.find('[data-node="defaultBgBox"]');

var $cancel = $changeBg.find('[data-node=cancel]');
var $complete = $changeBg.find('[data-node="complete"]');

//获取初始选中的索引
var defIdx = $defaultBgBox.find('[data-node="defaultBg"]').index($('.selected'))+1;
var baseBigBgUrl = $GLOBAL_CONFIG['pcimgpath']+'/images/meidian/bg-big';
var defaultBg = $bigBg.attr('data-or');

function init(){
	//显示弹框，初始化上传
	$bgBtn.on('click',function(){
		$changeBg.removeClass('none');
		if(!/meidian/.test($upImg.attr('src'))){
			$uploadTxt.css('width','35px').text('重新上传');
		}else{
			$uploadTxt.css('width','36px').text('自定义上传');
		}
		upload.init();
	});
	//点击取消
	$cancel.on('click',function(){
		$changeBg.addClass('none');
		upload.destroy();
		$bigBg.css({
			background:'url('+ defaultBg +') 50% 0 no-repeat'
		});
		if(/bg-big/.test(defaultBg)){//初始背景图是默认图
			$upImg.addClass('none');
			$upImg.attr('src',defaultBg);
			$uploadTxt.css('width','36px').text('自定义上传');
		}else{//初始背景图是自定义图
			$upImg.attr('src',defaultBg);
		}
		
	});
	//点击默认的6张图
	$defaultBgBox.on('click','[data-node="defaultBg"]',function(){
		$defaultBgBox.find('[data-node="defaultBg"]').removeClass('selected');
		$(this).addClass('selected');
		defIdx = $defaultBgBox.find('[data-node="defaultBg"]').index(this)+1;
		var imgSrc = $(this).find('img').attr('src');
		$bigBg.css({
			background:'url('+ baseBigBgUrl+defIdx+'.png' +') 50% 0 no-repeat'
		});
		/*判断用户是想要自定义上传图片还是要默认图片，靠data-src判断最后点击的是哪个*/
		$upImg.attr('data-src',null);
	});
	var clickFlag = 1;
	//提交编辑
	$complete.on('click',function(){
		if(!clickFlag)return;
		clickFlag = 0;
		//判断是不是要选择默认图，true为是
		var isDefault = !$upImg.attr('data-src');
		var opts = {
			shopId:$GLOBAL_CONFIG['shopId'],
			backgroundIndex:'',
			backgroundUrlPc:$upImg.attr('data-src')
		}
		if(!isDefault){
			opts.backgroundUrlPc = $upImg.attr('data-src');
		}else{
			opts.backgroundIndex = defIdx;
		}
		fetch.post(url.get('editshop'),{
			data:opts
		}).done(function(data){
			clickFlag = 1;
			if(data.success){
				window.location.reload();
			}else{
				alert(data.message);
			}
		}).always(function(){
			clickFlag = 1;
		})
	})
}
module.exports.init = init;