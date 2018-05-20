var alert = require('module/popup/alert');
var config = require('editor/config');

function grepHtml(editor,html){
	var me = editor;
	var limitNum = config.goodsLimitNUm;
    var tempHtml = html;
    var browser = baidu.editor.browser;
    var ieVersion = browser.ie ? browser.version : 0;
    
    //过滤回车特殊字符
    var grepFormat = /[\n]/gi;
    //匹配商品
    var grepDiv = /<div (data-node=["']gmp-ebox.*?|class=["']publish-item.*?)<\/div><\/div>/gi;
    //匹配img
    var grepImg = /<img.*?>/gi;
    //匹配src
    var grepLocal = / src=["']https?\:\/\/i.*?meixincdn\.com\//;  
    //var grepLocal = / src=["']https?\:\/\/i.*?\//;
    //匹配表情
    var grepFace = /data-face=['"](.*?)['"]/;
    //1.删除商品  
    //2.匹配域名  
    //3.转换表情
    tempHtml = tempHtml
                .replace(grepFormat,'')
                .replace(grepDiv,'')
                .replace(grepImg,function(i){ 
                    //判断域名
                    if( grepLocal.test(i) ){ 
                        //判断表情
                        if( grepFace.test(i) ){
                            return grepFace.exec(i)[1];
                        }

                        if(i.indexOf('insertImg') != -1){
                            if(ieVersion > 7){
                                return i
                                .replace('>','><br/>')
                                .replace('<img','<br/><img');
                            }else{
                                return i;
                            }
                            
                        }else{
                            if(ieVersion > 7){
                                return i
                                    .replace('>','><br/>')
                                    .replace('<img','<br/><img data-type="insertImg"');
                            }else{
                                return i
                                    .replace('<img','<img data-type="insertImg"');
                            }
                            
                        } 
                        
                    }
                    //外链
                    return '';

                });
    
    //检测图片数量
    function checkNum(str){
        var innerImg = str.match(grepImg),
            innerImgLen = innerImg ? innerImg.length : 0;   //粘贴板 图片数量

        var outerImg = me.getContent().replace(grepDiv,'')
                            .match(grepImg),
            outerImgLen = outerImg ? outerImg.length : 0;   //编辑器区域 图片数量
        
        if( innerImgLen + outerImgLen > limitNum ) {
            return true;
        }
        return false;
    }

    if(checkNum(tempHtml)){
        tempHtml = '';
        alert('您最多能添加' + limitNum + '张图片哦！'); 
        return tempHtml;
    }
    return tempHtml;
}

module.exports = grepHtml;