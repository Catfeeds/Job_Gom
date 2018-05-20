/**
 * @module Tab
 * 页签插件
 * @author yanglang
 * 使用方法
 * $('#tabContainer').tab({
 *      items:[
 *          {
 *              title:'上架中',
 *              url:'http://',
 *              params:{key:'花'}, //params:{} or function 参数，可以定死参数，也可以使用一个动态返回参数的方法
 *              render:function(data,i ,$dom){
 *                  return template(data);
 *              } //渲染模板方法，外部提供，$dom为页签面板，data为接口返回的数据，此方法需要返回渲染后的html数据
 *          }
 *      ],
 *      loadMoreSelector:'.loadmore', //加载更多元素选择器
 *      index:0 //默认选中哪个页签
 * })
 */
define('UI/tab.js',function(require,exports,module) {
    require('vendors/zepto.js');
    var Ajax = require('utils/ajax.js');

    var html = '<nav class="mshop-box_tab"></nav><div class="mshop-box_box"></div>';

    var defaults = {
        items:[],
        index:0
    };

    $.fn.tab = function(options){
        return new Tab(this, options);
    };

    /**
     * Tab插件
     * @param element 容器元素
     * @param options 选项
     * @constructor
     */
    var Tab = function(element, options){
        this.$el = $(element);
        this.$tab = $(html);
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    Tab.prototype = {
        constructor:Tab,
        init:function(){
            this.bindEvents();
            //兼容服务端渲染数据的情况
            if(this.$el.find('.mshop-box_box').length>0){
                this.$tab = this.$el.children();
                return;
            }
            var i = 0,items = this.options.items, len = items.length,headHtml = [],bodyHtml = [];
            for(;i<len ;i++){
                headHtml.push('<a '+(this.options.index == i && 'class="on"')+' href="javascript:void(0);">'+items[i].title+'</a>');
                bodyHtml.push('<section class="mshop-shoping" '+(this.options.index == i && 'style="display:block;"')+'></section>');
                this.options.index == i && this.fetchData(i);
            }
            this.$tab.find('.mshop-box_tab').html(headHtml.join(''))
                .find('.mshop-box_box').html(bodyHtml.join(''));
            this.$el.append($tab);
        },
        /**
         * 绑定页签点击事件，并加载刷新相应页签下数据
         */
        bindEvents:function(){
            var that = this;
            this.$el.on('click','.mshop-box_tab>a',function(){//绑定页签头切换事件
                that.select($(this).index());
            }).on('click',that.options.loadMoreSelector,function(){//绑定加载更多元素的点击事件
                var $section = $(this).parents('section.mshop-shoping');
                that.fetchData($section.index(),true);
            });
        },
        /**
         * 设置页签选中
         */
        select:function(i){
            var $el = this.$tab.find('.mshop-box_tab>a').eq(i),index = i;
            if($el.hasClass('on'))
                return;
            $el.siblings().removeClass('on');
            $el.addClass('on');
            this.$tab.find('.mshop-box_box>.mshop-shoping').hide().eq(index).show();
            this.fetchData(index);
        },
        /**
         * 查询数据
         * @param i 页签序号
         * @param isLoadMore 是否为加载更多
         */
        fetchData:function(i, isLoadMore){
            var that = this,items = that.options.items, url = items[i].url;
            Ajax.query(url, $.isFunction(items[i].params)?items[i].params():items[i].params,function(data){
                var render = items[i].render;
                if(render && $.isFunction(render)){
                    //缓存tab某面板
                    var $tabBox = that.$tab.find('.mshop-box_box').eq(i);
                    //调用渲染方法得到渲染后的html
                    var html = render.apply(that,[data, i, $tabBox]);
                    isLoadMore?$tabBox.append($(html)):$tabBox.html(html);
                }

            });
        }
    };

});