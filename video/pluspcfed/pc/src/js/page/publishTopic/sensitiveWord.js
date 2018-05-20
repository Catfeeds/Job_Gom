var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

var sensitiveTopic = function(ue, node) {
    var reg = /<span\s+[\S]*?\s*class="[^"]*?">([^<]*?)<\/span>/g;
    node = node.replace(reg, "$1");
    if (ue.sensitiveWord) {
        return true;
    }
    fetch.post(url.get('sensitiveWord'), {
        data: {
            text: node
        },
        async: false
    }).done(function(data) {
        if (data.success === false) {
            var wordList = data.data.join('|');
            var reg = new RegExp(wordList, 'g');
            var result = node.replace(reg, function(match) {
                ue.sensitiveWord = true;
                return '<span class="bg-warning">' + match + '</span>'
            });
            ue.document.body.innerHTML = result;
        }
    }).fail(function() {
        alert('数据加载失败');
    });
    return ue.sensitiveWord;
}

module.exports = sensitiveTopic;
