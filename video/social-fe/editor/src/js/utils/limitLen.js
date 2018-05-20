/**
 * Created by dongyukuan on 2016/5/28.
 */
function limitLen(str, len) {
    if (str.length > len) {
        return str.substr(0, len);
    } else {
        return str;
    }
}
module.exports = limitLen;