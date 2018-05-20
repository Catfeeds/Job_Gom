var uploadPop = require('module/popup/upload/dialog'),
    //Pubsub = require('io/pubsub'),
    //pubName = require('io/channel');
     upload = require('module/upload');
var addImgTpl = require('./chooseImg.tpl');

var init = function(maxLen,topicId) {
    var $webUpLoader,
        maxlength = maxLen;
        //files = {};
    if(maxlength > 0) {

        var dialogUploader = uploadPop.create({
            maxlength: maxlength
        }, {
            ok: function() {
                $('[data-node="uploadList"]').off();
                $webUpLoader.destroy();
                var $imgList = $('[data-node="uploadList"] img'),
                    images = [];
                for (var i = 0, len = $imgList.length; i < len; i++) {
                    images.push($imgList.eq(i).attr('src'));
                }
                //var files = {};
                setImage(images,topicId);
             
            },
            cancel: function() {
                $('[data-node="uploadList"]').off();
                $webUpLoader.destroy();
            }
        });
        dialogUploader.onshow = function() {
            $webUpLoader = upload.init({
                maxlength: maxlength
            });
        };
    } else {
        dialogUploader = uploadPop.create({}, {
            title: '选择图片',
            modal: true,
            fixed: true,
            content: '<p class="circle-pop-p">您最多能添加9张图片哦！</p>',
            className: 'pop-box',
            okValue: '确定',
            okCls: 'pc-btn pc-btnh35 circle-pop-btn',
            btnWrapCls: '',
            ok: function() {
            }
        })
    }
    dialogUploader.show();
};


//将图片插入到div中
var setImage = function(images,topicId){

    if(images.length > 0){
        var arrImg = [];
        //var isFull = null;
        var $div = $("[data-tid="+topicId+"]").children("[data-node=addImgGoods]");
        var num = parseInt($div.attr("data-imgNum"));
        var nextnum = parseInt(num - images.length );
            $div.attr("data-imgNum",nextnum);
        var $ul = $("[data-tid="+topicId+"]").find("[data-node=imgUl]");
            $ul.addClass("topic-imglist");
        var imgsrt = $ul.attr("data-imgsrt");
        var $li = $ul.children("[data-node=addMoreImg]");
        var newImg = [];
        if(imgsrt){
            arrImg.push(imgsrt);
        }
        
        for(var i = 0; i < images.length; i++){ 
            arrImg.push(images[i]);
            newImg.push(images[i]);
        }
        var imgStr = {
            images :newImg
        }
        var item = addImgTpl(imgStr)
        $ul.removeClass("hide");
        $li.before(item);
        
        $ul.attr("data-imgsrt",arrImg);
        var lengthImg = parseInt( $ul.parent().attr("data-imgNum"));
        
        if(lengthImg <= 0 ){
            $("[data-tid="+topicId+"]").find("[data-node=addImg_btn]").addClass("disabled");
            $ul.children("[data-node=addMoreImg]").addClass("hide");
        }
    }else{
        return false;
    }
    
}


module.exports = init;