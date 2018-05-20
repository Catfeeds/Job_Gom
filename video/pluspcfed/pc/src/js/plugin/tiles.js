/**
 * 浮动式瀑布流,不再对每一个 tile进行绝对定位，而是根据容器宽度和tile的宽度，
 *	将容器分为若干列，将砖块放入到最短的列中即可。
 *
 * var tiles = new Tiles({}, '[data-node=tiles]');
 */

var settings = {};

function Tiles(options, element) {
	this.element = $(element);
	this.$tiles = this.element.children();

	this._create(options);
	this._init();
}

Tiles.prototype = {
	constructor: Tiles,
	_getTiles: function() {
		return this.element.children();
	},

	_create: function(options) {
		this.options = $.extend(true, {}, settings, options || {});

		var container = this.element;
		var width = this.columnWidth = this._getColumnWidth();
		var colNums = this._getColumns();

		for (var i = 0; i < colNums; i = i + 1) {
			$('<div style="float:left;width:' + width + 'px;" data-node="tiles-col"></div>').appendTo(container);
		}
		this.cols = container.find('> [data-node=tiles-col]');

	},

	/*getInstance: function() {
		return $.data(this.element[0], prefix);
	},*/

	_getColumns: function() { //calculates number of columns
		var containerWidth = this.element.width();
		var colNum = Math.floor(containerWidth / this.columnWidth);
		colNum = Math.max(colNum, 1);
		return (this.colNum = colNum);
	},

	_init: function() {
		this.layout(this.$tiles);
	},

	_getColumnWidth: function() { //指定的列宽或第一个砖块的宽或者是容器的宽
		return this.options.columnWidth || this.$tiles.outerWidth(true) || this.element.width();
	},

	appended: function($tiles, callback) {
		this.$tiles = this.$tiles.add($tiles);
		this.layout($tiles, callback);
	},

	destroy: function() {
		// this.element.removeData(prefix);
	},

	layout: function($tiles) {
		for (var i = 0, len = $tiles.length; i < len; i++) {
			this._placeTile($tiles[i]);
		}
	},

	_placeTile: function(tile) {
		this.cols.eq(this.getShortestColumn()).append(tile);
	},

	getShortestColumn: function() {
		var result = 0,
			cols = this.cols,
			len = cols.length,
			shortest, h;
		for (var i = 0; i < len; i++) {
			h = cols[i].offsetHeight || cols[i].scrollHeight;
			if (i == 0) {
				shortest = h;
			}
			if (h < shortest) {
				shortest = h;
				result = i;
			}
		}
		return result;
	}
};

module.exports = Tiles;
