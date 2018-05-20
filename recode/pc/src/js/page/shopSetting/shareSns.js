
var showShare = require('./showShare');
//分享组件
var shareto = require('module/share').shareto; 

module.exports = {
	init: function(){
		var shareContent;
		showShare.init(function(data){
			shareContent = data;
		});
		$('.J-share-sWrap').on('click', '.J-share-weixin', function(){
		    shareto.weixin({
		    	url: shareContent.wurl,
		    	title: shareContent.title
		    });
		}).on('click', '.J-share-qq', function(){
		    shareto.qq({
		    	url: shareContent.url,
		    	title: shareContent.title,
		    	summary: shareContent.info, 
		    	pic: shareContent.pic[0]
		    });
		}).on('click', '.J-share-qzone', function(){
			shareto.qz({
				url: shareContent.url,
			    title: shareContent.info ? '#'+ shareContent.title +'#'+shareContent.info : '我心意的这款商品，到底还是在国美找到了。#' + shareContent.title+ '# ' + shareContent.url, 
			    pic: shareContent.info ? shareContent.pic.join('|') : shareContent.pic[0]
			});
		}).on('click', '.J-share-sina', function(){
			shareto.wb({
				url: shareContent.url,
			    title: shareContent.info ? '#'+ shareContent.title +'#'+shareContent.info : '我心意的这款商品，到底还是在国美找到了。#' + shareContent.title+ '# ' + shareContent.url, 
			    pic: shareContent.info ? shareContent.pic.join('||') : shareContent.pic[0]
			});
		});
	}
}