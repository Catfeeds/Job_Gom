 var rules = /^https?:/i;
 var https = 'https';
 var imgRule = /^http/i;

/* var grepStr = /-600!80\./g;
 var grepOldStr = /\.600q80\.jpg/gi;*/
 var shotCut = "-600!80";
 var imgType = /\.(jpg|jpeg|png)$/;

var grepStr1 = /(.+?)-[^\.]+\.(jp(e)?g|png|gif).*/;
var grepStr2 = /(.+?\.(jp(e)?g|png|gif)).*/


 var imgReplace = function(src) {
    return  src.replace(rules, '');
 }

var orignalImgReplace = function(src){
    if(grepStr1.test(src)){
        return src.replace(grepStr1,"$1.$2"); 
    }else{
        return src.replace(grepStr2,"$1");
    }
      
}

var addShortCut = function(src){
    return src.replace(imgType,function($1){
        return shotCut + $1;
    })
}
 var imgProto = function(src) {
     if (src.indexOf(https) != -1) {
         return 'https:';
     } else {
         return 'http:'
     }
 }

 var changeSrc = function(container) {
     var $imgs = container.find('img').not('[data-node="goodsPic"]');
     var len = $imgs.length;
     for (var i = 0; i < len; i++) {
         var _this = $($imgs[i])
         var _src = _this.attr("_src");
         var _orignal = _this.attr("data-original");
         if (_orignal) {
             _this.attr({
                 'src': imgReplace(_orignal),
                 '_src': imgReplace(_orignal),
                 'proto': imgProto(_orignal)
             })
         } else if (!imgRule.test(_src)) {
             var proto = _this.attr("proto");
             _this.attr("_src", _src);
         }

     }
 }

 module.exports = {
     imgReplace: imgReplace,
     addShortCut:addShortCut,
     imgProto: imgProto,
     changeSrc: changeSrc,
     orignalImgReplace:orignalImgReplace
 };
