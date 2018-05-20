require('textchange');
var Pubsub = require('io/pubsub');

var init = function() {
	var circleBox = $('[data-node=circleBox]');
	var inputName = circleBox.find('[data-node=inputName]');
	var nameLength = circleBox.find('[data-node=nameLength]');
	var inputNameEvent = {
		oninput: function() {
			var val = inputName.val();
			if (val.length > 15) {
				val = inputName.val(val.substring(0,15));
			}
			nameLength.html(inputName.val().length + "/15");
			Pubsub('circleName').pub(inputName.val());
		}
	};
	inputName.bind({
		textchange: inputNameEvent.oninput
	});
};

module.exports = {
	init: init
};