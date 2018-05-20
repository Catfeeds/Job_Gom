var fetch = require('io/fetch')
var url = require('io/url')
var alert = require('module/popup/alert');
var i18n = require('module/i18n');
var domUtils = UE.dom.domUtils;
var utils = UE.utils;
var $picLoading;
var firing = 0;

var config = require('editor/config');
var imgReplace = require('utils/imgReplace');

var limitNum = config.imgLimitNUm;
var maxSize = 4 * 1024 * 1024;
var fetchData = function(src, editor) {
    fetch
    //.get('img.json', {})
        .post(url.get('topicBase64Upload'), {
            data: {
                src: src
            },
            beforeSend: function() {
                if (!$picLoading) {
                    $picLoading = $('[data-node="picLoading"]');
                }
                $picLoading.removeClass('hide');

            }
        })
        .done(function(data) {
            if (data.success == true) {
                var datas = data.data
                for (var i = 0, len = datas.length; i < len; i++) {
                    var _datas = datas[i];
                    var str = "<p><img src='" + imgReplace.imgReplace(_datas) + "' _src='" + _datas + "' data-type='insertImg' proto = '" + imgReplace.imgProto(_datas) + "'></p>";
                    editor.execCommand("insertHtml", str)

                }
            } else {
                alert('上传失败,请重新上传');
                firing = 0;
                $picLoading.addClass('hide');
            }

        })
        .always(function(data) {
            firing = 0;
            $picLoading.addClass('hide');

        })
}

var imgReader = function(file, editor) {
    if (firing == 1) {
        return false;
    }
    firing = 1;
    var reader = new FileReader();

    // 读取文件后将其显示在网页中
    reader.onload = function(e) {
        var img = new Image();
        var data = e.target.result;

        //图片压缩优化
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var imageBase64;

        img.onload = function() {
            var _w = img.width;
            var _h = img.height;

            canvas.width = _w;
            canvas.height = _h;
            context.drawImage(img, 0, 0);
            imageBase64 = canvas.toDataURL("image/jpeg");
            fetchData(imageBase64, editor);
        }

        img.src = data;

        domUtils.preventDefault(e)
    };
    // 读取文件
    reader.readAsDataURL(file);
};

UE.plugin.register('autoupload', function() {
    function getPasteImage(e) {
        return e.clipboardData && e.clipboardData.items && e.clipboardData.items.length == 1 && /^image\//.test(e.clipboardData.items[0].type) ? e.clipboardData.items : null;
    }

    function getDropImage(e) {
        return e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null;
    }

    return {
        outputRule: function(root) {
            utils.each(root.getNodesByTagName('img'), function(n) {
                if (/\b(loaderrorclass)|(bloaderrorclass)\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
            utils.each(root.getNodesByTagName('p'), function(n) {
                if (/\bloadpara\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
        },
        bindEvents: {
            //插入粘贴板的图片，拖放插入图片
            'ready': function(e) {
                var me = this;

                if (window.FormData && window.FileReader) {

                    domUtils.on(me.body, 'paste', function(e) {
                        var hasImg = false,
                            items;
                        //获取粘贴板文件列表
                        items = e.type == 'paste' ? getPasteImage(e) : getDropImage(e);
                        if (items) {
                            var len = items.length,
                                file;

                            while (len--) {
                                file = items[len];
                                if (file.getAsFile) file = file.getAsFile();
                                if (file && file.size > 0) {
                                    if (/image\/\w+/i.test(file.type)) { //判断为图片文件
                                        if (firing) {
                                            hasImg = true;
                                            e.preventDefault();
                                            return;
                                        }
                                        if (file.size > maxSize) {
                                            hasImg = true;
                                            e.preventDefault();
                                            alert(i18n.upload.uploadError);
                                            return;
                                        } else {
                                            var $content = $(me.getContent());
                                            var insertedImgLen = $content.find('[data-type=insertImg]').length;

                                            if (insertedImgLen < limitNum) {
                                                imgReader(file, me);
                                            } else {

                                                var range = me.selection.getRange(),
                                                    startContainer = range.startContainer,
                                                    nodeName = startContainer.nodeName;

                                                if (insertedImgLen == limitNum) {
                                                    if (e.target.tagName == "IMG") {
                                                        imgReader(file, me);
                                                    }
                                                } else {
                                                    if (!$(".pop-box-backdrop").length) {
                                                        alert('您最多能添加' + limitNum + '张图片哦！');
                                                    }
                                                }

                                            }
                                            hasImg = true;
                                        }

                                    }
                                }
                            }

                            setTimeout(function() {
                                imgReplace.changeSrc($(me.body));
                            }, 2000)
                            hasImg && e.preventDefault();
                        }
                    });
                }
            }
        }
    }
});
