/**
 *  商品搜索页面-- 获取url参数
 * @author Qiaoli
 */

var changeLink = function(node) {
    var nodeStr = $.trim(node);
    var list = {};
    if (nodeStr === '') {
        return list;
    }
    var result = node.split("&");
    for (var i = 0; i < result.length; i++) {
        var newArr = result[i].split("=");
        list[newArr[0]] = newArr[1];
    }
    return list;
};

module.exports = changeLink;
