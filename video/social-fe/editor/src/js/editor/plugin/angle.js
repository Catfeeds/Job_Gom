var fetch = require('io/fetch');
var url = require('io/url');

var imgReplace = require('utils/imgReplace');
var firing = 0;
var imgArr = [];
var $picLoading;
//var transformUrl = '1.json';

var transformAngle = function($obj, direction) { //img对象  角度
    if (firing == 1) {
        return false;
    }
    var def = $.Deferred();
    var angle = parseInt($obj.attr("angle")) || 0;
    switch (direction) {
        case 2:
            if (angle == 0) {
                angle = 270;
            } else {
                angle -= 90;
            }
            break;
        case 1:
            if (angle == 270) {
                angle = 0;
            } else {
                angle += 90;
            }
            break;
        case "reset":
            angle = 0;
            break;
    }
    def.resolve($obj, angle);
    return def.promise();
}

var detectImg = function($obj, angle) {
    if (firing == 1) {
        return false;
    }
    var def = $.Deferred();
    var _src = $obj.attr("_src");
    var src = imgReplace.imgReplace(_src);

    //数组是否包含 下标为_src的元素
    var hasImg = imgArr[_src];
    var angleStr = 'angle' + angle;
    //是否包含已有角度的元素，
    var tempObj = {
        "$obj": $obj,
        "src": src,
        "_src": _src,
        "angle": angle
    }

    var extendObj = {};

    if (hasImg) {
        if (hasImg[angleStr]) {
            extendObj = {
                "status": 1,
                "cache": 1
            };
        } else {
            extendObj = {
                "status": 0,
                "cache": 1
            };
        }

    } else {
        extendObj = {
            "status": 0,
            "cache": 0
        };
    }

    $.extend(tempObj, extendObj)

    def.resolve(tempObj);
    return def.promise();
}

var renderImg = function(obj) {

    if (firing == 1) {
        return false;
    }
    firing = 1;
    var $obj = obj.$obj;
    var src = obj.src;
    var _src = obj._src;
    var angle = obj.angle;
    var status = obj.status;
    var cache = obj.cache;

    var angleStr = "angle" + angle;

    var renderExist = function() {
        $obj.attr({
            'src': imgReplace.imgReplace(imgArr[_src][angleStr]),
            'angle': angle,
            "proto": imgReplace.imgProto(imgArr[_src][angleStr])
        });
        firing = 0;
    }

    if (obj.status) {
        renderExist();
        //直接渲染
        return false;
    }

    if (obj.angle == 0) {

        if (!imgArr[_src]) {
            imgArr[_src] = [];
        }

        imgArr[_src][angleStr] = imgReplace.imgReplace($obj.attr("_src"));
        renderExist();
        return false;
    }

    // fetch.get(transformUrl, {
    //fetch.post(url.get('topicRotateImg'), {
    var transformUrl = $EDITOR.Urls.rotateImg || url.get('topicRotateImg');
    fetch.post(transformUrl, {    
        data: {
            imgPath: _src,
            angle: angle
        },
        beforeSend: function() {
            if (!$picLoading) {
                $picLoading = $('[data-node="picLoading"]');
            }
            $picLoading.removeClass('hide');

        }
    }).done(function(data) {
        var dataSrc = data.data[0];
        if (data.success == true) {
            $obj.attr({
                'src': imgReplace.imgReplace(dataSrc),
                'angle': angle,
                'proto': imgReplace.imgProto(dataSrc)
            });
            if (!obj.cache) {

                imgArr[_src] = [];

            }
            imgArr[_src][angleStr] = imgReplace.imgReplace(dataSrc);
        } else {
            alert(data.message);
        }
    }).always(function(data) {
        firing = 0;
        $picLoading.addClass('hide');

    })
}

var transform = function(obj, direction) {
    var def = $.Deferred();
    def.resolve($(obj), direction);

    def
        .then(transformAngle) //转化角度
        .then(detectImg) //判断图片是否命中
        .then(renderImg); //渲染图片
}
module.exports = transform;
