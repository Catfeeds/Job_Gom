/*

简易的图片放大器
@Enming Zhang

将大图 url 写入小图容器的自定义属性 data-lg-src 即可

*/

$.fn.imgZoom = function() {

    var imgWrapperWidth; //原始图片容器宽度
    var imgWrapperHeight; //原始图片容器高度
    var zoomAreaRatio = 0.5; //要放大的范围占容器的比例

    var $areaIndicator; //范围提示框
    var areaIndicatorWidth;
    var areaIndicatorHeight;

    var $zoomedPic; //放大的图片

    //初始化范围提示框和大图两个元素，并隐藏之
    var init = function($imgWrapper) {
        imgWrapperWidth = $imgWrapper.width();
        imgWrapperHeight = $imgWrapper.height();
        areaIndicatorWidth = imgWrapperWidth * zoomAreaRatio;
        areaIndicatorHeight = imgWrapperHeight * zoomAreaRatio;
        $areaIndicator = $('<div class="area-indicator"></div>').css({
            position: 'absolute',
            display: 'none',
            width: areaIndicatorWidth,
            height: areaIndicatorHeight,
            top: 0,
            left: 0,
            background: 'rgb(254, 222, 79)',
            opacity: 0.5,
            border: '1px solid #222',
            zIndex: 1,
        });
        $zoomedPic = $('<div class="zoomed-pic"></div>').css({
            position: 'absolute',
            display: 'none',
            width: imgWrapperWidth,
            height: imgWrapperWidth,
            top: 0,
            left: imgWrapperWidth + 12,
            background: 'url(' + $imgWrapper.attr('data-lg-src') + ') no-repeat',
            border: '1px solid #555',
        });
        $imgWrapper.append($areaIndicator).append($zoomedPic);
    };

    // 根据鼠标位置调整以上二元素的样式
    var handleMouseMove = function(e) {
        var mouseX = e.pageX - $(e.target).closest('.img-target').offset().left;
        var mouseY = e.pageY - $(e.target).closest('.img-target').offset().top;
        // 鼠标在四角的一定范围内时，调整目标坐标；否则目标坐标和鼠标坐标相同
        var widthThreshold = areaIndicatorWidth / 2;
        var heightThreshold = areaIndicatorHeight / 2;
        switch (true) {
            case mouseX < widthThreshold:
                targetX = 0;
                break;
            case mouseX > (imgWrapperWidth - widthThreshold):
                targetX = imgWrapperWidth - areaIndicatorWidth;
                break;
            default:
                targetX = mouseX - widthThreshold;
        }
        switch (true) {
            case mouseY < heightThreshold:
                targetY = 0;
                break;
            case mouseY > (imgWrapperHeight - heightThreshold):
                targetY = imgWrapperHeight - areaIndicatorHeight;
                break;
            default:
                targetY = mouseY - heightThreshold;
        }
        $areaIndicator.css({
            left: targetX,
            top: targetY,
        });
        // 同时改变右侧大图的 background position
        var bgPosX = (targetX / imgWrapperWidth * 100 * 2) + '%';
        var bgPosY = (targetY / imgWrapperHeight * 100 * 2) + '%';
        $zoomedPic.css({
            backgroundPositionX: bgPosX,
            backgroundPositionY: bgPosY,
        });
    };

    $.each(this, function(index, ele) {
        $ele = $(ele);
        init($ele);
        $ele
            .on({
                'mouseenter': function(e) {
                    $areaIndicator.show();
                    $zoomedPic.show();
                },
                'mousemove': function(e) {
                    handleMouseMove(e);
                },
                'mouseleave': function(e) {
                    $areaIndicator.hide();
                    $zoomedPic.hide();
                },
            })
            .find('.zoomed-pic').on('mouseenter', function() {
                $(this).hide();
            });
    });

};

$('.img-target').imgZoom();
