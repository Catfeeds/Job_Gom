
var Pubsub = require('io/pubsub');
function init() {
	var $circleBox = $('[data-node=circleBox]');
	var $inputName = $circleBox.find('[data-node=inputName]');
	var $nameLength = $circleBox.find('[data-node=nameLength]');
	Pubsub('circleName').pub($inputName.val());
	$nameLength.html($inputName.val().length + "/15");
	$inputName.on('keyup', function(){
		var val = $(this).val();
		if (val.length > 15) {
			val = $(this).val(val.substring(0,15));
		}
		$nameLength.html($(this).val().length + "/15");
		Pubsub('circleName').pub($(this).val());
	});
};
module.exports = {
	init: init
};