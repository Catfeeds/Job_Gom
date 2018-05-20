//限制文本长度，自动截取
//可判断中文
function cutstr(str, len) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) { 
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            return str_cut;
        }
    }
    if (str_length < len) {
        return str;
    }
}
module.exports = cutstr;
