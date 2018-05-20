var ue = UE.getEditor("editor");
var imgReplace = require('utils/imgReplace');

var $meidianTag = $("[data-node=show-meidian]");
var globalShopId = $GLOBAL_CONFIG['shopId'];

var channelName = $GLOBAL_CONFIG['channel'] || '';      //项目：cenannel 美号
var defaultImg = '//js.meixincdn.com/m/pc/dist/images/public/img-error.png';
var json2html = require('plugin/json2html');
var arr;
function pushDiv(tagNode, isPreview,setRich) {
    var _childNodes = tagNode.childNodes;
    var data = "";
    for (var i = 0; i < _childNodes.length; i++) {
        var _self = _childNodes[i].attributes;
        if (_self) {
            data = _self['data-info'].nodeValue;
            break;
        }
    }
    data = JSON.parse(data);
    var richText = $(tagNode).prop("outerHTML").replace('<br>', '');
    var setObj = {
        "type": data.type || 'item',
        "text": "",
        "id": data.id,
        "shopId": data.shopId,
        "kid": data.kid,
        //2017.12.15 zhaodonghong add   b:因接口需要新增skuid字段
        "skuId": data.skuId
    };

    if(channelName === "meidian"){
        //上架到美店
        /*var midifyShopId = $GLOBAL_CONFIG['addToMeidian'];//addToMeidian 是动态更新 需要重新获取
        var shopTag=0;

        for (var i = 0; i < _childNodes.length; i++) {
            var _self = _childNodes[i].attributes;
            if (_self) {
                shopTag = _self['data-rec-shoptag']?0:1;
                break;
            }
        }*/

        //if(midifyShopId || shopTag){
            setObj.shopId = globalShopId;
        //}
    }

    var skuId = data.skuId;
    if (skuId) {/*
     *@desc:如果商品在列表中，则单独添加richText字段并设置为空；
     *      如果商品没在列表中，则判断是否是预览，如果是预览则将richText设置到type=item中
     *      如果不是预览，则不添加richText字段；
     */
    setRich ? (setObj.richText = '') : (isPreview ? (setObj.richText = richText) : void 0);/*
     *@desc:如果商品在列表中，则单独添加richText字段并设置为空；
     *      如果商品没在列表中，则判断是否是预览，如果是预览则将richText设置到type=item中
     *      如果不是预览，则不添加richText字段；
     */

 }
    arr.push(setObj);
};

function pushVideo(node) {
    var $imgTag = node.nodeName == 'IMG' ? $(node) : $(node).find('img');
    if ($imgTag) {
        var proto = $imgTag.attr('proto');
        var src = $imgTag.attr('src'); //视频封面
        var des = $imgTag.attr('des');      //视频描述
        var id = $imgTag.attr('video-id');       //视频id
        var url = $imgTag.attr('video-path'); //视频地址
        var len = $imgTag.attr('len');      //视频长度
        arr.push({
            "id":parseInt(id),
            "type": "video",
            "text": '',
            "url": proto + url,
            "coverImage":proto + src,
            "length":parseInt(len),
            "richText":''
        });
    }
};


function pushImg(node) {
    var $imgTag = node.nodeName == 'IMG' ? $(node) : $(node).find('img');
    if ($imgTag) {
        var proto = $imgTag.attr('proto');
        var src = $imgTag.attr('src');
        var $link = $imgTag.parents("a");

        var json = {
            "type": "image",
            "text": "",
            "richText": "",
            "url": proto + imgReplace.orignalImgReplace(src) 
        }
        $link.length ? json.scheme = $link.attr("href"): void 0 ;
        arr.push(json);
    }
};

function pushText(text) {
    var _text = $.trim(text).replace(/&nbsp;/gi, ' ');

    if (_text != "") {
        var obj = {
            "type": "text",
            "richText": text,
            "text": _text
        };
        arr.push(obj);
    }
};


