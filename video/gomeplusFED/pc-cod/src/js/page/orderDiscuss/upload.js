var upLoad = require('module/upload');


var $disTable = $('[data-node="orderDisTable"]'); //table
var $disList = $disTable.find('[data-node="orderDiscuss"]'); //list

var init = function(){
	
	upLoad.init( 5 );
}

module.exports = {
	init : init
}