var tpl = require('./redList.tpl'),
	dateFormat = require('utils/fecha');
var init = function( data, redList ) {
    var $goodInfoBox = $( 'div[data-node="topGoodInfo"]' ),
        $redList = $goodInfoBox.find( '[data-node="redlist"]' );
    for ( var i = 0, len = data.length; i < len; i++ ){
    	data[i].redPackBegin =  dateFormat.format(new Date( data[i].redPackBegin ), 'YYYY.MM.DD');
    	data[i].redPackEnd =  dateFormat.format(new Date( data[i].redPackEnd ), 'YYYY.MM.DD');
    }
    $redList[0].innerHTML = tpl( {
        redList : data
    });

    redList();
};

module.exports = init;