function digui(contents,nowrap){
    //oneLine 是为了解决app处理多标签换行的问题 
    //比如 12<a>3</a>4   会被处理成  12     3      4     3行    所以 需要oneline
    var _nowrap = nowrap || 0;    
    var items = contents.childNodes;
    //var lastLength = 
    for(let i = 0;i<items.length;i++){
        var item = items[i];
        var nodeName = item.nodeName;
        var nodeType = item.nodeType;

        //  文本节点
        if(nodeType ==3){ 
            var value = item.nodeValue.replace(/[\u200b]/gi,'');
            //光标节点不传值
            if(value){
                var _len = arr.length;
                //if(arr[_len-1].type == "text" && _len != lastLength ){
                if(arr[_len-1].type == "text" && _nowrap ){
                    arr[arr.length-1].text += item.nodeValue;
                }else{
                    var value = item.nodeValue.replace(/[\u200b]/gi,'');
                    if(value){
                        arr.push({
                            "type": "text",
                            "text": item.nodeValue,
                            "richText": ""
                        })
                    }
                    
                }
                _nowrap = 1;
            }
            
        //标签节点    
        }else{  

            if (nodeName == "IMG") {     //  图片或者video
                if($(item).attr('data-node') == 'video'){
                    pushVideo(item)
                }else{
                    pushImg(item);
                }

            }else{  //其他标签节点情况
                digui(item,_nowrap);   
            }
        }
    }

 
}


function fillComponents(arrs, isPreview) {
    var nodes = ue.document.body.children;
    //push数据到 components
    arr = arrs;
    function pushRich(tagNode) {
        var lastLength = arr.length;
        var innerText = $(tagNode).text();
        var hasImg = $(tagNode).find('img').length;
        var richText = $(tagNode).prop("outerHTML").replace(/<br>/g, '');
        var $contents = $(tagNode).contents();
        
        if (hasImg) { //如果有图片需同时组装pc富文本item及其他端普通item
            var imgExp = /<img.*?>/gi;
            var proto = /proto=["'](.*?)["']/;
            var src = / src=["'](.*?)["']/i;
            var data_original = / data-original=["'](.*?)["']/;
            var isVideo = /video-id="[\d]+"/;
            var $all = /["'](.*?)["']/;
            richText = richText.replace(imgExp,function($1){

                if($1.indexOf('.gif') != -1 ||  $1.indexOf('goodsPic')!= -1 || $1.indexOf('video-path')!= -1){
                    return $1;
                }else{

                    var _proto = $1.match(proto)[1];
                    var _src = $1.match(src)[1];
                    var temp_src = "";
                    _src = imgReplace.orignalImgReplace(_src);
                    _src = imgReplace.addShortCut(_src);
                    if($1.indexOf('data-original')!= -1){
                        temp_src = $1.replace(data_original, ' data-original="'+_src +'"');
                    }else{
                        temp_src = $1.replace(src, function($2){
                            return $2 + ' data-original="'+_src +'"';
                        })
                    }

                    if(!isPreview){
                        temp_src = temp_src.replace(src,function($1,$2){
                            return ' src="'+ defaultImg + '"';
                        })
                    }
                    

                    return temp_src;

                }
            })

            //修正格式
            richText = richText.replace(/<br>/g, '');

            var isVideo = /video-id="[\d]+"/.test(richText);
            if(channelName === "meihao" && isVideo){
                var json = json2html.parse(richText).value();
                richText = json2html.stringify(json).value("preview");
            }

            arr.push({
                "type": "text",
                "text": "",
                "richText": richText
            });
            
            digui(tagNode);

        } else {
            arr.push({
                "type": "text",
                "text": innerText,
                "richText": richText
            });
        }
    };

    



    //遍历body下的节点 目前只有P 和DIV,img,text(text的为火狐标签溢出bug);
    //新加了h1,h2,strong
    for (var i = 0; i < nodes.length; i++) {
        var tagNode = nodes[i];

        var tagName = tagNode.tagName;
        var nextSibling = $(tagNode.nextSibling)
        switch (tagName) {
            case "P":
                var $tagNode = $(tagNode);
                var html = $.trim($tagNode.html());
                var text = $.trim($tagNode.text());


                text = text.replace(/\u200B/gi, '');
                if(html.indexOf('<img') != -1){
                    pushRich(tagNode);
                }else if (text != '' || !nextSibling.hasClass('card-box')) {
                    pushRich(tagNode);
                }

                break;
            case "DIV":
                pushDiv(tagNode,isPreview);
                break;
            case "#TEXT":
                pushText(tagNode.nodeValue);
                break;
            default:
                pushRich(tagNode);
        }

    }

    if ( $meidianTag.length && $meidianTag.find('.menu-checkbox-checked').length ) {
        arr.push({
            "type":"mshop",
            "mshopId":$GLOBAL_CONFIG['shopId']
            //"mshopId":"1234567890"
        })
    }
}



module.exports = fillComponents;