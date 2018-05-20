var fetch = require('io/fetch');
var url = require('io/url');
var alert = require('module/popup/alert');

var sensitiveTopic = function(ue, node, obj) {
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
                return '<span style="background:#f95353;color:#fff;">' + match + '</span>'
            });
            ue.tempHTML = node;
            ue.value = '';
            ue.former = ue.cloneNode(true);
            ue.conter = document.createElement("div");
            ue.conter.className = 'senLabel';
            ue.conter.setAttribute('data-node', 'sen-label');
            ue.conter.innerHTML = result;
            ue.conter.onclick = function(ev) {
                ev.cancelBubble = true;
                ue.former.value = ue.tempHTML;
                this.parentNode.replaceChild(ue.former, ue.conter);
                ue.former.focus();
                if (obj) {
                    $(obj.elementNode.searchLenovo).show();
                    $(document).off('click');
                    $(obj.elementNode.fristItems).off('mouseover').off('click').off('mouseout');
                    $(obj.elementNode.labCont).off('focus').off('click').off('keyup');
                    obj.searchLenovo();
                }
            }
            ue.parentNode.replaceChild(ue.conter, ue);
        }
    }).fail(function() {
        alert('数据加载失败');
    });
    return ue.sensitiveWord;
}

module.exports = sensitiveTopic;
