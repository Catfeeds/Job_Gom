/**
 * Editor
 * @author Zhengchun Fu
 */

var textSelect = require('utils/textSelect');
var face = require('module/popup/face/face');
face.init();

var upload = require('./uploader');
var Pubsub = require('io/pubsub');
var pictureTpl = require('./pictures.tpl');

var channel = require('io/channel');
var showSelectGroup = require('module/popup/circle/dialog');

var dialog = require('module/addGoods');
var goodsTpl = require('./selectGoods.tpl');

require('placeholder');
require('textchange');
require('textareaautoheight');


var changedGoods = [];

var editorBox = $('[data-action=textBox]')[0];

$('body').on('focus', '[data-action=textBox]', function() {
	editorBox = $(this)[0];
});

/**
 * 插入图片和商品，定位到插入的第一个位置。
 * @author Zhengchun Fu
 */
var listItemNode = '[data-node=listItemBox]';
var winHeight = $(window).height();
var positionItem = function(len) {
	var index = len - 1 < 0 ? 0 : len;
	var $newFirst = $(listItemNode).eq(index);
	var newFirstHeight = $newFirst.height();
	var newFirstTop = $newFirst.offset().top;
	var scrollVal = newFirstTop + newFirstHeight - winHeight;
	$('body,html').animate({
		scrollTop: scrollVal
	}, 300);
};

/**
 * 编辑区域的placeholder
 */
(function() {
	var $editor = $('[data-node=editor]');
	$editor.placeholder();
	$editor.on('focus keyup', function() {
		checkNull();
	}).on('blur', function() {
		checkNull();
	});

	function checkNull() {
		if ($editor.val().length) {
			$editor.addClass('bg-none');
		} else {
			$editor.removeClass('bg-none');
		}
	}
})();


/**
 * 表情展示交互效果
 */
(function() {
	// 表情：显示隐藏
	$('[data-action=face]').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var x = $(this).offset().left - 23;
		var y = $(this).offset().top / 1 + 26;
		if ($('[data-node=faceBox]').is(':hidden')) {
			face.show(x, y);
		} else {
			face.hide();
		}
	});

	// 让表情包随着editorBar的fixed一起fixed
	$(window).on('scroll', function() {
		var flagY = $('[data-action=face]').offset().top;
		var scrollTop = $(window).scrollTop();
		var top;
		if (scrollTop > flagY) {
			top = 0;
		} else {
			top = flagY;
		}
		top = top / 1 + 26;

		$('[data-node=faceBox]').css({
			top: top + 'px'
		});
	});
})();


/**
 * 在光标处插入表情
 */
var insertAtCursor = function(textbox, text) {
	if (textbox.selectionStart >= 0) {
		var val = textbox.value;
		var startIndex = textbox.selectionStart;
		var endIndex = textbox.selectionEnd;
		textbox.value = val.substring(0, startIndex) + text + val.substring(textbox.selectionEnd);
		textbox.selectionStart = textbox.selectionEnd = startIndex + text.length;
		textbox.focus();
	} else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
		textbox.focus();
		var range = document.selection.createRange();
		range.text = text;
		range.select();
	}
};

/**
 * 编辑内容：插入表情
 */
(function() {
	face.insert(function(data) {
		var face = data.reg;
		insertAtCursor(editorBox, face);
	});
})();


/**
 * 插入图片显示隐藏
 */
(function() {
	var maxLen = 9;
	// 显示选择上传图片的弹窗
	$('[data-action=picture]').on('click', function() {
		maxLen = ~~$(this).attr('data-maxlength');
		upload(maxLen);
	});
	// 接收图片
	Pubsub(channel.setPubliser.changeImage).sub(function(data) {
		var listItemBoxLen = $(listItemNode).length;
		$('[data-action=picture]').attr('data-maxlength', maxLen - data.images.length);
		var pictureHTML = pictureTpl(data);
		$('[data-node=picAndShop]').append(pictureHTML);

		setTextareaHeight();

		positionItem(listItemBoxLen);
	});
	// 标注图片信息
	$('[data-node=picAndShop]').on('blur', '[data-node=pictureDesc]', function() {
		var text = $(this).val();
		var info = $(this).data('info');
		info.text = text;
	});
})();


/**
 * 插入商品
 */
(function() {
	var maxLen = 9;
	var $addGoodsBtn = $('[data-action="addGoods"]');
	$addGoodsBtn.on('click', function() {
		//maxLen = ~~$(this).attr('data-maxlength');
		dialog(changedGoods);
	});

	// 接收商品
	Pubsub(channel.setPubliser.changedItem).sub(function(data) {
		var goodsHTML = goodsTpl(data);
		var delGoods = data.delChanged;
		var listItemBoxLen = $(listItemNode).length;

		changedGoods.concat(data.changed);
		for (var i = 0, len = delGoods.length; i < len; i++) {
			var pid = delGoods[i].PId;
			$('[data-pid=' + pid + ']').parents('[data-node=listItemBox]').remove();
			if (changedGoods.indexOf(delGoods[i]) !== -1) {
				changedGoods.splice(i, 1);
			}
		}
		$('[data-node=picAndShop]').append(goodsHTML);
		setTextareaHeight();
		positionItem(listItemBoxLen);
	});
	// 标注商品信息
	$('[data-node=picAndShop]').on('blur', '[data-node=goodsDesc]', function() {
		var text = $(this).val();
		var info = $(this).data('info');
		info.text = text;
	});


})();


/**
 * 选择圈子
 */

(function() {
	Pubsub(channel.postTopic.selectCircle).sub(function(group) {
		var $group = $('[data-action=selectGroup]');
		$group.attr('data-groupid', group.id);
		$group.html(group.name);
	});

	$('[data-action=selectGroup]').on('click', function() {
		showSelectGroup();
	});
})();

/**
 * 删除插入的商品和图片
 */
(function() {
	$('[data-node=picAndShop]').on('click', '[data-action=removeItem]', function(e) {
		e.preventDefault();
		var type = $(this).data('actiontype');
		var getVal = $('[data-action=' + type + ']').attr('data-maxlength');

		if (type === 'addGoods') {
			var pid = $(this).data('pid');
			Pubsub(channel.setPubliser.delItem).pub({
				pid: pid
			});
			for (var i = 0, len = changedGoods.length; i < len; i++) {
				if (changedGoods[i].PId === pid + '') {
					changedGoods.splice(i, 1);
					break;
				}
			}
		} else {

			$('[data-action=' + type + ']').attr('data-maxlength', (getVal / 1 + 1));
		}
		$(this).parents('[data-node=listItemBox]').remove();
	});
})();

// textarea自适应高度
function setTextareaHeight() {
	$('[data-node=pictureDesc]').placeholder();
	$('[data-node=pictureDesc], [data-node=goodsDesc]').tah({
		moreSpace: 10,
		maxHeight: 200,
		animateDur: 100
	});
}