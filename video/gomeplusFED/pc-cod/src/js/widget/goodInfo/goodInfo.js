var tpl = require('./goodInfo.tpl');
var init = function( data, reSlider ) {
    var $goodInfoBox = $( 'div[data-node="topGoodInfo"]' ),
        $leftBox = $goodInfoBox.find( '[data-node="topleft"]' ),
        $smallList = $leftBox.find( '[data-node="leftSmallBox"]'),
		$leftBig = $leftBox.find( '[data-node="leftBigBox"]' );
    $smallList[0].innerHTML = tpl( {
        data : data
    });
    $leftBig.find('li img').attr( 'src', data[0] ); 
    setTimeout(function(){
    	reSlider();	
    },1000);
};

module.exports = init;
