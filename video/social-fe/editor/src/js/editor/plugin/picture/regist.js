

var popboxTpl = require('./popbox.tpl');

var pictureTpl = require('./pictures.tpl');
var imgReplace = require('utils/imgReplace');
//require('../transformImg');

var imgTimes = 0;

// 接收图片
   var Pubsub = require('io/pubsub');
   var channel = require('io/channel');


var getEditor = function(){
    return UE.getEditor($EDITOR.GlobalVal.editorId);
}

function regist(editor){

    /*if(!$EDITOR.GlobalVal.regist){
        $EDITOR.GlobalVal.regist = {};
    }*/

    /*if(!UE.registPubsub){
        UE.registPubsub = {};
    }*/
    //tpl 插入到实例中
    var tpl = popboxTpl({
        imgPath: $EDITOR.GlobalVal.imgpath
    })

    var toolbar = editor.ui.getDom('toolbarbox');

    $(toolbar).append(tpl);

    editor.picPopBox = $('[data-node="picPopBox"]');

    /*if(UE.registPubsub.insertPicturePubSub == 1) return;
    UE.registPubsub.insertPicturePubSub = 1; */
     


        Pubsub(channel.setPubliser.changeImage).sub(function(data) {
        var $lastNode = null;
        var pictureHTML = '';

        data.times = ++imgTimes;
        var images = data.images;
        var len = images.length;
        for (var i = 0; i < len; i++) {
            var temp = imgReplace.imgReplace(images[i]);
            var proto = imgReplace.imgProto(images[i]);
            pictureHTML += pictureTpl({
                times: data.times,
                src: temp,
                _src: temp,
                imgProto: proto
            })
        }
        //pictureHTML = pictureTpl(data)

        /*.replace(/p> <img/gi,'p><img')
        .replace(/(<img .*?)(> <)(\/p>)/,function(i,j,k,l){
            return j + "><" + l;
        });*/
        getEditor().focus();

        getEditor().execCommand('inserthtml', pictureHTML);

        setTimeout(function() {
            var $editor = $(getEditor().body);

            $lastNode = $editor.find('[data-t=t-' + imgTimes + ']').last();
            var lastOffsetTop = $lastNode.offset().top;
            var lastPosition = lastOffsetTop + $lastNode.height();
            if (lastPosition > $(window).height()) {
                $('html,body').scrollTop(lastPosition);
            }

            imgReplace.changeSrc($editor);
        }, 300);
    });
        
}

module.exports = regist;
   