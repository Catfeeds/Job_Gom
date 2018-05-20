var alert = require('module/popup/alert');
var fetch = require('io/fetch');
var url = require('io/url');
var delTopic = require('module/deletTopic');

var $speakList = $('[data-node=speakList]');
var textTip = {
	0: {
		ok: '置顶',
		cancel: '取消置顶'
	},
	1: {
		ok: '加精',
		cancel: '取消加精'
	}
}

var updateTopic = function($this,type){
	var $parents = $this.parents('li');
	var attr = 'data-status';
	var status = $this.attr(attr) == 1 ? 0 : 1;
	fetch.post(url.get('setTop'), {
        data: {
            type: status,
            ac: type,
            topicId: $parents.attr('id-node'),
            groupId: $GLOBAL_CONFIG['shopId'] 
        }
    }).done(function(data) {
        if (data.success === true) {
            if(status == 1){
				$this.attr(attr, 0);
				var alertInstance = alert(textTip[type].ok + '成功', {
					ok: function() {
						window.location.reload();
					}
 				});
 				alertInstance._$('header').remove();
				
			}else {
				$this.attr(attr, 1);
				var alertInstance = alert(textTip[type].cancel + '成功', {
					ok: function() {
						window.location.reload();
					}
 				});
 				alertInstance._$('header').remove();
			}
        }else{
        	alert(data.message);
        }
    })
}
var init = function(){
	$speakList.on('click','[data-action=top]',function(){
	   updateTopic($(this), 0)
	});
	$speakList.on('click','[data-action=spark]',function(){
		updateTopic($(this), 1);
	});
	$speakList.on('click','[data-action=del]',function(){
		var topicId = $(this).parents('li').attr('id-node');
		var options = {
			id: topicId,
			groupid: $_CONFIG['shopId'],
			content: '是否要删除美店说？',
			res: function(){
				location.reload();
			}
		}
		delTopic(options);
	});
	
}
init();
