/**
 * [首页焦点图轮播]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
class BannerSlider{
	constructor(opts){
		let dfs = {
			selector: '',
			speed: 5000,
		};

		Object.assign(dfs, opts);
		if (typeof dfs.selector !== 'string') {
			console.error('bannerSlider缺少selector参数');
			return false;
		}

		this.$slider = $(dfs.selector);
		this.$banner = $('[data-node=bannerImg]');
		this.$nav = $('[data-node=bannerNav]');
		this.$imgs = this.$banner.children('a');
		this.$titles = this.$nav.children('a');
		this.speed = dfs.speed;
		this.index = 0;
		this.timer = 0;

		this.goLoop = this.goLoop.bind(this);
		this.bindEvent();
		this.play();
	}

	bindEvent(){
		let _this = this;

		this.$nav.on('mouseenter','a',function(){
			let $this = $(this);
			_this.index = $this.index();
			$this.addClass('active').siblings('a').removeClass('active');
			_this.$imgs.eq(_this.index).addClass('active').siblings('a').removeClass('active');
		});

		this.$slider.on({
			'mouseenter': ()=>{
				clearTimeout(_this.timer);
			},
			'mouseleave': ()=>{
				_this.play();
			}
		});
	}

	goLoop(){
		let index = this.index;
		index++;
		if (index >= this.$imgs.length) {
			index = 0;
		}
		this.index = index;
		this.$imgs.eq(index).addClass('active').siblings('a').removeClass('active');
		this.$titles.eq(index).addClass('active').siblings('a').removeClass('active');
		this.play();
	}

	play(){
		clearTimeout(this.timer);
		this.timer = setTimeout(this.goLoop,this.speed);
	}
}

export default BannerSlider;