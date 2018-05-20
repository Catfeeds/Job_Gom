/**
 * [表情]
 * @Author: Fu Xiaochun
 * @Email: 	fuzhengchun@gomeplus.com
 */
var emojis = require('./emoji');
var backward = require('./backward');
var faceTpl = require('./face.tpl');

var emojiData = null;

// 将表情转换成map
var emojiMap = {};

// 数据适配转换
var makeData = function(data) {
	var total = data.length;
	var offset = 24;
	var page = Math.ceil(total / offset);
	var list = [];

	for (var i = 0; i < page; i++) {
		list[i] = [];
		var end = offset * (i + 1);
		end = end > total ? total : end;
		for (var j = i * offset; j < end; j++) {
			var emoji = data[j];
			list[i].push(emoji);
			emojiMap[emoji.name] = emoji.url;
		}
	}
	emojiData = {
		page: new Array(page),
		list: list
	};
	return emojiData;
};

var Face = function(opts) {
	var foo = function() {};
	this.$dom = null;
	this.isShow = false;
	this.onSelected = opts.onSelected || foo;
};

Face.prototype = {
	constructor: Face,
	_bindHtml: function() {
		var data = emojiData || makeData(emojis);
		var faceHTML = faceTpl(data);
		this.$dom = $(faceHTML);
	},
	_bindEvent: function() {
		var _this = this;

		// tab方式显示所选页
		var setShowIndex = function(index) {
			var activeCls = 'active';
			var hideCls = 'hide';
			index = index || 0;

			$('[data-action=facePage] > li').eq(index).addClass(activeCls).siblings('li').removeClass(activeCls);
			$('[data-node=faceList] > div').eq(index).removeClass(hideCls).siblings('div').addClass(hideCls);
		};

		this.$dom.on('click.face', function(e) {
			e.stopPropagation();
		});
		$(document).on('click.face', function() {
			_this.hide();
		});
		// 分页切换显示
		this.$dom.on('mouseenter', '[data-action=facePage] > li', function() {
			var index = $(this).index();
			setShowIndex(index);
		});

		this.$dom.on('click.face', '[data-face]', function(e) {
			var $this = $(this);
			/*e.preventDefault();
			e.stopPropagation();*/
			var faceReg = $this.data('face');
			var faceUrl = $this.attr('src');
			_this.onSelected({
				reg: faceReg,
				url: faceUrl
			});
			_this.isShow !== false && _this.hide();
			return false;
		});
	},
	show: function(x, y) {
		if (this.isShow) {
			return;
		}
		this.$dom || this._bindHtml();
		$('body').append(this.$dom);
		this.$dom.css({
			left: x + 'px',
			top: y + 'px'
		}).show();
		this.isShow = true;
		this._bindEvent();
	},
	hide: function() {
		if (!this.isShow) {
			return;
		}
		this.$dom.off('.face');
		$(document).off('.face');
		this.$dom.hide().remove();
		this.isShow = false;
	}
};


var isEmpty = function(obj) {
	var ret = true;
	for (var key in obj) {
		ret = false;
		break;
	}
	return ret;
};

// 把表情占位符替换成img
var parseEmoji = function(str) {
	var r = /(\[([\s\S]+?)\])/g;
	if (isEmpty(emojiMap)) {
		makeData(emojis);
	}

	return str.replace(r, function(s, $1, name) {
		var img = emojiMap[name];
		if (img) {
			return '<img width="22" height="22" src="' + img + '" />';
		} else {
			// 兼容旧版表情
			var old = backward[name];
			if (old) {
				return '<img width="22" height="22" src="' + old.url + '" />';
			}
			return s;
		}
	});
};

var faceInstance = null;
var init = function(opts) {
	if (!faceInstance) {
		faceInstance = new Face(opts);
	}
	return faceInstance;
};
module.exports = {
	init: init,
	parseEmoji: parseEmoji
};