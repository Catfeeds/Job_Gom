
var Pubsub = require('io/pubsub');
function init() {
	var $introduceBox= $('[ data-node=introduce-textarea]')
	var $textareaInfo = $introduceBox.find('[data-node=textarea-info]');
	var $introduceNum = $introduceBox.find('[data-node=introduce-textareaNum]');
	$textareaInfo.on('keyup',function(){
		var val = $(this).val();
		var valNum = $(this).val().length;
		var surplusNum = parseInt(500-valNum);
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