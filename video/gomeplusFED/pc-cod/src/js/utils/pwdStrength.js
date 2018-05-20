/**
 * Created by dongyukuan on 2016/5/25.
 * 密码强度验证
 */
var byteLen = require('utils/byteLen');
function getCount(str) {
    var count = 0;
    var len = byteLen(str);
    if (!str)return 0;
    count += len <= 6 ? 5 : (len >= 11 ? 25 : 10);
    count += !str.match(/[a-z]/i) ? 0 : (str.match(/[a-z]/) && str.match(/[A-Z]/) ? 20 : 10);
    count += !str.match(/[0-9]/) ? 0 : (str.match(/[0-9]/g).length >= 3 ? 20 : 10);
    count += !str.match(/\W/) ? 0 : (str.match(/\W/g).length > 1 ? 25 : 10);
    count += !str.match(/[0-9]/) || !str.match(/[a-z]/i) ? 0 : (!str.match(/\W/) ? 2 : (!str.match(/[a-z]/) || !str.match(/[A-Z]/) ? 3 : 5));
    return count;
}
module.exports = getCount;