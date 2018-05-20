
var Pubsub = require('io/pubsub');
function init() {
	var $introduceBox= $('[ data-node=introduce-textarea]')
	var $textareaInfo = $introduceBox.find('[data-node=textarea-info]');
	var $introduceNum = $introduceBox.find('[data-node=introduce-textareaNum]');
    var valNum = $textareaInfo.val().length;
    $introduceNum.html(valNum+'/500');
    Pubsub('circleSelected').pub($textareaInfo.val());
	$textareaInfo.on('keyup',function(){
		var val = $(this).val();
		var surplusNum = parseInt(500-valNum);
        valNum = $(this).val().length;
		if(surplusNum > 0 ){
        	$introduceNum.html(valNum+'/500');
        }else{
			$introduceNum.html('500/500');
			$(this).val($(this).val().substring(0,500));
        }
        Pubsub('circleSelected').pub(val);
	});
};

module.exports = {
	init: init
};