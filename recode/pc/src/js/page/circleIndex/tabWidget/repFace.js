var emoji = require('module/popup/face/emoji');
var reg = /(\[([\s\S]+?)\])/g;
var repFace = function(str){
   str = str.replace(reg, function() {
        var imgStr;
        var originText = arguments[0];
        var text = arguments[2];
        emoji.forEach(function(item, index) {
            if (item.name == text) {
                imgStr = '<img class="imoji" style="width:16px;height:16px;display:inline-block;"  src=' + item.url + '>';
            }
        })
        return imgStr ? imgStr : originText;
    })
    return str;
}
module.exports = repFace;