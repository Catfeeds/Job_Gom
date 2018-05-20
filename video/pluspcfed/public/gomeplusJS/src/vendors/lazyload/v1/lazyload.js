define('vendors/lazyload.js',function(require,exports,module) {
    /**
     * Zepto picLazyLoad Plugin
     * 西门 http://ons.me/484.html
     * 20140517 v1.0
     */
    ;(function($){
        $.fn.picLazyLoad = function(settings){
            var $this = $(this),
                _winScrollTop = $(window).scrollTop(),
                _winHeight = $(window).height(),
                fx=require('vendors/zepto-fx.js');

            settings = $.extend({
                threshold: 0, // 提前高度加载
                placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
            }, settings||{});

            // 执行懒加载图片
            lazyLoadPic();

            // 滚动触发换图
            $(window).on('scroll',function(){
                _winScrollTop = $(window).scrollTop();
                lazyLoadPic();
            });

            // 懒加载图片
            function lazyLoadPic(){
                $("img[data-original]").each(function(){
                    if(($(this).offset().top + $(this).width()/2) < ($(window).height()+$(window).scrollTop())){
                        // console.log("这里是距离："+$(this).offset().top);
                        // console.log("这里是高度："+$(this).height());
                        $(this).attr("src",$(this).attr("data-original"));
                        $(this).css({ opacity: .2 }).animate({ opacity: 1 }, 280);
                        $(this).removeAttr("data-original");
                    }
                });
                /*$this.each(function(){
                    var $self = $(this);
                    // 如果是img
                    if($self.is('img')){
                        if($self.attr('data-original')){
                            var _offsetTop = $self.position().top;
                            if((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)){
                                $self.attr('src',$self.attr('data-original'));
                                $self.css({ opacity: .2 }).animate({ opacity: 1 }, 280);
                                $self.removeAttr('data-original');
                            }
                        }

                        // 如果是背景图
                    }else{
                        if($self.attr('data-original')){
                            // 默认占位图片
                            if($self.css('background-image') == 'none'){
                                $self.css('background-image','url('+settings.placeholder+')');
                            }
                            var _offsetTop = $self.offset().top;
                            if((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)){
                                $self.css('background-image','url('+$self.attr('data-original')+')');
                                $self.removeAttr('data-original');
                            }
                        }
                    }
                });*/
            }
        }
    })(Zepto);
});