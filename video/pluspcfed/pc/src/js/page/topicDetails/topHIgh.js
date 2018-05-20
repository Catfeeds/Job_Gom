
var fetch = require('io/fetch');
var url = require('io/url');
var hint = require('module/hint.js');
module.exports = {
    init: function(){
        $('body').on('click', '[data-node="userTopic-topHigh"]', function(){
            var $this = $(this);
            if ($this.hasClass('topicChecked')){
                return false;
            }
            $this.addClass('topicChecked');
            var $parentWarp = $($this.parents().eq(1));
            var topicId = $parentWarp.parent().attr('data-left');
            var type = parseInt($this.attr('data-type'), 10);
            var ac = parseInt($this.attr('data-ac'), 10);
            fetch.post(url.get('setTop'), {
                data: {
                    topicId: topicId,
                    groupId: $_CONFIG['groupid'],
                    ac: parseInt($this.attr('data-ac'), 10),
                    type: type
                }
            }).then(function(data) {
                if(data && data.success && data.code === 200){
                    var text = ac ? type ? '取消加精' : '加精' : type ? '取消置顶' : '置顶';
                    ac ?  type ? $parentWarp.find('[data-node="topic-title"]').before('<em class="set-spark" data-node="topic-high">精品</em>') : $parentWarp.find('[data-node="topic-high"]').remove() : type ?  $parentWarp.find('[data-node="topic-title"]').before('<em class="set-top" data-node="topic-top">置顶</em>'): $parentWarp.find('[data-node="topic-top"]').remove();
                    $this.attr('data-type', Number(!type)).attr('title', text).text(text);
                    hint.init((ac ? type ? '加精' : '取消加精' : type ? '置顶' : '取消置顶') + '成功');
                }else{
                    hint.init(data.message);
                }
                $this.removeClass('topicChecked');
            },function(data){
                hint.init(data.message);
                $this.removeClass('topicChecked');
            });
            
        });
        
    }
}