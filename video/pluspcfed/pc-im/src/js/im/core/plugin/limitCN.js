//限制文本长度，自动截取
//可判断中文

export const byteLen = ( str, len ) => {

    if (str == null) return 0;
    if (typeof str != "string") {
        str += "";
    }
    const _len = str.replace(/[^\x00-\xff]/g, "01").length;

    if( arguments.length > 0 ){
        return _len > len;
    }else{
        return _len;
    }
     
}

export const limitCN = ( str, len ) => {

    var str_length = 0;
    var str_len = 0;
    var str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        var a = str.charAt(i);
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
};
