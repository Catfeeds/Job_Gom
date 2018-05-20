// import '../../css/components/pullToRefresh.scss';

var STATE_PENDING = 'pending';
var STATE_PULLING = 'pulling';
var STATE_RELEAING = 'releasing';
var STATE_REFRESHING = 'refreshing';

var EVENT_REFRESHING = 'refreshing';

var rem2px = function(rem){
    var size = document.documentElement.style.fontSize;
    return rem * size;
};

var PullToRefresh = function(container, options) {
    options = this.options = options || {};
    this.container = container;
    
    this.pullStartY = 0;
    this.pullMoveY = 0;

    this.diff = 0; // y轴滚动的距离

    this.noMore = false; // 没有更多数据
    this.state = STATE_PENDING; // pending, pulling, releasing, refreshing
    this.offset = options.offset || 60; // 位移距离
    this.refreshLayer = $(options.refreshLayer || '<div class="ptr layer">下拉加载更多</div>');
    this.init();
};

PullToRefresh.prototype = {
    constructor: PullToRefresh,
    init: function() {
        var self = this;
        var container = this.container;

     /*   var proxy = function(fn) {
            return $.proxy(fn, self);
        };*/

        container.prepend(this.refreshLayer);
        container.addClass('ptr');
        
        container.on('touchstart', this._onTouchStart.bind(this));
        container.on('touchmove', this._onTouchMove.bind(this));
        container.on('touchend', this._onTouchEnd.bind(this));
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
            var offset = this.offset;
            this.transform('translate3d(0,' + translate + 'px,0)');
            if(this.state === STATE_PULLING && translate > offset){
                this._update(STATE_RELEAING);
            }
            if(this.state === STATE_RELEAING && translate < offset){
                this._update(STATE_PULLING);
            }
        } else {
            // 正常滚动状态
            this._update(STATE_PENDING);
        }
    },
    _onTouchEnd: function(e) {
        if(this.state === STATE_REFRESHING || this.state === STATE_PENDING){
            return;
        }
        this.container.addClass('transitioning');
        if(this.state === STATE_RELEAING){
            this._update(STATE_REFRESHING);
            this.container.addClass('refreshing');
            this.transform('');
            this.container.trigger(EVENT_REFRESHING);
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
        if(this.noMore){
            refreshLayer.html('没有更多了');
        } else {
            if(STATE_PULLING === state){
                refreshLayer.html('下拉加载更多');
            } else if(STATE_RELEAING === state){
                refreshLayer.html('放开刷新');
            } else if(STATE_REFRESHING === state){
                refreshLayer.html('正在加载...');
            }
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
    },
    noMoreData: function(){
        this.noMore = true;
        this.refreshLayer.html('没有更多了');
    }
};

export default PullToRefresh;
