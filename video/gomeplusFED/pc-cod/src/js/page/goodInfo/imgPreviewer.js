/**
 * images previewer
 * @author Zhengchun Fu
 */
var activeClass = 'active';
var commentsNode = '[data-node=comments]';
var imgPreviewListNode = '[data-node=imgPreviewList]';
var imgPreviewListChildA = imgPreviewListNode + '> a';
var bigImgPreviewStageNode = '[data-node=bigImgPreviewStage]';
var closeBigImgBtnNode = '[data-action=closeImgPreview]';
var stageNode = '<div data-node="bigImgPreviewStage" class="list-img-big"><span><em data-action="closeImgPreview" class="icon-narrow hide"></em><img></span></div>';

var $discussBox = $('[data-node=discussBox]');
var $imgPreviewList = $(imgPreviewListNode);
var $curSmallImg = null;
var stageWidth = 740;

// 获取图片的原始大小,获取后调用显示大图的方法。
function getImgSize(url, cb) {
	var img = new Image();
	img.onload = function() {
		var width = img.width;
		var height = img.height;
		if (width > height && width >= stageWidth) {
			height = height * stageWidth / width;
		}
		img.onload = null;
		img = null;
		cb(width, height);
	};
	img.src = url;
}

// 显示隐藏关闭大图按钮
function toggleCloseBtn() {
	$discussBox.on('mouseenter', bigImgPreviewStageNode, function() {
		$(this).find(closeBigImgBtnNode).removeClass('hide');
	});
	$discussBox.on('mouseleave', bigImgPreviewStageNode, function() {
		$(this).find(closeBigImgBtnNode).addClass('hide');
	});
}

// 初始化大图展示框
function initStage(obj) {
	$(stageNode).insertAfter(obj);
}

// 显示大图
function showStage(list, url, imgWidth, imgHeight) {
	var $curComments = list.parents(commentsNode);
	var $curStage = $curComments.find(bigImgPreviewStageNode);
	var $siblingsComments = $curComments.siblings();
	var $siblingsStage = null;
	var img = null;

	// 如果没有stage就初始化一个
	if (typeof $curStage[0] === 'undefined') {
		initStage(list);
		$curStage = list.siblings(bigImgPreviewStageNode);
	}

	$siblingsComments.find(imgPreviewListChildA).removeClass(activeClass);
	$siblingsStage = $siblingsComments.find(bigImgPreviewStageNode);
	stageAnimate($siblingsStage, 'hide');

	imgWidth = imgWidth > stageWidth ? stageWidth : imgWidth;
	img = $curStage.find('img');
	img.attr({
		'src': url,
		'width': imgWidth
	});

	$curStage.css({
		height: 'auto'
	});

	if ($curStage.is(':hidden')) {
		stageAnimate($curStage, 'show', imgHeight);
	}
}

// 大图显示隐藏的缩放动画
function stageAnimate(obj, status, imgHeight) {
	var delay = 300;
	if (status === 'show') {
		obj.css({
			width: 0,
			height: 0
		}).show().stop().animate({
			width: 740,
			height: imgHeight
		}, delay);
	} else {
		obj.stop().animate({
			width: 0,
			height: 0
		}, delay, function() {
			obj.hide();
		});
	}
}

// 关闭大图显示
function closeStage() {
	$discussBox.on('click', closeBigImgBtnNode, function(e) {
		var $bigImgStage = $(this).parents(bigImgPreviewStageNode);
		e.preventDefault();
		$curSmallImg.removeClass(activeClass);
		stageAnimate($bigImgStage, 'hide');
	});
}

function init() {
	$discussBox.on('click', imgPreviewListChildA, function() {
		var bigImgUrl = $(this).find('img').attr('src');
		var $smallImgList = $(this).parent();

		$curSmallImg = $(this);
		$curSmallImg.addClass(activeClass).siblings().removeClass(activeClass);

		getImgSize(bigImgUrl, function(w, h) {
			showStage($smallImgList, bigImgUrl, w, h);
		});

		toggleCloseBtn();
		closeStage();
	});
}

module.exports = {
	init: init
};