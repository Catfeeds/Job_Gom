var imgPath = $GLOBAL_CONFIG['pcimgpath'];
var fetch = require('io/fetch')
var url = require('io/url')

var imgReplace = require('utils/imgReplace');

//var grepLocal = /^https?\:\/\/(i|js).*?meixincdn\.com/;
var grepLocal = /\/\/(((i|js).*?meixincdn\.com)|.*?((atguat)|(gomein))\.net\.cn)/i;
var defaultImg = imgReplace.imgReplace(imgPath) + '/images/editor/spacer.jpg';

var setImgPath = function(o, src, useDefault) {
    if (useDefault) {
        o.src = defaultImg;
        o.setAttribute('_src', defaultImg);
    } else {
        if (typeof src == 'object') {
            src = src[0];
        }
        o.src = imgReplace.imgReplace(src);
        o.setAttribute('_src', imgReplace.imgReplace(src));
        o.setAttribute('proto', imgReplace.imgProto(src));
    }
}
var pastedCheckImg = function(ue) {
    setTimeout(function() {
        var $imgs = $(ue.body).find("img").not('[data-node="goodsPic"],[data-node="emoji"]');

        for (let i = 0, len = $imgs.length; i < len; i++) {
            let _img = $imgs[i];
            let src = _img.src;
            let _src = $(_img).attr('_src');
            let test_src = grepLocal.test(_src) || grepLocal.test(src);

            if (!test_src) {
                fetch
                    .post(url.get('topicUrlUpload2'), {
                        data: {
                            src: src
                        },
                    })
                    .done(function(data) {
                        if (data.success == true) {
                            var src = data.data;

                            if (src.length) {
                                setImgPath(_img, src)
                            } else {
                                setImgPath(_img, defaultImg, true)
                            }

                        } else {

                            setImgPath(_img, defaultImg, true)

                        }

                    })
                    .fail(function() {
                        setImgPath(_img, defaultImg, true)
                    })

            } else {
                var proto = $(_img).attr("proto");
                var thisSrc = imgReplace.imgReplace(src);
                if (!proto) {
                    proto = imgReplace.imgProto(src)
                    $(_img)
                        .attr({
                            'src': thisSrc,
                            '_src': thisSrc,
                            'proto': proto
                        })
                } else {
                    $(_img)
                        .attr({
                            'src': thisSrc,
                            '_src': thisSrc
                        })
                }

            }

        }

    }, 500)

}
module.exports = pastedCheckImg
