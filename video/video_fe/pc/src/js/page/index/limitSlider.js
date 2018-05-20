/**
 * [左右有限滚动]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

class LimitSlider {
	constructor(opts){
		let dfs = {
			selector:'',
			prev: '',
			next: ''
		};

		Object.assign(dfs,opts);

		this.$slider = $(dfs.selector);
		this.$prev = $(dfs.prev);
		this.$next = $(dfs.next);
		this.$wrap = this.$slider.find('ul');
		this.$item = this.$wrap.find('li');
		this.itemLen = this.$item.length;
		this.sliderWidth = 0;
		this.wrapWidth = 0;
		this.itemWidth = 0;
		this.itemGap = 0;
		this.size = 0;
		this.leftHide = 0;

		this.isMoving = false;
		this.timer = null;
		
		this._init();
	}

	_init(){
		this.setData();
		this.initDom();
		this.bindEvent();
	}

	setData(){
		let sliderWidth = this.$slider.width();
		let itemWidth = this.$item.width();
		let itemMarginLeft = parseInt(this.$item.eq(1).css('marginLeft'));
		let itemMarginRight = parseInt(this.$item.eq(1).css('marginRight'));
		let itemGap = itemMarginLeft + itemMarginRight;
		let wrapWidth = (itemWidth + itemGap) * this.itemLen - itemGap;
		this.sliderWidth = sliderWidth;
		this.wrapWidth = wrapWidth;
		this.itemWidth = itemWidth;
		this.itemGap = itemGap;
		this.size = Math.floor((sliderWidth + itemGap) / (itemWidth+itemGap));
	}
	initDom(){
		this.$wrap.css('width', this.wrapWidth);
		if (this.itemLen > this.size) {
			this.$prev.addClass('disabled');
		}
		this.$slider.append(this.$prev,this.$next);
	}
	bindEvent(){
		let _this = this;
		
		this.$prev.on('click',()=>{
			_this.transition( _this.calcTranslatePrev() );
		});
		this.$next.on('click',()=>{
			_this.transition( _this.calcTranslateNext() );
		});
		window.onresize = this.winResize.bind(this);
	}
	calcTranslatePrev(){
		let translateX;
		if (this.leftHide > this.size) {
			translateX = (this.itemWidth + this.itemGap) * (this.leftHide - this.size);
			this.leftHide = this.leftHide - this.size;
			this.$next.removeClass('disabled');
		}else{
			translateX = 0;
			this.leftHide = 0;
			this.$prev.addClass('disabled');
			this.$next.removeClass('disabled');
		}
		return -translateX;
	}
	calcTranslateNext(){
		let restItems, translateX;
		restItems = this.itemLen - this.leftHide - this.size;
		if (restItems > this.size) {
			translateX = (this.itemWidth + this.itemGap) * (this.size + this.leftHide);
			this.leftHide = this.size + this.leftHide;
			this.$prev.removeClass('disabled');
		}else{
			translateX = (this.itemWidth + this.itemGap) * (restItems + this.leftHide);
			this.leftHide = restItems + this.leftHide;
			this.$next.addClass('disabled');
			this.$prev.removeClass('disabled');
		}
		return -translateX;
	}
	transition(x){
		let _this = this;
		if (this.isMoving) {
			return false;
		}
		this.isMoving = true;
		this.$wrap.animate({
			left:x
		},0,()=>{
			this.isMoving = false;
		});
	}
	winResize(){
		let _this = this;
		clearTimeout(this.timer);
		this.timer = setTimeout(function(){
			_this.setData();
			_this.diffItem();
			_this.$wrap.css('width', _this.wrapWidth);
		},200);
	}
	diffItem(){
		let showed = this.leftHide + this.size;
		let rest, diff, translateX;

		// 右边不够左边来补
		if (showed >= this.itemLen) {
			diff = showed - this.itemLen;
			translateX = (this.itemWidth + this.itemGap) * (this.leftHide - diff);
			if (this.leftHide < diff) {
				translateX = 0;
				this.leftHide = 0;
				this.$prev.addClass('disabled');
			}else{
				this.leftHide -= diff;
			}
			this.transition(-translateX);
			this.$next.addClass('disabled'); 
		}else{
			// 右边够，右边补
			translateX = (this.itemWidth + this.itemGap) * this.leftHide;
			this.transition(-translateX);
		}
	}
}

export default LimitSlider;