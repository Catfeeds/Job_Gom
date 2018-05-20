var STATE_PENDING = 'pending';
var STATE_PULLING = 'pulling';
var STATE_RELEAING = 'releasing';
var STATE_REFRESHING = 'refreshing';

var EVENT_REFRESHING = 'refreshing';

var PullToRefresh = function(container, options) {
    options = this.options = options || {};
    this.container = container;
     // 初始坐标值
    this.pullStartY = 0;
    this.pullMoveY = 0;
    this.diff = 0; // y轴滚动的距离

    this.state = STATE_PENDING; // pending, pulling, releasing, refreshing
    this.offset = options.offset || 40; // 位移距离
    this.refreshLayer = $(options.refreshLayer || '<div class="ptr-layer"> pull down to refresh</div>');
    this.init();
};

var showLog = function(e){
    // return;
    // console.log(e.clientX)
    console.log(e.clientY)
    // console.log(e.pageX)
    console.log(e.pageY)
    // console.log(e.screenX)
    console.log(e.screenY)
    console.log('%^%^%^%^^\n')
}
var t = false;

PullToRefresh.prototype = {
    constructor: PullToRefresh,
    init: function() {
        var self = this;
        var container = this.container;

        var proxy = function(fn) {
            return $.proxy(fn, self);
        };

        container.prepend(this.refreshLayer);

        container.on('touchstart', proxy(this._onTouchStart));
        container.on('touchmove', proxy(this._onTouchMove));
        container.on('touchend', proxy(this._onTouchEnd));
    },
    _onTouchStart: function(e) {
        // 如果是刷新状态
        if(this.state === STATE_REFRESHING){
            return;
        }
        var touch = e.targetTouches[0];
        this.pullStartY = touch.screenY;
        // 不用pageY是因为该值包含滚动条
        this.state = STATE_PENDING;
    },
    _onTouchMove: function(e) {
        if(this.state === STATE_REFRESHING){
            e.preventDefault();
            return;
        }
        var touch = e.targetTouches[0];
        var pullMoveY = this.pullMoveY = touch.screenY;
        var offset = this.offset;
        var translate;

        if(this.state === STATE_PENDING){
            this._update(STATE_PULLING);
        }
        var diff = pullMoveY - this.pullStartY;
        var scrollTop = document.body.scrollTop;

        if(diff > 0 && scrollTop <= 0){
            e.preventDefault(); // 必须阻止move的默认事件
            // 隐藏滚动条
            document.body.style.overflow = 'hidden';
            var translate = Math.pow(diff, 0.85);
            this.transform('translate3d(0,' + translate + 'px,0)');
            if(this.state === STATE_PULLING && translate > offset){
                this._update(STATE_RELEAING);
            }
            if(this.state === STATE_RELEAING && translate < offset){
                this._update(STATE_PULLING);
            }
        }
    },
    _onTouchEnd: function(e) {
        if(this.state === STATE_REFRESHING){
            return;
        }

        var offset = this.offset;
        var state = this.state;
        this.container.addClass('transitioning');
        if(this.state === STATE_RELEAING){
            this._update(STATE_REFRESHING);
            this.container.addClass('refreshing');
            this.transform('');
            this.container.trigger('refreshing');
        } else {
            this._reset();
        }
        this.pullStartY = this.pullMoveY = 0;
        this.diff = 0;
        document.body.style.overflow = 'auto';
    },
    _update: function(state) {
        var refreshLayer = this.refreshLayer;
        this.state = state;

        if(STATE_PULLING === state){
            refreshLayer.html('下拉加载更多');
            console.log('pulling');
        } else if(STATE_RELEAING === state){
            refreshLayer.html('松开加载更多');
            console.log('releasing');
        } else if(STATE_REFRESHING === state){
            refreshLayer.html('刷新中...');
            console.log('refreshing');
            
        }
    },
    _reset: function(){
        var that = this;
        this.transform('translate3d(0,' + 0 + ',0)');
        this.pullStartY = this.pullMoveY = 0;
        this.diff = 0;
        var container = this.container;
        var onTransitionEnd = function(){
            container.off('transitionend');
            container.removeClass('transitioning refreshing');
            that._update(STATE_PENDING);
        };
        container.on('transitionend', onTransitionEnd);
    },
    transform: function(transform) {
        var style = this.container[0].style;
        style.webkitTransform = style.transform = transform;
    },
    loadDone: function() {
        this._reset();
        document.body.style.overflow = 'auto';
    },
    on: function(event, fn) {
        this.container.on(event, fn);
    }
};
