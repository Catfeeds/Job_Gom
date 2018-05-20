
var init = function($listCube) {
	// $listCube.width((document.body.scrollWidth/3||document.body.clientWidth/3) - 2 );
	// $listCube.height($listCube.width());

	$listCube.height((document.body.scrollWidth/3||document.body.clientWidth/3) - 2 );
}

var addList = function($touchInput, $touchBtn) {
	$touchInput.width((document.body.scrollWidth/3||document.body.clientWidth/3) - 2);
	$touchInput.height($touchInput.width());
	$touchBtn.width((document.body.scrollWidth/3||document.body.clientWidth/3) - 2);
	$touchBtn.height($touchBtn.width());
}

module.exports = {
	init: init,
	addList: addList
}

