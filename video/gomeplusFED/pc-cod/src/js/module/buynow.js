var loginPop = require('module/popup/login');
var checkLoginStatus = require('module/checkLoginStatus');

var buynow = function(obj, proNum) {
    var $buyBtn = obj.find('[data-action="buybtn"]'),
        $skuInput = obj.find('[data-node="buyInfo"]');
    var $isCrossInput = obj.find('[data-node="isCross"]');
    var proNum;
	var $self = null;
	var buy = function(){
		var self = $self;
		proNum = proNum || ~~obj.find('[data-node="count"]').val();
        var skuList = '[{' 
	        			+ '"shopId":' + $_CONFIG.shopId + ',' 
						+ '"kId":"' + ($_CONFIG.kid === '' ? '' : $_CONFIG.kid) + '",'
						+ '"skuId":' + $GLOBAL_CONFIG.skuId + ',' 
						+ '"proNum":' + proNum + ',' 
						+ '"source_code":{'
							+ '"sourceCode":"'+ $_CONFIG.sourceCode +'"'
						+ '}'
					+'}]';
		var otherParam = '[{'
							+ '"isCross":"' + $_CONFIG.isCross + '"'
						  +'}]'; 

		$skuInput.val( skuList );
		$isCrossInput.val( otherParam );
        self.parents('[data-node="buynow"]').submit();
	};

    obj.on('click', '[data-action="buybtn"]', function() {		
		$self = $(this);
		if ($self.hasClass('btn-default')) return false;
		if( !checkLoginStatus() ) {
			loginPop({
				onLogin: buy
			});
			return false;
		}else{
			buy();
		}
    });
};
module.exports = buynow;
