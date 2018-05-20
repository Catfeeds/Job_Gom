var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');
var flag = false;
var sensitiveTitle = function(node,comment) {
    fetch.post(url.get('sensitiveWord'), {
        data: {
            text: node
        },
        async: false
    }).done(function(data) {
        if (data.success === false) {
            var msg = '标题';
            flag = true;
            if(comment){
                msg='评论';
            }
            alert(msg + '中含有"' + data.data + '"敏感词');
        } else {
            flag = false;
        }
    }).fail(function() {
        alert('数据加载失败');
    });
    return flag;
}

module.exports = sensitiveTitle;
